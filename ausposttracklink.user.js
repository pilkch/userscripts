// ==UserScript==
// @name           Auspost Track
// @namespace      http://chris.iluo.net/userscripts/ausposttrack
// @description    Change the tracking numbers into hyperlinks for bricklink
// @version        0.9
// @include        https://www.bricklink.com/orderDetail*
// @grant          none
// ==/UserScript==

function CreateLink(trackingNumber)
{
  var url = "https://auspost.com.au/mypost/track/#/details/" + trackingNumber;

  var a = document.createElement('a');
  a.href = url;
  a.title = url;
  a.appendChild(document.createTextNode(trackingNumber));
  return a;
}

function ProcessBrickLink()
{
  // Get all the td elements
  var cells = document.getElementsByTagName("td");
  console.log("cells found " + cells.length);

  // Just in case there are more than one...
  for (var i = 0; i < cells.length; i++) {
    var text = cells[i].textContent.replace(/\s+/g, " ").trim();
    // Check if this is the tracking number title cell
    if (text === 'Tracking No:') {
      console.log("Cell " + i + " Found tracking number");
      // Get the next element which is the tracking number
      var next = cells[i].nextElementSibling;
      var trackingNumber = next.textContent;
      next.textContent = "";

      // Create a link to the auspost website
      var a = CreateLink(trackingNumber);

      // Add it to tracking number node
      next.appendChild(a);
    } else {
      console.log("Cell " + i + " Not found: \"" + text + "\"");
    }
  }
}

// Work out which site we are on
var current_url = document.location.href;
if (current_url.startsWith("https://www.bricklink.com/orderDetail")) {
  ProcessBrickLink();
}

