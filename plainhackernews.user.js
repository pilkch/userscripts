// ==UserScript==
// @name          Plain Hacker News
// @namespace     http://chris.iluo.net/userscripts/hackernews
// @description   Removes the slabs of bright orange
// @match         http://news.ycombinator.com/*
// ==/UserScript==

// Change all cells with a background colour of orange to grey
var elements = document.getElementsByTagName('td');
for (var i = 0; i < elements.length; i++) {
  if (elements[i].bgColor == '#ff6600') elements[i].bgColor = '#dddddd';
}
