$(document).ready(function(){
  (function(){
    this.evo = new Evolucion();
    this.evo.inf = this.inf = new Influences();
    this.evo.saf = this.saf = new StockAndFlow();
    
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