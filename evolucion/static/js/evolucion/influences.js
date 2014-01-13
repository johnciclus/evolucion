/* Evolucion - Influences
 * By John Garavito 
 */
$(document).ready(function(){
  $('#influences-area .toolbar .btn-group [title]').tooltip({
      container: 'body'
    });
    
  $('#influences-area .toolbar .btn').hover(
    function() {  $(this).removeClass('btn-primary'); 
                  $(this).addClass('btn-info'); },
    function() {  $(this).removeClass('btn-info');
                  $(this).addClass('btn-primary'); }
  );
  var languageWidth = $("#language-inf").width();
  var languageHeight = $("#language-inf").height() - 4;
  
  if(languageWidth<=0){ languageWidth = 1024; }
  if(languageHeight<=0){ languageHeight = 512; }
      
  $('#svg-div-inf').width(languageWidth);
  $('#svg-div-inf').height(languageHeight);
  
  var panel = document.getElementById("svg-div-inf");
  var r = Raphael(panel, languageWidth, languageHeight);
  r.circle(50, 40, 10);
  
});