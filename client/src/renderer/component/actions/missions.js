// gets reviews for user

import { GET_MISSIONS } from '../constants/missions'
import { constructRequestConfig, baseUrl } from './actionHelpers'
import axios from 'axios'

const url = `${baseUrl}/missions`

function _getMissions (data) {
  return {
    type: GET_MISSIONS,
    payload: data
  }
}
export function getMissions ({ userToken }) {
  return (dispatch) => {
    const config = constructRequestConfig('get', url, userToken)
    axios(config)
      .then(function (response) {
        dispatch(_getMissions(response.data))
      })
      .catch(function (error) {
        dispatch(_getMissions([]))
        console.error(error)
      })
  }
}

const actions = {
  getMissions
}

export default actions
