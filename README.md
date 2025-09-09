# LoRA Converter
** ORIGINAL SCRIPT CREATED BY MONKEYBUSINESS **

A sleek, modern Electron app for converting LoRA files from Wan format to ComfyUI format.

![LoRA Converter Screenshot](https://via.placeholder.com/800x500/1a1a1a/ffffff?text=LoRA+Converter+Screenshot)

## 🚀 Quick Start

### Option 1: Download Pre-built Executable (Recommended)
1. Go to [Releases](../../releases)
2. Download the latest `.exe` file for Windows
3. Run the executable - no installation required!

### Option 2: Build from Source
```bash
# Clone the repository
git clone https://github.com/cutecaption/FAL-converter-script-UI.git
cd FAL-converter-script-UI

# Install dependencies
npm install

# Run in development mode
npm start

# Or build your own executable
npm run dist
```

## ✨ Features

- **🎯 Drag & Drop Interface**: Simply drag .safetensors files into the app window
- **📁 Browse Files**: Click to browse and select multiple files
- **📋 File Staging**: Review files before conversion with staging area
- **⚡ Real-time Progress**: See conversion progress with modern progress bar
- **📊 Results Display**: View conversion results with success/error indicators
- **🎨 Ultra-Modern UI**: Sleek, compact interface with animated background
- **🔒 Secure**: Uses your existing Python installation - no hidden processes
- **🌐 Cross-platform**: Works on Windows, macOS, and Linux

## 🔧 How It Works

This app provides a beautiful GUI wrapper around the core Python conversion logic. It:

1. **Stages your files** for review before conversion
2. **Calls the Python script** (`lora_wan2comfy_dragdrop.py`) to do the actual conversion
3. **Shows real-time progress** and results in a modern interface
4. **Saves converted files** in the same directory with `_converted.safetensors` suffix

## 🔄 Conversion Details

The app performs these exact transformations on LoRA keys:

- **Prefix transformation**: `transformer.` → `diffusion_model.`
- **Attention renaming**: 
  - `.attn1.` → `.self_attn.`
  - `.attn2.` → `.cross_attn.`
- **Projection transformations**:
  - `.to_q.` → `.q.`
  - `.to_k.` → `.k.`
  - `.to_v.` → `.v.`
  - `.to_out.0.` → `.o.`
- **Feed-forward transformations**:
  - `.ffn.net.0.proj.` → `.ffn.0.`
  - `.ffn.net.2.` → `.ffn.2.`

## 📋 Requirements

### For Pre-built Executable:
- **Python 3.7+** with `safetensors` and `torch` packages installed
- **Windows 10+** (other platforms available in releases)

### For Building from Source:
- **Node.js 16+**
- **Python 3.7+** with required packages
- **Git** (for cloning)

### Installing Python Dependencies:
```bash
pip install safetensors torch
```

## 🏗️ Project Structure

```
lora-converter/
├── main.js                          # Electron main process
├── preload.js                       # Secure IPC bridge
├── index.html                       # UI layout
├── styles.css                       # Modern styling with animations
├── renderer.js                      # UI interactions and file handling
├── converter.js                     # Wrapper for Python script
├── lora_wan2comfy_dragdrop.py      # Core conversion logic (Python)
├── package.json                     # Dependencies and build scripts
└── README.md                        # This file
```

## 🔒 Security & Trust

- **Open Source**: All code is visible and auditable
- **No Network Access**: App works completely offline
- **Uses Your Python**: Calls your existing Python installation
- **No Hidden Processes**: Everything runs transparently
- **Minimal Dependencies**: Only essential packages included

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run in development mode
npm start

# Build for production (creates installer)
npm run build

# Build portable executable
npm run dist
```

## 🐛 Troubleshooting

### "Python not found" Error
- Ensure Python is installed and in your PATH
- Install required packages: `pip install safetensors torch`

### Unicode Encoding Errors
- The app automatically handles Windows encoding issues
- If you see Unicode errors, the Python script has been modified to use ASCII output

### File Not Converting
- Ensure the file is a valid `.safetensors` file
- Check that you have write permissions in the file's directory
- Verify the file isn't corrupted or in use by another program

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🙏 Acknowledgments

- Original Python conversion logic for Wan → ComfyUI compatibility
- Electron team for the excellent framework
- Community feedback and testing

---

**Made with ❤️ for the AI/ML community**

