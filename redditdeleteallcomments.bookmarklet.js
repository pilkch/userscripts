// Bookmarklet to delete all comments on the current page
javascript:(function () {
    var $domNodeToIterateOver = $('.del-button .option .yes'),
        currentTime = 0,
        timeInterval = 1500;

    $domNodeToIterateOver.each(function() {
        var _this = $(this);
        currentTime = currentTime + timeInterval;

        setTimeout(function() {
            _this.click();
        }, currentTime);
    });
})();
