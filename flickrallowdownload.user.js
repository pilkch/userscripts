// ==UserScript==
// @name           Flickr allow image download
// @namespace      http://chris.iluo.net/userscripts/
// @description    Removes the "facade-of-protection-zoom" overlay so that you can interact with the image
// @version        0.1
// @match          *://www.flickr.com/photos/*
// @match          *://flickr.com/photos/*
// @grant          none
// ==/UserScript==

console.log("chris");

// Delete the facade-of-protection-zoom and similar elements as they are created when an image is shown
document.body.addEventListener('DOMSubtreeModified', function () {
    [].forEach.call(document.querySelectorAll('.facade-of-protection-zoom, .facade-of-protection-neue, .photo-notes-scrappy-view'), function(d) {
        d.remove();
    });
}, false);

