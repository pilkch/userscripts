// ==UserScript==
// @name          ProgramTrack Helper
// @namespace     http://chris.iluo.net/userscripts/programtrack
// @description   Pick a default rating of not applicable for code reviews and make textarea fields larger
// @version       1.1
// @match         http://canberra.nchsoftware.com/*
// ==/UserScript==

function StartsWith(sText, sFind)
{
  // Return true if the start of sText is the same as sFind
  return (sText.substring(0, sFind.length) == sFind);
}

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

// Disable an option on a select element
function DisableSelectItem(element, sTitle)
{
  // Find the item in the select options
  var options = element.getElementsByTagName("option");
  for (var i = 0; i < options.length; i++) {
    // Disable this option if the lowercase texts match
    if (options[i].value.toLowerCase() == sTitle.toLowerCase()) options[i].disabled = true;
  }
}

var url = document.URL;

// Apply fixes for the bug report pages
if (StartsWith(url, "http://canberra.nchsoftware.com:120/track?trackid=")) {
  // Highlight the Assessed Work field if it has not been filled in yet
  var assessedWork = document.getElementById('116');
  if (assessedWork && (assessedWork.value == "")) {
    var parent = assessedWork.parentNode;
    if (parent) {
      var warning = CreateWarning(assessedWork, "Assessed Work has not been entered");
      parent.appendChild(warning);
    }
  }
}

if (StartsWith(url, "http://canberra.nchsoftware.com:120/codereview?id=")) {
  // Apply fixes for code review pages

  var rating = document.getElementById('103');
  if (rating) {
    // Set the default rating
    rating.value = "12$Not applicable (not enough to rate)";

    DisableSelectItem(rating, "0$------------- Select Rating ------------");
    DisableSelectItem(rating, "3$OK. Style, comments, naming not so hot.");
    DisableSelectItem(rating, "4$Technical 'what if' bugs. Style good.");
    DisableSelectItem(rating, "5$Technical 'what if' bugs. Style poor.");
    DisableSelectItem(rating, "6$Real bugs even though style is good.");
    DisableSelectItem(rating, "7$Real bugs and style poor.");
    DisableSelectItem(rating, "8$Dog's breakfast. What was he thinking!");
    DisableSelectItem(rating, "9$-----------------------------------------");
    DisableSelectItem(rating, "11$-----------------------------------------");
  }

  // Set the default button
  // This element does not have an id set so we hope that it is always the first element named "submit"
  var elements = document.getElementsByName("submit");
  if (elements.length != 0) elements[0].focus();

  // Scroll to the top of the window so that we can read through the code review
  scroll(0, 0);
} else if (url != "http://canberra.nchsoftware.com:120/main") EnlargeTextAreas();

