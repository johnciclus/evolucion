require.config({
    baseUrl: '/assets/',
    paths: {
        poo:            'poo',
        jquery_ui:      'jquery/jquery-ui-1.9.2.custom.min',
        raphael:        'raphael/raphael-min',
        highcharts:     'highcharts/js/highcharts',
        highcharts_exp: 'highcharts/js/modules/exporting',
        highlight:      'highlight',
        
        dynamos:        'evolucion/dynamos',
        evolucion:      'evolucion/evolucion',
        prosa:          'evolucion/prosa',
        influencias:    'evolucion/influencias',
        flujonivel:     'evolucion/flujonivel',
        ecuaciones:     'evolucion/ecuaciones',
        comportamientos:'evolucion/comportamientos'
    },
    shim: {
        raphael:{
            exports: 'Raphael'
        },
        highcharts_exp:{
            deps:['highcharts']
        },
        dynamos:{
            deps:['poo']
        },
        evolucion: {
            deps:['poo', 'jquery_ui' ]
        },
        prosa: {
            deps:['evolucion']
        },
        influencias: {
            deps:['evolucion', 'raphael']
        },
        flujonivel: {
            deps:['evolucion', 'raphael', 'dynamos', 'comportamientos']
        },
        ecuaciones: {
            deps:['evolucion', 'dynamos', 'highlight']
        },
        comportamientos: {
            deps:['evolucion', 'dynamos', 'ecuaciones', 'highcharts_exp']
        }
    }
});

$(document).ready(function(){
	require(['evolucion'], function() {
	    // Controlador de Evolución //
	
	    evo = new Evolucion();
	    evo.vIE();
	    evo.ajustar();
	    
	    // Fin de Controlador de Evolución //    
	});
});