!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.debugBar=n():t.debugBar=n()}(this,function(){return function(t){function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var e={};return n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=26)}({2:function(t,n){},26:function(t,n,e){e(2),t.exports=function(){if(!function(){return!!Function.prototype.bind}()){var t=function(){var t=function(){return Array.prototype.unshift?function(t,n){Array.prototype.unshift.apply(t,n)}:function(t,n){for(var e=n.length;e>0;e--)Array.prototype.splice.call(t,0,0,n[e-1])}}();return function(){var n=this,e=Array.prototype.shift.call(arguments),o=arguments;return function(){return t(arguments,o),n.apply(e,arguments)}}}();Function.prototype.bind=t}var n=function(){return document.addEventListener?function(t,n,e){return this.addEventListener(t,n,e||!1),n}:function(t,n,e){return this.attachEvent("on"+t,n),n}}(),e=function(){var t=/^\s+/,n=/\s+$/;return String.prototype.trim?function(t){return null==t?"":String.prototype.trim.call(t)}:function(e){return null==e?"":e.toString().replace(t,"").replace(n,"")}}(),o=function(t,n){var o=(n||"").split(/\s+/);if(1===t.nodeType)if(t.className){for(var r=" "+t.className+" ",i=t.className,a=0,s=o.length;a<s;a++)r.indexOf(" "+o[a]+" ")<0&&(i+=" "+o[a]);t.className=e(i)}else t.className=n},r=function(t,n){if(n&&"string"==typeof n||void 0===n){var o=(n||"").split(/\s+/);if(1===t.nodeType&&t.className)if(n){for(var r=(" "+t.className+" ").replace(/[\n\t]/g," "),i=0,a=o.length;i<a;i++)r=r.replace(" "+o[i]+" "," ");t.className=e(r)}else t.className=""}},i=function(t){this.data="local"===t?window.localStorage:window.sessionStorage};i.prototype.get=function(t){var n=this.data.getItem(t);return""===n||null===n||void 0===n?null:n&&"object"==typeof n?JSON.parse(n.value):JSON.parse(n)},i.prototype.set=function(t,n){return this.data.setItem(t,JSON.stringify(n))},i.prototype.unset=function(t){return this.data.removeItem(t)},i.prototype.clear=function(){return this.data.clear()},i.prototype.each=function(){};var a=function(){this.debugbar=document.getElementById("nodefony-container"),this.smallContainer=document.getElementById("nodefony-small"),this.nodefonyClose=document.getElementById("nodefonyClose");var t=new i("local");!1===t.get("nodefony_debug")&&(r(this.smallContainer,"hidden"),o(this.debugbar,"hidden")),this.listen(this.nodefonyClose,"click",function(n){r(this.smallContainer,"hidden"),o(this.debugbar,"hidden"),t.set("nodefony_debug",!1)}.bind(this)),this.listen(this.smallContainer,"click",function(n){r(this.debugbar,"hidden"),o(this.smallContainer,"hidden"),t.set("nodefony_debug",!0)}.bind(this))},s=function(){this.listen=function(t,e,o,r){if(t)return n.call(t,e,o,r)},window.addEventListener?window.addEventListener("load",a.bind(this),!1):window.attachEvent("onload",a.bind(this))},u=new s;return window.nodefony=u,u}()}})});