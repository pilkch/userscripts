// ==UserScript==
// @name           Turn Autocomplete On
// @namespace      http://chris.iluo.net/userscripts/turnautocompleteon
// @description    Many sites use autocomplete="off", this script turns it on
// @version        1.0
// @include        *
// ==/UserScript==

function TurnAutoCompleteOnForElement(element)
{
  // Find the autocomplete attribute for this element
  var n = element.attributes.length;
  for (var i = 0; i < n; i++) {
    var attribute = element.attributes[i];
    if (attribute.name == 'autocomplete') {
      // Turn on autocomplete for this element
      attribute.value = 'on';

      // We found an autocomplete attribute for this element so we can finish
      break;
    }
  }
}

// Iterate through all forms and change any autocomplete attributes to true
var forms = document.getElementsByTagName('form');
for (var i = 0; i < forms.length; i++) {
  // Visit this form
  var form = forms[i];
  TurnAutoCompleteOnForElement(form);

  // Visit all children of this form too
  var elements = form.elements;
  var n = elements.length;
  for (var j = 0; j < n; j++) TurnAutoCompleteOnForElement(elements[j]);
}

