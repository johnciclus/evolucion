/* Evolucion - Prose
 * By John Garavito
 */

this.Prose = Class.extend({
  init: function(){
    this.id       = 'pro';
    this.div      = '#prose';
    this.divArea  = '#prose-area';
    this.language = '#language-pro';
    
  },
  
  saveAsDOM: function(){
    var model, prose;
    
    model = $('#xmldocument model:first');
    
    prose = model.children('prose');
    
    if($.isEmptyObject(prose[0])){
      prose = model.append($('<prose />')).find('prose'); 
    }
    else{
      prose.empty();
    }

    var title =       $(this.divArea+' #title');
    var description = $(this.divArea+' #prose-editor');
    
    prose.append($('<title />').text(title.val()));
    prose.append($('<description />').text(description.cleanHtml()));
  }
  
});
