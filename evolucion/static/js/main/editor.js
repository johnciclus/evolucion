require(['utils', 'evolucion', 'prose', 'influences', 'stockandflow', 'equations', 'behaviors'], function() {
    
    this.evo = new Evolucion();
    this.evo.pro = this.pro = new Prose();
    this.evo.inf = this.inf = new Influences();
    this.evo.saf = this.saf = new StockAndFlow();
    this.evo.equ = this.equ = new Equations();
    this.evo.beh = this.beh = new Behaviors();
    
    
    //this.beh.graphs['graph'].redraw();
      
    //this.evo.dyn = new Dynamos(evo.fyn.list);
    
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
    
    $('#xmldocument').html($('#model').text());
    $('#model').remove();
    
    this.evo.readXML();
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