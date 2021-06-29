import entries from '../component/reducers/entries'
import missions from '../component/reducers/missions'
import appState from '../component/reducers/appState'
import selectedMissions from '../component/reducers/selectedMissions'

const rootReducers = {
  [selectedMissions.name]: selectedMissions.reducer,
  [entries.name]: entries.reducer,
  [missions.name]: missions.reducer,
  [appState.name]: appState.reducer
}

export default rootReducers
