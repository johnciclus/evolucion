/* Evolucion - Equations
 * By John Garavito
 */

    this.Equations = Class.extend({
      init: function(){
        this.id       = 'equ';
        this.div      = '#equations';
        this.divArea  = '#equations-area';
        this.language = '#language-equ';
        
        this.code  = '';
        
        this.initWorkArea();
        
        $('#mathematical-language').click(function(){
          evo.equ.model.mathematical_model([]);
        });
        $('#javascript-language').click(function(){
          evo.equ.model.javascript_model([]);
        });
      },
      adjust: function(){
        var workAreaHeight = $('.work-area').height();
        
        $(this.divArea+' .sidebar').height(workAreaHeight);
                
        $(this.language).height(workAreaHeight - 2);
        
      },
      initWorkArea: function(){
        this.adjust();
      },
      model: {
        mathematical_model: function(elments){
          evo.dyn.loadListas(saf.list);
          var code = evo.dyn.genCodigoMT(elments);
          
          $(this.len_div).empty();
          $("<pre id='code' class='code' lang='js'></pre>").appendTo(this.len_div);
          $('#code').text(code);
          $('#code').highlight({source:1, zebra:1, indent:'space', list:'ol'});
          return code;      
        },
        javascript_model: function(elments){
          evo.dyn.loadListas(saf.list);
          this.code = evo.dyn.genCodigoJS(elments);
          
          $(this.len_div).empty();
          $("<pre id='code' class='code' lang='js'></pre>").appendTo(this.len_div);
          $('#code').text(this.code);
          $('#code').highlight({source:1, zebra:1, indent:'space', list:'ol'});
          
          return this.code;   
        }
      }, 
      
      
      saveAsDom: function(){
        var model, equations;
        
        model = $('#xmldocument model:first');
        
        equation = model.children('equation');
        
        if($.isEmptyObject(equation[0])){
          equation = model.append($('<equation />')).find('equation');  
        }
        else{
          equation.empty();
        }
      }
      
    });
