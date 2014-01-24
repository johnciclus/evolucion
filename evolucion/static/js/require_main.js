require.config({
    baseUrl: '/static/js/',
    paths: {
        poo:            'poo',
        raphael:        'raphael/raphael-min',
                
        dynamos:        'evolucion/dynamos',
        evolucion:      'evolucion/evolucion',
        prose:          'evolucion/prose',
        influences:     'evolucion/influences',
        stockandflow:   'evolucion/stockandflow',
        equations:      'evolucion/equations',
        behaviors:      'evolucion/behaviors'
    },
    shim: {
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
