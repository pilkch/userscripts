// ==UserScript==
// @name           Hide Reddit Rubbish
// @namespace      http://chris.iluo.net/userscripts/hideredditrubbish
// @description    Hides all posts about particular topics on reddit.com
// @version        1.0
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// @exclude        http://reddit.com/user/*
// @exclude        http://*.reddit.com/user/*
// @exclude        http://reddit.com/info/*
// @exclude        http://*.reddit.com/info/*
// ==/UserScript==

var blacklist = new Array();
blacklist.push("C#");
blacklist.push("iPhone");
blacklist.push("iOS");
blacklist.push("UDK");
blacklist.push("XNA");

var siteTable = document.getElementById("siteTable");
var things = siteTable.getElementsByClassName('thing');

// Convert all blacklist words to lower case
var nBlacklistWords = blacklist.length;
for (iBlacklistWords = 0; iBlacklistWords < nBlacklistWords; iBlacklistWords++) {
  blacklist[iBlacklistWords] = blacklist[iBlacklistWords].toLowerCase();
}

// Find any posts that contain a keyword
var nThings = things.length;
for (i = 0; i < nThings; i++) {
  var titles = things[i].getElementsByClassName('title')[0];
  var title = (titles.getElementsByTagName('a')[0].innerHTML).toLowerCase();
  for (iBlacklistWords = 0; iBlacklistWords < nBlacklistWords; iBlacklistWords++) {
    var regex = new RegExp(blacklist[iBlacklistWords]);
    if (regex.test(title)) {
      // Hide the post
      things[i].style.display = 'none';
    }
  }
}

