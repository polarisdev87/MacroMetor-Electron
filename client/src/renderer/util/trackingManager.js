
import { EventEmitter } from 'events'
import axios from 'axios'
import store from '../store/index'
import actions from '../component/actions/appState'
// listen for trigger events
// start and stop emitting events at the right time
const triggerEmitter = new EventEmitter()
let in_game = null
let turning_off = null
const GAME_START = 'GAME_START'
const GAME_ERROR = 'GAME_ERROR'
const GAME_END = 'GAME_END'
const GAME_TIME_CUTOFF = 15 * 60

let lastData = null
const detectedSOG = (gameData) => {
  return gameData.Events[0].EventName === 'GameStart'
}
const detectedEOG = (gameData) => {
  return gameData.Events.filter(gameEvt => gameEvt.EventName === 'GameEnd').length === 1
}
const getVictoryFlag = (events) => {
  try {
    return events.Events.filter(gameEvt => gameEvt.EventName === 'GameEnd')[0].Result === 'Win'
  } catch (error) {
    return null
  }
}
const formatData = ({ events, activePlayer, allPlayers, data }) => {
  try {
    const championName = allPlayers.filter(player => player.summonerName === activePlayer.summonerName)[0].championName
    return {
      championName,
      level: activePlayer.level,
      gameUserName: activePlayer.summonerName,
      victoryFlag: getVictoryFlag(events),
      timestamp: new Date().getTime(),
      gameTime: data.gameData.gameTime
    }
  } catch (error) {
    console.error(error)
  }
}
const trackingManager = () => {
  setInterval(async () => {
    // check game state (consider imcomplete games, internet disconnects, etc.)
    try {
      const { data } = await axios('https://127.0.0.1:2999/liveclientdata/allgamedata')
      const { events, activePlayer, allPlayers } = data
      lastData = { ...formatData({ events, activePlayer, allPlayers, data }), gameDataBlob: data }
      if (in_game && detectedEOG(events)) {
        const game = formatData({ events, activePlayer, allPlayers, data })
        triggerEmitter.emit(GAME_END, { ...game, gameDataBlob: JSON.stringify(data) })
        in_game = null
        if (turning_off) {
          clearTimeout(turning_off)
          turning_off = null
        }
      } else if (!in_game) {
        if (detectedSOG(events)) {
          in_game = true
          triggerEmitter.emit(GAME_START, events)
        }
      }
    } catch (e) {
      // got an error, could be a disconnect or the game has already ended
      if (in_game) {
        // setup a  min interuptable timer to turn off in-game trackers and null out in_game
        in_game = null
        triggerEmitter.emit(GAME_ERROR, { ...lastData, gameDataBlob: JSON.stringify(lastData.gameDataBlob) })
      }
    }
  }, 1000)
}
triggerEmitter.on(GAME_START, (data) => {
  // if (uIOhook.listenerCount('input') > 0) {
  //   uIOhook.removeAllListeners()
  // }
  // uIOhook.start()
  // uIOhook.on('input', (e) => {
  //   // ignore mouse move events to reduce file size
  //   if (e.type !== 8 && e.type !== 4) {
  //     return
  //   }
  //   playerIO.inputEmitter.emit('playerInput', {
  //     eventData: e
  //   })
  // })
})
triggerEmitter.on(GAME_END, (data) => {
  // stop trackers with endTrigger end game
  // trigger any trackers for post game
  console.log(data)
  store.dispatch(actions.setAppState({ showEntryForm: true, currentGameData: data }))
  // uIOhook.removeAllListeners('input')
  // uIOhook.stop()
})
triggerEmitter.on(GAME_ERROR, (data) => {
  // stop all trackers
  // uIOhook.removeAllListeners('input')
  // uIOhook.stop()
  if (data.gameTime > GAME_TIME_CUTOFF) {
    store.dispatch(actions.setAppState({ showEntryForm: true, currentGameData: data }))
  }
  console.error('game_error', in_game)
})

export default {
  trackingManager,
  triggerEmitter
}
