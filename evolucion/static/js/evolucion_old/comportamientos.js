var com;

var Comportamientos = Class.extend({
	init: function(){
		this.id 	 = 'com';
		
		this.div     = '#comportamientos';
		this.len_div = '#lenguaje-com';
		this.ele_div = '#elementos-com';
		
		this.elementos = [
						'param',	'nivel',	'flujo',
						'vaaux',	'vaexo',	'retar',
						'multi',	'elfis',	'vaant',
						'submo'];
			
		this.indMenu = {};
		for(var i in this.elementos){
			this.indMenu[this.elementos[i]]=i;
		}
		
		this.graficador = undefined;
		
		$('#simular').button();
		$('#simular').click(function(e){
			var elmts = com.elemtsSelec();
			var series = ecu.simular(elmts);
			var elmts_eval = [];
			
			for(var i in elmts){
				elmts_eval.push({
					name: evo.dyn.elmts[elmts[i]].titulo,
					data: series.elseval[elmts[i]]
				});
			}
			
			com.adapVisualizador();
			com.graficador = new Highcharts.Chart({         
				chart: {
			    	renderTo: 'visualizador',
			        type: 'line'
				},
				title: {
				    text: 'Simulación'
				},
				xAxis: {
				    categories: series.tiempo
				},
				yAxis: {
				    title: {
				        text: 'Adimensional (adm)'
				    }
				},
				tooltip: {
					crosshairs: true,                
					shared: true
				},
				series: elmts_eval    
			});
			return false;
		});
		
		$('#ti_txt').change(function(){
			console.log('cambio');
			evo.dyn.ti = Number($("#ti_txt").val());
		});
		$('#tf_txt').change(function(){
			evo.dyn.tf = Number($("#tf_txt").val());
		});
		$('#dt_txt').change(function(){
			evo.dyn.dt = Number($("#dt_txt").val());
		});
		
		$("#menu-elementos-com").accordion({ header: "h3" , heightStyle: "content", collapsible: true});	//autoHeight: false,
		$("#menu-elementos-com > div > h3 ").css('padding','3px 0px 3px 25px');
		$("#menu-elementos-com > div > div").css('padding','2px 0px');	
				
		this.graficador = new Highcharts.Chart({
		    chart: {
		    	renderTo: 'visualizador',
		        type: 'line'
			},
			title: {
			    text: 'Simulación'
			},
			xAxis: {
			    categories: []
			},
			yAxis: {
			    title: {
			        text: 'Adimensional (adm)'
			    }
			},
			tooltip: {
			    valueSuffix: ' adm'
			},
			series: []
		});
	},
	saveAsDom: function(){
		var model, behavior;
		
		model = $('#xmldocument model:first');
		
		behavior = model.children('behavior');
		
		if($.isEmptyObject(behavior[0])){
			behavior = model.append($('<behavior />')).find('behavior');	
		}
		else{
			behavior.empty();
		}	
	},
	
	integrarControlesEle: function(el){
		var nomCont = '#'+el.tipo+'-'+this.id+'-div';
		
		if(el.id && el.titulo && nomCont && this.indMenu[el.tipo]){
			var html =
				"<div id='"+el.id+"_item_sim' class='eleMenu' >"+
					"<div id='"+el.id+"_item_sim_nombre' "+
					"class='eleTit' >"+
						"<input type='checkbox' id='"+el.id+"_item_sim_cb' value='"+el.id+"'>"+
						"<p>"+el.titulo+"</p>"+
					"</div>"+
				"</div>";
				
			$(nomCont).append(html);
		}
	},
	eliminarControlesEle: function(el){
		$('#'+el.id+'_item_sim').remove();
	},
	modTitMenu: function(el){
		var tit = $('#'+el.id+'_item_sim_nombre p');
		//var cbx = $('#'+el.id+'_item_sim_nombre input');
		tit.html(el.titulo);
		//cbx.val(el.nombre);
	},
	adapVisualizador: function(){
		var cant=(evo.dyn.tf-evo.dyn.ti)/evo.dyn.dt;
		var anchoContVis = $('#contVisualizador').css('width');
		anchoContVis=anchoContVis.substring(0,anchoContVis.length-2);
		
		if((cant*20) >= anchoContVis){
			$('#contVisualizador').css('width',(20*cant)+'px');
		}
		else{
			$('#contVisualizador').css('width','');
		}
	},
	elemtsSelec: function(){
		var elmts = $('#menu-elementos-com input:checkbox');
		var selec = [];
		elmts.each(function(i){
			if($(this).is(':checked')){
				selec.push($(this).val());
			}
		});
		return selec;
	}
});

$(document).ready(function() {
	// Controlador del modulo Comportamientos //
	
	com = new Comportamientos();
	evo.com = com;
	
	// Fin del Controlador del modulo Comportamientos //
});