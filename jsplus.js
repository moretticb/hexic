//////////////////////////////////////////////////////////////////////////////
//
//         jsplus.js - JS Plus Javascript Library
//  Copyright (c) 2013 Caio Benatti Moretti <caiodba@gmail.com>
//                 http://www.moretticb.com/jsplus
//
//  Last update: 17 October 2018
//
//  This is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program. If not, see <http://www.gnu.org/licenses/>.
//
//////////////////////////////////////////////////////////////////////////////


//VERIFICACOES

//FLASH PLAYER INSTALL VERIFICATION
/*
 *
 * @variable canRunSWF
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Variable that indicates whether or not SWF animations can be run into the browser. The underlying algorithm was taken from {http://forums.adobe.com/thread/61023 Adobe Forum}.
 *
 */
var canRunSWF;

var MM_contentVersion = 8;
var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
if (plugin) {
		var words = navigator.plugins["Shockwave Flash"].description.split(" ");
		for (var i = 0; i < words.length; ++i){
			if (isNaN(parseInt(words[i])))
				continue;
			var MM_PluginVersion = words[i]; 
		}
	var MM_FlashCanPlay = MM_PluginVersion >= MM_contentVersion;
}
else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.appVersion.indexOf("Win") != -1)) {
	document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n'); //FS hide this from IE4.5 Mac by splitting the tag
	document.write('on error resume next \n');
	document.write('MM_FlashCanPlay = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & MM_contentVersion)))\n');
	document.write('</SCR' + 'IPT\> \n');
}
canRunSWF = MM_FlashCanPlay;
//FIM VERIFICAÇÃO SE FLASH PLAYER INSTALL VERIFICATION

//FIM DE VERIFICACOES


var DEFAULT_FPS = 30;

/*
 *
 * @variable FPS
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Variable that stores the current FPS rate, used in {lib://cls/Tween Tween} and {lib://cls/Spriter Spriter} features.
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/Spriter Spriter}
 *
 */
var fps=DEFAULT_FPS;


/*
 *
 * @class None
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Tweening behavior class used in {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween} classes. This class has only static methods.
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
function None(){}
/*
 *
 * @method easeNone
 * @parent None
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Linear easing tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('None'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", None.prototype.easeNone, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
None.prototype.easeNone = function (t, b, c, d) {
	return c*t/d + b;
}


/*
 *
 * @class Back
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Tweening behavior class used in {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween} classes. This class has only static methods.
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
function Back(){}
/*
 *
 * @method easeIn
 * @parent Back
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Back easeIn tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Back'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Back.prototype.easeIn, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Back.prototype.easeIn = function (t, b, c, d, s){
	if (s == undefined) s = 1.70158;
	return c*(t/=d)*t*((s+1)*t - s) + b;
}
/*
 *
 * @method easeOut
 * @parent Back
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Back easeOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Back'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Back.prototype.easeOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Back.prototype.easeOut = function (t, b, c, d, s){
	if (s == undefined) s = 1.70158;
	return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
}

/*
 *
 * @method easeInOut
 * @parent Back
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Back easeInOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Back'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Back.prototype.easeInOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Back.prototype.easeInOut = function (t, b, c, d, s){
	if (s == undefined) s = 1.70158; 
	if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
	return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
}

/*
 *
 * @class Elastic
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Tweening behavior class used in {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween} classes. This class has only static methods.
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
function Elastic(){}
/*
 *
 * @method easeIn
 * @parent Elastic
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Elastic easeIn tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Elastic'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Elastic.prototype.easeIn, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Elastic.prototype.easeIn = function (t, b, c, d, a, p){
	if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
	if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
	else var s = p/(2*Math.PI) * Math.asin (c/a);
	return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
}

/*
 *
 * @method easeOut
 * @parent Elastic
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Elastic easeOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Elastic'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Elastic.prototype.easeOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Elastic.prototype.easeOut = function (t, b, c, d, a, p){
	if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
	if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
	else var s = p/(2*Math.PI) * Math.asin (c/a);
	return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
}

/*
 *
 * @method easeInOut
 * @parent Elastic
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Elastic easeInOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Elastic'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Elastic.prototype.easeInOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Elastic.prototype.easeInOut = function (t, b, c, d, a, p){
	if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
	if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
	else var s = p/(2*Math.PI) * Math.asin (c/a);
	if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
}

/*
 *
 * @class Quad
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Tweening behavior class used in {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween} classes. This class has only static methods.
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
function Quad(){}
/*
 *
 * @method easeIn
 * @parent Quad
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Quadratic easeIn tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Quad'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Quad.prototype.easeIn, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Quad.prototype.easeIn = function (t, b, c, d) {
	t /= d;
	return c*t*t + b;
}
/*
 *
 * @method easeOut
 * @parent Quad
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Quadratic easeOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Quad'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Quad.prototype.easeOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Quad.prototype.easeOut = function (t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
}
/*
 *
 * @method easeInOut
 * @parent Quad
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Quadratic easeInOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Quad'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Quad.prototype.easeInOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Quad.prototype.easeInOut = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
}

/*
 *
 * @class Cubic
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Tweening behavior class used in {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween} classes. This class has only static methods.
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
function Cubic(){}
/*
 *
 * @method easeIn
 * @parent Cubic
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Cubic easeIn tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Cubic'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Cubic.prototype.easeIn, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Cubic.prototype.easeIn = function (t, b, c, d) {
	t /= d;
	return c*t*t*t + b;
}
/*
 *
 * @method easeOut
 * @parent Cubic
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Cubic easeOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Cubic'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Cubic.prototype.easeOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Cubic.prototype.easeOut = function (t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t + 1) + b;
}
/*
 *
 * @method easeInOut
 * @parent Cubic
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Cubic easeInOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Cubic'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Cubic.prototype.easeInOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Cubic.prototype.easeInOut = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
}

/*
 *
 * @class Quartic
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Tweening behavior class used in {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween} classes. This class has only static methods.
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
function Quartic(){}
/*
 *
 * @method easeIn
 * @parent Quartic
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Quartic easeIn tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Quartic'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Quartic.prototype.easeIn, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Quartic.prototype.easeIn = function (t, b, c, d) {
	t /= d;
	return c*t*t*t*t + b;
}
/*
 *
 * @method easeOut
 * @parent Quartic
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Quartic easeOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Quartic'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Quartic.prototype.easeOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Quartic.prototype.easeOut = function (t, b, c, d) {
	t /= d;
	t--;
	return -c * (t*t*t*t - 1) + b;
}
/*
 *
 * @method easeInOut
 * @parent Quartic
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Quartic easeInOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Quartic'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Quartic.prototype.easeInOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Quartic.prototype.easeInOut = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t + b;
	t -= 2;
	return -c/2 * (t*t*t*t - 2) + b;
}

/*
 *
 * @class Quintic
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Tweening behavior class used in {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween} classes. This class has only static methods.
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
function Quintic(){}
/*
 *
 * @method easeIn
 * @parent Quintic
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Quintic easeIn tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Quintic'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Quintic.prototype.easeIn, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Quintic.prototype.easeIn = function (t, b, c, d) {
	t /= d;
	return c*t*t*t*t*t + b;
}
/*
 *
 * @method easeOut
 * @parent Quintic
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Quintic easeOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Quintic'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Quintic.prototype.easeOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Quintic.prototype.easeOut = function (t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t*t*t + 1) + b;
}
/*
 *
 * @method easeInOut
 * @parent Quintic
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Quintic easeInOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Quintic'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Quintic.prototype.easeInOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Quintic.prototype.easeInOut = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t*t*t + 2) + b;
}


/*
 *
 * @class Sine
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Tweening behavior class used in {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween} classes. This class has only static methods.
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
function Sine(){}
/*
 *
 * @method easeIn
 * @parent Sine
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Sine easeIn tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Sine'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Sine.prototype.easeIn, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Sine.prototype.easeIn = function InSine (t, b, c, d) {
	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
}
/*
 *
 * @method easeOut
 * @parent Sine
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Sine easeOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Sine'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Sine.prototype.easeOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Sine.prototype.easeOut = function OutSine (t, b, c, d) {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
}
/*
 *
 * @method easeInOut
 * @parent Sine
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Sine easeInOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Sine'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Sine.prototype.easeInOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Expo Expo}, {lib://cls/Circ Circ}
 *
 */
