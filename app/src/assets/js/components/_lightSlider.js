require('lightslider');

jQuery(function ($) {
    "use strict";
    lightSlider();
});

var lightSlider = function () {

    var clientSlider = $('#clientSlider').lightSlider({
        adaptiveHeight: true,
        item: 5,
        slideMargin: 0,
        auto: true,
        loop: false,
        pauseOnHover: true,

    });

    var light = $(".lightSlider");

    light.each(function () {
        var $this = $(this);
        $this.lightSlider({
            verticalHeight: $this.data('vertical-height'),
            autoWidth: $this.data('auto-width'),
            slideWidth: $this.data('slide-width'),
            //   centerSlide:$this.data('center-slide'),
            centerSlide: true,
            gallery: $this.data('gallery'),
            thumbItem: $this.data('thumbs'),
            thumbMargin: $this.data('margin'),
            item: $this.data('item'),
            loop: $this.data('loop'),
            mode: $this.data('mode'),
            adaptiveHeight: $this.data('adaptive-height'),
            speed: $this.data('speed'),
            auto: $this.data('auto'),
            pause: $this.data('pause'),
            pauseOnHover: $this.data('pause-on-hover'),
            pager: $this.data('pager'),
            slideMargin: $this.data('slide-margin'),
            vThumbWidth: 80,
            currentPagerPosition: $this.data('position'),
            controls: $this.data('controls'),
            prevHtml: '<span class="icon-left-arrow"></span>',
            nextHtml: '<span class="icon-right-arrow"></span>',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        item: $this.data('item-lg'),
                        slideMove: 1,
                        slideMargin: 6,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        item: $this.data('item-md'),
                        slideMove: 1,
                        slideMargin: 6,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        item: $this.data('item-sm'),
                        slideMove: 1
                    }
                }
            ],
            onSliderLoad: function () {
                if ($this.data('start')) {
                    $this.goToSlide($this.data('start'));
                }
                $this.addClass('showSlider');
            },

            onAfterSlide: function (el) {
                $('.lslide .animated').removeClass("go");
                $('.lslide.active .animated').addClass("go");

            },
        });
    });
    //
};