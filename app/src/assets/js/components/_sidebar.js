/* PaperPanel
 *
 * @type Object
 * @description $.PaperPanel is the main object for the template's app.
 *              It's used for implementing functions and options related
 *              to the template. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */

require('.././libs/jquery.slimscroll');

$.PaperPanel = {};

/* --------------------
 * - PaperPanel Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.PaperPanel.options = {

    animationSpeed: 500,
    //Sidebar push menu toggle button selector
    sidebarToggleSelector: "[data-toggle='offcanvas']",
    //Activate sidebar push menu
    sidebarPushMenu: true,
    navbarMenuSlimscrollWidth: "3px",
    sidebarSlimScroll: true,
    controlSidebarOptions: {
        //Which button should trigger the open/close event
        toggleBtnSelector: "[data-toggle='control-sidebar']",
        //The sidebar selector
        selector: ".control-sidebar",
        //Enable slide over content
        slide: true
    },

    //The standard screen sizes that bootstrap uses.
    //If you change these in the variables.less file, change
    //them here too.
    screenSizes: {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
    }
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements PaperPanel's
 * functions and plugins as specified by the
 * options above.
 */
$(function () {
    "use strict";

    //Fix for IE page transitions
    $("body").removeClass("hold-transition");

    //Extend options if external options exist
    if (typeof PaperPanelOptions !== "undefined") {
        $.extend(true,
            $.PaperPanel.options,
            PaperPanelOptions);
    }

    //Easy access to options
    var o = $.PaperPanel.options;

    //Set up the object
    _init();

    //Activate the layout maker
    $.PaperPanel.layout.activate();

    //Enable sidebar tree view controls
    $.PaperPanel.tree('.sidebar');

    //Enable control sidebar
    if (o.enableControlSidebar) {
        $.PaperPanel.controlSidebar.activate();
    }

    //Activate sidebar push menu
    if (o.sidebarPushMenu) {
        $.PaperPanel.pushMenu.activate(o.sidebarToggleSelector);
    }
    /*
     * INITIALIZE BUTTON TOGGLE
     * ------------------------
     */
    $(document).click(function (e) {
        // var targetbox = $('.offcanvas');
        var targetbox = $('.paper-nav-toggle');
        if (!targetbox.is(e.target) && targetbox.has(e.target).length === 0) {
            if ($("body").hasClass('sidebar-open')) {
                $("body").removeClass('sidebar-open').addClass('sidebar-collapse').trigger('collapsed.pushMenu');
            }
        }
    });


    $('.btn-group[data-toggle="btn-toggle"]').each(function () {
        var group = $(this);
        $(this).find(".btn").on('click', function (e) {
            group.find(".btn.active").removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
        });

    });
});

/* ----------------------------------
 * - Initialize the PaperPanel Object -
 * ----------------------------------
 * All PaperPanel functions are implemented below.
 */
