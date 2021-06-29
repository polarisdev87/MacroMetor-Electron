import { GET_ENTRIES } from '../constants/entries'
import getSummonerData from './../../../utils/dataFetcher/getSummonerData'
import { bootcampUUID, gameUUID } from '../../../enum/player'
import { constructRequestConfig, baseUrl } from './actionHelpers'
import axios from 'axios'
import _ from 'lodash'
import appStateAction from './appState'
import store from '../../store'
import { message } from 'antd'

const url = `${baseUrl}/entries`

function _getEntries (data) {
  return {
    type: GET_ENTRIES,
    payload: data
  }
}

export const getEntries = ({ userToken }) => (dispatch) => {
  const config = constructRequestConfig('get', url, userToken)
  axios(config)
    .then(function (response) {
      dispatch(_getEntries(response.data))
    })
    .catch(function (error) {
      dispatch(_getEntries([]))
      console.error(error)
    })
}

export const postEntries = ({ userToken, region, game, enteredValues }) => async (dispatch) => {
  // scrape lol
  const summonerName = game.gameUserName

  // TODO write a unit test for just get summoner data using a specific paid user for the following cases
  // NA, EUNE, EUW, and LAN? also test here with a failed response to make sure it doesnt crash the entire process!
  const { rankScore, lp } = await getSummonerData({ summonerName, region })
  console.log(store.getState())
  const entryPayload = {
    gameUserName: game.gameUserName,
    region,
    violationsArray: _.get(store.getState(), 'appState.violations', []),
    championName: game.championName,
    victoryFlag: enteredValues.victoryFlag,
    timestamp: game.timestamp,
    mainMissionUUID: enteredValues.mainMissionUUID,
    mainMissionName: enteredValues.mainMissionName,
    mainMissionScore: enteredValues.mainMissionScore,
    mainMissionText: enteredValues.mainMissionText,
    sideMissionUUID: enteredValues.sideMissionUUID,
    sideMissionName: enteredValues.sideMissionName,
    sideMissionScore: enteredValues.sideMissionScore,
    sideMissionText: enteredValues.sideMissionText,
    rankedGameFlag: enteredValues.rankedGameFlag,
    diaryText: enteredValues.diaryText,
    roleName: enteredValues.roleName,
    bootcampUUID,
    gameUUID,
    leagueRankScore: rankScore,
    leaguePoints: lp,
    countedFlag: true,
    gameDataBlob: game.gameDataBlob
  }
  console.log('entryPayload:', entryPayload)
  const postConfig = constructRequestConfig('post', url, userToken, entryPayload)
  await axios(postConfig, entryPayload) // post entry
  dispatch(getEntries({ userToken }))
  dispatch(appStateAction.setAppState({ showEntryForm: false, violations: [] }))
  message.success('Tracked a game!')
}

const actions = {
  getEntries,
  postEntries
}

export default actions

// const computedKeys = [
//   'climbingFlag',
//   'learningFlag',
//   'timestamp',
//   'violationArray'
// ]

// const clientPopulated = [
//   'gameUserName',
//   'mainMissionUUID',
//   'sideMissionUUID',
//   'mainMissionText',
//   'sideMissionName',
//   'bootcampUUID',
//   'gameUUID',
//   'userUUID'
// ]

// const gameKeys = [
//   'championName',
//   'victoryFlag'
// ]

// const playerEnteredKeys = [
//   'diaryText',
//   'mainMissionScore',
//   'roleName',
//   'sideMissionScore',
//   'rankedGameFlag'
// ]

// const scrapedKeys = [
//   'leaguePoints',
//   'leagueRankScore'
// ]

/*
  activePlayer.summonerName
  gameData.gameMode
*/
