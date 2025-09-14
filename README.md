
# LoRA Converter

<a href="https://imgbb.com/"><img src="https://i.ibb.co/d9Jn48D/screen-shot-convert.png" alt="screen-shot-convert" border="0"></a>

A sleek, modern Electron app for converting LoRA files from FAL WAN 2.2 LoRA format to ComfyUI format.

![LoRA Converter Screenshot](https://via.placeholder.com/800x500/1a1a1a/ffffff?text=LoRA+Converter+Screenshot)

## 🚀 Quick Start

### Option 1: Download Pre-built Executable (Recommended)

#### For Windows:
1. Go to [Releases](../../releases)
2. Download the latest `.exe` file for Windows
3. Run the executable - no installation required!

#### For Mac:
this is current under revision

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
- **Windows 10+** or **macOS 10.14+** (Intel and Apple Silicon supported)
- **Linux** (AppImage available in releases)
- pip: safetensors, torch, numpy

### For Building from Source:
- **Node.js 16+**
- **Python 3.7+** with required packages
- **Git** (for cloning)

### Installing Python Dependencies:
```bash
pip install safetensors torch numpy
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

# Build for Windows
npm run build

# Build for Mac
npm run build-mac

# Build for all platforms
npm run build-all

# Build portable executable (Windows)
npm run dist

# Build Mac DMG
npm run dist-mac
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

### Mac-Specific Issues

#### "App can't be opened" Error
- Right-click the app and select "Open" instead of double-clicking
- Go to System Preferences → Security & Privacy → General and click "Open Anyway"

#### Python Path Issues on Mac
- Install Python via Homebrew: `brew install python`
- Or use the official Python installer from python.org
- Ensure Python is in your PATH: `which python3`

#### Permission Denied Errors
- The app may need permission to access files
- Grant Full Disk Access in System Preferences → Security & Privacy → Privacy

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
=======
# LoRA Converter
** ORIGINAL SCRIPT CREATED BY Unknown Author the script was originally posted on Banodoco Discord -- if you are the author or know the author please reach out you can find me on discord as shotgun messiah

https://discord.gg/BcxmHtRfgf **

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

- Original script posted in Banodoco discord https://discord.gg/BcxmHtRfgf

---

Simple Python Installation Steps for Users

For Windows Users:
Option 1: Microsoft Store (Easiest - Recommended)
1. Open Microsoft Store (search for "Microsoft Store" in Start menu)
2. Search for "Python"
3. Install "Python 3.12" (or latest version) - click "Get" or "Install"
That's it! The Microsoft Store version automatically adds Python to PATH

Option 2: Official Python Installer (Alternative)
1. Go to python.org/downloads
2. Click the big yellow "Download Python" button
3. Run the downloaded installer
⚠️ CRITICAL: Check the box "Add Python to PATH" at the bottom of the first screen
4. Click "Install Now"

After Installing Python:
Open Command Prompt (search "cmd" in Start menu)
Type this command and press Enter:

pip install safetensors torch

Wait for installation to complete (may take a few minutes)
Close Command Prompt and try your LoRA Converter app again
