// ==UserScript==
// @name          Youtube Channels Redirect
// @namespace     https://chris.iluo.net/
// @description   Redirect back to https://www.youtube.com/ when the current video channel name is in a blocklist
// @version       1.2
// @downloadURL   https://github.com/pilkch/userscripts/raw/master/youtubechannelsredirect.user.js
// @updateURL     https://github.com/pilkch/userscripts/raw/master/youtubechannelsredirect.user.js
// @match         https://www.youtube.com/*
// @grant         none
// ==/UserScript==

function IsBlockedURL(url)
{
  return (url.pathname.startsWith("/shorts/"));
}

function IsBlockedChannel(channelName)
{
  var channelNameLowerNoSpaces = channelName.toLowerCase().replace(/\s/g, '')
  return (
    (channelNameLowerNoSpaces == "alia") ||
    (channelNameLowerNoSpaces == "aliaplays") ||
    (channelNameLowerNoSpaces == "morealia") ||
    (channelNameLowerNoSpaces == "letsgameitout") ||
    (channelNameLowerNoSpaces == "mrbeast") ||
    (channelNameLowerNoSpaces == "mrbeastgaming") ||
    (channelNameLowerNoSpaces == "mrbeast2") ||
    (channelNameLowerNoSpaces == "beastreacts") ||
    (channelNameLowerNoSpaces == "beastphilanthropy") ||
    (channelNameLowerNoSpaces == "elementanimation") ||
    (channelNameLowerNoSpaces == "hammyandolivia") ||
    (channelNameLowerNoSpaces == "pewdiepie") ||
    (channelNameLowerNoSpaces == "pewdiepiehighlights") ||
    (channelNameLowerNoSpaces == "pewdiepiees") ||
    (channelNameLowerNoSpaces == "preston") ||
    (channelNameLowerNoSpaces == "prestonplayz") ||
    (channelNameLowerNoSpaces == "prestonreacts") ||
    (channelNameLowerNoSpaces == "prestonshorts") ||
    (channelNameLowerNoSpaces == "ryan") ||
    (channelNameLowerNoSpaces == "rytrahan") ||
    (channelNameLowerNoSpaces == "ryanlol") ||
    (channelNameLowerNoSpaces == "unspeakable") ||
    (channelNameLowerNoSpaces == "unspeakable20") ||
    (channelNameLowerNoSpaces == "unspeakableplays") ||
    (channelNameLowerNoSpaces == "unspeakablereacts")
  );
}

// Find something like this:
// <meta property="og:video:tag" content="mychannelnamelowercase">
function CheckMetaTags()
{
  const metas = document.getElementsByTagName('meta');

  for (let i = 0; i < metas.length; i++) {
    //console.log("Meta property: " + metas[i].getAttribute('property') + ", content: " + metas[i].getAttribute('content'));
    if (metas[i].getAttribute('property') === 'og:video:tag') {
      var channelName = metas[i].getAttribute('content');
      if (IsBlockedChannel(channelName)) {
        return false;
      }
    }
  }

  return true;
}

// Find the upload info and the channel name within it
//<div id="upload-info" class="style-scope ytd-video-owner-renderer">
//  <ytd-channel-name id="channel-name" class="style-scope ytd-video-owner-renderer">
//    <div id="container" class="style-scope ytd-channel-name">
//      <div id="text-container" class="style-scope ytd-channel-name">
//        <yt-formatted-string id="text" link-inherit-color="" title="" class="style-scope ytd-channel-name complex-string" ellipsis-truncate="" ellipsis-truncate-styling="" has-link-only_="">
//          <a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false" href="/@thejuicemedia" dir="auto">thejuicemedia</a>
function CheckUploadInfo()
{
  var uploadInfo = document.getElementById("upload-info");
  if (uploadInfo != null) {
    //console.log("Found upload info");
    const endPoints = uploadInfo.getElementsByClassName('yt-simple-endpoint');
    if (endPoints.length != 0) {
      //console.log("Found " + endPoints.length + " endPoints");
      // Get something like /@mychannelname
      var atChannelName = endPoints[0].getAttribute("href");
      //console.log("atChannelName: " + atChannelName);

      // Remove the /@ characters at the front
      var channelName = atChannelName.substring(2);
      //console.log("channelName: " + channelName);

      if (IsBlockedChannel(channelName)) {
        return false;
      }
    }
  }

  return true;
}

function DoCheck()
{
  //console.log("DoCheck");
  if (IsBlockedURL(window.location)) {
    console.log("Page is blocked, redirecting");
    // Redirect to the main page
    window.location.replace("https://www.youtube.com/");
  } else if (!CheckMetaTags()) {
    console.log("Channel is blocked, redirecting");
    // Redirect to the main page
    window.location.replace("https://www.youtube.com/");
  } else if (!CheckUploadInfo()) {
    console.log("Channel is blocked, redirecting");
    // Redirect to the main page
    window.location.replace("https://www.youtube.com/");
  }
}

(function() {
  'use strict';

  // Very basic, just start an timer that runs the check every 5 seconds
  var milliseconds = 5 * 1000;
  setInterval(DoCheck, milliseconds);
})();
