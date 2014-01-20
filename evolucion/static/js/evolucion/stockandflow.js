/* Evolucion - Stock and Flow
 * By John Garavito
 */
$(document).ready(function(){
  (function(){
    this.StockAndFlow = Editor.extend({
      init: function(){
        
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