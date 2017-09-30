jQuery(function ($) {
    "use strict";
    if ($("#contactform").length != 0) {
        $("#contactform").submit(function (e) {
            e.preventDefault();
            var name = $("#name").val(),
                email = $("#email").val(),
                subject = $("#subject").val(),
                message = $("#message").val(),
                dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message;

            if (name === '' || !IsEmail(email) || message === '') {
                $('#valid-issue').addClass('alert-danger').html('Please Provide Valid Information').slideDown();
            } else {
                $.ajax({
                    type: "POST",
                    url: "assets/php/submit.php",
                    data: dataString,
                    success: function () {
                        $('#contactform').slideUp();
                        $('#valid-issue').addClass('alert-success').html('Your message has been sent,<BR> We will contact you back with in next 24 hours.').show();
                    }
                });
            }
        });
    }
});


function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}


