// ==UserScript==
// @name          ProgramTrack Helper
// @namespace     http://chris.iluo.net/userscripts/programtrack
// @description   Pick a default rating of not applicable for code reviews and make textarea fields larger
// @version       1.0
// @match         http://canberra.nchsoftware.com/*
// ==/UserScript==

// Create a warning
function CreateWarning(element, warning)
{
  // Add a warning after the title
  var warningTitle = document.createElement("strong");
  warningTitle.style.backgroundColor = "#FF0000";
  warningTitle.style.color = "#000000";
  warningTitle.innerHTML = "Warning: " + warning;

  return warningTitle;
}

// Makes all text areas on the page larger
function EnlargeTextAreas()
{
  // Make all textarea fields larger because they are impossibly small
  var elements = document.getElementsByTagName('textarea');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    element.setAttribute('cols', Math.max(110, 1.2 * element.getAttribute('cols')));
    element.setAttribute('rows', Math.max(12, 2 * element.getAttribute('rows')));
  }
}

function StartsWith(sText, sFind)
{
  // Return true if the start of sText is the same as sFind
  return (sText.substring(0, sFind.length) == sFind);
}

var url = document.URL;

// Apply fixes for the bug report pages
if (StartsWith(url, "http://canberra.nchsoftware.com:120/track?trackid=")) {
  // Highlight the Assessed Work field if it has not been filled in yet
  var assessedWork = document.getElementById('116');
  if (assessedWork && (assessedWork.value == "")) {
    var parent = assessedWork.parentNode;
    if (parent) {
      var warning = CreateWarning(assessedWork, "Assessed Work has not
been entered");
      parent.appendChild(warning);
    }
  }
}

if (StartsWith(url, "http://canberra.nchsoftware.com:120/codereview?id=")) {
  // Apply fixes for code review pages

  // Set the default rating
  var rating = document.getElementById('103');
  if (rating) rating.value = "10$Not applicable (not enough to rate)";

  // Set the default button
  // This element does not have an id set so we hope that it is always the first element named "submit"
  var elements = document.getElementsByName("submit");
  if (elements.length != 0) elements[0].focus();

  // Scroll to the top of the window so that we can read through the code review
  scroll(0, 0);
} else if (url != "http://canberra.nchsoftware.com:120/main") EnlargeTextAreas();

