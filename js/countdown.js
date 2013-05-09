(function( $, undefined ) {
  $.fn.dtCountDown = function(options) {
    
    var currentdate = Date.parse(new Date());
    var expiration = Date.parse(options.date);

    if(currentdate > expiration) {
      return false;
    }

    var _init = function(selector, date, expiration) {
      
      var savedHTML = $(selector).html(); 

      var getNumbers = function(expiration) {
        var currentdate = Date.parse(new Date());
        var diff = expiration - currentdate;

        var remainders = {
          days: Math.floor( diff / (1000*60*60*24) ),
          hours: Math.floor( diff /  (1000*60*60) ),
          mins: Math.floor( diff / (1000*60) ),
          secs: Math.floor( diff / 1000 ),
        };

        var output = {
          days: remainders.days,
          hours: remainders.hours - remainders.days * 24,
          minutes: remainders.mins - remainders.hours * 60,
          seconds: remainders.secs - remainders.mins  * 60,
        };
        return output;
      }

      window.setInterval(function() {
        console.log(getNumbers(expiration));
        //console.log(savedHTML);
      }, 1000, selector, expiration, savedHTML);
    };

    _init($(this), currentdate, expiration);

  };
})( jQuery );