Sine.prototype.easeInOut = function InOutSine (t, b, c, d) {
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}

/*
 *
 * @class Expo
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Tweening behavior class used in {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween} classes. This class has only static methods.
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Circ Circ}
 *
 */
function Expo(){}
/*
 *
 * @method easeIn
 * @parent Expo
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Exponential easeIn tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Expo'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Expo.prototype.easeIn, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Circ Circ}
 *
 */
Expo.prototype.easeIn = function (t, b, c, d) {
	return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
}
/*
 *
 * @method easeOut
 * @parent Expo
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Exponential easeOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Expo'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Expo.prototype.easeOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Circ Circ}
 *
 */
Expo.prototype.easeOut = function (t, b, c, d) {
	return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
}
/*
 *
 * @method easeInOut
 * @parent Expo
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Exponential easeInOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Expo'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Expo.prototype.easeInOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Circ Circ}
 *
 */
Expo.prototype.easeInOut = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
	t--;
	return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
}


/*
 *
 * @class Circ
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Tweening behavior class used in {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween} classes. This class has only static methods.
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}
 *
 */
function Circ(){}
/*
 *
 * @method easeIn
 * @parent Circ
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Circ easeIn tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Circ'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Circ.prototype.easeIn, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}
 *
 */
Circ.prototype.easeIn = function (t, b, c, d) {
	t /= d;
	return -c * (Math.sqrt(1 - t*t) - 1) + b;
}
/*
 *
 * @method easeOut
 * @parent Circ
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Circ easeOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Circ'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Circ.prototype.easeOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}
 *
 */
Circ.prototype.easeOut = function (t, b, c, d) {
	t /= d;
	t--;
	return c * Math.sqrt(1 - t*t) + b;
}
/*
 *
 * @method easeInOut
 * @parent Circ
 * @since 1.0
 * @return Number
 * @returnDesc A number used by {lib://cls/Tween Tween} and {lib://cls/AdvTween AdvTween}.
 * @description Circ easeInOut tweening behavior. This is one of {http://www.robertpenner.com/easing Robert penner}'s easing functions. <script>document.write(window.location.toString().indexOf("mtd")>-1?getBehaviorGraph('Circ'):"(See graph)")</script>.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
new Tween("elemId", "width", Circ.prototype.easeInOut, 100, 200, 10, false);
 * @see {lib://cls/Tween Tween}, {lib://cls/AdvTween AdvTween}, {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo}
 *
 */
Circ.prototype.easeInOut = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	t -= 2;
	return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
}

/*
 *
 * @function $
 * @since 1.0
 * @return Object
 * @returnDesc A DOM Object
 * @description An alias for document.getElementById(id).
 * @param id:String The DOM element ID.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
var comparison = $('objId') == document.getElementById('objId'); //true
 *
 */
function $(objId){
	return document.getElementById(objId);
}


/*
 *
 * @function getFPS
 * @since 1.0
 * @return Number
 * @returnDesc The current FPS rate
 * @description Gets the current value set to {lib://var/FPS FPS} variable.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
alert(getFPS()); //If FPS variable has not been set yet, it should display 30
 * @see {lib://var/FPS FPS}, {lib://fun/setFPS setFPS}
 *
 */
function getFPS(){
	return fps;
}

/*
 *
 * @function setFPS
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description Set a new value to {lib://var/FPS FPS} variable.
 * @param newFPS:Number The new FPS rate to be set. See {lib://var/FPS FPS variable} for more information.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
setFPS(40); //setting the fps to 40
alert(getFPS()); //It should display 40
 * @see {lib://var/FPS FPS}, {lib://fun/getFPS getFPS}, {lib://fun/resetFPS resetFPS}
 *
 */
function setFPS(theFps){
	fps=theFps;
}

/*
 *
 * @function resetFPS
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description Sets {lib://var/FPS FPS} variable to its default value (30).
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
setFPS(40);
alert(getFPS()); //Displays 40
resetFPS();
alert(getFPS()); //Displays 30
 * @see {lib://var/FPS FPS}, {lib://fun/getFPS getFPS}, {lib://fun/setFPS setFPS}
 *
 */
function resetFPS(){
	fps = DEFAULT_FPS;
}

/*
 *
 * @function f2m
 * @since 1.0
 * @return Number
 * @returnDesc Frames duration in milliseconds
 * @description Converts frames at a FPS rate to milliseconds.
 * @param fps:Number A FPS rate
 * @param frames:Number The number of frames
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
resetFPS();
alert(f2m(getFPS(), 3)); //Displays 100
 * @see {lib://fun/m2f m2f}, {lib://fun/resetFPS resetFPS}
 *
 */
function f2m(fps, frames){
	if(frames) return frames*(1000/fps);
	else return 1000/fps;
}

/*
 *
 * @function m2f
 * @since 1.0
 * @return Number
 * @returnDesc Number of frames duration
 * @description Converts milliseconds to a numbers of frames, from a FPS rate.
 * @param fps:Number A FPS rate
 * @param milli:Number The millisseconds duration
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
resetFPS();
alert(m2f(getFPS(), 100)); //Displays 3
 * @see {lib://fun/m2f f2m}, {lib://fun/resetFPS resetFPS}
 *
 */
function m2f(fps, milli){
	return milli/f2m(fps);
}

/*
 *
 * @function dec2hex
 * @since 1.0
 * @return String
 * @returnDesc A hexadecimal string
 * @description Converts a number from base 10 to base 16.
 * @param num:Number The base 10 number
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
alert(dec2hex(255)); //Displays FF
 * @see {lib://fun/hex2dec hex2dec}
 *
 */
function dec2hex(num){
	num.toString(16);
	/*var termos = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
	var out = "";
	do{
		var q = parseInt(num/16, 10);
		var r = num%16;
		num=q;
		out=termos[r]+out;
	} while(q);
	return out;*/
}

/*
 *
 * @function hex2dec
 * @since 1.0
 * @return Number
 * @returnDesc A decimal number
 * @description Converts a number from base 16 to base 10.
 * @param num:String The base 16 number
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
alert(hex2dec("FF")); //Displays 255
 * @see {lib://fun/hex2dec dec2hex}
 *
 */
function hex2dec(num){
	return parseInt(num, 16);
}

function fixHex(hex){
	var rd = 6-(hex.length-1);
	for(var i=0;i<rd;i++){
		hex = hex.charAt(0)+"0"+hex.substr(1);
	}
	return hex;
}

/*
 *
 * @class Tween
 * @since 1.0
 * @description An interpolation feature used to animate visual elements from a CSS property. For simultaneous tweenings of more than one CSS property, create several Tween instances, respectively related to each CSS property.
 * @param DOMObjId:String The DOM Element id
 * @param style:String The CSS property to be tweened
 * @param easeType:Function The tween behavior function. {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo} and {lib://cls/Circ Circ} are examples of the available behaviors.
 * @param initValue:Number Initial value
 * @param finalValue:Number Final value
 * @param duration:Number The duration of the tween in frames
 * @param useSeconds:Boolean If true, duration is considered as seconds. Otherwise, duration is considered as frames
 * @param xtraProp:Object CSS properties to be set before the tweening starts
 * @compat ie,ff,chr,saf,op
 * @exFiles tweenEx1.html
 * @exampleCode 
new Tween("userPicture", "width", Quad.prototype.easeInOut, 100, 200, 10, false, {visibility: 'visible'}); //Object's width tweening that lasts 10 frames
new Tween("userPicture", "opacity", Quad.prototype.easeInOut, 0, 1, f2m(getFPS(), 10)/1000, true); //Object's opacity tweening that lasts the equivalent of 10 frames in seconds
 * @see {lib://cls/AdvTween AdvTween}
 *
 */
