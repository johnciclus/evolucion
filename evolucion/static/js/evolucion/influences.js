/* Evolucion - Influences
 * By John Garavito 
 */
$(document).ready(function(){
  
  (function(){
    this.Influences = Class.extend({
      init: function(){
        this.div      = '#influences';
        this.svg      = '#svg-inf';
        this.svg_div  = '#svg-div-inf';
        
        this.states = [];
        
        var workAreaHeight = $('.work-area').height();
        
        $('#influences-area .sidebar').height(workAreaHeight);
        var infToolbarHeight = ($('#influences-area .toolbar').outerHeight() || 46);
        var languageWidth  = ((Math.floor($('.work-area').width()*0.83)-2) || 1024);
        var languageHeight = workAreaHeight - infToolbarHeight -2;
        $('#language-inf').height(languageHeight);        
        
        var panel = document.getElementById("svg-div-inf");
        var r = Raphael(panel, languageWidth, languageHeight);
        r.circle(50, 40, 10);
        
        $(this.svg_div).children().attr('id', 'svg-inf');
        
        $('#svg-div-inf').width(languageWidth);
        $('#svg-div-inf').height(languageHeight);
             
        $('#influences-area .toolbar .btn-group [title]').tooltip({ container: 'body' });
        
        $('#influences-area .toolbar .btn').hover(
          function() {  $(this).removeClass('btn-primary'); 
                        $(this).addClass('btn-info'); },
          function() {  $(this).removeClass('btn-info');
                        $(this).addClass('btn-primary'); }
        );
        
        
      },
      adjust: function(){
        var workAreaHeight = $('.work-area').height();
        
        $('#influences-area .sidebar').height(workAreaHeight);
        var infToolbarHeight = ($('#influences-area .toolbar').outerHeight()||46);        
        $('#language-inf').height(workAreaHeight - infToolbarHeight -2);
        
        var languageWidth = $("#language-inf").width();
        var languageHeight = $("#language-inf").height();
        
        if(languageWidth<=0){ languageWidth = 1024; }
        if(languageHeight<=0){ languageHeight = 768; }
        
        if($('#svg-inf').width()<languageWidth){
          $('#svg-inf').width(languageWidth);
          $('#svg-div-inf').width(languageWidth);
        }
        if($('#svg-inf').height()<languageHeight){
          $('#svg-inf').height(languageHeight);
          $('#svg-div-inf').height(languageHeight);
        }
      }
    });
  })();  
  
});