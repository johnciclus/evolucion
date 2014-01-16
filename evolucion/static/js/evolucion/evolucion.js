/* Evolucion
 * By John Garavito 
 */
$(document).ready(function(){
  
  (function(){
    
    this.style = {
      base:       { 'stroke-width': 0,     'stroke': '',     'fill': '#fff', 'fill-opacity': 0},
      title:      { 'font-size': 14, 'font-family': 'Verdana', 'fill': '#000'},
      rectangle:  { 'stroke': '#aaa', 'fill': '#fff', 'stroke-dasharray': ''}
    };
    
    this.figures = {
      figure: function(ctx){
        var fig = ctx.r.set();
        fig.border = [];
        fig.move = function(p){
          var dx = p.x - this.p.x;
          var dy = p.y - this.p.y;
          
          this.transform("T" + dx + "," + dy);
        };
        return fig;
      }
    };
    
    this.moveActions = {
      start: function() {
        this.dx = this.dy = 0;
      },
      end: function(){
        this.dx = this.dy = 0;
      },
      move: function(dx, dy) {
        this.update(dx - (this.dx || 0), dy - (this.dy || 0));
        this.dx = dx;
        this.dy = dy;
      }
    };
    
    this.utils = {
      clone: function(obj){
        return jQuery.extend(true, {}, obj);
      },
      parentReference: function(fig, parent){
        if(fig.type == "set"){
          fig.forEach(function(el){
            if(el.type == "set"){
              utils.parentRefence(el, parent);
            }
            else{
              el.parent = parent;
            }
          });
          fig.parent = parent;
        }
      }
    };
    
    this.Unidad = Class.extend({
      init: function(ctx){
        this.id = '';
        this.nombre = '';
        this.titulo = ''; 
        this.tipo = '';
        this.fig = undefined;
        this.desc = ' ';
        this.borde = [];
        
        this.ctx = ctx;
      },
      camTitulo: function(titulo){
        this.titulo = titulo;
        this.nombre = evo.convTexVar(titulo);
        this.ctx.modTitMenu(this);
        
        this.fig.camTit(this.titulo);
        this.borde = this.fig.obtBorde();
        if(typeof(this.restEnl) == 'function'){
          this.restEnl();
        }
        if(typeof(this.restNomCop) == 'function'){
          this.restNomCop();
        }
      },
      camDesc: function(desc){
        this.desc = desc;
      },
      pos: function(){
        return this.fig.p;
      },
      mover: function(dx, dy){
        var bb = this.fig[0].getBBox();
        this.fig.p  = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
        
        this.fig.transform("...T" + dx + "," + dy);
        this.borde = this.fig.obtBorde();
      },
      intMenuEle: function(){
        this.ctx.integrarControlesEle(this);
      }
    });
    
    this.EleBase = Unidad.extend({
      init: function(ctx){
        this._super(ctx);
        
        this.defi  = ' ';
        this.unid  = ' ';
        
        this.cone = {};
        this.cone['aceOri'] = true; // (true || false)
        this.cone['aceDes'] = true; // (true || false)
        this.cone['canOri'] = 'n';  // ('0' || '1' || 'n')
        this.cone['canDes'] = 'n';  // ('0' || '1' || 'n')
        
        this.genFig = undefined;
        this.borde = [];
        
        this.relacIng = {};
        this.relacSal = {};
        
        this.cantRelIng = 0;
        this.cantRelSal = 0;
      },
      
      camDefi: function(defi){
        this.defi = defi;
      },
      camUnid: function(unid){
        this.unid = unid;
      },
      agreRelIng: function(rel){
        this.relacIng[rel.id] = rel;
        this.cantRelIng++;
      },
      agreRelSal: function(rel){
        this.relacSal[rel.id] = rel;
        this.cantRelSal++;
      },
      elimRelIng: function(rel){
        if(this.relacIng[rel.id]){
          delete(this.relacIng[rel.id]);
          this.cantRelIng--;
        }
      },
      elimRelSal: function(rel){
        if(this.relacSal[rel.id]){
          delete(this.relacSal[rel.id]);
          this.cantRelSal--;
        }
      },
      exisRelOri: function(des_id){
        var idOri, idDes;
        var ExRelac = false;
        
        for(var rel in this.relacSal){
          idOri = false;
          idDes = false;
          if(this.relacSal[rel].des.id == des_id){
            idOri = true;
          }
          if(this.relacSal[rel].ori.id == this.id){
            idDes = true;
          }
          if(idOri && idDes){
            ExRelac = true;
            break;
          }
        }
        return ExRelac;
      },
      exisRelDes: function(ori_id){
        var idOri, idDes;
        var ExRelac = false;
        
        for(var rel in this.relacIng){
          idOri = false;
          idDes = false;
          if(this.relacIng[rel].ori.id == ori_id){
            idOri = true;
          }
          if(this.relacIng[rel].des.id == this.id){
            idDes = true;
          }
          if(idOri && idDes){
            ExRelac = true;
            break;
          }
        }
        return ExRelac;
      },
      restEnl: function(){
        var relOri, relDes, pts, pt;
        for(var rel in this.relacSal){
          relOri = this.relacSal[rel];
          if(relOri){
            pts = relOri.obtPtsRel();
            pt = this.ctx.detPunEnPath(this.borde, pts.po);
            relOri.camPt({po: pt});
            relOri.camTitulo(this.titulo, relOri.des.titulo);
          }
        }
        for(var rel in this.relacIng){
          relDes = this.relacIng[rel];
          if(relDes){
            pts = relDes.obtPtsRel();
            pt = this.ctx.detPunEnPath(this.borde, pts.pd);
            relDes.camPt({pd: pt});
            relDes.camTitulo(relDes.ori.titulo, this.titulo);
          }
        }
      },
      inicio: function(){
        var el = this.padre;
        var elFig = el.fig;
        
        elFig.dx = 0;
        elFig.dy = 0;
        
        for(var rel in el.relacSal){
          if(el.relacSal[rel]){
            el.relacSal[rel].fig.dx = 0;
            el.relacSal[rel].fig.dy = 0;
          }
        }
        for(var rel in el.relacIng){
          if(el.relacIng[rel]){
            el.relacIng[rel].fig.dx = 0;
            el.relacIng[rel].fig.dy = 0;
          }
        }
        
        var borde = elFig.obtBorde();
        var pp = el.ctx.r.path(borde).attr(atrBor);
        pp.animate(atrDes, 100, function(){ this.remove()});
        pp = undefined;
      },
      moverFig: function(dx, dy){
        var el = this.padre;
        var elFig = el.fig;   
          
        elFig.transform("...T" + (dx - elFig.dx) + "," + (dy - elFig.dy));
        elFig.dx = dx;
        elFig.dy = dy;
        
        for(var rel in el.relacIng){
          if(el.relacIng[rel]){
            el.relacIng[rel].transUbiCont({pd: {dx: dx, dy: dy}});
          }
        }
        for(var rel in el.relacSal){
          if(el.relacSal[rel]){
            el.relacSal[rel].transUbiCont({po: {dx: dx, dy: dy}});
          }
        }
        
      },
      fin: function(){
        var el = this.padre;
        var elFig = el.fig;   
        var bb;
        
        elFig.dx = 0;
        elFig.dy = 0;
        
        bb = elFig[1].getBBox();
        elFig.p  = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
        
        for(var rel in el.relacIng){
          el.relacIng[rel].fig.dx = 0;
          el.relacIng[rel].fig.dy = 0;
        }
        for(var rel in el.relacSal){
          el.relacSal[rel].fig.dx = 0;
          el.relacSal[rel].fig.dy = 0;
        }
        el.borde = elFig.obtBorde();
      },
      remover: function(){
        var obj;
        if(this.tipo){
          obj = this;
        }else if(this.padre){
          obj = this.padre;
        }
        if(obj){
          var lista   = obj.lista;
          var listaCop= obj.listCopias;
          var ref     = obj.ref;
              
          if(lista[obj.id]){
            delete(lista[obj.id]);
          }
          
          for(var i in obj.relacSal){
            obj.relacSal[i].remover();
          }
          for(var i in obj.relacIng){
            obj.relacIng[i].remover();
          }
          
          if(ref){
            var listCopias = ref.listCopias;
            for(var i in listCopias){
              if(listCopias[i].id == obj.id){
                delete(listCopias[i]);
              }
            }
          }
          if(listaCop){
            for(var i in listaCop){
              listaCop[i].remover();
            }
          }
          
          obj.ctx.eliminarControlesEle(obj);
          var lim = obj.ctx.ajuLimLista(lista);
          obj.ctx.ind[obj.tipo] = ++lim;
          
          obj.fig.remove();
          obj.fig = undefined;
          obj = undefined;
        }
      }
    });
    
    this.Element = EleBase.extend({
      init: function(ctx){
        this._super(ctx);
        
        this.dim = 1;
        
        this.listCopias = {};
      },
      figura: function(p){
        this.fig = this.genFig(this.ctx, this, p, this.titulo, {cursor: "move"});
        this.borde = this.fig.obtBorde();
        for(var i=0; i<3; i++){
          this.fig[i].drag(this.moverFig, this.inicio, this.fin);
        }
        this.fig[0].dblclick(this.editorTexto);
        this.fig[2].dblclick(this.visAtributos);
        this.fig[3].click(this.remover);
      },
      restNomCop: function(){
        var copia;
        if(this.listCopias){
          for(var i in this.listCopias){
            copia = this.listCopias[i]; 
            if(copia){
              copia.camTitulo(this.titulo);
            }
          }
        }
      },
      editorTexto: function(){
        this.padre.ctx.agrEditorTexto(this.padre);
      },
      visAtributos: function(){
        this.padre.ctx.visAtributosEle(this.padre);
      }
    });
    
    this.Editor = Class.extend({
      init: function(r){
        this.r = r;
        
        this.list     = {};
        this.idx      = {};
        this.tmp      = {};
        
        this.res      = {};        //Resources
        this.elements = [];
        this.states   = [];
        this.state    = "";
        
        this.svg      = "";
        this.svg_div  = "";
        
        this.margin   = 15;
                
        this.initBaseLayer();
      },
      activateState: function(state){
        this.state = state;
                
        var btns_info = $(this.div+'-workarea .toolbar .btn-info');
        btns_info.removeClass('btn-info');
        btns_info.addClass('btn-primary');
        
        $('#'+this.state+'-btn-inf').removeClass('btn-primary');
        $('#'+this.state+'-btn-inf').addClass('btn-info');
      },
      adjustPanelSize: function(dx, dy){
        var panSize = this.panel.getSize();   
        var sel = this.r.set();             //Selection
        var bb;
        
        for(var i in this.list){
          for( var j in this.list[i]){
            sel.push(this.list[i][j].fig);
          }
        }
        if(sel.length > 0){
          bb = sel.getBBox();
          
          if((bb.x2 + dx)>(panSize.w - this.margin)){                
            this.panel.resize(bb.x2 + dx + this.margin, panSize.h); 
          }
          else if((bb.x + dx) < this.margin){
            this.panel.resize(panSize.w + this.margin - (bb.x + dx) , panSize.h);
            this.moveObjs(this.margin - (bb.x + dx), 0);
          }
          if((bb.y2 + dy)>(panSize.h - this.margin)){
            this.panel.resize(panSize.w, bb.y2 + dy + this.margin);
          }
          else if((bb.y + dy) < this.margin){
            this.panel.resize(panSize.w, panSize.h + this.margin - (bb.y + dy));
            this.moveObjs(0, this.margin - (bb.y + dy));
          } 
        }
        sel = undefined;
      },
      initBaseLayer: function(){
        this.baseLayer = this.r.rect(0, 0, this.r.width, this.r.height).attr(style.base);
        this.baseLayer.ctx = this;
        
        this.baseLayer.start = function(){
          this.dx = this.dy = 0;
          this.attr({cursor: "move"});
        };
        this.baseLayer.end = function(){
          this.dx = this.dy = 0;
          this.attr({cursor: ""});
        };
        this.baseLayer.update = function(dx, dy){
          this.ctx.moveObjs(dx, dy);
          this.ctx.adjustPanelSize(dx, dy);
        };
        this.baseLayer.drag(moveActions.move, this.baseLayer.start, this.baseLayer.end);
      },
      moveObjs: function(dx, dy){
        for(var i in this.list){
          for( var j in this.list[i]){
            this.list[i][j].moveDelta(dx, dy);    //mover
          }
        }
      },
      panel: {
        
        getSize: function(){
          return {w: $(this.svg_div).width(), h: $(this.svg_div).height()};
        },
        resize: function(width, height){
          this.baseLayer.attr({'width': width});
          this.baseLayer.attr({'height': height});
          $(this.svg).width(width);
          $(this.svg).height(height);
          $(this.svg_div).width(width);
          $(this.svg_div).height(height);
        }
      },
      pointer: {
        getPosition: function(e){
          var offset    = $(this.ctx.svg_div).offset();
          
          return p = {x: e.clientX - offset.left, 
                      y: e.clientY - offset.top};   
        },
        existElement: function(p){
          var exist = false; 
          for( var l in this.list){
            for(var e in this.elements){
              if(l == this.elementos[e]){
                for(var le in this.list[l]){
                  exist = Raphael.isPointInsidePath(this.list[l][le].border, p.x, p.y);     
                  if(exist){
                    return this.list[l][le];
                  }
                }
              }
            }
          }
          return undefined;
        }
      },
      sector: {
        existElement: function(sector, el){
        
        }
      }
    });
    
    this.Evolucion = Class.extend({
      init: function(){
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
        
        var workAreaHeight = $(window).height() - parseInt($('body').css('padding-top'));
        $('.work-area').height(workAreaHeight);
        
        $('#overview-area').show();
      },
      actions: {
        download: function(){
          alert('download');      
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
      },
      adjust: function(){
        var workAreaHeight = $(window).height() - parseInt($('body').css('padding-top'));
        $('.work-area').height(workAreaHeight);
        if(this.inf){
          this.inf.adjust();
        }
      },
      aliasArea: function(area_name){
        var idx = this.areas.indexOf(area_name);
        if(idx >=0){ return this.alias[idx]; }
        return undefined;
      },
      messages: {
        error: function(area_name, message){
          var alias = evo.aliasArea(area_name);
          if(alias){
            var message = $('#messages-'+alias).append(
              '<div class="alert alert-dismissable alert-danger">'+
                '<button type="button" class="close" data-dismiss="alert">×</button>'+
                message+
                //'<strong>Oh snap!</strong> <a href="#" class="alert-link">Change a few things up</a> and try submitting again.'+
              '</div>'
            ).children(':last-child');
            message.slideDown(1000).delay(10000).slideUp(1000, function(){this.remove();});
          }
        },
        info: function(area_name, message){
          var alias = evo.aliasArea(area_name);
          if(alias){
            var message = $('#messages-'+alias).append(            
              '<div class="alert alert-dismissable alert-info">'+
                '<button type="button" class="close" data-dismiss="alert">×</button>'+
                 message+
                //'<strong>Heads up!</strong> This <a href="#" class="alert-link">alert needs your attention</a>, but it\'s not super important.'+
              '</div>'
            ).children(':last-child');
            message.slideDown(1000).delay(10000).slideUp(1000, function(){this.remove();});
          }          
        },        
        success: function(area_name, message){
          var alias = evo.aliasArea(area_name);
          if(alias){
            var message = $('#messages-'+alias).append(            
              '<div class="alert alert-dismissable alert-success">'+
                '<button type="button" class="close" data-dismiss="alert">×</button>'+
                message+
                //'<strong>Well done!</strong> You successfully read <a href="#" class="alert-link">this important alert message</a>.'+
              '</div>'
            ).children(':last-child');
            message.slideDown(1000).delay(10000).slideUp(1000, function(){this.remove();});
          }
        },
        warning: function(area_name, message){
          var alias = evo.aliasArea(area_name);
          if(alias){
            var message = $('#messages-'+alias).append(            
              '<div class="alert alert-dismissable alert-warning">'+
                '<button type="button" class="close" data-dismiss="alert">×</button>'+
                message+
                //'<h4>Warning!</h4>'+
                //'<p>Best check yo self, you\'re not looking too good. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, <a href="#" class="alert-link">vel scelerisque nisl consectetur et</a>.</p>'+
              '</div>'
            ).children(':last-child');
            message.slideDown(1000).delay(10000).slideUp(1000, function(){this.remove();});
          }
        }
      },
      utils: {
        textToVar: function(text){
          return text
            .toLowerCase()
            .replace(/[\u00F1]+/g,'nh')
            .replace(/[\u00E0-\u00E5]+/g,'a')
            .replace(/[\u00E8-\u00EB]+/g,'e')
            .replace(/[\u00EC-\u00EF]+/g,'i')
            .replace(/[\u00F2-\u00F6]+/g,'o')
            .replace(/[\u00F9-\u00FC]+/g,'u')
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'_');
        }
      },
      verifyBrowsers: function(){
        var IE = (navigator.appName=='Microsoft Internet Explorer')?parseFloat((new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})")).exec(navigator.userAgent)[1]):-1;
        if(IE > -1 && IE < 9){
          //$('#alerta').css('display', 'block');
        }
      }
    });
    
  })();
  
  $(window).resize(function(){
    evo.adjust();
  });
  
  $('#open').click(function(event){
    event.preventDefault();
    evo.actions.open();
  });
  
  $('#save').click(function(event){
    event.preventDefault();
    evo.actions.save();
  });
  
  $('#download').click(function(event){
    event.preventDefault();
    evo.actions.download();
  });
  
});

