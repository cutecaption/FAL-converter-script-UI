# Contributing to LoRA Converter

Thank you for your interest in contributing to LoRA Converter! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- Python 3.7+ with `safetensors` and `torch` packages
- Git

### Setup Development Environment

1. **Fork and clone the repository**
   ```bash
git clone https://github.com/cutecaption/FAL-converter-script-UI.git
cd FAL-converter-script-UI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install safetensors torch
   ```

4. **Run in development mode**
   ```bash
   npm start
   ```

## 🛠️ Development Guidelines

### Code Style
- Use consistent indentation (2 spaces for JS/CSS, 4 spaces for Python)
- Follow existing naming conventions
- Add comments for complex logic
- Keep functions small and focused

### File Structure
- `main.js` - Electron main process
- `renderer.js` - UI logic and interactions  
- `preload.js` - Secure IPC bridge
- `converter.js` - Python script wrapper
- `lora_wan2comfy_dragdrop.py` - Core conversion logic
- `styles.css` - UI styling and animations
- `index.html` - UI layout

### Testing
Before submitting changes:
1. Test the app in development mode (`npm start`)
2. Test building the executable (`npm run build`)
3. Verify conversion works with sample LoRA files
4. Check UI responsiveness and animations
5. Test drag & drop functionality

## 🐛 Bug Reports

When reporting bugs, please include:
- Operating system and version
- Node.js and Python versions
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Console output or error messages

## ✨ Feature Requests

For new features:
1. Check existing issues first
2. Describe the use case clearly
3. Explain how it benefits users
4. Consider implementation complexity
5. Be open to discussion and alternatives

## 📝 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding guidelines
   - Add comments where needed
   - Test thoroughly

3. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of changes"
   ```
   
   Use conventional commit messages:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for improvements
   - `Remove:` for deletions
   - `Docs:` for documentation

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   
   Then create a pull request on GitHub with:
   - Clear title and description
   - Reference any related issues
   - Screenshots for UI changes
   - Testing instructions

## 🔒 Security Considerations

Since this app handles user files:
- Never add network requests without clear justification
- Validate all user inputs
- Use secure IPC communication
- Keep dependencies minimal and updated
- Follow Electron security best practices

## 🎨 UI/UX Guidelines

- Maintain the compact, modern aesthetic
- Keep animations subtle and non-distracting
- Ensure accessibility (keyboard navigation, screen readers)
- Test on different screen sizes
- Follow the existing color scheme and spacing

## 📦 Building and Releases

### Local Building
```bash
# Build for current platform
npm run build

# Build for all platforms
npm run build-all

# Create portable executable
npm run dist
```

### Release Process
1. Update version in `package.json`
2. Create a git tag: `git tag v1.0.1`
3. Push tag: `git push origin v1.0.1`
4. GitHub Actions will automatically build and create a release

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help newcomers get started
- Share knowledge and best practices
- Focus on constructive feedback
- Celebrate contributions of all sizes

## 📞 Getting Help

- Check existing issues and discussions
- Ask questions in GitHub Discussions
- Join community channels (if available)
- Reach out to maintainers for guidance

## 🙏 Recognition

All contributors will be recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Special mentions for major features

Thank you for helping make LoRA Converter better for everyone! 🎉
