$( '[go-to]' ).click(function() {
  var target = $(this).attr('go-to');
  var $target = $(target);

  $( 'html, body' ).animate({ scrollTop: $target.offset().top }, 200);
});
