const loadLocalStorage = (stateSlice) => {
  try {
    return JSON.parse(localStorage.getItem('state'))[stateSlice]
  } catch (e) {
    return null
  }
}

export default loadLocalStorage
