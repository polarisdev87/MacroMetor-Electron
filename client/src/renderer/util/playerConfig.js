import cfg from './cfg'
import system from './system'
import loadLocalStorage from './localStorageHelper'
import trackingManager from './trackingManager'
import store from '../store'
import { isNull } from 'lodash'
import leagueKey from './leagueKey'
import actions from '../component/actions/appState'

let playerCurrentConfig = null

const visionPingUnset = ({ input }) => {
  try {
    const playerSetting = input.GameEvents.evtPlayerPingAreaIsWarded
    const evtKeys = leagueKey.leagueGameSettingsToEventsMapper(playerSetting).filter(x => !!x)
    return evtKeys.length === 0 ? 'visionPingNotSet' : null
  } catch (error) {
    console.error(error)
    return null
  }
}

const cameraLockSet = ({ input, cfg }) => {
  try {
    if (Number(cfg.HUD.CameraLockMode)) {
      return 'cameraLock'
    }
    const playerSetting = input.GameEvents.evtCameraLockToggle
    const evtKeys = leagueKey.leagueGameSettingsToEventsMapper(playerSetting).filter(x => !!x)
    return evtKeys.length > 0 ? 'cameraLock' : null
  } catch (error) {
    console.error(error)
    return null
  }
}

const chatOn = ({ cfg }) => {
  try {
    return (Number(cfg.HUD.ShowAlliedChat) || Number(cfg.HUD.ShowAllChannelChat)) ? 'chatOn' : null
  } catch (error) {
    console.error(error)
    return null
  }
}

const getViolations = (config) => {
  return [
    visionPingUnset,
    cameraLockSet,
    chatOn
  ].map(violationDetector => violationDetector(config)).filter(val => !isNull(val))
}

let interval = null

trackingManager.triggerEmitter.on('GAME_START', () => {
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => {
    let gamePath = loadLocalStorage('appState')
    gamePath = gamePath && gamePath.path
    if (gamePath) {
      const customCfgPath = gamePath && `${gamePath}\\Config\\game.cfg`
      const customIniPath = gamePath && `${gamePath}\\Config\\input.ini`
      const lines = system.fileReader(customCfgPath, 'testing the game cfg file loading')
      const inputLines = system.fileReader(customIniPath, 'testing the input ini file loading')
      const cfgJson = cfg.cfgParser(lines)
      const inputJson = cfg.iniParser(inputLines)
      playerCurrentConfig = { cfg: cfgJson, input: inputJson }
      const violations = store.getState().appState.violations || []
      const detectedViolations = getViolations(playerCurrentConfig)
      store.dispatch(actions.setAppState({ violations: [...new Set([...violations, ...detectedViolations])] }))
    } else {
      playerCurrentConfig = null
    }
  }, 2000)
})

trackingManager.triggerEmitter.on('GAME_END', () => {
  clearInterval(interval)
})

trackingManager.triggerEmitter.on('GAME_ERROR', () => {
  clearInterval(interval)
})

process.on('SIGABRT', () => {
  clearInterval(interval)
})
process.on('SIGHUP', () => {
  clearInterval(interval)
})
process.on('SIGHUP', () => {
  clearInterval(interval)
})
export default {
  getPlayerConfig: () => playerCurrentConfig,
  checkConfigPath: (gamePath) => {
    try {
      const customCfgPath = gamePath && `${gamePath}\\Config\\game.cfg`
      const customIniPath = gamePath && `${gamePath}\\Config\\input.ini`
      const lines = system.fileReader(customCfgPath, 'testing the game cfg file loading')
      const inputLines = system.fileReader(customIniPath, 'testing the input ini file loading')
      const cfgJson = cfg.cfgParser(lines)
      const inputJson = cfg.iniParser(inputLines)
      const playerCurrentConfig = { cfg: cfgJson, input: inputJson }
      return Object.keys(playerCurrentConfig).length === 2
    } catch (e) {
      return false
    }
  }
}
