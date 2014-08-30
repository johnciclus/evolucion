require(['utils', 'holder'], function() {
    utils_gui.formAjax('#sign-in-form', '#sign-in-modal #form-message');
    utils_gui.formAjax('#sign-up-form', '#sign-up-modal #form-message');
    
    $('#sign-in-modal').on('show.bs.modal', function () {
    	$('#sign-in-form')[0].reset();
    	$('#sign-in-form #form-message').children().remove();
	});
	
	$('#sign-up-modal').on('show.bs.modal', function () {
        $('#sign-up-form')[0].reset();
        $('#sign-up-form #form-message').children().remove();
	});
    
    $('#logout').on('click', function(){ utils_gui.logout(); }); 
});
