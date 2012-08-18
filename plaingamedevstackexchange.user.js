// ==UserScript==
// @name          plaingamedevstackexchange
// @namespace     http://chris.iluo.net/userscripts/plaingamedevstackexchange
// @description   Removes the background image on the header because it offends me
// @version       1.0
// @match         http://gamedev.stackexchange.com/*
// ==/UserScript==

// Remove the background image on the header
var element = document.getElementById('header');
if (element != null) {
  // Remove background image
  element.style.background = '#FCFCFC';
}
// Remove the logo on the header
element = document.getElementById('hlogo');
if (element != null) {
  // Remove the logo
  element.parentNode.removeChild(element);
}
