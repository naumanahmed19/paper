if ($('#ajaxArea').length) {
    $('#ajaxArea').ajaxify({
        selector: '#ajaxArea',

        form: false,
        prefetch: false,
        requestDelay: 500
    });

}