function Tween(DOMObjId, style, easeType, initValue, finalValue, duration, useSeconds, xtraProp){
	var obj = $(DOMObjId);
	if(xtraProp){
		for(var i in xtraProp){
			obj.style[i] = xtraProp[i];
		}
	}
	
	if(style.toLowerCase().indexOf("color")>=0 && initValue.charAt(0)=="#" && finalValue.charAt(0)=="#"){
		initValue = parseInt(initValue.substr(1), 16);
		finalValue = parseInt(finalValue.substr(1), 16);
	}
	
	if(useSeconds) var dur = m2f(getFPS(), duration*1000);
	else var dur = duration;
	if(initValue>finalValue){
		var negnum=true;
		var temp = initValue;
		initValue=finalValue;
		finalValue=temp;
	} else var negnum=false;
	var theSc = this;
	
	if(obj["s_"+style]){
		obj["s_"+style].brk();
	}
	obj["s_"+style]=this;
	this.tO=window.setTimeout(function(){
		theSc.animate(obj, style, easeType, 0, initValue, finalValue-initValue, dur, f2m(getFPS(), 1), theSc, negnum);
	}, 1);
}

Tween.prototype.isStopped=0;

/*
 *
 * @event onMotionFinished
 * @parent Tween
 * @since 1.0
 * @return Void
 * @description Event triggered when tweening is finished.
 * @compat ie,ff,chr,saf,op
 * @exFiles tweenOMFEx1.html
 * @exampleCode 
var t = new Tween("logo", "width", Quad.prototype.easeInOut, 100, 200, 10, false);
t.onMotionFinished = function(){
	new Tween("logo", "width", Quad.prototype.easeInOut, 200, 100, 10, false);
}
 * @see {lib://cls/AdvTween AdvTween}
 *
 */
Tween.prototype.onMotionFinished;

Tween.prototype.animate = function(o, p, e, ct, vi, vf, d, de, sc, iN){
	var pref, suf;
	
	var valor = e(ct, vi, vf, d);
	if(iN){
		valor = vf+vi+vi-valor;
	}
	
	if(p.toLowerCase().indexOf("opacity")>=0 || p=="filter" || p=="alpha"){
		if(navigator.appName.toLowerCase().indexOf("microsoft")>=0){
			p="filter";
			pref="alpha(opacity=";
			suf=")";
			valor *=100;
		} else {
			pref="";
			suf="";
		}
	} else if(p.toLowerCase().indexOf("color")>=0){
		pref="";
		suf="";
		valor = fixHex("#"+dec2hex(parseInt(valor, 10)));
	} else {
		suf="px";
		pref="";
	}
	
	o.style[p] = pref+valor+suf;
	if(ct<d && !sc.isStopped){
		sc.tO=window.setTimeout(function(){
			sc.animate(o, p, e, ct+1, vi, vf, d, de, sc, iN);
		}, de);
	} else if ((!sc.isStopped || sc.isStopped==2) && sc.onMotionFinished){
		sc.onMotionFinished();
		o["s_"+p]=null;
	} else {
		o["s_"+p]=null;
	}
}

/*
 *
 * @method stop
 * @parent Tween
 * @since 1.0
 * @return Void
 * @description Stops the tweening.
 * @param callOMFF:Boolean Determines whether or not the {lib://evt/Tween/onMotionFinished onMotionFinished} event is triggered after stopping the tweening.
 * @compat ie,ff,chr,saf,op
 * @exFiles tweenStopEx1.html
 * @exampleCode 
window.onload = function(){
	var t = new Tween("logo", "width", Quad.prototype.easeInOut, 100, 200, 100, false);
	
	$('btn').onclick = function(){
		t.stop();
	}
}
 * @see {lib://mtd/Tween/brk brk}, {lib://cls/AdvTween AdvTween}
 *
 */
Tween.prototype.stop = function (callOMFF){
	if(callOMFF){
		this.isStopped = 2;
	} else {
		this.isStopped = 1;
	}
}


/*
 *
 * @method brk
 * @parent Tween
 * @since 1.0
 * @return Void
 * @description A more abrupt way to interrupt the tweening. In order to detect whether or not the tweening has been stopped when {lib://evt/Tween/onMotionFinished onMotionFinished} is triggered, {lib://mtd/Tween/stop stop} is more recommended.
 * @param callOMFF:Boolean Determines whether or not the {lib://evt/Tween/onMotionFinished onMotionFinished} event is triggered after breaking the tweening.
 * @compat ie,ff,chr,saf,op
 * @exFiles tweenBrkEx1.html
 * @exampleCode 
window.onload = function(){
	var t = new Tween("logo", "width", Quad.prototype.easeInOut, 100, 200, 100, false);
	
	$('btn').onclick = function(){
		t.brk();
	}
}
 * @see @see {lib://mtd/Tween/stop stop}, {lib://cls/AdvTween AdvTween}
 *
 */
Tween.prototype.brk = function(callOMFF){
	clearTimeout(this.tO);
	if(callOMFF && this.onMotionFinished){
		this.onMotionFinished();
	}
}


/*
 *
 * @class AdvTween
 * @since 1.0
 * @description A {lib://cls/Tween Tween based} feature used to interpolate a value that can be used to animate one or more elements.
 * @param easeType:Function The tween behavior function. {lib://cls/None None}, {lib://cls/Back Back}, {lib://cls/Elastic Elastic}, {lib://cls/Quad Quad}, {lib://cls/Cubic Cubic}, {lib://cls/Quartic Quartic}, {lib://cls/Quintic Quintic}, {lib://cls/Sine Sine}, {lib://cls/Expo Expo} and {lib://cls/Circ Circ} are examples of the available behaviors.
 * @param initValue:Number Initial value
 * @param finalValue:Number Final value
 * @param duration:Number The duration of the tween in frames
 * @param useSeconds:Boolean If true, duration is considered as seconds. Otherwise, duration is considered as frames
 * @param theFunction:Function The function to be executed every since the value changes. The current state of the interpolated value can be retrieved by the first parameter of this function.
 * @compat ie,ff,chr,saf,op
 * @exFiles advTweenEx1.html,advTweenEx2.html
 * @exampleCode 
new AdvTween(Quad.prototype.easeInOut, 100, 200, 10, false, function(value){
	$('objA').width = value+"px";
	$('objB').width = value+"px";
});
 * @see {lib://cls/AdvTween AdvTween}
 *
 */
function AdvTween(easeType, initValue, finalValue, duration, useSeconds, theFunction){
	if(useSeconds) var dur = m2f(getFPS(), duration*1000);
	else var dur = duration;
	if(initValue>finalValue){
		var negnum=true;
		var temp = initValue;
		initValue=finalValue;
		finalValue=temp;
	} else var negnum=false;
	var theSc = this;
	this.tO = window.setTimeout(function(){
		theSc.animate(easeType, 0, initValue, finalValue-initValue, dur, f2m(getFPS(), 1), theSc, negnum, theFunction);
	}, 1);
}

AdvTween.prototype.isStopped=0;

/*
 *
 * @event onMotionFinished
 * @parent AdvTween
 * @since 1.0
 * @return Void
 * @description Event usage similar to {lib://cls/Tween Tween}'s {lib://evt/Tween/onMotionFinished onMotionFinished}.
 * @compat ie,ff,chr,saf,op
 * @see {lib://cls/AdvTween AdvTween}
 *
 */
Tween.prototype.onMotionFinished;

AdvTween.prototype.animate = function(e, ct, vi, vf, d, de, sc, iN, tF){	
	var valor = e(ct, vi, vf, d);
	if(iN){
		valor = vf+vi+vi-valor;
	}
	
	tF(valor);
	
	if(ct<d && !sc.isStopped){
		sc.tO = window.setTimeout(function(){
			sc.animate(e, ct+1, vi, vf, d, de, sc, iN, tF);
		}, de);
	} else if ((!sc.isStopped || sc.isStopped==2) && sc.onMotionFinished){
		sc.onMotionFinished();
	}
}


/*
 *
 * @method stop
 * @parent AdvTween
 * @since 1.0
 * @return Void
 * @description Stops the tweening. Its usage is similar to {lib://cls/Tween Tween}'s {lib://mtd/Tween/stop stop} method.
 * @param callOMFF:Boolean Determines whether or not the {lib://evt/AdvTween/onMotionFinished onMotionFinished} event is triggered after stopping the tweening.
 * @compat ie,ff,chr,saf,op
 * @see {lib://cls/AdvTween AdvTween}
 *
 */
AdvTween.prototype.stop = function (callOMFF){
	if(callOMFF){
		this.isStopped = 2;
	} else {
		this.isStopped = 1;
	}
}

