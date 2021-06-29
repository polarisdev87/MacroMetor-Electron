import { GET_ENTRIES, POST_ENTRY } from '../constants/entries'
// import produce from 'immer'
import loadLocalStorage from '../../util/localStorageHelper'
const initState = loadLocalStorage('entries') || []
const reducer = (defaultState = initState, action) => {
  if (action.type === GET_ENTRIES) {
    return action.payload.sort(x => -x.timestamp)
    // return produce(defaultState, (draftState) => {
    //   draftState = action.payload
    // })
  }

  if (action.type === POST_ENTRY) {
    return action.payload
  }
  return defaultState
}

export default { name: 'entries', reducer }
