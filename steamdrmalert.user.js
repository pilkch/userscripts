// ==UserScript==
// @name          Steam DRM Alert
// @namespace     http://chris.iluo.net/userscripts/steamdrmalert
// @description   Show a warning when a game is DRM restricted
// @version       1.0
// @match         http://store.steampowered.com/*
// @match         https://store.steampowered.com/*
// ==/UserScript==

var drmFound = [];

// Show a warning on the page
function ShowWarningOnPage()
{
  // Add a warning after the title
  var blockbg = document.getElementsByClassName("blockbg")[1];
  var warningTitle = document.createElement("strong");
  warningTitle.style.backgroundColor = "#FF0000";
  warningTitle.style.color = "#000000";
  warningTitle.innerHTML = "Warning! DRM restricted.";

  blockbg.appendChild(warningTitle);

  // Add a warning at the top of the description
  var game_area_purchase_game_wrapper = document.getElementsByClassName("game_area_purchase_game_wrapper")[0];
  var game_area_purchase = document.getElementById("game_area_purchase");
  var warningDescription = document.createElement("div");
  warningDescription.className = "game_area_purchase_game_wrapper";
  warningDescription.style.backgroundColor = "#FF0000";
  warningDescription.style.color = "#000000";
  warningDescription.innerHTML = "<strong>Warning! This product is DRM restricted. " + drmFound.join(", ") + "</strong>";

  game_area_purchase.insertBefore(warningDescription, game_area_purchase_game_wrapper);
}

// Shows a lightbox warning that covers the whole screen
function ShowWarningLightbox()
{
  // Dark disabled area
  var lightBoxDisabled = document.createElement('div');
  lightBoxDisabled.id = 'lightBoxDisabled';
  lightBoxDisabled.setAttribute('style', 'background-color: #000000; -moz-opacity: 0.75');
  lightBoxDisabled.style.position = 'absolute';
  lightBoxDisabled.style.zIndex = 10000;
  lightBoxDisabled.style.left = '0px';
  lightBoxDisabled.style.top = '0px';
  lightBoxDisabled.style.width = '100%';
  lightBoxDisabled.style.height = document.body.clientHeight + 'px';
  lightBoxDisabled.addEventListener('click', function() {
    delete document.body.removeChild(document.getElementById('lightBoxWarning'));
    delete document.body.removeChild(this);
  }, true);
  document.body.appendChild(lightBoxDisabled);

  // Warning overlay
  var lightBoxWarning = document.createElement('div');
  lightBoxWarning.id = 'lightBoxWarning';
  lightBoxWarning.style.position = 'fixed';
  lightBoxWarning.style.zIndex = 10001;
  lightBoxWarning.style.left = '30%';
  lightBoxWarning.style.top = '35%';
  lightBoxWarning.style.width = '40%';
  lightBoxWarning.style.height = '20%';
  lightBoxWarning.style.backgroundColor = "#FF0000";
  lightBoxWarning.style.color = "#000000";
  lightBoxWarning.style.fontSize = "20px";
  lightBoxWarning.innerHTML = "<strong>Warning! This product is DRM restricted.<br/>" + drmFound.join(", ") + "</strong>";
  lightBoxWarning.addEventListener('click', function() {
    delete document.body.removeChild(document.getElementById('lightBoxDisabled'));
    delete document.body.removeChild(this);
  }, true);
  document.body.appendChild(lightBoxWarning);
}


// Find and highlight the DRM lines
function FindAndHighlight(el, regex)
{
  var drm = el.innerHTML.match(regex);
  if (drm) {
    el.innerHTML = el.innerHTML.replace(regex, "<span style='color:#000000;background-color:#FF0000'>$1</span>");
    for (var i = 0; i < drm.length; i++) {
      drmFound.push(drm[i]);
    }
  }
}

FindAndHighlight(document.body, /(Games For Windows - Live|3rd-party DRM|SecuROM™|5 machine activation limit)/g);

// Show warnings
if (drmFound.length !== 0) {
  ShowWarningOnPage();
  ShowWarningLightbox();
}
