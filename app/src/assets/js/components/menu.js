$(function () {
    $(document).click(function (e) {
        var container = $("#previews-offcanvas, .js-previews-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.js-previews-nav-toggle').addClass('paper-nav-white');

            if ($('body').hasClass('offcanvas')) {

                $('body').removeClass('offcanvas');
                $('.js-previews-nav-toggle').removeClass('active');

            }

        }
    });

});
$(function () {


    $('#page').prepend('<div id="previews-offcanvas" />');
    $('#page').prepend('<a href="#" class="js-previews-nav-toggle previews-nav-toggle previews-nav-white"><i></i></a>');
    var clone1 = $('.menu-1 > ul').clone();
    $('#previews-offcanvas').append(clone1);
    var clone2 = $('.menu-2 > ul').clone();
    $('#previews-offcanvas').append(clone2);

    $('#previews-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
    $('#previews-offcanvas')
        .find('li')
        .removeClass('has-dropdown');

    // Hover dropdown menu on mobile
    $('.offcanvas-has-dropdown').mouseenter(function () {
        var $this = $(this);

        $this
            .addClass('active')
            .find('ul')
            .slideDown(500, 'easeOutExpo');
    }).mouseleave(function () {

        var $this = $(this);
        $this
            .removeClass('active')
            .find('ul')
            .slideUp(500, 'easeOutExpo');
    });


    $(window).resize(function () {

        if ($('body').hasClass('offcanvas')) {

            $('body').removeClass('offcanvas');
            $('.js-previews-nav-toggle').removeClass('active');

        }
    });
});


$(function () {


    $('body').on('click', '.js-previews-nav-toggle', function (event) {
        var $this = $(this);


        if ($('body').hasClass('overflow offcanvas')) {
            $('body').removeClass('overflow offcanvas');
        } else {
            $('body').addClass('overflow offcanvas');
        }
        $this.toggleClass('active');
        event.preventDefault();

    });
});


$(function () {


    $('.has-dropdown').mouseenter(function () {

        var $this = $(this);
        $this
            .find('.dropdown')
            .css('display', 'block')
            .addClass('animated-fast fadeInUpMenu');

    }).mouseleave(function () {
        var $this = $(this);

        $this
            .find('.dropdown')
            .css('display', 'none')
            .removeClass('animated-fast fadeInUpMenu');
    });

});