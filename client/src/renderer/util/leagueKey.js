import errors from './errors'

/* eslint-disable no-unused-vars */
const windowsMappingTable = {
  '<Unbound>': null,
  '': null,
  Back: 14,
  Tab: 15,
  Return: 28,
  CapsLock: 58,
  Esc: 1,
  Space: 57,
  PgUp: 3657,
  PgDn: 3665,
  End: 3663,
  Home: 3655,
  'Left Arrow': 57419,
  'Up Arrow': 57416,
  'Right Arrow': 57421,
  'Down Arrow': 57424,
  Insert: 3666,
  Del: 3667,
  0: 11,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
  7: 8,
  8: 9,
  9: 10,
  A: 30,
  B: 48,
  C: 46,
  D: 32,
  E: 18,
  F: 33,
  G: 34,
  H: 35,
  I: 23,
  J: 36,
  K: 37,
  L: 38,
  M: 50,
  N: 49,
  O: 24,
  P: 25,
  Q: 16,
  R: 19,
  S: 31,
  T: 20,
  U: 22,
  V: 47,
  W: 17,
  X: 45,
  Y: 21,
  Z: 44,
  a: 30,
  b: 48,
  c: 46,
  d: 32,
  e: 18,
  f: 33,
  g: 34,
  h: 35,
  i: 23,
  j: 36,
  k: 37,
  l: 38,
  m: 50,
  n: 49,
  o: 24,
  p: 25,
  q: 16,
  r: 19,
  s: 31,
  t: 20,
  u: 22,
  v: 47,
  w: 17,
  x: 45,
  y: 21,
  z: 44,
  Num0: 82,
  Num1: 79,
  Num2: 80,
  Num3: 81,
  Num4: 75,
  Num5: 76,
  Num6: 77,
  Num7: 71,
  Num8: 72,
  Num9: 73,
  '*': 55,
  'Num+': 78,
  'Num-': 74,
  'Num.': 83,
  'Num/': 3637,
  F1: 59,
  F2: 60,
  F3: 61,
  F4: 62,
  F5: 63,
  F6: 64,
  F7: 65,
  F8: 66,
  F9: 67,
  F10: 68,
  F11: 87,
  F12: 88,
  F13: 91,
  F14: 92,
  F15: 93,
  F16: 99,
  F17: 100,
  F18: 101,
  F19: 102,
  F20: 103,
  F21: 104,
  F22: 105,
  F23: 106,
  F24: 107,
  Semicolon: 39,
  '=': 13,
  Comma: 51,
  '-': 12,
  '.': 52,
  '/': 53,
  Backquote: 41,
  LB: 26,
  Backslash: 43,
  RB: 27,
  '\'': 40,
  Ctrl: 29,
  Alt: 56,
  Shift: 42
}
const windowsMappingTableMouse = {
  'Button 1': 1,
  'Button 2': 2,
  'Button 3': 3,
  'Button 4': 4,
  'Button 5': 5
}
/* Need to change [[] -> [LB], []] -> [RB], [,] -> [Comma] */
const preProcessor = (setting) => {
  // remove unbound
  return setting.replace(/\[\[\]/g, '[LB]').replace(/\[\]\]/g, '[RB]').replace(/\[,\]/g, '[Comma]')
}
const extractKeys = (settingString) => {
  /* [Alt][Button 2] -> [Alt, Button 2]  */
  const cleanString = preProcessor(settingString)
  const keys = []
  let i = 0
  let readMode = false
  const currentKey = []
  while (i < cleanString.length) {
    if (cleanString[i] === '[') {
      readMode = true
    } else if (readMode && cleanString[i] !== ']') {
      currentKey.push(cleanString[i])
    } else if (readMode && cleanString[i] === ']') {
      readMode = false
      keys.push(currentKey.join(''))
      currentKey.length = 0
    }
    i++
  }
  return keys
}
const getCAMS = (key) => {
  if (key.includes('Shift')) {
    return 'Shift'
  }
  if (key.includes('Alt')) {
    return 'Alt'
  }
  if (key.includes('Ctrl')) {
    return 'Ctrl'
  }
  if (key.includes('Meta')) {
    return 'Meta'
  }
  return ''
}
const processKey = (keyPresses) => {
  // get cams part
  if (!keyPresses || Number(keyPresses) === 1) {
    return { keycode: null }
  }
  let i = 0
  const cams = []
  const keys = []
  const extractedKeys = extractKeys(keyPresses)
  while (i < extractedKeys.length) {
    if (getCAMS(extractedKeys[i])) {
      cams.push(extractedKeys[i])
    } else {
      keys.push(extractedKeys[i])
    }
    i++
  }
  if (keys.length > 1) {
    throw errors.brokenAssumptionError(`Found more than one non-cams key/mouse press! ${keyPresses.join('---')}`, 'inside processKey (leagueKey.js)')
  }
  // make cams object settings
  const camsPressObj = cams.reduce(
    (prev, curr) => {
      prev[`${curr.toLowerCase()}Key`] = true
      return prev
    },
    {
      altKey: false,
      metaKey: false,
      ctrlKey: false,
      shiftKey: false
    })
  if (isMousePress(keys[0])) {
    return {
      ...camsPressObj,
      type: 8,
      button: windowsMappingTableMouse[keys[0]]
    }
  }
  return {
    ...camsPressObj,
    type: 4,
    keycode: windowsMappingTable[keys[0]]
  }
}
/* figures out if its a mouse or keypress */
const isMousePress = (key) => {
  return key && key.includes('Button')
}
/* return nulls for unbound and never bound states */
const postProcess = (keyEvent) => {
  const nullButton = keyEvent.button === null
  const nullKeycode = keyEvent.keycode === null
  if (nullKeycode || nullButton) {
    return null
  }
  return keyEvent
}
const isBoundPredicate = (key) => key !== '[<Unbound>]'
const leagueGameSettingsToEventsMapper = (leagueSetting) => {
  /* [Ctrl][l],[Ctrl][Return] -> [keyPressEventForCtrl&L, keyPressEventForCtrl&Enter] */
  let keyCombos = []
  const setting = preProcessor(leagueSetting.trim())
  const hasComma = setting.includes(',')
  // figure out how many ways the user can use the in game keys
  if (hasComma > 0 && !!setting.split(',')[1]) {
    // user has multiple bindings for the shortcut
    keyCombos = setting.split(',')
  } else {
    keyCombos = [setting]
  }
  return keyCombos
    .filter(isBoundPredicate)
    .map(key => processKey(key))
    .map(processedKey => postProcess(processedKey))
}

export default {
  leagueGameSettingsToEventsMapper
}
