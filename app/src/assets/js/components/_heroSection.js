jQuery(function ($) {
    "use strict";
    /*=======================================
     Hero Section
     =======================================*/
    if ($('section.hero-header').length > 0) {
        var $mainnav = $('.mainnav').height();
        $('section.hero-header').height($(window).height());
        // Window Resize
        $(window).resize(function () {
            $('section.hero-header').height($(window).height());
        });
    }
    /*=======================================
     Cut Section
     =======================================*/
    if ($('.cut').length > 0) {
        $('.cut').each(function () {
            if ($(this).hasClass('cut-top'))
                $(this).css('border-right-width', $(this).parent().width() + "px");
            else if ($(this).hasClass('cut-bottom'))
                $(this).css('border-left-width', $(this).parent().width() + "px");
        });

    }
});