/*
 *
 * @function getStyleFromObject
 * @since 1.0
 * @return String
 * @returnDesc A string containing the specified style.
 * @description Function that retrieves a style (CSS property) from a DOM Element.
 * @param objId:String The DOM element ID.
 * @param style:String The CSS property to be retrieved
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
var o = $('elem');
var s = 'margin-top'; //style must be the actual CSS property that differs from javascript's css property (marginTop)
alert(getStyleFromObject(o, s)); //Displays the top margin of "elem" element.
 *
 */
function getStyleFromObject(objId, style){
	var objeto = typeof objId == "string" ? $(objId) : objId;
	if (objeto.currentStyle)
		return objeto.currentStyle[style];
	else if(window.getComputedStyle)
		return document.defaultView.getComputedStyle(objeto,null).getPropertyValue(style);
	else
		return null;
}

function getNextHighestZindex(obj){
	var highestIndex = 0;
	var currentIndex = 0;
	var elArray = Array();
	if(obj){ elArray = obj.getElementsByTagName('*'); }else{ elArray = document.getElementsByTagName('*'); }
	for(var i=0; i < elArray.length; i++){
		var cIndexTmp = getStyleFromObject(elArray[i], "z-index");
		currentIndex = cIndexTmp != null ? cIndexTmp : getStyleFromObject(elArray[i].id, "z-index");
		if(!isNaN(currentIndex) && currentIndex > highestIndex){ highestIndex = currentIndex; }
	}
   return(highestIndex+1);
}

// drag and drop

function getXY(evt){
	if(window.event)
		return [window.event.clientX, window.event.clientY];
	else
		return [evt.pageX, evt.pageY];
}

if(!Drag){
	var Drag = {
/*
 *
 * @variable Drag.X_AXIS
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description X axis constraint used in {lib://fun/startDrag startDrag function}.
 *
 */
		X_AXIS: 0,
/*
 *
 * @variable Drag.Y_AXIS
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Y axis constraint used in {lib://fun/startDrag startDrag function}.
 *
 */
		Y_AXIS: 1,
/*
 *
 * @variable Drag.BOTH_AXIS
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description X and Y axis constraint used in {lib://fun/startDrag startDrag function}.
 *
 */
		BOTH_AXIS: 2,
/*
 *
 * @variable Drag.ABSOLUTE
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Positioning mode used in {lib://fun/startDrag startDrag function}.
 *
 */
		ABSOLUTE: 0,
/*
 *
 * @variable Drag.RELATIVE
 * @since 1.0
 * @compat ie,ff,chr,saf,op
 * @description Positioning mode used in {lib://fun/startDrag startDrag function}.
 *
 */
		RELATIVE: 1
	};
}

/*
 *
 * @function startDrag
 * @since 1.0
 * @return Boolean
 * @returnDesc Returns always false, avoiding the text selection.
 * @description Function that enables dragging DOM elements. Always called at mousedown event. Use {lib://fun/stopDrag stopDrag function} to stop dragging.
 * @param mouseDownEventObject:Object The event variable obtained with mousedown event.
 * @param objId:String The DOM element ID.
 * @param keepZindex:Boolean If true, the z-index CSS property is kept. Otherwise, the next highest value is assigned to this element. Default is true.
 * @param axisConstraint:Number Axis restriction constraint. Constants Drag.X_AXIS, Drag.Y_AXIS or Drag.BOTH_AXIS should be used. Default is Drag.BOTH_AXIS.
 * @param relativity:Number Indicates whether the positioning is relative or absolute. Constants Drag.RELATIVE or Drag.ABSOLUTE should be used. Default is Drag.ABSOLUTE.
 * @compat ie,ff,chr,saf,op
 * @exFiles startDragEx1.html,startDragEx2.html
 * @exampleCode 
$("objId").onmousedown=startDrag;
$("objId").onmouseup=stopDrag;
 * @see {lib://fun/stopDrag stopDrag}, {lib://fun/onDrag onDrag}
 *
 */
function startDrag(mouseDownEventObject, objId, keepZindex, axisConstraint, relativity){
	var objeto = objId ? $(objId) : this;
	var relativities = ["absolute", "relative"];
	if(objeto != null){
		if(!keepZindex)
			objeto.style.zIndex = getNextHighestZindex();

		var ptos = getXY(mouseDownEventObject);
		var xDif = ptos[0] - objeto.offsetLeft;
		var yDif = ptos[1] - objeto.offsetTop;
		
		if(relativity == 1) {
			objeto.style.position = relativities[relativity];
			var container = objeto.parentNode;
		} else {
			objeto.style.position = relativities[0];
		}
		
		document.onmousemove = function(evt){
			var willDrag;
			ptos = getXY(evt);
			if(relativity == 1){
				ptos[0] -= container.offsetLeft;
				ptos[1] -= container.offsetTop;
			}
			var xPos = (ptos[0] - xDif);
			var yPos = (ptos[1] - yDif);
			evt.nextX = xPos;
			evt.nextY = yPos;
			if(objeto.onDrag) willDrag = objeto.onDrag(evt);
			if(willDrag != false){
				if(axisConstraint == null || axisConstraint == 2 || axisConstraint == 0)
					objeto.style.left = xPos + "px";
				if(axisConstraint == null || axisConstraint == 2 || axisConstraint == 1)
					objeto.style.top = yPos + "px";
				if(objeto.onDragAfter) objeto.onDragAfter(evt);
			}
			return false; //retorna falso para não selecionar nada na tela
		}
		
		document.onmouseup = objeto.onmouseup;
	}
	return false; //retorna falso para não selecionar nada na tela
}

/*
 *
 * @function stopDrag
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description Function that stops a DOM element dragging, initiated by {lib://fun/startDrag startDrag function}. Always called at onmouseup event.
 * @compat ie,ff,chr,saf,op
 * @exFiles startDragEx1.html
 * @exampleCode 
$("objId").onmousedown=startDrag;
$("objId").onmouseup=stopDrag;
 * @see {lib://fun/startDrag startDrag}, {lib://fun/onDrag onDrag}
 *
 */
function stopDrag(){
	document.onmousemove = null;
}

/*
 *
 * @function onDrag
 * @since 1.0
 * @return Boolean
 * @returnDesc true for allowing, or false for avoiding the next dragged position.
 * @description Event triggered when a DOM element is dragged using {lib://fun/startDrag startDrag function}. This event carries one argument, which its structure is similar to onmousedown event, carrying two more properties: event.nextX and event.nextY.
 * @compat ie,ff,chr,saf,op
 * @exFiles startDragEx2.html
 * @exampleCode 
window.onload = function(){
	var btn = $("btn"); //the draggable element
	var area = $("area"); //the area that contains btn
	
	btn.onmousedown = function(evt){
		return startDrag(evt, this.id, true, Drag.X_AXIS, Drag.RELATIVE);
	}
	btn.onDrag = function(evt){
		var rLimit = area.offsetWidth-this.offsetWidth;
		if(evt.nextX <= 0){ //nextX: value after drag
			this.style.left = 0;
			return false;
		} else if(evt.nextX > rLimit){
			this.style.left = rLimit;
			return false;
		}
	}
	btn.onmouseup = stopDrag;
	
}
 * @see {lib://fun/startDrag startDrag}, {lib://fun/stopDrag stopDrag}
 *
 */
/*
 *
 * @function onDragAfter
 * @since 1.0
 * @return Void
 * @returnDesc Nothing.
 * @description Event triggered after a DOM element is dragged using {lib://fun/startDrag startDrag function}. This event carries one argument, which its structure is similar to onmouseup event.
 * @compat ie,ff,chr,saf,op
 * @exFiles startDragEx2.html
 * @exampleCode 
window.onload = function(){
	var btn = $("btn"); //the draggable element
	var area = $("area"); //the area that contains btn
	
	btn.onmousedown = function(evt){
		return startDrag(evt, this.id, true, Drag.X_AXIS, Drag.RELATIVE);
	}
	btn.onDrag = function(evt){
		var rLimit = area.offsetWidth-this.offsetWidth;
		if(evt.nextX <= 0){ //nextX: value after drag
			this.style.left = 0;
			return false;
		} else if(evt.nextX > rLimit){
			this.style.left = rLimit;
			return false;
		}
	}
	btn.onDragAfter = function(evt){
		btn.innerHTML= "position: "+this.style.left;
	}
	btn.onmouseup = stopDrag;
	
}
 * @see {lib://fun/startDrag startDrag}, {lib://fun/stopDrag stopDrag}
 *
 */

