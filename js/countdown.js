(function( $, undefined ) {
  $.fn.dtCountDown = function(options) {
    
    var currentdate = Date.parse(new Date());
    var expiration = Date.parse(options.date);

    if(currentdate > expiration) {
      return false;
    }
    $(this).css('display', 'none');

    var _init = function(selector, date, expiration) {
      
      var savedHTML = $(selector).html(); 

      var getNumbers = function(expiration, selector) {
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
        displayNumbers(output, selector);
      }

      var displayNumbers = function(numbers, selector) {
        var replace = '<span id="days">Days: ' + numbers.days + ', </span><span id="hours">Hours: ' + numbers.hours + ', </span><span id="minutes">Minutes: ' + numbers.minutes + ', </span><span id="seconds">Seconds: ' + numbers.seconds + '</span>'; 
        selector.html(replace);
        if(selector.css('display') === 'none') {
          selector.css('display', 'block');
        }
      };

      window.setInterval(function() {
        var currentdate = Date.parse(new Date());
        var expiration = Date.parse(options.date);
        if(currentdate < expiration) {
          getNumbers(expiration, selector);
        } else {
          if (selector.html() !== savedHTML) {
            selector.html(savedHTML);
          }
        }
      }, 1000, selector, expiration, savedHTML, currentdate, options);
    };

    _init($(this), currentdate, expiration);

  };
})( jQuery );