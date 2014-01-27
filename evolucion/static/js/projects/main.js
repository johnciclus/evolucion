$(document).ready(function(){
    
    function formAjax(idForm, idDivResponse){
        if(idForm, idDivResponse){
            var frm = $('#'+idForm);
            frm.submit(function () {
                query = $.ajax({
                    type: frm.attr('method'),
                    url: frm.attr('action'),
                    data: frm.serialize(),
                    success: function (data, textStatus, jqXHR) {
                        $('#'+idDivResponse+' #form-message').html(data);
                    },
                    error: function(data) {
                        $('#'+idDivResponse+' #form-message').html("<p>Problemas de conexión, por favor refresque la página.</p>");
                    }
                });
                return false;
            });
        }
        return false;
    }
    
  formAjax('sign_in_form', 'sign-in-modal');
  formAjax('sign_up_form', 'sign-up-modal');
});