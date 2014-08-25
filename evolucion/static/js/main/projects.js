require(['utils'], function() {
  
    utils_gui.formAjax('#sign-in-form',     '#sign-in-modal #form-message');
    utils_gui.formAjax('#sign-up-form',     '#sign-up-modal #form-message');
    utils_gui.formAjax('#new-project-form', '#new-project-form #form-message');
    
    $('.btn-open').on('click', utils_gui.openProject);
    
    $('.btn-delete').on('click', utils_gui.deleteProject);
    
    $('#logout').on('click', function(){ utils_gui.logout(); });
});