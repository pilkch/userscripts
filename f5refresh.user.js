// ==UserScript==
// @name           F5 Refresh
// @namespace      http://chris.iluo.net/userscripts/f5refresh
// @description    Allow F5 and Ctrl+F5 to refresh the page
// @version        1.0
// @include        *
// ==/UserScript==

(function(){
  const KEY_CONTROL = 17;
  const KEY_F5 = 116;

  var bIsControlDown = false;

  function OnKeyDown(event)
  {
    // Take note of the control key for later
    if (event.keyCode == KEY_CONTROL) bIsControlDown = true;
  }

  function OnKeyUp(event)
  {
    if (event.keyCode == KEY_F5) {
      top.location.reload(bIsControlDown);
      bIsControlDown = false;
    }
  }

  document.documentElement.addEventListener("keydown", OnKeyDown, true);
  document.documentElement.addEventListener("keyup", OnKeyUp, true);
})();
