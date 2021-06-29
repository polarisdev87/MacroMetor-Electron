import { GET_GAME_DATA } from './constant'
import { GET2 } from '../../util/request'

function __get_game_data (data) {
  return {
    type: GET_GAME_DATA,
    payload: { ...data }
  }
}
export function get_game_data () {
  return (dispatch) => {
    return GET2('https://127.0.0.1:2999/liveclientdata/allgamedata').then((data) => {
      dispatch(__get_game_data(data))
      // we can fire off input tracking if the live data is coming back
    // eslint-disable-next-line node/handle-callback-err
    }).catch(err => {
      console.error('no response')
      // we can disable input tracking if the live data is not coming back anymore
    })
  }
}
