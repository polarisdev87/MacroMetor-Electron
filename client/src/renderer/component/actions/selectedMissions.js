import { SET_MAIN_MISSION, SET_SIDE_MISSION } from '../constants/selectedMissions'

const actions = {
  setMainMission: ({ uuid }) => ({
    type: SET_MAIN_MISSION,
    uuid
  }),
  setSideMission: ({ uuid }) => ({
    type: SET_SIDE_MISSION,
    uuid
  })
}

export default actions
