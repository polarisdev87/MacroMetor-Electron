import { EventEmitter } from 'events'

const inputEmitter = new EventEmitter()
const playerInputEventHandler = (e) => {
  // ignore mouse move events to reduce file size
  if (e.type !== 8 && e.type !== 4) {
    return
  }
  inputEmitter.emit('playerInput', {
    eventData: e,
    timeStamp: new Date().getTime()
  })
}

export default {
  inputEmitter,
  playerInputEventHandler
}
