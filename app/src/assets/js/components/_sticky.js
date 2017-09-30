require('.././libs/stickyfill.min');

jQuery(function ($) {
    "use strict";
    if ($('.sticky').length) {
        $('.sticky').Stickyfill();
    }
});

