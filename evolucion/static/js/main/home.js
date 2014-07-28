require(['utils', 'holder'], function() {
    utils_gui.formAjax('#sign-in-form', '#sign-in-modal #form-message');
    utils_gui.formAjax('#sign-up-form', '#sign-up-modal #form-message');
    
    $('#logout').on('click', function(){ utils_gui.logout(); }); 
});
