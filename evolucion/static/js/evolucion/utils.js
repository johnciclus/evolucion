var utils = {};

utils.formAjax = function(id_form, id_response){
  if(id_form && id_response){
    var frm = $(id_form);
    if(frm){
      frm.submit(function (){
        query = $.ajax({
          type: frm.attr('method'),
          url: frm.attr('action'),
          data: frm.serialize(),
          success: function (data, textStatus, jqXHR) {
            $(id_response).html(data);
          },
          error: function(data) {
            $(id_response).html("<p>Problemas de conexión, por favor refresque la página.</p>");
          }
        });
        return false;
      });
    }
  }
};

utils.openProject = function () {
  var id = this.id;
  var idx = id.indexOf('-');
  var username = id.substring(0,idx);
  var modelname = id.substr(idx+1);
  window.open("/"+username+"/"+modelname+'/');
};

utils.logout = function(){
 $('#logout-form').submit();
 return false; 
};

window.utils = utils;