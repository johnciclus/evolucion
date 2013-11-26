var pro;

var Prosa = Class.extend({
	init: function(){
		this.id 	 = 'pro';
		this.div     = '#prosa';
		
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

$(document).ready(function() {
	// Controlador del modulo Prosa //
	
	pro = new Prosa();
	evo.pro = pro;
	// Fin del Controlador del modulo Prosa //
});