#!/usr/bin/env python3


import sys
import os
import traceback

# Try to import; if missing, tell the user how to install.
missing = []
try:
    from safetensors.torch import load_file, save_file
except Exception:
    missing.append("safetensors")
try:
    import torch  # required by safetensors.torch
except Exception:
    missing.append("torch")

if missing:
    print("Required packages are missing:", ", ".join(sorted(set(missing))))
    print("Install with:\n  pip install safetensors torch")
    sys.exit(1)

def convert_lora_keys_for_wan_comfy(input_path, output_path):
    state_dict = load_file(input_path)
    new_state_dict = {}

    print(f"\n[OK] Loaded: {os.path.basename(input_path)}")
    print(f"   Found {len(state_dict)} keys.")

    for key, value in state_dict.items():
        new_key = key

        # Prefix
        new_key = new_key.replace("transformer.", "diffusion_model.")

        # Attention renaming
        new_key = new_key.replace(".attn1.", ".self_attn.")
        new_key = new_key.replace(".attn2.", ".cross_attn.")

        # Projections
        new_key = new_key.replace(".to_q.", ".q.")
        new_key = new_key.replace(".to_k.", ".k.")
        new_key = new_key.replace(".to_v.", ".v.")
        new_key = new_key.replace(".to_out.0.", ".o.")

        # Feed-forward
        new_key = new_key.replace(".ffn.net.0.proj.", ".ffn.0.")
        new_key = new_key.replace(".ffn.net.2.", ".ffn.2.")

        new_state_dict[new_key] = value

    save_file(new_state_dict, output_path)
    print(f"   [OK] Saved: {os.path.basename(output_path)}")
    # Show a quick 5-key sample (if available)
    print("   Sample remaps:")
    for i, nk in enumerate(new_state_dict.keys()):
        if i >= 5: break
        ok = list(state_dict.keys())[i]
        print(f"     {ok}  ->  {nk}")

def infer_output_path(input_path):
    base, ext = os.path.splitext(input_path)
    return f"{base}_converted.safetensors"

def pick_files_if_no_args():
    # If started by double-click (no args), show file picker
    if len(sys.argv) > 1:
        return sys.argv[1:]

    try:
        import tkinter as tk
        from tkinter import filedialog
        root = tk.Tk()
        root.withdraw()
        paths = filedialog.askopenfilenames(
            title="Select .safetensors LoRA files to convert",
            filetypes=[("Safetensors", "*.safetensors"), ("All files", "*.*")]
        )
        return list(paths)
    except Exception:
        # Fallback: ask via console
        p = input("Enter path(s) to .safetensors file(s), separated by | :\n> ").strip()
        return [s.strip() for s in p.split("|") if s.strip()]

def main():
    inputs = pick_files_if_no_args()

    if not inputs:
        print("No files selected. Exiting.")
        return

    any_errors = False
    for ipath in inputs:
        try:
            if not os.path.isfile(ipath):
                print(f"\n[SKIP] Skipping (not a file): {ipath}")
                continue
            if not ipath.lower().endswith(".safetensors"):
                print(f"\n[WARN] Skipping (not .safetensors): {ipath}")
                continue

            out_path = infer_output_path(ipath)
            convert_lora_keys_for_wan_comfy(ipath, out_path)

        except Exception as e:
            any_errors = True
            print(f"\n[ERROR] Error converting {ipath}: {e}")
            traceback.print_exc(limit=1)

    print("\nDone." + (" Some files had errors." if any_errors else ""))

if __name__ == "__main__":
    main()
#!/usr/bin/env python3
"""
Drag-and-drop LoRA key converter (Wan -> ComfyUI)
- Drop .safetensors files onto this script to convert them.
- Or double-click the script and pick files in the dialog.
- Outputs <name>_converted.safetensors next to each input.
"""

import sys
import os
import traceback

# Try to import; if missing, tell the user how to install.
missing = []
try:
    from safetensors.torch import load_file, save_file
except Exception:
    missing.append("safetensors")
try:
    import torch  # required by safetensors.torch
except Exception:
    missing.append("torch")

if missing:
    print("Required packages are missing:", ", ".join(sorted(set(missing))))
    print("Install with:\n  pip install safetensors torch")
    sys.exit(1)

def convert_lora_keys_for_wan_comfy(input_path, output_path):
    state_dict = load_file(input_path)
    new_state_dict = {}

    print(f"\n[OK] Loaded: {os.path.basename(input_path)}")
    print(f"   Found {len(state_dict)} keys.")

    for key, value in state_dict.items():
        new_key = key

        # Prefix
        new_key = new_key.replace("transformer.", "diffusion_model.")

        # Attention renaming
        new_key = new_key.replace(".attn1.", ".self_attn.")
        new_key = new_key.replace(".attn2.", ".cross_attn.")

        # Projections
        new_key = new_key.replace(".to_q.", ".q.")
        new_key = new_key.replace(".to_k.", ".k.")
        new_key = new_key.replace(".to_v.", ".v.")
        new_key = new_key.replace(".to_out.0.", ".o.")

        # Feed-forward
        new_key = new_key.replace(".ffn.net.0.proj.", ".ffn.0.")
        new_key = new_key.replace(".ffn.net.2.", ".ffn.2.")

        new_state_dict[new_key] = value

    save_file(new_state_dict, output_path)
    print(f"   [OK] Saved: {os.path.basename(output_path)}")
    # Show a quick 5-key sample (if available)
    print("   Sample remaps:")
    for i, nk in enumerate(new_state_dict.keys()):
        if i >= 5: break
        ok = list(state_dict.keys())[i]
        print(f"     {ok}  ->  {nk}")

def infer_output_path(input_path):
    base, ext = os.path.splitext(input_path)
    return f"{base}_converted.safetensors"

def pick_files_if_no_args():
    # If started by double-click (no args), show file picker
    if len(sys.argv) > 1:
        return sys.argv[1:]

    try:
        import tkinter as tk
        from tkinter import filedialog
        root = tk.Tk()
        root.withdraw()
        paths = filedialog.askopenfilenames(
            title="Select .safetensors LoRA files to convert",
            filetypes=[("Safetensors", "*.safetensors"), ("All files", "*.*")]
        )
        return list(paths)
    except Exception:
        # Fallback: ask via console
        p = input("Enter path(s) to .safetensors file(s), separated by | :\n> ").strip()
        return [s.strip() for s in p.split("|") if s.strip()]

def main():
    inputs = pick_files_if_no_args()

    if not inputs:
        print("No files selected. Exiting.")
        return

    any_errors = False
    for ipath in inputs:
        try:
            if not os.path.isfile(ipath):
                print(f"\n[SKIP] Skipping (not a file): {ipath}")
                continue
            if not ipath.lower().endswith(".safetensors"):
                print(f"\n[WARN] Skipping (not .safetensors): {ipath}")
                continue

            out_path = infer_output_path(ipath)
            convert_lora_keys_for_wan_comfy(ipath, out_path)

        except Exception as e:
            any_errors = True
            print(f"\n[ERROR] Error converting {ipath}: {e}")
            traceback.print_exc(limit=1)

    print("\nDone." + (" Some files had errors." if any_errors else ""))

if __name__ == "__main__":
    main()

