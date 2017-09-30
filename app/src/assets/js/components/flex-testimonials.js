/*=================================
 Testimonial Slider Flex Based
 ==============================*/

require('.././libs/jquery.flexslider-min');

$(function () {
    $('#testimonial-slider').flexslider({
        animation: "slide",
        directionNav: false,
        controlNav: true,
        pauseOnHover: true,
        slideshowSpeed: 4000,
        slideshow: true,
        direction: "horizontal", //Direction of slides
    });
    var isSlider = false;
    $('#testimonial-slider-style2').flexslider({
        animation: "slide",
        slideshow: false,
        directionNav: false,
        controlNav: false,
        pauseOnHover: true,
        slideshowSpeed: 4000,
        direction: "horizontal", //Direction of slides
        start: function () {
            isSlider = true;
        },
    });
    $('.testimonial-slider-coltrols li').click(function () {
        if (isSlider) {
            $('#testimonial-slider-style2').flexslider($(this).index());
        }
    });
    $('.testimonial-slider-coltrols li').click(function () {
        $('.testimonial-slider-coltrols li').removeClass('active');
        $(this).addClass('active');
        $('#testimonial-slider-style2').flexslider($(this).index());
    });
});