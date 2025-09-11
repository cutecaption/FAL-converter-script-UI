<<<<<<< HEAD
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('window-minimize'),
  maximizeWindow: () => ipcRenderer.invoke('window-maximize'),
  closeWindow: () => ipcRenderer.invoke('window-close'),

  // File operations
  selectFiles: () => ipcRenderer.invoke('select-files'),
  convertFiles: (filePaths) => ipcRenderer.invoke('convert-files', filePaths),

  // Utility
  getPath: (name) => ipcRenderer.invoke('get-path', name),
  
  // Platform info
  platform: process.platform
});
=======
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('window-minimize'),
  maximizeWindow: () => ipcRenderer.invoke('window-maximize'),
  closeWindow: () => ipcRenderer.invoke('window-close'),

  // File operations
  selectFiles: () => ipcRenderer.invoke('select-files'),
  convertFiles: (filePaths) => ipcRenderer.invoke('convert-files', filePaths),

  // Utility
  getPath: (name) => ipcRenderer.invoke('get-path', name),
  
  // Platform info
  platform: process.platform
});
>>>>>>> 1b1c2d7f96990a2bd21bdffb7b047a3d96c67f21
