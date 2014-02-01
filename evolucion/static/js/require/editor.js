require.config({
    baseUrl: '/static/js/',
    paths: {
        poo:            'poo',
        jquery:         '//code.jquery.com/jquery-1.11.0.min',
        jquery_hotkeys: '//mindmup.s3.amazonaws.com/lib/jquery.hotkeys',
        bootstrap:      '//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min',
        offcanvas:      'bootstrap/offcanvas',
        prettify:       'bootstrap/prettify',
        wysiwyg:        'bootstrap/bootstrap-wysiwyg',
        raphael:        'raphael/raphael-min',
        morris:         'morris/morris.min',
                
        evolucion:      'evolucion/evolucion',
        prose:          'evolucion/prose',
        influences:     'evolucion/influences',
        stockandflow:   'evolucion/stockandflow',
        equations:      'evolucion/equations',
        behaviors:      'evolucion/behaviors',
        
        utils:          'utils'
    },
    shim: {
        bootstrap:{
            deps:['jquery']
        },
        jquery_hotkeys:{
            deps:['jquery']
        },
        offcanvas:{
            deps:['bootstrap']
        },
        prettify:{
            deps:['bootstrap']
        },
        wysiwyg:{
            deps:['bootstrap', 'prettify', 'jquery_hotkeys']
        },
        raphael:{
            exports: 'Raphael'
        },
        morris:{
            deps:['jquery', 'raphael']
        },
        utils:{
            deps:['jquery', 'bootstrap']
        },
        evolucion: {
            deps:['poo', 'jquery', 'offcanvas']
        },
        prose: {
            deps:['evolucion', 'wysiwyg']
        },
        influences: {
            deps:['evolucion', 'raphael']
        },
        stockandflow: {
            deps:['evolucion', 'raphael']
        },
        equations: {
            deps:['evolucion']
        },
        behaviors: {
            deps:['evolucion', 'morris']
        }
    }
});

requirejs(['main/editor']);