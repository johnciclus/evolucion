$(document).ready(function(){
	var frm = $('#sign_up_form');
    frm.submit(function () {
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {
                $('#form_message').remove();
                $('#signUpModal .modal-header').append("<div id='form_message'>"+data+"</div>");
            },
            error: function(data) {
                $('#form_message').remove();
                $('#signUpModal .modal-header').append("<div id='form_message'><p>Problemas de conexión, por favor refresque la página.</p></div>");
                //$("#MESSAGE-DIV").html("Something went wrong!");
            }
        });
        return false;
    });
});