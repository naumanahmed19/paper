require('.././libs/jquery.stellar.min');
jQuery(function ($) {
    "use strict";
    $('.parallax').stellar({
        horizontalScrolling: false,
        verticalOffset: 40,
        responsive: true
    });
});