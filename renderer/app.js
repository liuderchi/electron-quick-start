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
  let newItemURL = $('#item-input').val()

  if (newItemURL) {

    console.log(newItemURL)

  }
})

$('#item-input').keyup((event) => {
  if (event.key === 'Enter') {
    $('#add-button').click()
  }
})
