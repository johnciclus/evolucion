/* Evolucion - Equations
 * By John Garavito
 */

this.Equations = Class.extend({
  init: function(){
    this.id       = 'equ';
    this.div      = '#equations';
    this.divArea  = '#equations-area';
    this.language = '#language-equ';
    
    this.code     = {};
    
    this.initWorkArea();
    
    $('#mathematical-language').click(function(){
      equ.model.mathematical_model([]);
      equ.activateItem(this.id);
    });
    $('#javascript-language').click(function(){
      equ.model.javascript_model([]);
      equ.activateItem(this.id);
    });
  },
  adjust: function(){
    var workAreaHeight = $('.work-area').height();
    
    $(this.divArea+' .sidebar').height(workAreaHeight);
            
    $(this.language).height(workAreaHeight - 2);
    
  },
  activateItem: function(item){
    var item_active = $('#elements-equ>a.active').attr('id');
    if(item_active != item){
      $('#'+item_active).removeClass('active');
      $('#'+item).addClass('active');
    }
  },
  initWorkArea: function(){
    this.adjust();
  },
  model: {
    mathematical_model: function(elments){
            
      var code = evo.dyn.generateMath(elments);
      
      equ.code['mathematical'] = code;
      
      var container = $('<div id="mathematical-code" />');
            
      container.append($("<pre class='prettyprint linenums' />").text(code));
      
      $(equ.language).html(container);
      
      window.prettyPrint && prettyPrint();
    },
    javascript_model: function(elments){
            
      var code = evo.dyn.generateJS(elments);
      
      equ.code['javascript'] = code;
      
      var container = $('<div id="javascript-code" />');
      
      container.append($("<pre class='prettyprint linenums' />").text(code));
      
      $(equ.language).html(container);
      
      window.prettyPrint && prettyPrint();
    }
  }, 

  saveAsDOM: function(){
    var model, equations;
    
    model = $('#xmldocument model:first');
    
    equations = model.children('equations:last');
    
    if($.isEmptyObject(equations[0])){
      equations = model.append($('<equations />')).find('equations');  
    }
    else{
      equations.empty();
    }
  
    if(equations){
      codes = equations.append('<codes />').children('codes:last');
      codes.append($('<mathematical />').text(equ.code['mathematical']));
      codes.append($('<javascript />').text(equ.code['javascript']));
    }
  }
  
});
