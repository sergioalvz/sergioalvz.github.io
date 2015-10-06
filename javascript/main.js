$('[go-to]').click(function(event) {
  event.preventDefault();

  var target = $(this).attr('go-to');
  var $target = $(target);

  $('body').animate({ scrollTop: $target.offset().top }, 200);
});
