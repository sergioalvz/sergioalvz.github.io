$( '[go-to]' ).click(function(event) {
  event.preventDefault();

  var target = $(this).attr('go-to');
  var $target = $(target);

  $( 'html, body' ).animate({ scrollTop: $target.offset().top }, 200);
});

function changeAdjective() {
  var adjectives = [ 'fast', 'effective', 'consistent', 'responsive', 'friendly', 'maintainable' ];
  var index = 0;

  return function() {
    if(index > adjectives.length - 1) {
      index = 0;
    }

    var adjective = adjectives[index];
    $( '.js-rolling-word' ).text(adjective);

    index++;
  };
}

setInterval(changeAdjective(), 5000);
