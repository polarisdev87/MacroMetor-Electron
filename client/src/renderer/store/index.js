/* eslint-disable */
import throttle from 'lodash.throttle'
import rootReducers from './root_reducer'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { history as initHistory } from '../history'
import thunk from 'redux-thunk'
import trackerCollection from '../util/trackers'
import trackingManager from '../util/trackingManager'

const trackingFeatureFlag = true

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const createRootReducer = (history, reducerObj) => combineReducers({
  router: connectRouter(history),
  ...reducerObj
})
const store = createStore(
  createRootReducer(initHistory, rootReducers),
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(initHistory)))
)
store.subscribe(throttle(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()))
}, 1000))

if (trackingFeatureFlag) {
  // trackerCollection.trackers['PI'].startTracker()
  // trackerCollection.trackers['FF'].startTracker()
  // trackerCollection.trackers['ASC'].startTracker()
  trackingManager.trackingManager()
}
export default store
