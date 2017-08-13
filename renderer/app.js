const { ipcRenderer } = require('electron')
const items = require('./items')

// add btn click handlers
$('.open-add-modal').click(() => {
  $('#add-modal').addClass('is-active')
})
$('.close-add-modal').click(() => {
  $('#add-modal').removeClass('is-active')
})

// add item submit handler
$('#add-button').click(() => {
  // Get URL from input
  const newItemURL = $('#item-input').val()

  if (newItemURL) {

    // Disable modal UI
    $('#item-input').prop('disabled', true)
    $('#add-button').addClass('is-loading')
    $('.close-add-modal').addClass('is-disabled')

    // Send URL to main process via IPC with channel: 'new-item'
    ipcRenderer.send('new-item', newItemURL)
  }
})

$('#item-input').keyup((event) => {
  if (event.key === 'Enter') {
    $('#add-button').click()
  }
})

// Listen for new item from main process
ipcRenderer.on('new-item-success', (event, item) => {

  // update toreadItems and save it to localStorage
  items.toreadItems.push(item)
  items.saveItems()

  items.addItem(item)

  // Close and reset modal
  $('#add-modal').removeClass('is-active')
  $('#item-input').prop('disabled', false).val('')
  $('#add-button').removeClass('is-loading')
  $('.close-add-modal').removeClass('is-disabled')
})

// when app starts, load toreadItems from localStorage to update UI
if (items.toreadItems.length) {
  items.toreadItems.forEach(items.addItem)
}
