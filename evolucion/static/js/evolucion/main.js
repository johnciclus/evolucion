$(document).ready(function(){
  (function(){
    this.evo = new Evolucion();
    this.evo.inf = this.inf = new Influences();
    this.evo.saf = this.saf = new StockAndFlow();
    this.evo.equ = this.equ = new Equations();
    this.evo.beh = this.beh = new Behaviors();
    
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
    
  })();

});