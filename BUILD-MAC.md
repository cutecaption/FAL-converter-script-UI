# Building LoRA Converter for Mac

This guide will help you build LoRA Converter from source on macOS.

## Prerequisites

### 1. Install Xcode Command Line Tools
```bash
xcode-select --install
```

### 2. Install Node.js
Download and install from [nodejs.org](https://nodejs.org/) or use Homebrew:
```bash
brew install node
```

### 3. Install Python and Dependencies
```bash
# Install Python (if not already installed)
brew install python

# Install required Python packages
pip3 install safetensors torch
```

## Building the App

### 1. Clone and Setup
```bash
git clone https://github.com/cutecaption/FAL-converter-script-UI.git
cd FAL-converter-script-UI
npm install
```

### 2. Build for Mac
```bash
# Build DMG and ZIP for both Intel and Apple Silicon
npm run build-mac

# Or build for development/testing
npm run pack-mac
```

### 3. Find Your Built App
- **DMG file**: `dist/LoRA-Converter-1.1.0.dmg`
- **ZIP files**: `dist/LoRA-Converter-1.1.0-x64.zip` and `dist/LoRA-Converter-1.1.0-arm64.zip`
- **Unpacked app**: `dist/mac/LoRA Converter.app`

## Code Signing (Optional)

For distribution, you'll want to sign the app:

### 1. Get a Developer Certificate
- Join the Apple Developer Program
- Create a Developer ID Application certificate

### 2. Sign the App
```bash
# Set your certificate name
export CSC_NAME="Developer ID Application: Your Name"

# Build with signing
npm run build-mac
```

### 3. Notarize (for Gatekeeper)
```bash
# This requires additional setup with Apple
# See: https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution
```

## Troubleshooting

### Build Fails with "No provisioning profile"
- This is normal for unsigned builds
- The app will still work, but users will need to bypass Gatekeeper

### Python Not Found During Build
- Ensure Python 3 is in your PATH: `which python3`
- The app will look for Python at runtime, not build time

### Permission Errors
- Make sure you have write permissions in the project directory
- Try running with `sudo` if necessary (not recommended)

## Testing Your Build

1. Open the built app from `dist/mac/LoRA Converter.app`
2. Test drag-and-drop functionality
3. Try converting a sample LoRA file
4. Verify the Python script executes correctly

## Distribution

- **DMG**: Ready for distribution, users can drag to Applications
- **ZIP**: Alternative format, users extract and move to Applications
- **Unsigned**: Users will need to right-click → Open on first launch
