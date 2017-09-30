function onScroll() {
    if ($(window).scrollTop() > 50) {
        $('nav.original').css('opacity', '0');
        $('nav.navbar-fixed-top').css('opacity', '1');

    } else {
        $('nav.original').css('opacity', '1');
        $('nav.navbar-fixed-top').css('opacity', '0');
    }
}

jQuery(function ($) {
    "use strict";
    if ($('.nav-fixed').length > 0) {
        $('nav').addClass('original').clone().insertAfter('nav').addClass('navbar-fixed-top').css('position', 'fixed').css('top', '0').css('margin-top', '0').removeClass('original');
        $('.mobile-nav ul').html($('nav .navbar-nav').html());
        $('nav.navbar-fixed-top .navbar-brand img').attr('src', $('nav.navbar-fixed-top .navbar-brand img').data("active-url"));

        window.addEventListener('scroll', onScroll, false);
    }
});