// fim de drag and drop

// funções de calendario

MD = [31,28,31,30,31,30,31,31,30,31,30,31];
MK = "144025036146";
WK = "1234560";
function getYK(y){
	var ano = parseInt(y.toString().substr(2), 10),
	k = (parseInt(ano/4)+ano%7)%7;
	if(y>=2000) k--;
	return k;
}
function isBisixth(y){
	return y%4==0 && (y%100!=0 || y%400==0);
}
function getWKFromDate(d,m,y){
	wk = (d+parseInt(MK.charAt(m-1),10)+getYK(y))%7;
	if(isBisixth(y) && (m==0||m==1))
		wk--;
	return wk;
}
function WK2W(wk){
	return WK.indexOf(wk);
}
/*
 *
 * @function getWeekDayFromDate
 * @since 1.0
 * @return Number
 * @returnDesc A number related to a week day. From 0 (Sunday) to 6 (Saturday)
 * @description Function that returns the week day of a date.
 * @param d:Number The day of the date
 * @param m:Number The month of the date
 * @param y:Number The 4-digit year of the date
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
alert(getWeekDayFromDate(28,5,1991)); //Displays "2" (Tuesday)
 * @see {lib://fun/drawCalendar drawCalendar}
 *
 */
function getWeekDayFromDate(d,m,y){
	return WK2W(getWKFromDate(d,m,y));
}
function getPrevMonth(m){ //internal
	return m-1<0?11:m-1;
}
function getNextMonth(m){ //internal
	return m+1>11?0:m+1;
}

function getEventsByDay(eventList, day){
	
	var events = [];
	for(var i=0;i<eventList.length;i++){
		if(eventList[i].day == day){
			events.push(eventList[i]);
		}
	}
	return events.length==0?null:events;
}

/*
 *
 * @function drawCalendar
 * @since 1.0
 * @return String
 * @returnDesc A HTML string of the calendar if asText is set as true. Otherwise, nothing is returned
 * @description Function that build the HTML code of a calendar sheet based on a specified date. The figure below illustrates the HTML DIV element hierarchy, as well as the object (to be used as an argument for parameter eventos) properties that carry its corresponding CSS classes.<br /><div style="display: block; text-align: center; font-size: inherit; font-family: inherit;"><img src="../../images/calStyles.png" /><br /><span class="text">Figure 1 - HTML DIV element hierarchy and object properties related to its CSS classes</span></div>
 * @param dia:Number The day of the date
 * @param mes:Number The month of the date
 * @param ano:Number The 4-digit year of the date
 * @param estilos:Object An object containing CSS class names for the HTML elements to be built.
 * @param eventos:Object An array of day numbers <a href="../examples/drawCalendarEx2.html" target="_blank">(Example 2)</a> or calendar event objects <a href="../examples/drawCalendarEx1.html" target="_blank">(Example 1)</a>.
 * @param asText:Boolean If true, the HTML code is returned as a String. Otherwise, the output is written by document.write().
 * @param onDateSelected:Function A function to be triggered when a day of the calendar is selected.
 * @compat ie,ff,chr,saf,op
 * @exFiles drawCalendarEx1.html,drawCalendarEx2.html
 * @exampleCode 
function daySelected(div, year, month, day){
	if(event.srcElement.id.indexOf("activity_")!=-1) return;
	alert("selected date: "+new Date(year, month-1, day));
}

var d = new Date();
//An array of calendar event objects. See the structure below
var eventList = [
	{day: 8, link: "javascript:alert('Activity A1')", title: "Activity A1"},
	{day: 28, link: "javascript:alert('Activity A2')", title: "Activity A2"},
	{day: d.getDate(), link: "javascript:alert('Today\\'s activity')", title: "Today's activity"}
];
//The following structure carries CSS classes for HTML elements. In order to understand which HTML elements the properties below are related to, check the figure in the description
var styles = {dayOut: "calDiaOld", number: "calNumero", text: "calDiaTxt", day: "calDia", featured: "calDiaDest", activity: "activity", todayActivity: "todayActivity", activityArea: "activityArea"};
drawCalendar(d.getDate(), d.getMonth()+1, d.getFullYear(), styles, eventList, false, daySelected);
 *
 */
function drawCalendar(dia, mes, ano, estilos, eventos, asText, onDateSelected){
	var output='';
	MD[1] = isBisixth(ano)?29:28;
	var today = new Date();
	var firstWeekDay = getWeekDayFromDate(1, mes, ano);
	var lastWeekDay = getWeekDayFromDate(MD[mes-1], mes, ano);
	var numberedEvents = typeof(eventos[0]) == 'number';
	for(var i=(MD[getPrevMonth(mes-1)]-(firstWeekDay-1)); i<=MD[getPrevMonth(mes-1)]; i++){
		output += '<div class="'+estilos.dayOut+'">';
		output += '<div class="'+estilos.number+'">'+i+'</div>';
		output += '<div class="'+estilos.text+'">&nbsp;</div>';
		output += '</div>';
	}
	for(var i=1;i<=MD[mes-1];i++){
		output += '<div class="'+(eventos&&numberedEvents&&eventos.indexOf(i)!=-1?estilos.featured:estilos.day)+'" style="'+(i==today.getDate()&&mes==today.getMonth()+1&&ano==today.getFullYear()?'background-color: #F5F5F5;':'')+'" '+(onDateSelected?'onclick="'+onDateSelected.name+'(this, '+ano+', '+mes+', '+i+')"':'')+'>';
		output += '<div class="'+estilos.number+'">'+i+'</div><div class="'+estilos.activityArea+'">';
		if(!numberedEvents){
			evts = getEventsByDay(eventos, i);
			for(var j=0;evts!=null && j<evts.length;j++)
				output += '<a class="'+(i==today.getDate()?estilos.todayActivity:estilos.activity)+'" href="'+evts[j].link+'"><div class="'+estilos.text+'" id="activity_'+i+'_'+j+'">'+evts[j].title+'</div></a>';
		}
		output += '</div></div>';
	}
	for(var i=1;i<=6-lastWeekDay;i++){
		output += '<div class="'+estilos.dayOut+'">';
		output += '<div class="'+estilos.number+'">'+i+'</div>';
		output += '<div class="'+estilos.text+'">&nbsp;</div>';
		output += '</div>';
	}
	
	if(asText)return output;
	else document.write(output);
}


// fim de funções de calendário

//Spriter


/*
 *
 * @class Spriter
 * @since 1.0
 * @description A sprite animator feature. Given the sprite image, total number of tiles, number of tiles per line and tile dimensions, this feature produces an animation using {lib://var/FPS FPS variable} as the FPS rate.
 * @param DOMObjId:String The DOM Element id
 * @param tileWidth:Number The width in pixels of the tile
 * @param tileHeight:Number The height in pixels of the tile
 * @param spriteImageFile:String The url to the sprite image
 * @param tilesPerLine:Number The number of tiles (frames) per line
 * @param totalTiles:Number The total number of tiles (frames)
 * @param loops:Number The number of times the animation will loop. For looping infinitely, one can use -1
 * @param fromFrame:Number The frame offset to start the animation
 * @param keepFromFrame:Boolean If true, when the animation loops, it starts from fromFrame. Otherwise, it starts from the beginning
 * @compat ie,ff,chr,saf,op
 * @exFiles spriterEx1.html
 * @exampleCode 
//Creating a 64x64 animation area from a sprite image with 16 tiles that loops infinitely and begin always from frame 10
new Spriter("spritePlace", 64, 64, "spriteImage.png", 4, 16, -1, 10, true);
 *
 */
