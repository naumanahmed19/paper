(function () {
    'use strict';
    $("body").on("click", ".closePromotions", function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.parent().slideUp();
    });
}());