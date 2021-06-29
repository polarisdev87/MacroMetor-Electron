import { GET_MISSIONS } from '../constants/missions'
// import produce from 'immer'
import loadLocalStorage from '../../util/localStorageHelper'
const initState = loadLocalStorage('missions') || []
// works
const reducer = (defaultState = initState, action) => {
  if (action.type === GET_MISSIONS) {
    return action.payload
  }
  return defaultState
}

export default { name: 'missions', reducer }
