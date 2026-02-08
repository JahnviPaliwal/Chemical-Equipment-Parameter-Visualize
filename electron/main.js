const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const frontendPath = path.join(__dirname, '../web-frontend/build/index.html');
  console.log('Loading React build from:', frontendPath);

  win.loadFile(frontendPath);  // <-- must point to build/index.html

  win.webContents.openDevTools();  // Shows DevTools in Electron
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
