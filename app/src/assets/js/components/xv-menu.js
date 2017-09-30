require('.././libs/jquery.dlmenu');

jQuery(function ($) {
    "use strict";
    var xv_ww = $(window).width(),
        xv_slideshow = true;

    menuInit();

    // Check If Counter In Viewport
    $(window).on('load resize', function () {
        menuInit();
    });

    function menuInit() {
        xv_ww = $(window).width();
        if ($('.nav-offcanvas').length) {
            $('.paper-nav-toggle').removeClass('dl-trigger');
        }

        if (($('.nav-offcanvas').length && xv_ww <= 1030) || $('.nav-offcanvas-desktop').length) {
            $('body').addClass('sidebar-collapse');
            $('.dl-menu').addClass("dl-menuopen");
            $('.paper-nav-toggle').removeClass('dl-trigger');
            $('.nav-offcanvas .paper_menu').addClass('main-sidebar shadow1 fixed offcanvas');
        } else {
            $('.nav-offcanvas .paper_menu').removeClass('main-sidebar shadow1 fixed offcanvas');
        }


        if (xv_ww <= 1030 || $('.mini-nav').length) {
            $('.responsive-menu').removeClass('xv-menuwrapper').addClass('dl-menuwrapper');
            $('.user-avatar').removeClass('pull-right');
            $('.lg-submenu').addClass("dl-submenu");
        } else {
            $('.responsive-menu').removeClass('dl-menuwrapper').addClass('xv-menuwrapper');
            $('.lg-submenu').removeClass("dl-submenu");
            $('.user-avatar').addClass('pull-right');
        }
    }
    $('#dl-menu').dlmenu({
        animationClasses: {
            classin: 'dl-animate-in-2',
            classout: 'dl-animate-out-2'
        }
    });
});