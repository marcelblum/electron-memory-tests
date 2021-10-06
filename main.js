// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
//app.commandLine.appendSwitch('js-flags', '--max_old_space_size=10192');


function createWindow () {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	})

	// and load the index.html of the app.
	mainWindow.loadFile('index.html');
	mainWindow.webContents.openDevTools({ mode: 'bottom' });
	
	mainWindow.webContents.on('render-process-gone', (event, details) => console.warn("renderer crashed:", details.exitCode, details.reason));
}

app.whenReady().then(() => {
  createWindow();
})

app.on('window-all-closed', function () {
  app.quit();
})

const savedBuffers = [];
const largestBufferSize = 2145386496;
ipcMain.handle('mainFillMemory', async (event, param) => {
	let result = "ok";
	try {
    savedBuffers.push(Buffer.alloc(largestBufferSize, 1));
  } catch(e) {
    result = e.name+": "+e.message;
    //console.log("error", e);
  }
  return result;
});

ipcMain.handle('getMainProcessMemoryInfo', async (event, param) => {
	return await process.getProcessMemoryInfo();
});

ipcMain.handle('clearMainProcessMemory', async (event, param) => {
	savedBuffers.length = 0;
	return true;
});