function Spriter(DOMObjId, tileWidth, tileHeight, spriteImageFile, tilesPerLine, totalTiles, loops, fromFrame, keepFromFrame){
	this.spriteData = {_DOMObjId: DOMObjId, _tileWidth: tileWidth, _tileHeight: tileHeight, _spriteImageFile: spriteImageFile, _tilesPerLine: tilesPerLine, _totalTiles: totalTiles, _loops: (typeof loops=="number" ? (loops<=0?loops:loops-1) : -1), _currentframe: (typeof(fromFrame)=="number"?fromFrame : 0)};
	var objeto = typeof DOMObjId == "string" ? $(DOMObjId) : DOMObjId;
	var aqui = this;
	this.obj = objeto;
	objeto.style.backgroundRepeat = "no-repeat";
	objeto.style.backgroundImage = "url(\""+spriteImageFile+"\")";
	objeto.style.width = tileWidth+"px";
	objeto.style.height = tileHeight+"px";
	var currentParams = {ease: None.prototype.easeNone, initValue: this.spriteData._currentframe, finalValue: totalTiles-1, duration: totalTiles, useSeconds: false, theFunction: function(valor){
		var frameNum = Math.floor(valor);
		aqui.gotoFrame(frameNum);
	}};
	this.aTObj = new AdvTween(currentParams.ease, currentParams.initValue, currentParams.finalValue, currentParams.duration, currentParams.useSeconds, currentParams.theFunction);
	currentParams.initValue = keepFromFrame?currentParams.initValue:0;
	this.aTObj.currentParams = currentParams;
	this.aTObj.onMotionFinished = function(){
		if(aqui.spriteData._loops > 0 || aqui.spriteData._loops < 0){
			this.animate(currentParams.ease, 0, currentParams.initValue, currentParams.finalValue, currentParams.duration, f2m(getFPS(), 1), this, false, currentParams.theFunction);
			aqui.spriteData._loops--;
		}
	}
}

Spriter.prototype.spriteData = {_DOMObjId: '', _tileWidth: 0, _tileHeight: 0, _spriteImageFile: '', _tilesPerLine: 0, _totalTiles: 0, _loops: 0, _currentframe: 0};
Spriter.prototype.getAdvTweenObject = function(){
	return this.aTObj;
}

Spriter.prototype.gotoFrame = function(frame){
	frame = Math.floor(frame);
	frame = frame < 0 ? 0 : (frame >= this.spriteData._totalTiles ? this.spriteData._totalTiles-1 : frame);
	this.spriteData._currentframe = frame;
	var currRow = parseInt(frame/this.spriteData._tilesPerLine);
	var currCol = frame%this.spriteData._tilesPerLine;
	var tilePos = [(this.spriteData._tileWidth*currCol)*(-1), (this.spriteData._tileHeight*currRow)*(-1)];
	this.obj.style.backgroundPosition = tilePos[0]+"px "+tilePos[1]+"px";
	if(this.onFrameChange)
			this.onFrameChange(frame);
}
/*
 *
 * @method stop
 * @parent Spriter
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description Stops playhead displaying the current frame.
 * @compat ie,ff,chr,saf,op
 * @exFiles spriterEx1.html
 * @exampleCode 
var anim = new Spriter("spritePlace", 64, 64, "spriteImage.png", 4, 16, -1, 10, true);
$('stopButton').onclick=function(){
	anim.stop();
}
 * @see {lib://mtd/Spriter/play play}, {lib://mtd/Spriter/gotoAndPlay gotoAndPlay}, {lib://mtd/Spriter/gotoAndStop gotoAndStop}, {lib://mtd/Spriter/isStopped isStopped}
 *
 */
Spriter.prototype.stop = function(){
	this.getAdvTweenObject().isStopped = 1;
	this.getAdvTweenObject().stop(false);
	clearTimeout(this.getAdvTweenObject().tO);
}
/*
 *
 * @method play
 * @parent Spriter
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description Activates the playhead displaying the animation from the current frame. If the animation is already playing, nothing happens.
 * @compat ie,ff,chr,saf,op
 * @exFiles spriterEx1.html
 * @exampleCode 
var anim = new Spriter("spritePlace", 64, 64, "spriteImage.png", 4, 16, -1, 10, true);
$('playButton').onclick=function(){
	anim.play();
}
 * @see {lib://mtd/Spriter/stop stop}, {lib://mtd/Spriter/gotoAndPlay gotoAndPlay}, {lib://mtd/Spriter/gotoAndStop gotoAndStop}, {lib://mtd/Spriter/isStopped isStopped}
 *
 */
Spriter.prototype.play = function(){
	var advTweenObj = this.getAdvTweenObject();
	if(advTweenObj.isStopped){
		var params = advTweenObj.currentParams;
		advTweenObj.isStopped = 0;
		advTweenObj.animate(params.ease, this.spriteData._currentframe+2, params.initValue, params.finalValue, params.duration, f2m(getFPS(), 1), advTweenObj, false, params.theFunction);
	}
}
/*
 *
 * @method isStopped
 * @parent Spriter
 * @since 1.0
 * @return Boolean
 * @returnDesc If true, the animation is stopped. Otherwise, the animation is playing.
 * @description Indicates whether or not the animation is stopped.
 * @compat ie,ff,chr,saf,op
 * @exFiles spriterEx1.html
 * @exampleCode 
var anim = new Spriter("spritePlace", 64, 64, "spriteImage.png", 4, 16, -1, 10, true);
$('checkButton').onclick=function(){
	if(anim.isStopped())
		alert('Animation is stopped');
	else
		alert('Animation is playing');
}
 * @see {lib://mtd/Spriter/play play}, {lib://mtd/Spriter/stop stop}, {lib://mtd/Spriter/gotoAndPlay gotoAndPlay}, {lib://mtd/Spriter/gotoAndStop gotoAndStop}
 *
 */
Spriter.prototype.isStopped = function(){
	return this.aTObj.isStopped;
}
/*
 *
 * @method gotoAndStop
 * @parent Spriter
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description Goes to a frame and stops the animation.
 * @compat ie,ff,chr,saf,op
 * @exFiles spriterEx1.html
 * @exampleCode 
var anim = new Spriter("spritePlace", 64, 64, "spriteImage.png", 4, 16, -1, 10, true);
$('gotoStopButton').onclick=function(){
	anim.gotoAndStop($('txtField').value);
}
 * @see {lib://mtd/Spriter/play play}, {lib://mtd/Spriter/stop stop}, {lib://mtd/Spriter/gotoAndPlay gotoAndPlay}, {lib://mtd/Spriter/isStopped isStopped}
 *
 */
Spriter.prototype.gotoAndStop = function(frame){
	this.stop();
	this.gotoFrame(frame);
}
/*
 *
 * @method gotoAndPlay
 * @parent Spriter
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description Goes to a frame and activates the playhead.
 * @compat ie,ff,chr,saf,op
 * @exFiles spriterEx1.html
 * @exampleCode 
var anim = new Spriter("spritePlace", 64, 64, "spriteImage.png", 4, 16, -1, 10, true);
$('gotoPlayButton').onclick=function(){
	anim.gotoAndPlay($('txtField').value);
}
 * @see {lib://mtd/Spriter/play play}, {lib://mtd/Spriter/stop stop}, {lib://mtd/Spriter/gotoAndStop gotoAndStop}, {lib://mtd/Spriter/isStopped isStopped}
 *
 */
Spriter.prototype.gotoAndPlay = function(frame){
	this.stop();
	this.gotoFrame(frame);
	this.play();
}

/*
 *
 * @event onFrameChange
 * @parent Spriter
 * @since 1.0
 * @return Void
 * @description Event triggered when current frame changes. Methods {lib://mtd/Spriter/gotoAndPlay gotoAndPlay} and {lib://mtd/Spriter/gotoAndStop gotoAndStop} also trigger this event.
 * @param frame:Number The new current frame number.
 * @compat ie,ff,chr,saf,op
 * @exFiles spriterEx1.html
 * @exampleCode 
var t = new Tween("logo", "width", Quad.prototype.easeInOut, 100, 200, 10, false);
t.onFrameChange = function(frame){
	$('frameIndicator').innerHTML = "Frame #"+frame;
}
 * @see {lib://cls/AdvTween AdvTween}
 *
 */
Spriter.prototype.onFrameChange;

//fim de Spriter

//AJAX
/*
 *
 * @class AJAX
 * @since 1.0
 * @description An Asynchronous Javascript and XML (AJAX) feature. It performs HTTP requests through Javascript XMLHttpRequest object.
 * @param requestType:String The request method (GET or POST)
 * @param requestPage:String A page to be requested
 * @param isAsync:Boolean True for an asynchronous request, false for a synchronous request
 * @param inputParameters:Object The parameters to be sent to request page. Object properties, as well as their values are internally converted and respectively assigned to parameters and values of a query string.
 * @param responseManagerFunction:Function The function to handle the obtained response. This function is similar to Javascript XMLHttpRequest.onreadystatechange event.
 * @param additionalHeaders:Object Additional request headers to be added to the HTTP request.
 * @compat ie,ff,chr,saf,op
 * @exFiles AJAXEx1.html
 * @exampleCode 
function handleResponse(){
	if(this.readyState == AJAX.prototype.LOADED) alert(this.responseText);
}
var ajax = new AJAX("POST", "requestPage.php", true, {name: "Smith", age: 22}, handleResponse);
if(!ajax.makeRequest())
	alert("Error on making the request.");
 * @see {lib://mtd/AJAX/makeRequest makeRequest}
 *
 */
