// ==UserScript==
// @name           Facebook Fix Back Button
// @namespace      http://chris.iluo.net/userscripts/facebookfixbackbutton
// @description    ...
// @version        0.1
// @match          http*://*.facebook.com/
// @match          http*://*.messenger.com/
// @match          http*://*.whatsapp.com/
// @grant          none
// ==/UserScript==

console.log("chris");
history.pushState = undefined;
history.replaceState = undefined;

