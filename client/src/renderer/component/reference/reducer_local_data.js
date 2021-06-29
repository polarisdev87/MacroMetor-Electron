import { TOGGLE_TRACKER, INCREMENT_PROGRESS, ADD_RATING, INCREMENT_DEEPDIVE as UPDATE_DEEPDIVE, ADD_REFLECT, UPDATE_USER, UPDATE_PATH } from '../customer/constant'
import produce from 'immer'
import { loadState } from '../../store/localStorage'

const initState = loadState() || { local: { path: '', summoner: '', email: '' }, progress: {}, ratings: {}, deepdives: {}, reflects: {} }
const reducer = (defaultState = initState, action) => {
  if (action.type === TOGGLE_TRACKER) {
    const { id } = action
    return produce(defaultState, draftState => {
      if (defaultState.local[id] === 1) {
        draftState.local[id] = 0
      } else {
        draftState.local[id] = 1
      }
    })
  }
  if (action.type === INCREMENT_PROGRESS) {
    const { id, track } = action
    return produce(defaultState, draftState => {
      if (defaultState.progress[id] && defaultState.progress[id].length > 0) {
        draftState.progress[id] = [...draftState.progress[id], { id, track, time: new Date().getTime() }]
      } else {
        draftState.progress[id] = [{ id, track, time: new Date().getTime() }]
      }
    })
  }
  if (action.type === ADD_RATING) {
    const { id, ratingNumber, feedback } = action
    return produce(defaultState, draftState => {
      if (!defaultState.ratings) {
        draftState.ratings = {
          [id]: [{ id, ratingNumber, feedback }]
        }
      } else if (defaultState.ratings[id] && defaultState.ratings[id].length > 0) {
        draftState.ratings[id] = [...draftState.ratings[id], { id, ratingNumber, feedback, time: new Date().getTime() }]
      } else {
        draftState.ratings[id] = [{ id, ratingNumber, feedback, time: new Date().getTime() }]
      }
    })
  }
  if (action.type === ADD_REFLECT) {
    const { id, question, answer, time } = action
    return produce(defaultState, draftState => {
      if (!defaultState.reflects) {
        draftState.reflects = {
          [id]: [{ id, question, answer, time }]
        }
      } else if (defaultState.reflects[id] && defaultState.reflects[id].length > 0) {
        draftState.reflects[id] = [...draftState.reflects[id], { id, question, answer, time }]
      } else {
        draftState.reflects[id] = [{ id, question, answer, time }]
      }
    })
  }
  if (action.type === UPDATE_DEEPDIVE) {
    const { id, completed } = action
    return produce(defaultState, draftState => {
      draftState.deepdives[id] = completed
    })
  }
  if (action.type === UPDATE_USER) {
    const { summonerName, email } = action
    return produce(defaultState, draftState => {
      draftState.local.summonerName = summonerName
      draftState.local.email = email
    })
  }
  if (action.type === UPDATE_PATH) {
    const { path } = action
    return produce(defaultState, draftState => {
      draftState.local.path = path
    })
  }
  return defaultState
}
export default { name: 'customer', reducer }
