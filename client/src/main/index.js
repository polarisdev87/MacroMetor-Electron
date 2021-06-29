'use strict'
import { app, BrowserWindow, dialog } from 'electron'
import path from 'path'
import { autoUpdater } from 'electron-updater'

const UPDATE_CHECK_INTERVAL = 1000 * 60 * 60 * 1

// Or with ECMAScript 6
app.disableHardwareAcceleration()
app.setAppUserModelId('mm-gg')

autoUpdater.autoDownload = false

if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  if (process.env.NODE_ENV !== 'development') {
    global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
  }
  let mainWindow
  let splashWindow

  const winURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:9081?viewA'
      : `file://${path.join(__dirname, 'index.html?viewA')}`

  const splashURL = `file://${path.join(__static, 'splash.html')}`

  const createSplashWindow = () => {
    splashWindow = new BrowserWindow({
      width: 810,
      height: 610,
      transparent: true,
      frame: false,
      alwaysOnTop: true
    })

    splashWindow.loadURL(splashURL)
  }

  function createWindow () {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
      height: 930,
      useContentSize: true,
      width: 1290,
      resizable: true,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false
      },
      frame: true,
      show: false
    })

    mainWindow.loadURL(winURL)
    mainWindow.webContents.on('new-window', function (e, url) {
      e.preventDefault()
      require('electron').shell.openExternal(url)
    })
    mainWindow.webContents.on('did-finish-load', () => {
      splashWindow.hide()
      mainWindow.show()
      splashWindow.destroy()
    })
  }
  app.commandLine.appendSwitch('ignore-certificate-errors', 'true')
  app.on('ready', () => {
    createSplashWindow()
    createWindow()
    console.log(app.getVersion())
    // autoUpdater.logger = require('electron-log')
    // autoUpdater.logger.transports.file.level = 'info'
    autoUpdater.checkForUpdates()
    setInterval(() => {
      autoUpdater.checkForUpdates()
    }, UPDATE_CHECK_INTERVAL)
    // autoUpdater.checkForUpdatesAndNotify((data) => {
    // open up a window that prompts user to restart
    // })
  })

  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.C
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      } else {
        mainWindow.focus()
      }
    }
  })
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}
process.on('uncaughtException', function (err) {
  console.error('error!', err)
})

autoUpdater.on('update-available', (info) => {
  console.log('---------------update available----------------')
  // const update = dialog.showMessageBoxSync({
  dialog.showMessageBoxSync({
    title: 'Update',
    message: 'An update is required.',
    // buttons: ['OK', 'Cancel']
    buttons: ['UPDATE']
  })

  autoUpdater.downloadUpdate()

  // console.log(`UPDATE VALUE: ${update}`)
  // if (update === 0) {
  //   autoUpdater.downloadUpdate()
  // }
})

autoUpdater.on('update-downloaded', (info) => {
  console.log('UPDATE AVAILABLE')
  autoUpdater.quitAndInstall(false)
})
