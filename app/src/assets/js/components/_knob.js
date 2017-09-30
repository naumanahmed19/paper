require('jquery-knob');

jQuery(function ($) {
    "use strict";
    if ($('.circular-progressbar').length) {
        enableCircularProgressbars();
        // Check If Knob Is In Viewport
        $(window).bind('scroll load resize', function () {
            enableCircularProgressbars();
        });
    }
});


// Enable Circular Progressbars
function enableCircularProgressbars() {

    // Initialize Circular Progressbars
    initCircularProgressbars();

    $('.circular-progressbar').each(function () {
        /* Knob Elements */
        var knob = $(this).find('.circular-progressbar-inner input');
        var knob_percent = knob.parents('.circular-progressbar-inner').find('span.knob-percent');

        /* Knob Variables */
        var value = knob.data('value');
        var knob_val = knob.data('value');
        var knob_animated = knob.hasClass('knob-animated');

        // Animate Knob If In Viewport
        if (isElementInViewport(knob) && !knob_animated) {

            knob.addClass('knob-animated');
            $({startVal: 0}).animate({startVal: knob_val},
                {
                    duration: 1000,
                    easing: 'swing',
                    step: function () {
                        knob.val(Math.ceil(this.startVal)).trigger('change');
                        knob_percent.html(Math.ceil(this.startVal) + '<span>%</span>');
                    }
                }
            );

        }

    });
}

// init Circular ProgressBars
function initCircularProgressbars() {
    $('.circular-progressbar>input').each(function () {
        var knob = $(this);
        knob.wrap('<div class="circular-progressbar-inner"></div>');
        knob.parent().append('<span class="knob-percent"></span>');

        // Set the value
        var value = $(this).val();
        $(this).data('value', value);

        var size = 120;
        if ($(this).data('size')) {
            size = $(this).data('size');
        }
        // Initialize Knob
        $(this).knob({
            min: 0,
            max: 100,
            width: size,
            height: size,
            readOnly: true,
            displayInput: false
        });

        // Set The Start Value to 0
        $(this).val(0).trigger('change');

    });
}
