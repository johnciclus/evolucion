(function(jQuery){
  jQuery(document).ready(function() {
    
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
    }
    
    formAjax('sign-in-form', 'sign-in-modal');
    formAjax('sign-up-form', 'sign-up-modal');

  });
}(jQuery));