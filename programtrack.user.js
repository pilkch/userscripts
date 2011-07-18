// ==UserScript==
// @name          ProgramTrack Default Rating
// @namespace     http://chris.iluo.net/userscripts/programtrack
// @description   Pick a default rating of Good for ProgramTrack code reviews
// @include       http://canberra.nchsoftware.com:120/codereview?id=*
// ==/UserScript==

if (document.getElementById('103')) { // Avoid errors
 document.getElementById('103').value = "2$Good. It's what we expect at NCH.";
}
