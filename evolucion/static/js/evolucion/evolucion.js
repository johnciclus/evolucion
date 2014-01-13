/* Evolucion
 * By John Garavito 
 */
$(document).ready(function(){
  
  (function(){
    this.Evolucion = Class.extend({
      init: function(){
        this.current_container = 'overview';
        
        var areas =  ['overview', 'prose', 'influences', 'stock-and-flow', 'equations', 'behavior'];
      
        for(i in areas){
          $('#'+areas[i]+'-area').hide();
          $('#'+areas[i]+'-link').click(function(){
              var area = this.id.substring(0, this.id.lastIndexOf('-'));
              var idx = areas.indexOf(area);
              areas.splice(idx,1);
              
              for(j in areas){
                  $('#'+areas[j]+'-area').hide();
              }
              areas.splice(idx,0,area);
              $('#'+area+'-area').show();
          });
        }
        
        var influence_states =  [];
        
        $('#nav ul a').click(function(){
          if(evo.current_container != 'inicio'){
            $('#enl-'+evo.current_container).children().css('background-color', '');
            $('#enl-'+evo.current_container).children().css('color', '#DFC395');
          }
          evo.current_container = $(this).attr('href').substring(1);
          $('#enl-'+evo.current_container).children().css('background-color', '#E45E00');
          $('#enl-'+evo.current_container).children().css('color', '#FFF');
          
          require([evo.current_container], function() {
                  evo.scrollaDiv($('#'+evo.current_container));        
                });
          return false;
        });
        
      },
      adjust: function(){
        var workAreaHeight = $(window).height() - parseInt($('body').css('padding-top'));
        $('.work-area').height(workAreaHeight);
        $('#influences-area .sidebar').height(workAreaHeight);
        
        var infToolbarHeight = ($('#influences-area .toolbar').outerHeight()|46);        
        $('#influences-area .language').height(workAreaHeight - infToolbarHeight -2);
      }
    });  
  })();
  
  evo = new Evolucion();
  evo.adjust();
  
  $('#overview-area').show();
  
  $(window).resize(function(){
    evo.adjust();
  });

});

