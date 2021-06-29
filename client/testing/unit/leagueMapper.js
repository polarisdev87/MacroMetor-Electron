/* eslint-disable no-unused-vars */

const test1 = '[Ctrl][l],[Ctrl][Return]'
const expect1 = [{
  type: 4,
  altKey: false,
  ctrlKey: true,
  metaKey: false,
  shiftKey: false,
  keycode: 38
},
{
  type: 4,
  altKey: false,
  ctrlKey: true,
  metaKey: false,
  shiftKey: false,
  keycode: 38
}]
const test2 = '[f]'
const expect2 = [
  {
    type: 4,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    keycode: 33
  }]
// !!! WTF is test3 !!!
const test3 = '1'
const expect3 = '?'
const test4 = '[<Unbound>]'
const expect4 = [null]
const test5 = ''
const expect5 = [null]
const test6 = '[Ctrl][]],[Alt][,],[[]'
const test7 = '[Button 1],[Shift][Button 1]'
const test8 = '[Ctrl][f]'
// map all possible settings once?
console.log(leagueGameSettingsToEventsMapper(test3))
