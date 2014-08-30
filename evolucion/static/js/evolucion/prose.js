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
    var errors = [];
    
    model = $('#xmldocument model:first');
    if(model){
    	prose = model.children('prose:last');
    	
	    if($.isEmptyObject(prose[0])){
	      prose = model.append($('<prose />')).find('prose'); 
	    }
	    else{
	      prose.empty();
	    }
	
	    var title =       $(this.divArea+' #title');
	    var description = $(this.divArea+' #prose-editor');
	    var keywords    = $(this.divArea+' #keywords');
	    
	    if(title.val() != ""){
	    	prose.append($('<title />').text(title.val()));
	    }
	    else{
	    	errors.push('El proyecto no tiene titulo');	
	    }
	    if(description.cleanHtml() != ""){
	    	prose.append($('<description />').text(description.cleanHtml()));
	    }
	    else{
	    	errors.push('El proyecto no tiene descripción');	
	    }
	    if(keywords.val() != ""){
	    	prose.append($('<keywords />').text(keywords.val()));
	    }
	    else{
	    	errors.push('El proyecto no tiene palabras claves');	
	    }
    }
    else{
    	errors.push('Error en el almacenamiento del modelo');
    }
    
    return errors;
  }
});
