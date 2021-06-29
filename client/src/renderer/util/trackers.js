/* eslint-disable */
import playerIO from './playerIO'
import { EventEmitter } from 'events'
import leagueKey from './leagueKey'
import playerConfig from './playerConfig'
import { SettingsDeepDiveStatic } from '../component/reference/constant'
import actions from '../component/reference/action_local_data'
import store from '../store/index'

let localState = {}

setInterval(() => {
  try {
    const { local } = JSON.parse(localStorage.getItem('state'))
    localState = local
  } catch {
    return
  }
  // make localState by uuid lookup into a by code lookup
}, 2000)

const trackEmitter = new EventEmitter()

const matchesPress = (input, press) => {
  const heldKeysMatched = (input.shiftKey === press.shiftKey) &&
  (input.ctrlKey === press.ctrlKey) &&
  (input.altKey === press.altKey) &&
  (input.metaKey === press.metaKey) &&
  (input.type === press.type)
  
  if(press.keycode) {
    return heldKeysMatched && (input.keycode === press.keycode)
  } else {
    return heldKeysMatched && (input.button && (input.button === press.button))
  }

}
 
/* start: in game trackers */
const trackerState = {
  PI: {
    chat: false
  },
  FF: {
    chat: false
  },
  ASC: {
    chat: false
  }
}
const isEnterKey = (e) => {
  return Number(e.keycode) === 28
}
const isOneOfSetting = (e, settings) => {
  return settings.filter(setting => matchesPress(e, setting)).length === 1
}
const piTrack = (e, userConfig) => {
  /* state machine pattern */
  if (isEnterKey(e)) {
    trackerState['PI'].chat = !trackerState['PI'].chat
    return false
  }
  if (trackerState['PI'].chat) {
    return false
  }
  try {
    const leagueEvents = leagueKey.leagueGameSettingsToEventsMapper(userConfig['GameEvents'][SettingsDeepDiveStatic.PI.trackerData.buttonsConfigs[0]])
    if (isOneOfSetting(e, leagueEvents)) {
      return true
    }
  } catch (error) {
    return false    
  }
  return false
}
const ffTrack = (e, userConfig) => {
  /* state machine pattern */
  if (isEnterKey(e)) {
    trackerState.FF.chat = !trackerState.FF.chat
    return false
  }
  if (trackerState.FF.chat) {
    return false
  }
  try {
    const leagueEventsFirst = leagueKey.leagueGameSettingsToEventsMapper(userConfig['GameEvents'][SettingsDeepDiveStatic.FF.trackerData.buttonsConfigs[0]])
    if (isOneOfSetting(e, leagueEventsFirst)) {
      return { first: true, second: false }
    }
    const leagueEventsSecond = leagueKey.leagueGameSettingsToEventsMapper(userConfig['GameEvents'][SettingsDeepDiveStatic.FF.trackerData.buttonsConfigs[1]])
    if (isOneOfSetting(e, leagueEventsSecond)) {
      return { first: false, second: true }
    }
  } catch (error) {
    return false    
  }
  return false
}
const ascTrack = (e, userConfig) => {
  /* state machine pattern */
  if (isEnterKey(e)) {
    trackerState.ASC.chat = !trackerState.ASC.chat
    return false
  }
  if (trackerState.ASC.chat) {
    return false
  }
  try {
    const leagueEventsFirst = leagueKey.leagueGameSettingsToEventsMapper(userConfig['GameEvents'][SettingsDeepDiveStatic.ASC.trackerData.buttonsConfigs[0]])
    if (isOneOfSetting(e, leagueEventsFirst)) {
      return true
    }
    const leagueEventsSecond = leagueKey.leagueGameSettingsToEventsMapper(userConfig['GameEvents'][SettingsDeepDiveStatic.ASC.trackerData.buttonsConfigs[1]])
    if (isOneOfSetting(e, leagueEventsSecond)) {
      return true
    }
    const leagueEventsThird = leagueKey.leagueGameSettingsToEventsMapper(userConfig['GameEvents'][SettingsDeepDiveStatic.ASC.trackerData.buttonsConfigs[2]])
    if (isOneOfSetting(e, leagueEventsThird)) {
      return true
    }
    const leagueEventsFourth = leagueKey.leagueGameSettingsToEventsMapper(userConfig['GameEvents'][SettingsDeepDiveStatic.ASC.trackerData.buttonsConfigs[3]])
    if (isOneOfSetting(e, leagueEventsFourth)) {
      return true
    }
  } catch (error) {
    return false    
  }
  return false
}
const trackers = {
  PI: {
    startTracker: () => {
      playerIO.inputEmitter.on('playerInput', (e) => {
        if (!localState['PI']) {
          return 'tracker PI is set to off'
        }
        /* get the input ini part of userConfig */
       const userConfig = playerConfig.getPlayerConfig().input
        try {
          const track = piTrack(e.eventData, userConfig)
          if (track) {
            trackEmitter.emit('PI', { first: true })
          }
        } catch (e) {
          console.error(e)
        }
      })
      return 'tracker PI started'
    }

  },
  FF: {
    startTracker: () => {
      playerIO.inputEmitter.on('playerInput', (e) => {
        if (!localState['FF']) {
          return 'tracker FF is set to off'
        }
       const userConfig = playerConfig.getPlayerConfig().input
        try {
          const track = ffTrack(e.eventData, userConfig)
          if (track) {
            trackEmitter.emit('FF', track)
          }
        } catch (e) {
          console.error(e)
        }
      })
      return 'tracker FF started'
    }
  },
    ASC: {
      startTracker: () => {
        playerIO.inputEmitter.on('playerInput', (e) => {
          if (!localState['ASC']) {
            return 'tracker ASC is set to off'
          }
         const userConfig = playerConfig.getPlayerConfig().input
          try {
            const track = ascTrack(e.eventData, userConfig)
            if (track) {
              trackEmitter.emit('ASC', { first: true })
            }
          } catch (e) {
            console.log(e)
          }
        })
        return 'tracker ASC started'
      }
    }
}

trackEmitter.on('PI', (e) => {
  console.log('PI was tracked')
  store.dispatch(actions.incrementProgress({ id: SettingsDeepDiveStatic.PI.uuid, track: e }))
})
trackEmitter.on('FF', (e) => {
  console.log('FF was tracked')
  store.dispatch(actions.incrementProgress({ id: SettingsDeepDiveStatic.FF.uuid, track: e }))
})
trackEmitter.on('ASC', (e) => {
  console.log('ASC was tracked')
  store.dispatch(actions.incrementProgress({ id: SettingsDeepDiveStatic.ASC.uuid, track: e }))
})
/* Leaving the base */
trackEmitter.on('SHOP_KEY', (e) => {
  console.log('shopped using key, set violation to false')
  store.dispatch(actions.incrementShopKeyCount())
})
trackEmitter.on('LEVEL_SKILL_KEY', (e) => {
  console.log('increment skill key count')
  store.dispatch(actions.incrementLevelKey({ key: e.key }))
})
/* end: in game trackers */
export default {
 trackEmitter,
 trackers
}
