// ==UserScript==
// @name          Youtube Channels Redirect
// @namespace     https://chris.iluo.net/
// @description   Redirect back to https://www.youtube.com/ when the current video channel name is in a blocklist
// @version       1.0
// @match         https://www.youtube.com/*
// @grant         none
// ==/UserScript==

function IsBlocked(channelName)
{
  var channelNameLowerNoSpaces = channelName.toLowerCase().replace(/\s/g, '')
  return (
    (channelNameLowerNoSpaces == "preston") ||
    (channelNameLowerNoSpaces == "prestonplayz") ||
    (channelNameLowerNoSpaces == "prestonreacts") ||
    (channelNameLowerNoSpaces == "prestonshorts") ||
    (channelNameLowerNoSpaces == "unspeakable") ||
    (channelNameLowerNoSpaces == "unspeakableplays") ||
    (channelNameLowerNoSpaces == "unspeakablereacts")
  );
}

// Find something like this:
// <meta property="og:video:tag" content="mychannelnamelowercase">
function DoCheck() {
  const metas = document.getElementsByTagName('meta');

  for (let i = 0; i < metas.length; i++) {
    //console.log("Meta property: " + metas[i].getAttribute('property') + ", content: " + metas[i].getAttribute('content'));
    if (metas[i].getAttribute('property') === 'og:video:tag') {
      var channelName = metas[i].getAttribute('content');
      if (IsBlocked(channelName)) {
        console.log("Channel is blocked, redirecting");
        // Redirect to the main page
        window.location.replace("https://www.youtube.com/");
        break;
      }
    }
  }
}

(function() {
  'use strict';

  // Very basic, just start an timer that runs the check every 5 seconds
  var milliseconds = 5 * 1000;
  setInterval(DoCheck, milliseconds);
})();
