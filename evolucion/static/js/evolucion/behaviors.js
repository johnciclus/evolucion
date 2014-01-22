/* Evolucion - Behaviors
 * By John Garavito
 */
$(document).ready(function(){
  (function(){
    this.Behaviors = Class.extend({
      init: function(){
        this.id       = 'beh';
        this.div      = '#behaviors';
        this.divArea  = '#behaviors-area';
        this.language = '#language-beh';
        
        this.elements = [ 'parameter', 'stock', 'flow', 
                          'auxiliary', 'exogenous', 'delay',
                          'multiplier', 'fis', 'previousvalue',
                          'submodel' ];
        
        this.initWorkArea();
      },
      adjust: function(){
        var workAreaHeight = $('.work-area').height();
        
        $(this.divArea+' .sidebar').height(workAreaHeight);
                
        $(this.language).height(workAreaHeight - 2);
        
      },
      initWorkArea: function(){
        this.adjust();
      }
    });
  })();
});