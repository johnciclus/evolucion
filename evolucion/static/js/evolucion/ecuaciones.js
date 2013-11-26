var ecu;

var Ecuaciones = Class.extend({
	init: function(){
		this.id 	 = 'ecu';
		this.codigo	 = '';
		
		this.div     = '#ecuaciones';
		this.len_div = '#lenguaje-ecu';
		this.ele_div = '#elementos-ecu';
				
		$('#generarmt').button();
		$('#generarjs').button();
		$('#generarmt').click(function(e){
			ecu.genModeloMT([]);
			return false;
		});
		$('#generarjs').click(function(e){
		  	ecu.genModeloJS([]);
		  	return false;
		});
	},
	saveAsDom: function(){
		var model, equations;
		
		model = $('#xmldocument model:first');
		
		equation = model.children('equation');
		
		if($.isEmptyObject(equation[0])){
			equation = model.append($('<equation />')).find('equation');	
		}
		else{
			equation.empty();
		}
	},
	
	genModeloMT: function(elmts){
		evo.dyn.loadListas(fyn.lista);
		var codigo = evo.dyn.genCodigoMT(elmts);
		
		$(this.len_div).empty();
		$("<pre id='codigo' class='code' lang='js'></pre>").appendTo(this.len_div);
		$('#codigo').text(codigo);
		$('#codigo').highlight({source:1, zebra:1, indent:'space', list:'ol'});
		return codigo;			
	},
	genModeloJS: function(elmts){
		evo.dyn.loadListas(fyn.lista);
		this.codigo = evo.dyn.genCodigoJS(elmts);
		
		$(this.len_div).empty();
		$("<pre id='codigo' class='code' lang='js'></pre>").appendTo(this.len_div);
		$('#codigo').text(this.codigo);
		$('#codigo').highlight({source:1, zebra:1, indent:'space', list:'ol'});
		
		return this.codigo;  	
	},
	simular: function(elmts){
		return evo.dyn.simular(elmts);
	}
});

$(document).ready(function() {
	// Controlador del modulo Ecuaciones //
	
	ecu = new Ecuaciones();
	evo.ecu = ecu;
	
	// Fin del Controlador del modulo Ecuaciones //
});