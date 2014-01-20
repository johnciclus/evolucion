/* Evolucion - Stock and Flow
 * By John Garavito
 */
$(document).ready(function(){
  (function(){
    this.StockAndFlow = Editor.extend({
      init: function(){
        this._super(this.initWorkArea());
        
        this.id       = 'saf';
        this.div      = '#stockandflow';
        this.svg      = '#svg-saf';
        this.svgDiv   = '#svg-div-saf';
        this.state    = 'cursor';
        
        this.elements = [ 'parameter', 'stock', 'flow', 
                          'auxiliary', 'exogenous', 'delay',
                          'multiplier', 'fis', 'previousvalue',
                          'submodel', 'clone'];
        this.states   = this.elements.concat(
                        ['relation', 'sectorsaf']);
        
        for(var i in this.states){
          this.list[this.states[i]] = {};
          this.idx[this.states[i]]  = 0;
          this.tmp[this.states[i]]  = undefined;
        }
        
        this.defActions();
        this.defineCtx();
        this.activateState(this.state);
      },
      initWorkArea: function(){
        
      },
      
      
      existeNivelPt: function(p){
        var existe = false;
        if(this.list.nivel){  
          for( var n in this.list.nivel){
            existe = Raphael.isPointInsidePath(this.list.nivel[n].border, p.x, p.y);     
            if(existe){
              return this.list.nivel[n];
            }
          }
        }
        return undefined;
      }
    });
  
  })();
});