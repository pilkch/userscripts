// ==UserScript==
// @name           Dark Background
// @namespace      http://chris.iluo.net/userscripts/darkbackground
// @description    Many sites use white as a background colour, this changes the background colour to a light grey so that it doesn't burn your eyes
// @version        0.9
// @include        *
// @grant          none
// ==/UserScript==

function GetLuminanceForRGB(red, green, blue)
{
  // ITU-R BT.709 Luminance
  // http://en.wikipedia.org/wiki/Rec._709#Luma_coefficients
  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
}

// Get the named style of an element
// Stolen from http://stackoverflow.com/questions/2451803/get-computed-background-color-as-rgb-in-ie/2452075#2452075
function GetElementStyle(element, name)
{
  if (document.defaultView && document.defaultView.getComputedStyle) {
    name = name.replace(/([A-Z])/g, "-$1");
    name = name.toLowerCase();
    var style = document.defaultView.getComputedStyle(element, "");
    return (style && style.getPropertyValue(name));
  } else if (element.currentStyle) {
    return element.currentStyle[name];
  } else if (element.style[name]) {
    return element.style[name];
  }

  return null;
}

function SetDarkBackgroundForStyle(element, name)
{
  // Get the background colour
  var value = GetElementStyle(element, name);
  console.log(name + ": value=" + value);
  if (value == null) return;

  var red = 0;
  var green = 0;
  var blue = 0;
  if (value[0] == '#') {
    // #FFCC00
    var colour = value.substring(1);  // st8rip #
    var rgb = parseInt(colour, 16);   // convert rrggbb to decimal
    red = (rgb >> 16) & 0xff;     // extract red
    green = (rgb >>  8) & 0xff;   // extract green
    blue = (rgb >>  0) & 0xff;    // extract blue
  } else if (value.substring(0, 4) == "rgb(") {
    // rgb(255, 128, 0)
    var s = value.substring(4, value.length - 1).replace(/ /g, '');
    console.log("s= " + s);
    var values = s.split(',');
    red = values[0];
    green = values[1];
    blue = values[2];
    console.log("values= " + values);
  }
  //console.log("SetDarkBackgroundForStyle " + red + ", " + green + ", " + blue);

  // Get the luminance
  var luminance = GetLuminanceForRGB(red, green, blue);
  //console.log("luminance=" + luminance);

  // If it is close to white then change the background colour to a light grey
  if (luminance > 200) element.style[name] = "#F1F1F1";
}

function SetDarkBackground(element)
{
  SetDarkBackgroundForStyle(element, "backgroundColor");
}

// Iterate through all body elements, fixing the background colour
var bodyElements = document.getElementsByTagName("body");
for (var i = 0; i < bodyElements.length; i++) {
  // Visit this form
  var body = bodyElements[i];
  SetDarkBackground(body);
}
