// ==UserScript==
// @name          ProgramTrack Helper
// @namespace     http://chris.iluo.net/userscripts/programtrack
// @description   Pick a default rating of not applicable for code reviews and make textarea fields larger
// @version       1.0
// @match         http://canberra.nchsoftware.com/*
// ==/UserScript==

// Apply fixes for code review pages
var codereview = "http://canberra.nchsoftware.com:120/codereview?id=";
var url = document.URL;
if (url.substring(0, codereview.length) == codereview) {
  // Set the default rating
  var rating = document.getElementById('103');
  if (rating) rating.value = "10$Not applicable (not enough to rate)";

  // Set the default button
  // This element does not have an id set so we hope that it is always the first element named "submit"
  var elements = document.getElementsByName("submit");
  if (elements.length != 0) elements[0].focus();

  // Scroll to the top of the window so that we can read through the code review
  scroll(0, 0);
} else {
  // Make all textarea fields larger because they are impossibly small
  var elements = document.getElementsByTagName('textarea');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    element.setAttribute('rows', 2 * element.getAttribute('rows'));
    element.setAttribute('cols', 1.2 * element.getAttribute('cols'));
  }
}
