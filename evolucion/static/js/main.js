$(document).ready(function(){
    
    function formAjax(idForm, idDivResponse){
        if(idForm, idDivResponse){
            var frm = $('#'+idForm);
            frm.submit(function () {
                $.ajax({
                    type: frm.attr('method'),
                    url: frm.attr('action'),
                    data: frm.serialize(),
                    success: function (data) {
                        $('#form_message').remove();
                        $('#'+idDivResponse+' .modal-body').prepend("<div id='form_message'>"+data+"</div>");
                    },
                    error: function(data) {
                        $('#form_message').remove();
                        $('#signUpModal .modal-body').prepend("<div id='form_message'><p>Problemas de conexión, por favor refresque la página.</p></div>");
                        //$("#MESSAGE-DIV").html("Something went wrong!");
                    }
                });
                return false;
            });
        }
        return false;
    }
    
	formAjax('sign_in_form', 'signInModal');
	formAjax('sign_up_form', 'signUpModal');
});