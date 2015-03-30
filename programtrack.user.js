// ==UserScript==
// @name          ProgramTrack Helper
// @namespace     http://chris.iluo.net/userscripts/programtrack
// @description   Pick a default rating of not applicable for code reviews and make textarea fields larger
// @version       1.2
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

// Remove an option on a select element
function RemoveSelectItem(element, sTitle)
{
  var found = [];

  // Find the item in the select options
  var options = element.getElementsByTagName("option");
  for (var i = 0; i < options.length; i++) {
    // Check if the lowercase texts match
    if (options[i].value.toLowerCase() == sTitle.toLowerCase()) found.push(options[i]);
  }

  // Remove our items
  for (var i = 0; i < found.length; i++) {
    found[i].parentNode.removeChild(found[i]);
  }
}

function CharacterIsNumeric(c)
{
  return ((c >= '0') && (c <= '9'));
}

// Returns an empty string if no number was found, otherwise returns a string containing the number
function StringGetNumberFromEnd(sText)
{
  var sNumber = "";
  for (var i = sText.length; i > 0; i--) { 
    var c = sText.substring(i - 1, i);
    if (!CharacterIsNumeric(c)) break;

    // Add the character to the number
    sNumber = c + sNumber;
  }

  return sNumber;
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

  var sNumber = StringGetNumberFromEnd(url);
  if (sNumber.length != 0) {
    // Replace the ProgramTrack title with a link to the next code review
    var programtrack = document.getElementsByClassName('headerapp');
    if (programtrack.length != 0) {
      // Convert the string to a number
      var iNumber = +sNumber;

      // Build the URL to the next code review
      var sURLNext = url.substring(0, url.length - sNumber.length) + (iNumber + 1);

      // Replace the text with our new link
      programtrack[0].innerHTML = "<a href=\"" + sURLNext + "\">Next</a>";
    }
  }

  var rating = document.getElementById('103');
  if (rating) {
    // Set the default rating
    rating.value = "12$Not applicable (not enough to rate)";

    RemoveSelectItem(rating, "0$------------- Select Rating ------------");
    RemoveSelectItem(rating, "3$OK. Style, comments, naming not so hot.");
    RemoveSelectItem(rating, "4$Technical 'what if' bugs. Style good.");
    RemoveSelectItem(rating, "5$Technical 'what if' bugs. Style poor.");
    RemoveSelectItem(rating, "6$Real bugs even though style is good.");
    RemoveSelectItem(rating, "7$Real bugs and style poor.");
    RemoveSelectItem(rating, "9$-----------------------------------------");
    RemoveSelectItem(rating, "11$-----------------------------------------");
  }

  // Set the default button
  // This element does not have an id set so we hope that it is always the first element named "submit"
  var elements = document.getElementsByName("submit");
  if (elements.length != 0) elements[0].focus();

  // Now set the focus to the rating so that we can select it with the arrow keys easily
  if (rating) rating.focus();

  // Scroll to the top of the window so that we can read through the code review
  scroll(0, 0);
} else EnlargeTextAreas();
