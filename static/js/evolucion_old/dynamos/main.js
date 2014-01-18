
var divs = {parametros: 	 '#divParametros', 
			auxiliares: 	 '#divAuxiliares',
			niveles:		 '#divNiveles',
			flujos:			 '#divFlujos',
			multiplicadores: '#divMultiplicadores',
			accordion:		 '#accordion'};

var controls = {	ti: '#ti',
					tf: '#tf',
					dt: '#dt'
								};
var viewer = 'viewer_simulations';

sysDyn.load('/modelo_agricola.xml', viewer, divs, controls);

