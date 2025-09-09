const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const LoRAConverter = require('./converter');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 400,
    minWidth: 450,
    minHeight: 350,
    maxWidth: 600,
    maxHeight: 500,
    resizable: true,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#0a0a0a',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarOverlay: {
      color: '#0a0a0a',
      symbolColor: '#ffffff',
      height: 30
    }
  });

  mainWindow.loadFile('index.html');

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window controls
  ipcMain.handle('window-minimize', () => {
    mainWindow.minimize();
  });

  ipcMain.handle('window-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.handle('window-close', () => {
    mainWindow.close();
  });

  // Handle file operations
  ipcMain.handle('select-files', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Select LoRA files to convert',
      filters: [
        { name: 'Safetensors', extensions: ['safetensors'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile', 'multiSelections']
    });

    return result.canceled ? [] : result.filePaths;
  });

  ipcMain.handle('convert-files', async (event, filePaths) => {
    const results = [];
    
    for (const filePath of filePaths) {
      try {
        const result = await convertLoRAFile(filePath);
        results.push(result);
      } catch (error) {
        results.push({
          success: false,
          inputPath: filePath,
          error: error.message
        });
      }
    }
    
    return results;
  });
}

async function convertLoRAFile(inputPath) {
  try {
    // Validate file
    const isValid = await LoRAConverter.isValidSafetensorsFile(inputPath);
    if (!isValid) {
      throw new Error('Invalid or unsupported file format');
    }

    // Generate output path
    const outputPath = LoRAConverter.generateOutputPath(inputPath);

    // Convert the file
    const result = await LoRAConverter.convertLoRAKeys(inputPath, outputPath);

    return {
      success: true,
      inputPath,
      outputPath,
      message: `Converted ${result.originalKeyCount} keys successfully`,
      details: {
        originalKeys: result.originalKeyCount,
        convertedKeys: result.convertedKeyCount,
        sampleMappings: result.sampleMappings
      }
    };
  } catch (error) {
    throw new Error(`Failed to convert ${path.basename(inputPath)}: ${error.message}`);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
  });
});
