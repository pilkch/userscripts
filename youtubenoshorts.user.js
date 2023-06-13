// ==UserScript==
// @name          Youtube Remove Shorts from Subscriptions
// @namespace     https://chris.iluo.net/
// @description   Look for shorts videos on your subscriptions page and hide them
// @version       1.2
// @match         https://www.youtube.com/feed/subscriptions
// @grant         none
// ==/UserScript==

// Check if this video is a shorts video
function IsShort(gridItem)
{
  const endPoints = gridItem.getElementsByClassName('yt-simple-endpoint');
  if (endPoints != null) {
    for (let i = 0; i < endPoints.length; i++) {
      //console.log("End point " + i);
      const url = endPoints[i].href;
      if (url.includes("/shorts")) {
        console.log("Found shorts \"" + url + "\"");
        return true;
      }
    }
  }

  return false;
}

// Find end points as above, but check if the href points to a shorts URL
// <ytd-rich-item-renderer class="style-scope ytd-rich-grid-row">
// ...
// <div id="content" class="style-scope ytd-rich-item-renderer">
// ...
// <a id="thumbnail" class="yt-simple-endpoint inline-block style-scope ytd-thumbnail" aria-hidden="true" tabindex="-1" rel="null" href="/shorts/Kk1h5WueEFg">
function RemoveShorts()
{
  //console.log("RemoveShorts");
  var sections = document.querySelectorAll("ytd-rich-item-renderer");
  if (sections != null) {
    console.log("Found sections");
    for (let s = 0; s < sections.length; s++) {
      //console.log("Section " + s);
      var gridItemsToRemove = [];

      var gridItems = sections[s].getElementsByClassName('ytd-rich-item-renderer');
      if (gridItems != null) {
        for (let d = 0; d < gridItems.length; d++) {
          var gridItem = gridItems[d];
          if (IsShort(gridItem)) {
            gridItemsToRemove.push(gridItems[d]);
          }
        }
      }

      for (let d = 0; d < gridItemsToRemove.length; d++) {
        gridItemsToRemove[d].parentNode.removeChild(gridItemsToRemove[d]);
      }
    }
  }
}

(function() {
  'use strict';

  // Very basic, just start a timer that runs the check every 3 seconds
  var milliseconds = 3 * 1000;
  setInterval(RemoveShorts, milliseconds);
})();
