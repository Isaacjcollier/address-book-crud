(function () {

  $('#delete').on('click', (event) => {
    const $deleteContactId = $(event.target).attr('data-id');
    event.preventDefault();
    console.log('sanity check');
    console.log('user id: ', $deleteContactId);
    $.ajax({
      type: 'DELETE',
      url: `http://localhost:3000/contacts/${$deleteContactId}/delete`
    })
    .done(location.reload())
  })
  
})();
