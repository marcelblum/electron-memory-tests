const {app, BrowserWindow, ipcMain} = require('electron');
//app.commandLine.appendSwitch('js-flags', '--max_old_space_size=16384');
//app.commandLine.appendSwitch('js-flags', '--max-old-space-size=16384');
//app.commandLine.appendSwitch('js-flags', '--max-heap-size=16384');
//app.commandLine.appendSwitch('js-flags', '--max_heap_size=16384');
//require('v8').setFlagsFromString('--max-old-space-size=16384');
//require('v8').setFlagsFromString('--max_old_space_size=16384');
//require('v8').setFlagsFromString('--max_heap_size=16384');
//require('v8').setFlagsFromString('--max-heap-size=16384');


function createWindow () {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	})
	
	if (mainWindow.loadFile) {
		mainWindow.loadFile('index.html');
		mainWindow.webContents.openDevTools({ mode: 'bottom' });
	} else {
		mainWindow.loadURL(`file://${__dirname}/index.html`);
	}
	
	mainWindow.webContents.on('render-process-gone', (event, details) => console.warn("renderer crashed:", details.exitCode, details.reason));
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  app.quit();
})

const savedBuffers = [];
const largestBufferSize = 2145386496;
if (ipcMain.handle) {
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
}