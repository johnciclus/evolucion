/* Evolucion - Behaviors
 * By John Garavito
 */
$(document).ready(function(){
  (function(){
    this.Behaviors = Class.extend({
      init: function(){
        this.id       = 'beh';
        this.div      = '#behaviors';
        this.divArea  = '#behaviors-area';
        this.toolbar  = '#toolbar-beh';
        this.language = '#language-beh';
        
        
        this.elements = [ 'parameter', 'stock', 'flow', 
                          'auxiliary', 'exogenous', 'delay',
                          'multiplier', 'fis', 'previousvalue',
                          'submodel' ];
        
        this.graph_name = 'graph';
        this.graph_idx  = 0;
        
        this.graphs = {};
        
        $('#initial-time').change(function(){
          evo.dyn.ti = Number($('#initial-time').val());
        });
        $('#final-time').change(function(){
          evo.dyn.tf = Number($('#final-time').val());
        });
        $('#delta-time').change(function(){
          evo.dyn.dt = Number($('#delta-time').val());
        });
        
        this.initWorkArea();
        
        $('#save-graph').click(function(){
          beh.addGraph();
        });
      },
      adaptGrapher: function(){
        var cant=(evo.dyn.tf-evo.dyn.ti)/evo.dyn.dt;
        var anchoContVis = $('#contVisualizador').css('width');
        anchoContVis=anchoContVis.substring(0,anchoContVis.length-2);
        
        if((cant*20) >= anchoContVis){
          $('#contVisualizador').css('width',(20*cant)+'px');
        }
        else{
          $('#contVisualizador').css('width','');
        }
      },
      addGraph: function(){
        var idx = this.graph_idx++;
        var graph_id = this.graph_name+'-' + idx;
        
        $(this.toolbar+'>ul').append(
          "<li>"+
            "<a href='#"+graph_id+"' data-toggle='tab'>Gráfica "+idx+"&nbsp;"+
              "<button type='button' class='close' data-dismiss='' aria-hidden='true'>&times;</button>"+
            "</a>"+
          "</li>"
          );
        $(this.language+'>.tab-content').append("<div class='tab-pane' id='"+graph_id+"'></div>");
        
        $(this.toolbar+' a:last').tab('show');
        $(this.toolbar+' a:last').on('shown.bs.tab', function (e) {
          var href = $(this).attr('href');
          var idx = Number(href.substr(href.lastIndexOf('-')+1));        
          beh.graphRedraw(idx);
        });
        
        this.graphs[graph_id] = new Morris.Line({
          element: graph_id,
          
          data: [
            { step: '0', a: 20, b: 15 },
            { step: '1', a: 10, b: 25 },
            { step: '2', a: 5,  b: 5  },
            { step: '3', a: 5,  b: 20 },
            { step: '4', a: 20, b: 25 }
          ],
          
          xkey: 'step',
          
          xlabels: 'Paso',
          
          ykeys: ['a', 'b'],
          
          labels: ['A', 'B'],
          
          lineWidth: 2,
          
          parseTime: false,
          
          hoverCallback: function (index, options, content) {
            var row = options.data[index];
            
            var text =  
              "<div class='morris-hover-row-label'>"+
                options.xlabels+": "+row[options.xkey]+
              "</div>";
              
            for(var idx in options.labels){
              text +=
                "<div class='morris-hover-point' style='color: "+options.lineColors[idx]+"'>"+
                  options.labels[idx]+": "+ row[options.ykeys[idx]]+
                "</div>";
            }
            return text;
          },
          
          resize: true
          
        });
      },
      adjust: function(){
        this.initWorkArea();
        
        var href = $(this.toolbar+ ' li.active a').attr('href');
        if(href){
          if(href == '#graph'){
            this.graphRedraw('');
          }
          else{
            var idx = Number(href.substr(href.lastIndexOf('-')+1));       
            this.graphRedraw(idx);
          }
        }
                        
      },
      changeTitle: function(el){
        var tit = $('#'+el.id+'_item_sim_nombre p');
        //var cbx = $('#'+el.id+'_item_sim_nombre input');
        tit.html(el.titulo);
        //cbx.val(el.nombre);
      },
      deleteControls: function(el){
        $('#'+el.id+'_item_sim').remove();
      },
      graphRedraw: function(idx){
        var graph_name = this.graph_name;
        
        if(utils.isNumber(idx)){
          graph_name += '-'+idx;  
        }
        
        var graph = this.graphs[graph_name];
        
        if(graph){
          graph.redraw();
        }
      },
      initWorkArea: function(){
        var workAreaHeight = $('.work-area').height();
        var toolbarHeigth = $(this.toolbar).height() || 41;
        
        $(this.divArea+' .sidebar').height(workAreaHeight);
                                
        $(this.language).height(workAreaHeight - toolbarHeigth - 2);
      },
      integrateControls: function(el){
        var nomCont = '#'+el.tipo+'-'+this.id+'-div';
        
        if(el.id && el.titulo && nomCont && this.indMenu[el.tipo]){
          var html =
            "<div id='"+el.id+"_item_sim' class='eleMenu' >"+
              "<div id='"+el.id+"_item_sim_nombre' "+
              "class='eleTit' >"+
                "<input type='checkbox' id='"+el.id+"_item_sim_cb' value='"+el.id+"'>"+
                "<p>"+el.titulo+"</p>"+
              "</div>"+
            "</div>";
            
          $(nomCont).append(html);
        }
      },
      selectedElements: function(){
        var elmts = $('#menu-elementos-beh input:checkbox');
        var selec = [];
        elmts.each(function(i){
          if($(this).is(':checked')){
            selec.push($(this).val());
          }
        });
        return selec;
      },
      simulate: function(){
        var elmts = beh.elemtsSelec();
        var series = ecu.simular(elmts);
        var elmts_eval = [];
        
        for(var i in elmts){
          elmts_eval.push({
            name: evo.dyn.elmts[elmts[i]].titulo,
            data: series.elseval[elmts[i]]
          });
        }
        
        beh.adapVisualizador();
        
        return false;
      },
      
      saveAsDom: function(){
        var model, behavior;
        
        model = $('#xmldocument model:first');
        
        behavior = model.children('behavior');
        
        if($.isEmptyObject(behavior[0])){
          behavior = model.append($('<behavior />')).find('behavior');  
        }
        else{
          behavior.empty();
        } 
      }
    });
  })();
});
