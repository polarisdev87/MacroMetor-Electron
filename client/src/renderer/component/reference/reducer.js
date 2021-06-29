import { GET_GAME_DATA } from './constant'
import _ from 'lodash'

const initState = JSON.parse(localStorage.getItem('liveData') || null)
const reducer = (defaultState = initState, action) => {
  if (action.type === GET_GAME_DATA) {
    const { payload } = action
    localStorage.setItem('liveData', JSON.stringify(payload))
    return _.cloneDeep(payload)
  }
  return defaultState
}

export default { name: 'liveData', reducer }
