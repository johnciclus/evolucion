/* Evolucion
 * By John Garavito 
 */
$(document).ready(function(){
  
  (function(){
    this.Evolucion = Class.extend({
      init: function(){
        $('#overview-area').show();
        this.current_container = 'overview';
        
        this.areas =  ['overview', 'prose', 'influences', 'stock-and-flow', 'equations', 'behaviors'];
        this.alias =  ['ove', 'pro', 'inf', 'saf', 'equ', 'beh'];
      
        for(i in this.areas){
          $('#'+this.areas[i]+'-area').hide();
          $('#'+this.areas[i]+'-link').click(function(event){
              event.preventDefault();
              var area = this.id.substring(0, this.id.lastIndexOf('-'));
              var idx = evo.areas.indexOf(area);
              evo.areas.splice(idx,1);
              
              for(j in evo.areas){
                  $('#'+evo.areas[j]+'-area').hide();
              }
              evo.areas.splice(idx,0,area);
              $('#'+area+'-area').show();
              evo.current_container = area;
          });
        }
      },
      adjust: function(){
        var workAreaHeight = $(window).height() - parseInt($('body').css('padding-top'));
        $('.work-area').height(workAreaHeight);
        $('#influences-area .sidebar').height(workAreaHeight);
        
        var infToolbarHeight = ($('#influences-area .toolbar').outerHeight()|46);        
        $('#influences-area .language').height(workAreaHeight - infToolbarHeight -2);
      },
      aliasArea: function(area_name){
        var idx = this.areas.indexOf(area_name);
        if(idx >=0){ return this.alias[idx]; }
        return undefined;
      },
      download: function(){
        alert('download');      
      },
      messages: {
        error: function(area_name, message){
          var alias = evo.aliasArea(area_name);
          if(alias){
            $('#messages-'+alias).append(
              '<div class="alert alert-dismissable alert-danger">'+
                '<button type="button" class="close" data-dismiss="alert">×</button>'+
                message+
                //'<strong>Oh snap!</strong> <a href="#" class="alert-link">Change a few things up</a> and try submitting again.'+
              '</div>'
            );
          }
        },
        info: function(area_name, message){
          var alias = evo.aliasArea(area_name);
          if(alias){
            $('#messages-'+alias).append(            
              '<div class="alert alert-dismissable alert-info">'+
                '<button type="button" class="close" data-dismiss="alert">×</button>'+
                 message+
                //'<strong>Heads up!</strong> This <a href="#" class="alert-link">alert needs your attention</a>, but it\'s not super important.'+
              '</div>'
            );
          }          
        },        
        success: function(area_name, message){
          var alias = evo.aliasArea(area_name);
          if(alias){
            $('#messages-'+alias).append(            
              '<div class="alert alert-dismissable alert-success">'+
                '<button type="button" class="close" data-dismiss="alert">×</button>'+
                message+
                //'<strong>Well done!</strong> You successfully read <a href="#" class="alert-link">this important alert message</a>.'+
              '</div>'
            );
          }
        },
        warning: function(area_name, message){
          var alias = evo.aliasArea(area_name);
          if(alias){
            $('#messages-'+alias).append(            
              '<div class="alert alert-dismissable alert-warning">'+
                '<button type="button" class="close" data-dismiss="alert">×</button>'+
                message+
                //'<h4>Warning!</h4>'+
                //'<p>Best check yo self, you\'re not looking too good. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, <a href="#" class="alert-link">vel scelerisque nisl consectetur et</a>.</p>'+
              '</div>'
            );
          }
        }
      },
      open: function(){
        alert('open');      
      },
      save: function(){
        var root = $('#xmldocument');
    
        var model = $('#xmldocument model:first');
        $(model).attr('id', 1);
        
        if(this.pro){
          this.pro.saveAsDom();
        }
        if(this.inf){
          this.inf.saveAsDom();
        }
        if(this.saf){
          this.saf.saveAsDom();
        }
        if(this.equ){
          this.equ.saveAsDom();
        }
        if(this.beh){
          this.com.saveAsDom();
        }
        
        $.ajax({
          url: '/save',
          type: 'POST',
          //headers: {  'X-CSRF-Token': $("meta[name='csrf-token']").attr('content')},
          //beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'))},
          data: {'model': root.html()},
          success: function(data){
            
          },
          error: function(data){
            
          }   
        });
              
      },
      simulate: function(){
        if(this.saf){
          this.saf.saveAsDom();
        }
        
        var stock_and_flow  = $('#xmldocument model stock_and_flow');
        var xml   = $('<xml>');
        var model = xml.append($('<model>').append(stock_and_flow));
        
        $.ajax({
          url: '/simulate',
          type: 'POST',
          data: {'model': xml.html()},
          success: function(data){
            
          },
          error: function(data){
            
          }   
        });
      }
      
    });
  })();
  
  $(window).resize(function(){
    evo.adjust();
  });
  
  $('#open').click(function(event){
    event.preventDefault();
    evo.open();
  });
  
  $('#save').click(function(event){
    event.preventDefault();
    evo.save();
  });
  
  $('#download').click(function(event){
    event.preventDefault();
    evo.download();
  });
  
  
  evo = new Evolucion();
  evo.adjust();
});

