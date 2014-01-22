/* Evolucion - Prose
 * By John Garavito
 */
$(document).ready(function(){
  (function(){
    this.Equations = Class.extend({
      init: function(){
        this.id       = 'pro';
        this.div      = '#prose';
        this.divArea  = '#prose-area';
        this.language = '#language-pro';
        
      },
      
      saveAsDom: function(){
        var model, prose;
        
        model = $('#xmldocument model:first');
        
        prose = model.children('prose');
        
        if($.isEmptyObject(prose[0])){
          prose = model.append($('<prose />')).find('prose'); 
        }
        else{
          prose.empty();
        }
        
        prose.append($('<title />').text($('#titu_modelo').val()));
        prose.append($('<description />').text($('#desc_modelo').val())); 
      }
      
    });
  })();
});