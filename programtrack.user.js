// ==UserScript==
// @name          ProgramTrack Default Rating
// @namespace     http://chris.iluo.net/userscripts/programtrack
// @description   Pick a default rating of Good for ProgramTrack code reviews
// @version       1.0
// @match         http://canberra.nchsoftware.com/codereview?id=*
// ==/UserScript==

// Set the default rating
var rating = document.getElementById('103');
if (rating) rating.value = "2$Good. It's what we expect at NCH.";

// Set the default button
// This element does not have an id set so we hope that it is always the first element named "submit"
var elements = document.getElementsByName("submit");
if (elements.length != 0) elements[0].focus();

// Scroll to the top of the window so that we can read through the code review
scroll(0, 0);

