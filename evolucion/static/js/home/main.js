require(['utils', 'holder'], function() {
    utils.formAjax('#sign-in-form', '#sign-in-modal #form-message');
    utils.formAjax('#sign-up-form', '#sign-up-modal #form-message');
    
    $('#logout').on('click', function(){ utils.logout(); }); 
});
