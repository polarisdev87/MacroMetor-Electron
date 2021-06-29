const INCREMENT_PROGRESS = 'INCREMENT_PROGRESS'
const TOGGLE_TRACKER = 'TOGGLE_TRACKER'
const ADD_RATING = 'ADD_RATING'
const ADD_REFLECT = 'ADD_REFLECT'
const UPDATE_DEEPDIVE = 'UPDATE_DEEPDIVE'
const UPDATE_USER = 'UPDATE_USER'
const UPDATE_PATH = 'UPDATE_PATH'

const actions = {
  toggleTracker: (payload) => {
    return {
      type: TOGGLE_TRACKER,
      id: payload
    }
  },
  incrementProgress: (payload) => {
    return {
      type: INCREMENT_PROGRESS,
      id: payload.id,
      track: payload.track
    }
  },
  addRating: (payload) => {
    return {
      type: ADD_RATING,
      id: payload.id,
      ratingNumber: payload.ratingNumber,
      feedback: payload.feedback
    }
  },
  addReflect: (payload) => {
    return {
      type: ADD_REFLECT,
      id: payload.id,
      question: payload.question,
      answer: payload.answer,
      time: payload.time
    }
  },
  updateDeepDive: (payload) => {
    return {
      type: UPDATE_DEEPDIVE,
      id: payload.id,
      completed: payload.completed
    }
  },
  updateUser: (payload) => {
    return {
      type: UPDATE_USER,
      email: payload.email,
      summonerName: payload.summonerName
    }
  },
  updatePath: (payload) => {
    return {
      type: UPDATE_PATH,
      path: payload.path
    }
  }
}
export default actions
