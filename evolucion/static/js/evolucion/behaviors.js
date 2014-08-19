/* Evolucion - Behaviors
 * By John Garavito
 */

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
      evo.dyn.it = Number($('#initial-time').val());
    });
    $('#final-time').change(function(){
      evo.dyn.ft = Number($('#final-time').val());
    });
    $('#delta-time').change(function(){
      evo.dyn.dt = Number($('#delta-time').val());
    });
    
    this.initWorkArea();
    $('#simulate').click(function(){
      beh.simulate();
    });
    $('#save-graph').click(function(){
      beh.addGraph();
    });
  },
  adaptGrapher: function(){
    var cant=(evo.dyn.ft-evo.dyn.it)/evo.dyn.dt;
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
          "<button type='button' class='close' data-dismiss='' aria-hidden='true' data-toggle='tooltip' data-placement='top' title data-original-title='Elimine este gráfico' >&times;</button>"+
        "</a>"+
      "</li>"
    );
    $(this.language+'>.tab-content').append("<div class='tab-pane' id='"+graph_id+"'></div>");
            
    $(this.toolbar+' button:last').tooltip({ container: 'body' });
    
    $(this.toolbar+' a:last').tab('show');
    
    $(this.toolbar+' a:last').on('shown.bs.tab', function(e) {
      var href = $(this).attr('href');
      var idx = Number(href.substr(href.lastIndexOf('-')+1));        
      beh.graphRedraw(idx);
    });
    
    $(this.toolbar+' button:last').on('click', function(e){
        var graph_tab = $(this).parents('li');
        var href = graph_tab.children('a').attr('href');
        var graph_panel = $(href);
        
        delete(beh.graphs[href.slice(1)]);
                                
        graph_tab.remove();
        graph_panel.remove();
        
        var limit = beh.limitAdjustList();
        
        beh.graph_idx = ++limit;
        
        $('.tooltip').remove();
        
        $(beh.toolbar+' a:first').tab('show');
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
    var container = $('#'+el.type+'-items-beh>#'+el.id+'-item-sim>div>div');
    
    $(container).children('h4').html(el.title);
    $(container).find('p').html(el.title);
  },
  deleteControls: function(el){
  	console.log(el);
    $('#'+el.id+'-item-sim').remove();
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
    var nameItemsCont = '#'+el.type+'-items-beh';
    var is_simulate = (this.elements.indexOf(el.type) != -1);

    if(nameItemsCont && el.id && el.title && is_simulate){
      var html =
        "<div id='"+el.id+"-item-sim' class='panel panel-default'>"+
          "<div class='panel-heading'>"+
            "<div class='form-group'>"+
              "<h4 class='panel-title'>"+
                el.title+
              "</h4>"+
              "<div class='checkbox'>"+
                "<label>"+
                	"<input type='checkbox' name='"+el.id+"-sim' id='"+el.id+"-sim' value='"+el.id+"'>"+
                	"<p>"+el.name+"</p>"+
                "</label>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>";        
      $(nameItemsCont).append(html);
    }
  },
  limitAdjustList: function(list){
    var val;
    var limit = -1;
    var idx = -1;
    for(var graph in this.graphs){
      idx = graph.lastIndexOf('-');
      val = Number(graph.substr(++idx));
      limit = (val > limit) ? val : limit;
    }
    return limit;
  },
  selectedElements: function(){
    var elements = $('#elements-beh input:checkbox');
    var selec = [];
    elements.each(function(i, el){
      if($(el).is(':checked')){
        selec.push($(el).val());
      }
    });
    return selec;
  },
  simulate: function(){
    var elements = beh.selectedElements();
    console.log(elements);
    var series = evo.dyn.simulate(elements);
    var elmts_eval = [];
    var element;
    var data = [];
    var time = series['time'];
    
    console.log(series);
   
   var keys = [], key_labels = [];
   for(var el in series.elseval){
    keys.push(el);
    element = saf.objects.getById(el);
    key_labels.push(element.title);
   }
   
   if(keys.length>0){
     
     for(var i in time){
       var obj = {};
       obj['time'] = time[i];
       for(var el in series.elseval){
        obj[el] = series.elseval[el][i]; 
       }
       data.push(obj);
     }
     
      var graph_id = this.graph_name;
      
      if(this.graphs[graph_id]){
        console.log($('#'+graph_id).html(''));
        delete(this.graphs[graph_id]);
      }
      
      this.graphs[graph_id] = new Morris.Line({
        element: graph_id,
        
        data: data,
        
        xkey: 'time',
        
        xlabels: 'Paso',
        
        ykeys: keys,
        
        labels: key_labels,
        
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
    }
    //var code = evo.dyn.generateJS([]);
    //beh.adapVisualizador();
    
    return false;
  },
  
  saveAsDOM: function(){
    var model, behavior;
    
    model = $('#xmldocument model:first');
    
    behavior = model.children('behavior:last');
    
    if($.isEmptyObject(behavior[0])){
      behavior = model.append($('<behavior />')).find('behavior');  
    }
    else{
      behavior.empty();
    } 
  }
});