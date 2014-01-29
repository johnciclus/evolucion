require.config({
    baseUrl: '/static/js/',
    paths: {
        jquery:         '//code.jquery.com/jquery-1.11.0.min',
        bootstrap:      '//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min',
        poo:            'poo',
        holder:         'bootstrap/holder',
        raphael:        'raphael/raphael-min',
                
        dynamos:        'evolucion/dynamos',
        evolucion:      'evolucion/evolucion',
        prose:          'evolucion/prose',
        influences:     'evolucion/influences',
        stockandflow:   'evolucion/stockandflow',
        equations:      'evolucion/equations',
        behaviors:      'evolucion/behaviors',
        
    },
    shim: {
        bootstrap:{
            deps:['jquery']
        },
        raphael:{
            exports: 'Raphael'
        },
        dynamos:{
            deps:['poo']
        },  
        evolucion: {
            deps:['poo']
        },
        prose: {
            deps:['evolucion']
        },
        influences: {
            deps:['evolucion', 'raphael']
        },
        stockandflow: {
            deps:['evolucion', 'raphael', 'dynamos', 'behaviors']
        },
        equations: {
            deps:['evolucion', 'dynamos']
        },
        behaviors: {
            deps:['evolucion', 'dynamos', 'equations']
        }
    }
});

requirejs(['home/main']);