(($) ->
  $.fn.timeslider = (options={}) ->
    field = @
    return false if @length > 1 or !@is("input") or !@attr('name')
    element = @after('<div id="timeslider_'+@.attr('name')+'" class="slider"></div>').next('div')

    #NOTE: N should be in [1,2,4,5,10,15,20,30,60] for sensible divisibility, but we only enforce semi-sanity
    N = options.minutes ? 5
    N = Math.round(Number(N))
    N = 1 if N is 0
    N = 60 if N >= 60

    stop = options.stop ? -> $(this).children('a').effect('highlight')

    slidefn = (event, ui) ->
      mins = N*ui.value
      hrs = mins/60 | 0
      mins %= 60
      field.val(('0'+hrs)[-2..]+':'+('0'+mins)[-2..])

    num_ticks = 24*(60/N) - 1
    element.data('maxticks', num_ticks)
    element.slider
      min   : 0
      max   : num_ticks
      value : (num_ticks+1)/2
      step  : 1
      slide : slidefn
      change: slidefn # => programatically changing slider value triggers slidefn
      stop  : stop # restriction fn from clocksliders
    
    # initialize from field value (which has to be a valid 24 hour format, : separated string) or noon if invalid
    parseInput = ->
      return if !/^(?:[0-1]\d|2[0-3]):[0-5]\d$/.test(field.val())
      val =  then field.val().split(':') #else [12,00]
      mins = val[1] | 0
      hrs = val[0] | 0

      # round min value down to nearest N (rounding fairly is annoying if time is close to 23:59)
      mins = N*(mins/N | 0)

      # convert it to ticks
      ticks = hrs*(60/N) + mins/N
      element.slider('value', ticks) # move slider
      slidefn(null,{value:ticks})    # move limit field (value might have been invalid)

    parseInput if @val() #otherwise leave the placeholder alone
    @change parseInput
    
    element.width(field.width()).offset
      left  : @offset().left
      top   : element.offset().top
    
    slide = (chng) ->
      -> element.slider('value', element.slider('value') + chng)
    
    @focus( -> element.show().children('a').effect('highlight') )
      .keydown('ctrl+left', slide(-1))
      .keydown('ctrl+right', slide(1))
      .keydown('ctrl+shift+right', slide(60/N))
      .keydown('ctrl+shift+left', slide(-60/N))
      .keydown('tab', -> element.hide())
      .keyup((e)-> parseInput() if 95 < e.keyCode < 106 || 47 < e.keyCode < 58) #only do it if it was a numeric input
      .focusout(->element.hide()) #counters below focusin
    element
      .focusin( ->element.show()) #counters above focusout
      .keydown('tab', -> element.hide())
      .focusout(->element.hide()) # fine, because if we go back to field, it shows again
      .hide() #if we hide it before offset set, things go weird
    
    element

)(jQuery)
