import { SET_MAIN_MISSION, SET_SIDE_MISSION } from '../constants/selectedMissions'
import produce from 'immer'
import loadLocalStorage from '../../util/localStorageHelper'
const initState = loadLocalStorage('selectedMissions') || { mainMissionUUID: '24196343-c414-4a5e-a3ae-473db7f39084', sideMissionUUID: '4e8d00ef-adde-43ae-9d87-d8e04d2d5af0' }
const reducer = (defaultState = initState, action) => {
  if (action.type === SET_MAIN_MISSION) {
    const { uuid } = action
    return produce(defaultState, draftState => {
      if (uuid === defaultState.sideMissionUUID) {
        draftState.sideMissionUUID = defaultState.mainMissionUUID
        draftState.mainMissionUUID = uuid
      }
      draftState.mainMissionUUID = uuid
    })
  }
  if (action.type === SET_SIDE_MISSION) {
    const { uuid } = action
    return produce(defaultState, draftState => {
      if (uuid === defaultState.mainMissionUUID) {
        draftState.mainMissionUUID = defaultState.sideMissionUUID
        draftState.sideMissionUUID = uuid
      }
      draftState.sideMissionUUID = uuid
    })
  }
  return defaultState
}

export default { name: 'selectedMissions', reducer }
