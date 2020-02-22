/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */
(function(doc, win) {
	var docEle = doc.documentElement;
	var resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
	var recalc = function() {
		var clientWidth = docEle.clientWidth;
		if(!clientWidth)
			return;
		if(clientWidth >= 750) {
			docEle.style.fontSize = '100px';
		} else {
			docEle.style.fontSize = 100 * (clientWidth / 750) + 'px';
		}
	};
	if(!doc.addEventListener)
		return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);