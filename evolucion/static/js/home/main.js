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
              $('#form-message').remove();
              $('#'+idDivResponse+' .modal-body').prepend("<div id='form-message'>"+data+"</div>");
            },
            error: function(data) {
              $('#form-message').remove();
              $('#'+idDivResponse+' .modal-body').prepend("<div id='form-message'><p>Problemas de conexión, por favor refresque la página.</p></div>");
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