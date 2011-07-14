(function($) {
  return $.fn.timeslider = function(options) {
    var N, element, field, num_ticks, parseInput, slide, slidefn, stop, _ref, _ref2;
    if (options == null) {
      options = {};
    }
    field = this;
    if (this.length > 1 || !this.is("input") || !this.attr('name')) {
      return false;
    }
    element = this.after('<div id="timeslider_' + this.attr('name') + '" class="slider"></div>').next('div');
    N = (_ref = options.minutes) != null ? _ref : 5;
    N = Math.round(Number(N));
    if (N === 0) {
      N = 1;
    }
    if (N >= 60) {
      N = 60;
    }
    stop = (_ref2 = options.stop) != null ? _ref2 : function() {
      return $(this).children('a').effect('highlight');
    };
    slidefn = function(event, ui) {
      var hrs, mins;
      mins = N * ui.value;
      hrs = mins / 60 | 0;
      mins %= 60;
      return field.val(('0' + hrs).slice(-2) + ':' + ('0' + mins).slice(-2));
    };
    num_ticks = 24 * (60 / N) - 1;
    element.data('maxticks', num_ticks);
    element.slider({
      min: 0,
      max: num_ticks,
      value: (num_ticks + 1) / 2,
      step: 1,
      slide: slidefn,
      change: slidefn,
      stop: stop
    });
    parseInput = function() {
      var hrs, mins, ticks, val;
      if (!/^(?:[0-1]\d|2[0-3]):[0-5]\d$/.test(field.val())) {
        return;
      }
      val = field.val().split(':');
      mins = val[1] | 0;
      hrs = val[0] | 0;
      mins = N * (mins / N | 0);
      ticks = hrs * (60 / N) + mins / N;
      element.slider('value', ticks);
      return slidefn(null, {
        value: ticks
      });
    };
    if (this.val()) {
      parseInput;
    }
    this.change(parseInput);
    element.width(field.width()).offset({
      left: this.offset().left,
      top: element.offset().top
    });
    slide = function(chng) {
      return function() {
        return element.slider('value', element.slider('value') + chng);
      };
    };
    this.focus(function() {
      return element.show().children('a').effect('highlight');
    }).keydown('ctrl+left', slide(-1)).keydown('ctrl+right', slide(1)).keydown('ctrl+shift+right', slide(60 / N)).keydown('ctrl+shift+left', slide(-60 / N)).keydown('tab', function() {
      return element.hide();
    }).keyup(function(e) {
      var _ref3, _ref4;
      if ((95 < (_ref3 = e.keyCode) && _ref3 < 106) || (47 < (_ref4 = e.keyCode) && _ref4 < 58)) {
        return parseInput();
      }
    }).focusout(function() {
      return element.hide();
    });
    element.focusin(function() {
      return element.show();
    }).keydown('tab', function() {
      return element.hide();
    }).focusout(function() {
      return element.hide();
    }).hide();
    return element;
  };
})(jQuery);
