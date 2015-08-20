/*
 * jQuery spritely - Sprite up the web!
 * http://spritely.net/
 *
 * Latest version:
 * http://spritely.net/download/
 *
 * Copyright 2010, Peter Chater, Artlogic Media Ltd, http://www.artlogic.net/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function($) {
	$._spritely = {
		// shared methods and variables used by spritely plugin
		animate: function(options) {
			var el = $(options.el);
			var el_id = el.attr('id');
			if (!$._spritely.instances) {
				$._spritely.instances = {};
			}
			if (!$._spritely.instances[el_id]) {
				$._spritely.instances[el_id] = {current_frame: -1};
			}
			var instance = $._spritely.instances[el_id];
			if (options.type == 'sprite') {
				var frames;
				var animate = function(el) {
					var w = options.width, h = options.height;
					if (!frames) {
						frames = [];
						total = 0
						for (var i = 0; i < options.no_of_frames; i ++) {
							frames[frames.length] = (0 - total);
							total += w;
						}
					}
					if ($._spritely.instances[el_id]['current_frame'] >= frames.length - 1) {
						$._spritely.instances[el_id]['current_frame'] = 0;
					} else {
						$._spritely.instances[el_id]['current_frame'] = $._spritely.instances[el_id]['current_frame'] + 1;
					}
					el.css('background-position', frames[$._spritely.instances[el_id]['current_frame']] + 'px 0');
					if (options.bounce && options.bounce[0] > 0 && options.bounce[1] > 0) {
						var ud = options.bounce[0]; // up-down
						var lr = options.bounce[1]; // left-right
						var ms = options.bounce[2]; // milliseconds
						el
							.animate({top: '+=' + ud + 'px', left: '-=' + lr + 'px'}, ms)
							.animate({top: '-=' + ud + 'px', left: '+=' + lr + 'px'}, ms);
					}
				}
				animate(el);
			} else if (options.type == 'pan') {
				if (options.dir == 'left') { 
					$._spritely.instances[el_id]['l'] = ($._spritely.instances[el_id]['l'] - (options.speed || 1)) || 0;
				} else {
					$._spritely.instances[el_id]['l'] = ($._spritely.instances[el_id]['l'] + (options.speed || 1)) || 0;
				}
				if ($.browser.msie) {
				    // fixme - the background-position property does not work
				    // corretly in IE so we have to hack it here... Not ideal
				    // especially as $.browser is depricated
				    var bp_top = $(el).css('background-position-y') || '0';
				    $(el).css('background-position', $._spritely.instances[el_id]['l'] + 'px ' + bp_top);
				} else {
				    var bp_top = ($(el).css('background-position').split(' ') || ' ')[1];
				    $(el).css('background-position', $._spritely.instances[el_id]['l'] + 'px ' + bp_top);
				}
			}	
		},
		randomIntBetween: function(lower, higher) {
			return parseInt(rand_no = Math.floor((higher - (lower - 1)) * Math.random()) + lower);
		}
	};
	$.fn.extend({
		spritely: function(options) {
			var options = $.extend({
				type: 'sprite',
				do_once: false,
				width: null,
				height: null,
				fps: 12,
				no_of_frames: 2
			}, options || {});
			options.el = this;
			options.width = options.width || $(this).width() || 100;
			options.height = options.height || $(this).height() || 100;
			var get_rate = function() {
                return parseInt(1000 / options.fps);
            }
            if (!options.do_once) {
				window.setInterval(function() {
					$._spritely.animate(options);
				}, get_rate(options.fps));
			} else {
				$._spritely.animate(options);
			}
			