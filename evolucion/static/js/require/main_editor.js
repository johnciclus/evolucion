require.config({
    baseUrl: '/static/js/',
    paths: {
        jquery:         '//code.jquery.com/jquery-1.11.0.min',
        jquery_hotkeys: '//mindmup.s3.amazonaws.com/lib/jquery.hotkeys',
        bootstrap:      '//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min',
        poo:            'poo',
        offcanvas:      'bootstrap/offcanvas',
        raphael:        'raphael/raphael-min',
                
        dynamos:        'evolucion/dynamos',
        evolucion:      'evolucion/evolucion',
        prose:          'evolucion/prose',
        influences:     'evolucion/influences',
        stockandflow:   'evolucion/stockandflow',
        equations:      'evolucion/equations',
        behaviors:      'evolucion/behaviors',
   
        <script src="{% static 'js/bootstrap/bootstrap-wysiwyg.js' %} "></script>
        <script src="{% static 'js/raphael/raphael-min.js' %} "></script>
        <script src="{% static 'js/prettify.js' %} "></script>
        <script src="{% static 'js/morris/morris.min.js' %} "></script>
    
        <script src="{% static 'js/evolucion/evolucion.js' %} "></script>
        <script src="{% static 'js/evolucion/prose.js' %} "></script>
        <script src="{% static 'js/evolucion/influences.js' %} "></script>
        <script src="{% static 'js/evolucion/stockandflow.js' %} "></script>
        <script src="{% static 'js/evolucion/equations.js' %} "></script>
        <script src="{% static 'js/evolucion/behaviors.js' %} "></script>
        <script src="{% static 'js/evolucion/main.js' %} "></script>   
        
        
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