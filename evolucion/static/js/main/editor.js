require(['utils', 'evolucion', 'prose', 'influences', 'stockandflow', 'equations', 'behaviors', 'dynamos'], function() {
    
    this.evo = new Evolucion();
    this.evo.pro = this.pro = new Prose();
    this.evo.inf = this.inf = new Influences();
    this.evo.saf = this.saf = new StockAndFlow();
    this.evo.equ = this.equ = new Equations();
    this.evo.beh = this.beh = new Behaviors();
    this.evo.dyn = this.dyn = new Dynamos(this.evo.saf.list);
    
    //this.beh.graphs['graph'].redraw();
    
    $(window).resize(function(){
      evo.adjust();
    });
    
    $('#open').click(function(event){
      event.preventDefault();
      evo.actions.open();
    });
    
    $('#save').click(function(event){
      event.preventDefault();
      evo.actions.save();
    });
    
    $('#download').click(function(event){
      event.preventDefault();
      evo.actions.download();
    });
      
    utils_gui.initToolbarBootstrapBindings();
    $('#prose-editor').wysiwyg({ fileUploadError: utils_gui.showErrorAlert} );
    $('#prose-editor').html($('#prose-editor').text());
    
    var text_model = $('#model').text();
    
    if(text_model.search('<model')>=0){
      $('#xmldocument').html(text_model);
      this.evo.openDOM();      
    }
    $('#model').remove();
    
    this.evo.hideAreas();
    this.evo.showArea('overview');
        
    utils_gui.formAjax('#sign-in-form',     '#sign-in-modal #form-message');
    utils_gui.formAjax('#sign-up-form',     '#sign-up-modal #form-message');
    
    $('#logout').on('click', function(){ utils_gui.logout(); });
    
    window.prettyPrint && prettyPrint();
  
    /*
    utils_gui.formAjax('#new-project-form', '#new-project-form #form-message');
    */
});