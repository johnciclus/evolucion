require(['utils'], function() {
  
    utils.formAjax('#sign-in-form',     '#sign-in-modal #form-message');
    utils.formAjax('#sign-up-form',     '#sign-up-modal #form-message');
    utils.formAjax('#new-project-form', '#new-project-form #form-message');
    
    $('.btn-open').on('click', utils.openProject);
});