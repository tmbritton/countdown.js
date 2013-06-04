(function( $, undefined ) {
  $.fn.dtCountDown = function(options) {
    var currentdate = Date.parse(new Date());
    var expiration = Date.parse(options.date);
    var selector = $(this);

    $(this).css('display', 'none');

    var _init = {
      
      savedHTML: function(selector) {
        return $(selector).html();
      },

      getNumbers: function(expiration, selector) {
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
        this.displayNumbers(output, selector);
      },

      displayNumbers: function(numbers, selector) {
        var replace = '<div id="countdowntime"><span id="days">Days: ' + numbers.days + ', </span><span id="hours">Hours: ' + numbers.hours + ', </span><span id="minutes">Minutes: ' + numbers.minutes + ', </span><span id="seconds">Seconds: ' + numbers.seconds + '</span></div>'; 
        selector.html(replace);
        if(selector.css('display') === 'none') {
          selector.css('display', 'block');
        }
      },

      displayVideo: function() {
        var uagent = navigator.userAgent.toLowerCase();
        if (DetectSmartphone() || DetectTierTablet()) {
            var mobile = {};
            mobile.site = "cvip.smhcdn.com";
            mobile.account = "10352-live";
            mobile.media = "livestream";
            mobile.autoplay = "true";
            mobile.mimetype = "video/mp4";
            mobile.width = "640";
            mobile.target = "flashcontent";
            mobile.maxwidth = "525";
            bootStrap(mobile);
        } else {
            var flashvars = {
                account: "10352-live",
                media: "livestream",
                autoplay: "true"
            };
            var params = {};
            params.quality = "high";
            params.bgcolor = "#000000";
            params.allowscriptaccess = "sameDomain";
            params.allowfullscreen = "true";
            var attributes = {};
            attributes.id = "Player";
            attributes.name = "Player";
            attributes.align = "middle";
            swfobject.embedSWF("http://cdn.streamingmediahosting.com/assets/flash/smh.baseplayer.client/player.swf", "flashcontent", "640", "525", "10.1.0", false, flashvars, params, attributes);
        }
      },
    };

    if(currentdate > expiration) {
      $(selector).css('display', 'block');
      _init.displayVideo();
      return false;
    } else {
      var savedHTML = _init.savedHTML(selector);
      var refreshIntervalId = window.setInterval(function() {
        var currentdate = Date.parse(new Date());
        var expiration = Date.parse(options.date);
        if(currentdate < expiration) {
          _init.getNumbers(expiration, selector);
        } else {
          if (selector.html() !== savedHTML) {
            selector.html(savedHTML);
            _init.displayVideo();
            clearInterval(refreshIntervalId);
          }
        }
      }, 1000, selector, expiration, savedHTML, currentdate, options);
    }  
  };
})( jQuery );