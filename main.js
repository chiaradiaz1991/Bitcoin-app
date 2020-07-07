const { app, BrowserWindow, Menu } = require('electron');
const shell = require('electron').shell;
const ipc = require('electron').ipcMain; //ipc main or ipc renderer

function createWindow () {
  // Crea la ventana del navegador.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // y carga el index.html de la aplicación.
  win.loadFile('src/index.html')

  // Abre las herramientas de desarrollo (DevTools).
  win.webContents.openDevTools()
}

// Este método se llamará cuando Electron haya finalizado
// la inicialización y esté preparado para crear la ventana del navegador.
// Algunas APIs pueden usarse sólo después de que este evento ocurra.
app.whenReady().then(createWindow)

// Finaliza cuando todas las ventanas estén cerradas.
app.on('window-all-closed', () => {
  // En macOS es común para las aplicaciones y sus barras de menú
  // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

let menu = Menu.buildFromTemplate([{
  label: 'Menu',
  submenu:  [
    {
      label: 'Adjust notification value'
    },
    {
      label: 'CoinMarket',
      click() {
        shell.openExternal('http://coinmarketcap.com')
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Exit',
      click() {
        app.quit()
      }
    }
  ]}
])

Menu.setApplicationMenu(menu);

app.on('activate', () => {
  // En macOS es común volver a crear una ventana en la aplicación cuando el
  // icono del dock es clicado y no hay otras ventanas abiertas.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


// receive all the messages from more than one processes or windows and send that data out from those processes or windows
ipc.on('update-notify-value', function(event, arg) {
  // send that value to win -- win is the variable up
  win.webContents.send('targetPriceVal', arg)
})