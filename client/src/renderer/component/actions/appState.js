import { SET_APP_STATE } from '../constants/appState'
import { baseUrl, constructRequestConfig } from './actionHelpers'
import axios from 'axios'

const url = `${baseUrl}/auth/token`
const setAppState = ({ token, path, email, gameUserName, region, code, discord, page, showEntryForm, showSetupForm, currentGameData, violations }) => ({
  type: SET_APP_STATE,
  email,
  gameUserName,
  region,
  token,
  path,
  page,
  code,
  discord,
  showEntryForm,
  currentGameData,
  violations,
  showSetupForm
})
const postAppState = ({ email, gameUserName, region, code, discord, path }) => async (dispatch) => {
  const payload = {
    email,
    gameUserName,
    region,
    code,
    discord
  }
  const postConfig = constructRequestConfig('post', url, null, payload)
  try {
    const { data } = await axios(postConfig)
    dispatch(setAppState({ token: data.token, gameUserName, email, region, discord, path, showSetupForm: false }))
  } catch (error) {
    console.error(error)
  }
}

const actions = {
  setAppState,
  postAppState
}
export default actions