function AJAX(requestType, requestPage, isAsync, inputParameters, responseManagerFunction, additionalHeaders){
	this.isSupported = true;
	try{
		this.rObj = new XMLHttpRequest();
		if(this.rObj.overrideMimeType){
			this.rObj.overrideMimeType("text/xml");
		}
	} catch (e){
		try {
			this.rObj = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				this.rObj = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				isSupported = false;
			}
		}
	}
	
	if(requestType) this.rType = requestType;
	if(requestPage) this.rPage = requestPage;
	if(isAsync) this.async=isAsync; else this.async = false;
	if(inputParameters != null) this.setInputParameters(inputParameters); else this.qStr = null;
	if(responseManagerFunction) this.RMF = responseManagerFunction;
	for(var header in additionalHeaders){
		this.rObj.setRequestHeader(header, additionalHeaders[header]);
	}
}

AJAX.prototype.LOADED = 4;

/*
 *
 * @method setRequestType
 * @parent AJAX
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description Sets the request type of an {lib://cls/AJAX AJAX} instance.
 * @param requestType:String The request method to be set (GET or POST)
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
function handleResponse() {}
var ajax = new AJAX("POST", "requestPage.php", true, null, handleResponse);
alert(ajax.getRequestType()); //Displays POST
ajax.setRequestType("GET");
alert(ajax.getRequestType()); //Displays GET
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/getRequestType getRequestType}
 *
 */
AJAX.prototype.setRequestType = function(requestType){
	this.rType = requestType;
}
/*
 *
 * @method getRequestType
 * @parent AJAX
 * @since 1.0
 * @return String
 * @returnDesc A string containing a request type (GET or POST)
 * @description Gets the current request type of an {lib://cls/AJAX AJAX} instance.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
function handleResponse() {}
var ajax = new AJAX("POST", "requestPage.php", true, null, handleResponse);
alert(ajax.getRequestType()); //Displays POST
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/setRequestType setRequestType}
 *
 */
AJAX.prototype.getRequestType = function(){
	return this.rType;
}

/*
 *
 * @method setRequestPage
 * @parent AJAX
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description Sets the request page of an {lib://cls/AJAX AJAX} instance.
 * @param requestPage:String A page to be requested
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
function handleResponse() {}
var ajax = new AJAX("POST", "requestPage.php", true, null, handleResponse);
alert(ajax.getRequestPage()); //Displays requestPage.php
ajax.setRequestPage("newRequestPage.php"); 
alert(ajax.getRequestPage()); //Displays newRequestPage.php
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/getRequestPage getRequestPage}
 *
 */
AJAX.prototype.setRequestPage = function(requestPage){
	this.rPage = requestPage;
}
/*
 *
 * @method getRequestPage
 * @parent AJAX
 * @since 1.0
 * @return String
 * @returnDesc A string containing a request page
 * @description Gets the current request page of an {lib://cls/AJAX AJAX} instance.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
function handleResponse() {}
var ajax = new AJAX("POST", "requestPage.php", true, null, handleResponse);
alert(ajax.getRequestPage()); //Displays requestPage.php
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/setRequestPage setRequestPage}
 *
 */
AJAX.prototype.getRequestPage = function(){
	return this.rPage;
}

/*
 *
 * @method setAsync
 * @parent AJAX
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description Sets whether or not the request page of an {lib://cls/AJAX AJAX} instance is asynchronous.
 * @param isAsync:Boolean True for an asynchronous request, false for a synchronous request
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
function handleResponse() {}
var ajax = new AJAX("POST", "requestPage.php", true, null, handleResponse);
alert(ajax.isAsync()); //Displays true
ajax.setRequestPage(false);
alert(ajax.isAsync()); //Displays false
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/isAsync isAsync}
 *
 */
AJAX.prototype.setAsync = function(isAsync){
	this.async = isAsync;
}
/*
 *
 * @method isAsync
 * @parent AJAX
 * @since 1.0
 * @return Boolean
 * @returnDesc A boolean that indicates whether or not the request is asynchronous
 * @description Gets a boolean that indicates whether or not the request is asynchronous.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
function handleResponse() {}
var ajax = new AJAX("POST", "requestPage.php", true, null, handleResponse);
alert(ajax.isAsync()); //Displays true
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/setAsync setAsync}
 *
 */
AJAX.prototype.isAsync = function(){
	return this.async;
}
/*
 *
 * @method setInputParameters
 * @parent AJAX
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description Sets the query string parameters of an {lib://cls/AJAX AJAX} instance. In order to append parameters, avoid the replacement, one can use {lib://mtd/AJAX/addParameters addParameters} method. Since there is no getter for input parameters, one can check the current state of the data to be sent through the HTTP request using {lib://mtd/AJAX/getQueryString getQueryString} method.
 * @param parametersObject:Object The parameters to be sent to request page. Object properties, as well as their values are internally converted and respectively assigned to parameters and values of a query string.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
function handleResponse() {}
var ajax = new AJAX("POST", "requestPage.php", true, null, handleResponse);
ajax.setInputParameters({name: "Kyle Smith", age: 22});
alert(ajax.getQueryString()); //Displays name=Kyle%20Smith&age=22
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/getQueryString getQueryString}, {lib://mtd/AJAX/addParameters addParameters}
 *
 */
AJAX.prototype.setInputParameters = function(parametersObject){
	if(parametersObject == null){
		this.qStr = null;
	} else {
		this.qStr = "";
		this.addParameters(parametersObject);
	}
}
/*
 *
 * @method addParameters
 * @parent AJAX
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description Appends query string parameters of an {lib://cls/AJAX AJAX} instance. In order to avoid unnecessary accumulation of parameters, one can use {lib://mtd/AJAX/setInputParameters setInputParameters} method. Since there is no getter for input parameters, one can check the current state of the data to be sent through the HTTP request using {lib://mtd/AJAX/getQueryString getQueryString} method.
 * @param parametersObject:Object The parameters to be sent to request page. Object properties, as well as their values are internally converted and respectively assigned to parameters and values of a query string.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
function handleResponse() {}
var ajax = new AJAX("POST", "requestPage.php", true, null, handleResponse);
ajax.setInputParameters({name: "Kyle Smith"});
alert(ajax.getQueryString()); //Displays name=Kyle%20Smith
ajax.addParameters({age: 22});
alert(ajax.getQueryString()); //Displays name=Kyle%20Smith&age=22
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/getQueryString getQueryString}, {lib://mtd/AJAX/setInputParameters setInputParameters}
 *
 */
AJAX.prototype.addParameters = function(parametersObject){
	if(this.qStr == null){
		this.setInputParameters(parametersObject);
	} else {
		for(var p in parametersObject){
			if(this.qStr.indexOf(p) == -1){
				if(this.qStr.length > 0) this.qStr += "&";
				this.qStr+=p+"="+encodeURIComponent(parametersObject[p]);
			}
		}
	}
}

/*
 *
 * @method clearParameters
 * @parent AJAX
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description Clears the parameters currently stored. Since there is no getter for input parameters, one can check the current state of the data to be sent through the HTTP request using {lib://mtd/AJAX/getQueryString getQueryString} method.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
function handleResponse() {}
var ajax = new AJAX("POST", "requestPage.php", true, null, handleResponse);
ajax.setInputParameters({name: "Kyle Smith", age: 22});
alert(ajax.getQueryString()); //Displays name=Kyle%20Smith&age=22
ajax.clearParameters();
alert(ajax.getQueryString()); //Displays null
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/getQueryString getQueryString}, {lib://mtd/AJAX/setInputParameters setInputParameters}, {lib://mtd/AJAX/addParameters addParameters}
 *
 */
AJAX.prototype.clearParameters = function(){
	this.setInputParameters(null);
}