function _init() {
    'use strict';
    /* Layout
     * ======
     * Fixes the layout height in case min-height fails.
     *
     * @type Object
     * @usage $.PaperPanel.layout.activate()
     *        $.PaperPanel.layout.fix()
     *        $.PaperPanel.layout.fixSidebar()
     */
    if ($(".slimScroll").length && $(window).width() > 1080) {
        $(".slimScroll").slimscroll({
            height: ($(window).height()) + "px",
            color: "rgba(255,255,255,0.95)",
            size: "5px"
        });
    }

    $.PaperPanel.layout = {
        activate: function () {
            var _this = this;
            _this.fix();
            _this.fixSidebar();
            $(window, ".wrapper").resize(function () {
                _this.fix();
                _this.fixSidebar();
            });
        },
        fix: function () {
            //Get window height and the wrapper height
            var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
            var window_height = $(window).height();
            var sidebar_height = $(".sidebar").height();
            //Set the min-height of the content and sidebar based on the
            //the height of the document.
            if ($("body").hasClass("fixed")) {
                $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
            } else {
                var postSetWidth;
                if (window_height >= sidebar_height) {
                    $(".content-wrapper, .right-side").css('min-height', window_height - neg);
                    postSetWidth = window_height - neg;
                } else {
                    $(".content-wrapper, .right-side").css('min-height', sidebar_height);
                    postSetWidth = sidebar_height;
                }

                //Fix for the control sidebar height
                var controlSidebar = $($.PaperPanel.options.controlSidebarOptions.selector);
                if (typeof controlSidebar !== "undefined") {
                    if (controlSidebar.height() > postSetWidth)
                        $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
                }

            }
        },
        fixSidebar: function () {
            //Make sure the body tag has the .fixed class
            if (!$(".main-sidebar").hasClass("fixed")) {
                if (typeof $.fn.slimScroll != 'undefined') {
                    $(".sidebar").slimScroll({destroy: true}).height("auto");

                }
                return;
            } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
                window.console.error("Error: the fixed layout requires the slimscroll plugin!");
            }
            //Enable slimscroll for fixed layout
            if ($.PaperPanel.options.sidebarSlimScroll) {
                if (typeof $.fn.slimScroll != 'undefined') {
                    //Destroy if it exists
                    $(".sidebar").slimScroll({destroy: true}).height("auto");
                    //Add slimscroll

                    $(".sidebar").slimscroll({
                        height: ($(window).height()) + "px",
                        color: "rgba(0,0,0,0.3)",
                        size: "5px"
                    });
                }
            }
        }
    };


    /* PushMenu()
     * ==========
     * Adds the push menu functionality to the sidebar.
     *
     * @type Function
     * @usage: $.PaperPanel.pushMenu("[data-toggle='offcanvas']")
     */
    $.PaperPanel.pushMenu = {
        activate: function (toggleBtn) {
            //Get the screen sizes
            var screenSizes = $.PaperPanel.options.screenSizes;

            //Enable sidebar toggle
            $(document).on('click', toggleBtn, function (e) {
                e.preventDefault();
                e.stopPropagation();
                //Enable sidebar push menu
                if ($(window).width() > (screenSizes.sm - 1)) {
                    if ($("body").hasClass('sidebar-collapse')) {
                        $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                        if ($('.nav-offcanvas-desktop').length) {
                            $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
                        }

                    } else {
                        $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                    }
                }
                //Handle sidebar push menu for small screens
                else {
                    if ($("body").hasClass('sidebar-open')) {
                        $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                    } else {
                        $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
                    }
                }
            });

            $(".content-wrapper").click(function () {
                //Enable hide menu when clicking on the content-wrapper on small screens
                if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                    $("body").removeClass('sidebar-open');
                }
            });


        },
        expandOnHover: function () {
            var _this = this;
            var screenWidth = $.PaperPanel.options.screenSizes.sm - 1;
            //Expand sidebar on hover
            $('.main-sidebar').hover(function () {
                if ($('body').hasClass('sidebar-mini') &&
                    $("body").hasClass('sidebar-collapse') &&
                    $(window).width() > screenWidth) {
                    _this.expand();
                }
            }, function () {
                if ($('body').hasClass('sidebar-mini') &&
                    $('body').hasClass('sidebar-expanded-on-hover') &&
                    $(window).width() > screenWidth) {
                    _this.collapse();
                }
            });
        },
        expand: function () {
            $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
        },
        collapse: function () {
            if ($('body').hasClass('sidebar-expanded-on-hover')) {
                $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
            }
        }
    };

    /* Tree()
     * ======
     * Converts the sidebar into a multilevel
     * tree view menu.
     *
     * @type Function
     * @Usage: $.PaperPanel.tree('.sidebar')
     */
    $.PaperPanel.tree = function (menu) {
        var _this = this;
        var animationSpeed = $.PaperPanel.options.animationSpeed;
        $(document).on('click', menu + ' li a', function (e) {
            //Get the clicked link and the next element
            var $this = $(this);
            var checkElement = $this.next();

            //Check if the next element is a menu and is visible
            if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
                //Close the menu
                checkElement.slideUp(animationSpeed, function () {
                    checkElement.removeClass('menu-open');
                    //Fix the layout in case the sidebar stretches over the height of the window
                    //_this.layout.fix();
                });
                checkElement.parent("li").removeClass("active");
            }
            //If the menu is not visible
            else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                //Get the parent menu
                var parent = $this.parents('ul').first();
                //Close all open menus within the parent
                var ul = parent.find('ul:visible').slideUp(animationSpeed);
                //Remove the menu-open class from the parent
                ul.removeClass('menu-open');
                //Get the parent li
                var parent_li = $this.parent("li");

                //Open the target menu and add the menu-open class
                checkElement.slideDown(animationSpeed, function () {
                    //Add the class active to the parent li
                    checkElement.addClass('menu-open');
                    parent.find('li.active').removeClass('active');
                    parent_li.addClass('active');
                    //Fix the layout in case the sidebar stretches over the height of the window
                    _this.layout.fix();
                });
            }
            //if this isn't a link, prevent the page from being redirected
            if (checkElement.is('.treeview-menu')) {
                e.preventDefault();
            }
        });
    };
}