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
			