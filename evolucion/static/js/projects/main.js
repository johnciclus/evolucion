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
                        console.log(textStatus);
                        console.log(jqXHR);
                        console.log(jqXHR.status);
                        console.log(jqXHR.complete());
                        console.log(jqXHR.getResponseHeader('method'));
                        console.log(query.getAllResponseHeaders());
                        $('#form_message').remove();
                        $('#'+idDivResponse+' .modal-body').prepend("<div id='form_message'>"+data+"</div>");
                    },
                    error: function(data) {
                        $('#form_message').remove();
                        $('#'+idDivResponse+' .modal-body').prepend("<div id='form_message'><p>Problemas de conexión, por favor refresque la página.</p></div>");
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