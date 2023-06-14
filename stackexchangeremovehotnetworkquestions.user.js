// ==UserScript==
// @name          StackExchange Remove Hot Network Questions
// @namespace     https://chris.iluo.net/
// @description   The hot network questions are too distracting for my squishy little brain to ignore, so this user script removes them
// @version       0.1
// @downloadURL   https://github.com/pilkch/userscripts/raw/master/stackexchangeremovehotnetworkquestions.user.js
// @updateURL     https://github.com/pilkch/userscripts/raw/master/stackexchangeremovehotnetworkquestions.user.js
// @match         https://*.stackoverflow.com/*
// @match         https://*.stackexchange.com/*
// @grant         none
// ==/UserScript==

// Find and remove an element something like this:
// <div id="hot-network-questions" class="module tex2jax_ignore">
function RemoveHotNetworkQuestions()
{
  var hotNetworkQuestions = document.getElementById('hot-network-questions');
  if (hotNetworkQuestions != null) {
    hotNetworkQuestions.parentNode.removeChild(hotNetworkQuestions);
  }
}

(function() {
  'use strict';

  RemoveHotNetworkQuestions();
})();
