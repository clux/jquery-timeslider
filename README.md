#About
**jQuery timeslider** is a plug-in that lets you bind a slider element to an input element for easy timeselection. 


#Features
 * ctrl-left/right & ctrl-left/right to move minute/hour steps from the field
 * Fades away after use
 * Parses keyboard input to move the slider
 * Doesn't break keyboard navigation unlike other [popular](https://github.com/trentrichardson/jQuery-Timepicker-Addon) / 
 * [less popular](http://plugins.jquery.com/plugin-tags/time-picker) alternatives.
 * Uses jquery-ui theming - no extra css elements<
 * on focusout: slider element disabled and opacity zeroed

#Options
 * minutes : minimum minute step
 * stop    : slider's stop function

#Compatibility
Tested in latest webkit, firefox and opera. IE testing scheduled.

#Dependencies
 * jquery
 * jquery-ui
 * [jquery-hotkeys](https://github.com/jeresig/jquery.hotkeys)

Note that this can probably be rewritten without the hotkeys dependencies easily, but it is only a 3kb (unminified) addon - that is actually very useful.
It's worth adding.

#Usage
$('#inputfield').timeslider()
$('#inputfield').timeslider(options)

Note that options.minutes variants work best when it is a number that divides 60 i.e. n in [1,2,4,5,6,10,15,20,30]
