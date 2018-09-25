const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 }) //RESOLUCON DE PANTALLA

    // load the dist folder from Angular
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/Platzinger/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools optionally:
    // win.webContents.openDevTools()

    win.on('closed', () => {
        win = null //BORRA MEMORIA DE CUALQUIER SISTEMA OPERATIVO
    })
}

app.on('ready', createWindow) // CREA LA VENTANA PARA QUE CARGUE

//ESTA FUNCION HACE QUE SE COMPORTE COMO UNA APLICACION NORMAL DEPENDIENDO DEL SISTEMA OPERATIVO
app.on('window-all-closed', () => { // FUNCION PARA GUARDAR RECURSOS
    if (process.platform !== 'darwin') { //TRAE EL VALOR DEL SISTEMA OPERATIVO QUE TRAE
        app.quit() // TODA EL APP SE CIERRA
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})