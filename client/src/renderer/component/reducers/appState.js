import _ from 'lodash'
import { SET_APP_STATE } from '../constants/appState'
import loadLocalStorage from '../../util/localStorageHelper'

const initState = loadLocalStorage('appState') || { token: null, path: null, gameUserName: null, email: null, region: null, page: 'home', showEntryForm: false, currentGameData: null, violations: [] }
const reducer = (defaultState = initState, action) => {
  if (action.type === SET_APP_STATE) {
    return {
      token: _.get(action, 'token', defaultState.token),
      gameUserName: _.get(action, 'gameUserName', defaultState.gameUserName),
      path: _.get(action, 'path', defaultState.path),
      email: _.get(action, 'email', defaultState.email),
      region: _.get(action, 'region', defaultState.region),
      page: _.get(action, 'page', defaultState.page),
      showEntryForm: _.get(action, 'showEntryForm', defaultState.showEntryForm),
      currentGameData: _.get(action, 'currentGameData', defaultState.currentGameData),
      violations: _.get(action, 'violations', defaultState.violations)
    }
  }

  return defaultState
}

export default { name: 'appState', reducer }
