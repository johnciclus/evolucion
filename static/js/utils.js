var utils_gui = {};

utils_gui.formAjax = function(id_form, id_response){
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

utils_gui.openProject = function () {
  var id = this.id;
  var idx = id.indexOf('-');
  var username = id.substring(0,idx);
  var modelname = id.substr(idx+1);
  window.open("/"+username+"/"+modelname+'/');
};

utils_gui.forkProject = function () {
  var id = this.id;
  var idx = id.indexOf('-');
  var lidx = id.indexOf('-fork');
  var username = id.substring(0,idx);
  var modelname = id.substring(idx+1,lidx);
  var csrf =  $("#logout-form>input[name='csrfmiddlewaretoken']");
  
  $.ajax({
    type: 'post',
    url:  '/projects/fork/',
    data: {
      'csrfmiddlewaretoken':  csrf.val(),
      'username':             username,
      'modelname':			  modelname
    },
    success: function (data, textStatus, jqXHR) {
    	console.log('ok');
      //evo.messages.success(data);
    },
    error: function(data) {
      //evo.messages.error(data);
      //$(id_response).html("<p>Problemas de conexión, por favor refresque la página.</p>");
    }
  });  
  
  //window.open("/"+username+"/"+modelname+'/');
};

utils_gui.deleteProject = function(){
  var id = this.id;
  var idx = id.indexOf('-');
  var lidx = id.indexOf('-delete');
  var username = id.substring(0,idx);
  var modelname = id.substring(idx+1,lidx);
  
  console.log(username);
  console.log(modelname);
  
  var csrf =  $("#logout-form>input[name='csrfmiddlewaretoken']");
  
  $.ajax({
    type: 'post',
    url:  '/projects/delete/',
    data: {
      'csrfmiddlewaretoken':  csrf.val(),
      'username':             username,
      'modelname':			  modelname
    },
    success: function (data, textStatus, jqXHR) {
    	console.log('ok');
      //evo.messages.success(data);
    },
    error: function(data) {
      //evo.messages.error(data);
      //$(id_response).html("<p>Problemas de conexión, por favor refresque la página.</p>");
    }
  });  
  
}

utils_gui.logout = function(){
 $('#logout-form').submit();
 return false; 
};

utils_gui.initToolbarBootstrapBindings = function() {
  var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
        'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
        'Times New Roman', 'Verdana'],
        fontTarget = $('[title=Font]').siblings('.dropdown-menu');
  $.each(fonts, function (idx, fontName) {
      fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
  });
  $('a[title]').tooltip({container:'body'});
  $('.dropdown-menu input').click(function() {return false;})
    .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
    .keydown('esc', function () {this.value='';$(this).change();});

  $('[data-role=magic-overlay]').each(function () { 
    var overlay = $(this), target = $(overlay.data('target')); 
    overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
  });
  if ("onwebkitspeechchange"  in document.createElement("input")) {
    var editorOffset = $('#prose-editor').offset();
    $('#voiceBtn').css('position','absolute').offset({top: editorOffset.top, left: editorOffset.left+$('#prose-editor').innerWidth()-35});
  } else {
    $('#voiceBtn').hide();
  }
};

utils_gui.showErrorAlert = function(reason, detail) {
  var msg='';
  if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
  else {
    console.log("error uploading file", reason, detail);
  }
  $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
   '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
};

window.utils_gui = utils_gui;