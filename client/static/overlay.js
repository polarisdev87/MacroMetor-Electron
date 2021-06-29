const { ipcRenderer } = require('electron')
const $ = require('jquery')
let queue = []
// fade out welcome to macro mentor
$(setTimeout(() => {
  $('#currentMessage').fadeOut(5000)
}, 3000))
// check for messages
setInterval(() => {
  ipcRenderer.send('CHECK')
}, 3000)

ipcRenderer.on('RECV', (x, y) => {
  // fade out
  queue = [...queue, ...y]
})
setInterval(() => {
  console.log(queue)
  if (queue.length > 0) {
    $('#currentMessage').text(queue[0])
    $('#currentMessage').fadeIn(2000)
    $('#currentMessage').fadeOut(2000)
    queue = queue.slice(1)
  }
}, 3000)