/*
 *
 * @method getQueryString
 * @parent AJAX
 * @since 1.0
 * @return String
 * @returnDesc A query string
 * @description Gets a query string of an {lib://cls/AJAX AJAX} instance. This query string contains every data to be sent through the HTTP request.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
function handleResponse() {}
var ajax = new AJAX("POST", "requestPage.php", true, {name: "Kyle Smith", age: 22}, handleResponse);
alert(ajax.getQueryString()); //Displays name=Kyle%20Smith&age=22
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/getQueryString getQueryString}, {lib://mtd/AJAX/setInputParameters setInputParameters}, {lib://mtd/AJAX/addParameters addParameters}, {lib://mtd/AJAX/clearParameters clearParameters}
 *
 */
AJAX.prototype.getQueryString = function(){
	return this.qStr;
}
/*
 *
 * @method setResponseManagerFunction
 * @parent AJAX
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description Sets the function to be called when responses from HTTP requests are received.
 * @param rmFunction:Function The function to be called for handling responses from HTTP requests.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
function handleResponse() {}
function anotherFunction() {}
var ajax = new AJAX("POST", "requestPage.php", true, null, handleResponse);
alert(ajax.getResponseManagerFunction()==anotherFunction); //Displays false
ajax.setResponseManagerFunction(anotherFunction);
alert(ajax.getResponseManagerFunction()==anotherFunction); //Displays true
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/getResponseManagerFunction getResponseManagerFunction}
 *
 */
AJAX.prototype.setResponseManagerFunction = function(rmFunction){
	this.RMF = rmFunction;
}
/*
 *
 * @method getResponseManagerFunction
 * @parent AJAX
 * @since 1.0
 * @return Function
 * @returnDesc A function.
 * @description Gets the function currently assigned to an {lib://cls/AJAX AJAX} instance for handling responses from HTTP requests.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
function handleResponse() {}
var ajax = new AJAX("POST", "requestPage.php", true, null, handleResponse);
alert(ajax.getResponseManagerFunction()==handleResponse); //Displays true
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/setResponseManagerFunction setResponseManagerFunction}
 *
 */
AJAX.prototype.getResponseManagerFunction = function(){
	return this.RMF;
}
/*
 *
 * @method validate
 * @parent AJAX
 * @since 1.0
 * @return Boolean
 * @returnDesc A boolean value
 * @description A validator to check whether or not the attributes of an {lib://cls/AJAX AJAX} instance are correctly adjusted to perform HTTP requests.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
function handleResponse() {}
var ajax = new AJAX();
alert(ajax.validate()); //Displays false
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/makeRequest makeRequest}
 *
 */
AJAX.prototype.validate = function(){
	return (this.rType != undefined && this.rPage != undefined && ((this.async && this.RMF != undefined) || (!this.async)) && ((this.rType=="POST" && this.qStr != undefined) || this.rType=="GET"));
}

/*
 *
 * @method makeRequest
 * @parent AJAX
 * @since 1.0
 * @return Boolean
 * @returnDesc A boolean value that indicates whether or not the HTTP request 
 * @description Performs an HTTP request based on the attributes of an {lib://cls/AJAX AJAX} instance. This method internally calls {lib://mtd/AJAX/validate validate} method before issuing an HTTP request.
 * @compat ie,ff,chr,saf,op
 * @exFiles AJAXEx1.html
 * @exampleCode 
function handleResponse(){
	//This function is directly called from Javascript's XMLHttpRequest. Therefore, the keyword this, as well as their properties, are related to XMLHttpRequest object
	var responseText = this.responseText;
	var readyState = this.readyState;
	if(readyState == AJAX.prototype.LOADED)
		$("msg").innerHTML = 'Number '+$('num').value+' is '+(responseText=='1'?'odd':'even')+'.';
	else
		$("msg").innerHTML = "Loading";
}

var ajax = new AJAX("POST", "requestPage.php", true, {num: $("num").value}, handleResponse);
if(!ajax.makeRequest()){
	alert("Error on making the request.");
}
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/validate validate}
 *
 */
AJAX.prototype.makeRequest = function(){
	if(this.validate()){
		if(this.RMF != undefined){
			this.rObj.onreadystatechange = this.RMF;
		}
		this.rObj.open(this.rType, this.rPage, this.async);
		if(this.rType == "POST"){
			this.rObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			this.rObj.setRequestHeader("Cache-Control", "no-store, no-cache, mustrevalidate");
			this.rObj.setRequestHeader("Pragma", "no-cache");
			this.rObj.setRequestHeader("Connection", "close");
		}
		this.rObj.send(this.qStr);
		return true;
	} else {
		return false;
	}
}

/*
 *
 * @method getResponseText
 * @parent AJAX
 * @since 1.0
 * @return String
 * @returnDesc A string containing a response from an HTTP request
 * @description Gets the response arasing from an HTTP request. Commonly used in synchronous HTTP requests.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
var a = new AJAX("GET", "requestPage.php?num=321", false, null, null, null);
a.makeRequest();
alert(a.getResponseText());
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/getResponseXML getResponseXML}, {lib://mtd/AJAX/makeRequest makeRequest}
 *
 */
AJAX.prototype.getResponseText = function (){
	return this.rObj.responseText;
}
/*
 *
 * @method getResponseXML
 * @parent AJAX
 * @since 1.0
 * @return Object
 * @returnDesc A XML Object
 * @description Gets the response arasing from an HTTP request in XML Object format. Commonly used in synchronous HTTP requests. This structure can be explored by accessing childNodes or using methods such as getElementsByTagName().
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
var a = new AJAX("GET", "getXMLData.php?uid=31", false, null, null, null);
a.makeRequest();
alert(a.getResponseXML());
 * @see {lib://cls/AJAX AJAX}, {lib://mtd/AJAX/getResponseText getResponseText}, {lib://mtd/AJAX/makeRequest makeRequest}
 *
 */
AJAX.prototype.getResponseXML = function (){
	return this.rObj.responseXML;
}

//fim de AJAX


//newXML
/*
 *
 * @function newXML
 * @since 1.0
 * @return Oject
 * @returnDesc AXML Object
 * @description A faster way to open XML files.
 * @param xmlDir:String Url of the XML file.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
var index = newXML("bookIndex.xml");
alert(index.childNodes[0].getElementsByTagName("title")[0]);
 *
 */
function newXML(xmlDir){
	var a = new AJAX("GET", xmlDir, false, null, null, null);
	a.makeRequest();
	return a.getResponseXML().documentElement;
}
//fim de newXML

//SWFObject
/*
 *
 * @function SWFObject
 * @since 1.0
 * @return String
 * @returnDesc An HTML string of the specified SWF file to be embedded.
 * @description A faster way to obtain the HTML code of embedded SWF files.
 * @param swfDir:String Url of the SWF file.
 * @param width:Number Width of the embedded area.
 * @param height:Number Height of the embedded area.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
$('swfContainer').innerHTML = SWFObject('game.swf', 300, 300);
 *
 */
function SWFObject(swfDir, width, height){
	var out = '';
	if(!canRunSWF){
		out += "Flash player not installed. <a href=\"http://www.macromedia.com/go/getflashplayer\">Click here</a> to install.";
	} else {
		out += '<object width="' + width + '" height="' + height + '">';
		out += '<param name="movie" value="' + swfDir + '">';
		out += '<param name="wmode" value="transparent">';
		out += '<param name="quality" value="high">';
		out += '<embed src="' + swfDir + '" wmode="transparent" width="' + width + '" height="' + height + '" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer">';
		out += '</embed>';
		out += '</object>';
	}
	return out;
}
//fim de SWFObject

//drawSWF
/*
 *
 * @function drawSWF
 * @since 1.0
 * @return Void
 * @returnDesc Nothing
 * @description A faster way to embed SWF files as HTML. This function makes usage of {lib://fun/SWFObject SWFObject} and document.write functions.
 * @param swfDir:String Url of the SWF file.
 * @param width:Number Width of the embedded area.
 * @param height:Number Height of the embedded area.
 * @compat ie,ff,chr,saf,op
 * @exampleCode 
drawSWF('game.swf', 300, 300);
 *
 */
function drawSWF(swfDir, width, height){
	document.write(SWFObject(swfDir, width, height));
}
//fim de drawSWF
