require.config({
    baseUrl: '/static/js/',
    paths: {
        jquery:     '//code.jquery.com/jquery-1.11.0.min',
        bootstrap:  '//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min',
        holder:     'bootstrap/holder',
        utils:      'evolucion/utils'
    },
    shim: {
        bootstrap:{
            deps:['jquery']
        },
        utils:{
            deps:['jquery', 'bootstrap']
        }
    }
});

requirejs(['home/main']);