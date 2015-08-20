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
				