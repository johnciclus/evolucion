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
    
    window.prettyPrint && prettyPrint();
  
    /*utils.formAjax('#sign-in-form',     '#sign-in-modal #form-message');
    utils.formAjax('#sign-up-form',     '#sign-up-modal #form-message');
    utils.formAjax('#new-project-form', '#new-project-form #form-message');
    
    $('.btn-open').on('click', utils.openProject);
    
    $('#logout').on('click', function(){ utils.logout(); });*/
});