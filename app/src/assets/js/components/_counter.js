require('.././libs/jquery.countdown.min');

jQuery(function ($) {
    "use strict";

    // Initialize Counters
    $('.sc-counter').each(function () {
        $(this).data('value', $(this).text()).text(0);
    });

    counterStart();

    // Check If Counter In Viewport
    $(window).on('load resize scroll', function () {
        counterStart();
    });

    function counterStart() {
        $('.sc-counter').each(function () {

            /* Counter Elements */
            var counter = $(this);

            /* Counter Variables */
            var counter_value = counter.data('value');

            var counter_animated = counter.hasClass('counter-animated');

            /* Animate If In Viewport */
            if (isElementInViewport(counter) && !counter_animated) {

                counter.addClass('counter-animated');
                $({startVal: 0}).animate({startVal: counter_value},
                    {
                        duration: 3000,
                        easing: 'swing',
                        step: function () {
                            counter.text(getNumberWithCommas(Math.ceil(this.startVal)));
                        }
                    }
                );

            }
        });
    }

});
