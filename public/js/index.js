var socket = io(), status = '';

$('#update-nav').click(function() {
  socket.emit('update nav', {
    dir: '/static'
  });
  $(this).text('pending');
});
socket.on('error', function(res) {
  $('#update-nav').text(res.status);
  console.log(res.message);
});
socket.on('nav items', function({navArr,status}) {
  for (item of navArr) {
    $('#global').append(`<a href="/${item}">${item}</a>`);
  }
  $('#update-nav').text(status);
});