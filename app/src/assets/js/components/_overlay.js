jQuery(function ($) {
    "use strict";
    var type,
        w3c,
        start,
        webkit,
        opacity,
        banner_overlay = '.overlay',
        color_start,
        color_end,
        orientation;


    var overlay = $(banner_overlay);

    overlay.each(function () {
        var $this = $(this),
            color_start = $this.data('start'),
            color_end = $this.data('end'),
            orientation = $this.data('orientation'),
            opacity = $this.data('opacity');

        apply_gradient($this, color_start, color_end, orientation, opacity);

    });


    function apply_gradient(ele, color_start, color_end, orientation, opacity) {

        switch (orientation) {
            case 'tobottomright':
                type = "linear";
                w3c = "to bottom right";
                start = "top left";
                webkit = "left top, right bottom";
                break;
            case 'tobottom'        :
                type = "linear";
                w3c = "to bottom";
                start = "top";
                webkit = "left top, left bottom";
                break;
            case 'tobottomleft'    :
                type = "linear";
                w3c = "to bottom left";
                start = "top right";
                webkit = "right top, left bottom";
                break;
            case 'toright'        :
                type = "linear";
                w3c = "to right";
                start = "left";
                webkit = "left top, right top";
                break;
            case 'toleft'        :
                type = "linear";
                w3c = "to left";
                start = "right";
                webkit = "right top, left top";
                break;
            case 'totopright'    :
                type = "linear";
                w3c = "to top right";
                start = "bottom left";
                webkit = "left bottom, right top";
                break;
            case 'totop'        :
                type = "linear";
                w3c = "to top";
                start = "bottom";
                webkit = "left bottom, left top";
                break;
            case 'totopleft'    :
                type = "linear";
                w3c = "to top left";
                start = "bottom right";
                webkit = "right bottom, left top";
                break;
            case 'circulartopleft'        :
                type = "radial";
                w3c = "circle farthest-side at left top";
                start = "left top, circle farthest-side";
                webkit = "left top, 0, left top, 973";
                break;
            case 'circulartopcenter'    :
                type = "radial";
                w3c = "circle farthest-side at center top";
                start = "center top, circle farthest-side";
                webkit = "center top, 0, center top, 487";
                break;
            case 'circulartopright'        :
                type = "radial";
                w3c = "circle farthest-side at right top";
                start = "right top, circle farthest-side";
                webkit = "right top, 0, right top, 973";
                break;
            case 'circularmiddleleft'    :
                type = "radial";
                w3c = "circle farthest-side at left center";
                start = "left center, circle farthest-side";
                webkit = "left center, 0, left center, 973";
                break;
            case 'circularmiddlecenter'    :
                type = "radial";
                w3c = "circle farthest-side at center";
                start = "center, circle farthest-side";
                webkit = "center center, 0, center center, 487";
                break;
            case 'circularmiddleright'    :
                type = "radial";
                w3c = "circle farthest-side at right center";
                start = "right center, circle farthest-side";
                webkit = "right center, 0, right center";
                break;
            case 'circularbottomleft'    :
                type = "radial";
                w3c = "circle farthest-side at left bottom";
                start = "left bottom, circle farthest-side";
                webkit = "left bottom, 0, left bottom, 973";
                break;
            case 'circularbottomcenter'    :
                type = "radial";
                w3c = "circle farthest-side at center bottom";
                start = "center bottom, circle farthest-side";
                webkit = "center bottom, 0, center bottom, 487";
                break;
            case 'circularbottomright'    :
                type = "radial";
                w3c = "circle farthest-side at right bottom";
                start = "right bottom, circle farthest-side";
                webkit = "right bottom, 0, right bottom, 973";
                break;
            case 'ellipsetopleft'        :
                type = "radial";
                w3c = "ellipse farthest-side at left top";
                start = "left top, ellipse farthest-side";
                webkit = "left top, 0, left top, 973";
                break;
            case 'ellipsetopcenter'        :
                type = "radial";
                w3c = "ellipse farthest-side at center top";
                start = "center top, ellipse farthest-side";
                webkit = "center top, 0, center top, 487";
                break;
            case 'ellipsetopright'        :
                type = "radial";
                w3c = "ellipse farthest-side at right top";
                start = "right top, ellipse farthest-side";
                webkit = "right top, 0, right top, 973";
                break;
            case 'ellipsemiddleleft'    :
                type = "radial";
                w3c = "ellipse farthest-side at left center";
                start = "left center, ellipse farthest-side";
                webkit = "left center, 0, left center, 973";
                break;
            case 'ellipsemiddlecenter'    :
                type = "radial";
                w3c = "ellipse farthest-side at center";
                start = "center, ellipse farthest-side";
                webkit = "center center, 0, center center, 487";
                break;
            case 'ellipsemiddleright'    :
                type = "radial";
                w3c = "ellipse farthest-side at right center";
                start = "right center, ellipse farthest-side";
                webkit = "right center, 0, right center";
                break;
            case 'ellipsebottomleft'    :
                type = "radial";
                w3c = "ellipse farthest-side at left bottom";
                start = "left bottom, ellipse farthest-side";
                webkit = "left bottom, 0, left bottom, 973";
                break;
            case 'ellipsebottomcenter'    :
                type = "radial";
                w3c = "ellipse farthest-side at center bottom";
                start = "center bottom, ellipse farthest-side";
                webkit = "center bottom, 0, center bottom, 487";
                break;
            case 'ellipsebottomright'    :
                type = "radial";
                w3c = "ellipse farthest-side at right bottom";
                start = "right bottom, ellipse farthest-side";
                webkit = "right bottom, 0, right bottom, 973";
                break;

            default:
                type = "linear";
                w3c = "to right";
                start = "left";
                webkit = "left top, right top";
                break;
        }

        if (color_end) {
            jQuery(ele).css({'background': color_start, 'opacity': opacity});
            jQuery(ele).css({
                'background': '-moz-' + type + '-gradient(' + start + ', ' + color_start + ' 0%, ' + color_end + ' 100%)',
                'opacity': opacity
            });
            jQuery(ele).css({
                'background': '-webkit-gradient(' + type + ', ' + webkit + ', color-stop(0, ' + color_start + '), color-stop(1, ' + color_end + '))',
                'opacity': opacity
            });
            jQuery(ele).css({
                'background': '-webkit-' + type + '-gradient(' + start + ', ' + color_start + ' 0%, ' + color_end + ' 100%)',
                'opacity': opacity
            });
            jQuery(ele).css({
                'background': '-o-' + type + '-gradient(' + start + ', ' + color_start + ' 0%, ' + color_end + ' 100%)',
                'opacity': opacity
            });
            jQuery(ele).css({
                'background': '-ms-' + type + '-gradient(' + start + ', ' + color_start + ' 0%, ' + color_end + ' 100%)',
                'opacity': opacity
            });
            jQuery(ele).css({
                'background': '' + type + '-gradient(' + w3c + ', ' + color_start + ' 0%, ' + color_end + ' 100%)',
                'opacity': opacity
            });
            jQuery(ele).css({
                'background': 'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'' + color_start + '\', endColorstr=\'' + color_end + '\',GradientType=1 )',
                'opacity': opacity
            });
        }

        else {
            jQuery(ele).css({'background': color_start, 'opacity': opacity});
        }
    }

});
