require.config({
    baseUrl: '/static/js/',
    paths: {
        jquery:     'jquery/jquery-1.11.0.min',                 //'//code.jquery.com/jquery-1.11.0.min',
        bootstrap:  'bootstrap/bootstrap.min',                  //'//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min',
        holder:     'bootstrap/holder',
        
        utils:      'utils'
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

requirejs(['main/home']);