/* Evolucion
 * By John Garavito 
 */
$(document).ready(function(){ 
  (function(){
    
    this.style = {
      base:         { 'stroke-width': 0,     'stroke': '',     'fill': '#fff', 'fill-opacity': 0},
      title:        { 'font-size': 14, 'font-family': 'Verdana', 'fill': '#000'},
      rectangle:    { 'stroke': '#aaa', 'fill': '#fff', 'stroke-dasharray': ''},
      border:       { 'stroke': '#008ec7'},
      dis_border:   { 'stroke': '#fff'}       //atrDes
    };
    
    this.figures = {
      figure: function(ctx){
        var fig = ctx.r.set();
        fig.border = [];
        fig.moveToPoint = function(p){
          this.transform("T" + (p.x - this.p.x) + "," + (p.y - this.p.y));
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
    
    this.Unit = Class.extend({
      init: function(ctx){
        this.id           = '';
        this.name         = '';
        this.title        = ''; 
        this.type         = '';
        this.description  = ' ';
        
        this.fig          = undefined;
        this.border       = [];
        
        this.ctx = ctx;
      },
      changeTitle: function(title){
        this.title = title;
        this.name = evo.utils.textToVar(title);
        this.ctx.changeTitle(this);                   //modTitMenu
        
        this.fig.changeTitle(this.title);             //camTit
        this.border = this.fig.getBorder();
        if(typeof(this.restoreLinks) == 'function'){  //restEnl
          this.restoreLinks();
        }
        if(typeof(this.restoreCopies) == 'function'){ //restNomCop
          this.restoreCopies();
        }
      },
      changeDescription: function(description){       //camDesc
        this.description = description;
      },
      position: function(){                           //pos
        return this.fig.p;
      },
      moveDelta: function(dx, dy){                    //mover
        var bb = this.fig[0].getBBox();
        this.fig.p  = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
        
        this.fig.transform("...T" + dx + "," + dy);
        this.border = this.fig.getBorder();
      },
      integrateCtx: function(){
        this.ctx.integrateControls(this);
      }
    });
    
    this.EleBase = Unit.extend({
      init: function(ctx){
        this._super(ctx);
        
        this.definition     = ' ';
        this.units          = ' ';
        
        this.cone           = {};       //Connections
        this.cone['oriAce'] = true;     // (true || false)      Origin accepts
        this.cone['desAce'] = true;     // (true || false)      Destination accepts
        this.cone['oriQua'] = 'n';      // ('0' || '1' || 'n')  Origin Quantity 
        this.cone['desQua'] = 'n';      // ('0' || '1' || 'n')  Destination Quantity
        
        this.figGenerator = undefined;
        this.border = [];
        
        this.enteringRels = {};
        this.leavingRels  = {};
        
        this.enteringRelsQua = 0;
        this.leavingRelsQua = 0;
      },
      
      changeDefinition: function(definition){     //camDefi
        this.definition = definition;
      },
      changeUnits: function(units){               //camUnid
        this.units = units;
      },
      addEnteringRels: function(rel){
        this.enteringRels[rel.id] = rel;
        this.enteringRelsQua++;
      },
      addLeavingRels: function(rel){
        this.leavingRels[rel.id] = rel;
        this.leavingRelsQua++;
      },
      delEnteringRels: function(rel){
        if(this.enteringRels[rel.id]){
          delete(this.enteringRels[rel.id]);
          this.enteringRelsQua--;
        }
      },
      delLeavingRels: function(rel){
        if(this.leavingRels[rel.id]){
          delete(this.leavingRels[rel.id]);
          this.leavingRelsQua--;
        }
      },
      existOriRel: function(des_id){
        var idOri, idDes;
        var existRel = false;
        
        for(var rel in this.leavingRels){
          idOri = false;
          idDes = false;
          if(this.leavingRels[rel].des.id == des_id){
            idOri = true;
          }
          if(this.leavingRels[rel].ori.id == this.id){
            idDes = true;
          }
          if(idOri && idDes){
            existRel = true;
            break;
          }
        }
        return existRel;
      },
      exisRelDes: function(ori_id){
        var idOri, idDes;
        var existRel = false;
        
        for(var rel in this.enteringRels){
          idOri = false;
          idDes = false;
          if(this.enteringRels[rel].ori.id == ori_id){
            idOri = true;
          }
          if(this.enteringRels[rel].des.id == this.id){
            idDes = true;
          }
          if(idOri && idDes){
            existRel = true;
            break;
          }
        }
        return existRel;
      },
      restoreLinks: function(){
        var oriRel, desRel, pts, pt;
        for(var rel in this.leavingRels){
          oriRel = this.leavingRels[rel];
          if(oriRel){
            //pts = oriRel.obtPtsRel();
            //pt = this.ctx.detPunEnPath(this.border, pts.po);
            //oriRel.camPt({po: pt});
            //oriRel.camTitulo(this.title, oriRel.des.title);
          }
        }
        for(var rel in this.enteringRels){
          desRel = this.enteringRels[rel];
          if(desRel){
            //pts = desRel.obtPtsRel();
            //pt = this.ctx.detPunEnPath(this.border, pts.pd);
            //desRel.camPt({pd: pt});
            //desRel.camTitulo(desRel.ori.title, this.title);
          }
        }
      },
      start: function(){
        var el = this.parent;
        var elFig = el.fig;
        
        elFig.dx = 0;
        elFig.dy = 0;
        
        for(var rel in el.leavingRels){
          if(el.leavingRels[rel]){
            el.leavingRels[rel].fig.dx = 0;
            el.leavingRels[rel].fig.dy = 0;
          }
        }
        for(var rel in el.enteringRels){
          if(el.enteringRels[rel]){
            el.enteringRels[rel].fig.dx = 0;
            el.enteringRels[rel].fig.dy = 0;
          }
        }
        
        var border = elFig.getBorder();
        var pp = el.ctx.r.path(border).attr(style.border);
        pp.animate(style.dis_border, 100, function(){ this.remove(); });
        pp = undefined;
      },
      end: function(){
        var el = this.parent;
        var elFig = el.fig;   
        var bb;
        
        elFig.dx = 0;
        elFig.dy = 0;
        
        bb = elFig[1].getBBox();
        elFig.p  = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
        
        for(var rel in el.enteringRels){
          el.enteringRels[rel].fig.dx = 0;
          el.enteringRels[rel].fig.dy = 0;
        }
        for(var rel in el.leavingRels){
          el.leavingRels[rel].fig.dx = 0;
          el.leavingRels[rel].fig.dy = 0;
        }
        el.border = elFig.getBorder();
      },
      moveFig: function(dx, dy){
        var el = this.parent;
        var elFig = el.fig;   
          
        elFig.transform("...T" + (dx - elFig.dx) + "," + (dy - elFig.dy));
        elFig.dx = dx;
        elFig.dy = dy;
        
        for(var rel in el.enteringRels){
          if(el.enteringRels[rel]){
            //el.enteringRels[rel].transUbiCont({pd: {dx: dx, dy: dy}});
          }
        }
        for(var rel in el.leavingRels){
          if(el.leavingRels[rel]){
            //el.leavingRels[rel].transUbiCont({po: {dx: dx, dy: dy}});
          }
        }
        
      },
      remove: function(){
        var obj;
        if(this.name){
          obj = this;
        }else if(this.parent){
          obj = this.parent;
        }
        if(obj){
          
          var list      = obj.list;
          var copiesList= obj.copiesList;
          var ref       = obj.ref;
                       
          if(list[obj.id]){
            delete(list[obj.id]);
          }
          
          for(var i in obj.leavingRels){
            obj.leavingRels[i].remove();
          }
          for(var i in obj.enteringRels){
            obj.enteringRels[i].remove();
          }
          
          if(ref){
            var copiesList = ref.copiesList;
            for(var i in copiesList){
              if(copiesList[i].id == obj.id){
                delete(copiesList[i]);
              }
            }
          }
          if(copiesList){
            for(var i in copiesList){
              copiesList[i].remove();
            }
          }
          
          obj.ctx.deleteControls(obj);
          var limit = obj.ctx.limitAdjustList(list);
          obj.ctx.idx[obj.type] = ++limit;
          
          obj.fig.remove();
          obj.fig = undefined;
          obj = undefined;
        }
      }
    });
    
    this.Element = EleBase.extend({
      init: function(ctx){
        this._super(ctx);
        
        this.dimension = 1;
        
        this.copiesList = {};
      },
      figure: function(p){
        this.fig = this.figGenerator(this.ctx, this, p, this.title, {cursor: "move"});
        this.border = this.fig.getBorder();
        for(var i=0; i<3; i++){
          this.fig[i].drag(this.moveFig, this.start, this.end);
        }
        this.fig[0].dblclick(this.createTextEditor);
        this.fig[2].dblclick(this.viewControls);
        this.fig[3].click(this.remove);
      },
      restoreCopies: function(){
        var copy;
        if(this.copiesList){
          for(var i in this.copiesList){
            copy = this.copiesList[i]; 
            if(copy){
              copy.camTitulo(this.title);
            }
          }
        }
      },
      createTextEditor: function(){
        this.parent.ctx.addTextEditor(this.parent);
      },
      viewControls: function(){
        this.parent.ctx.viewControls(this.parent);
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
      addTextEditor: function(el){
        
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
      viewControls: function(el){
        
      },
      panel: {
        getSize: function(){
          return {w: $(this.ctx.svg_div).width(), h: $(this.ctx.svg_div).height()};
        },
        resize: function(width, height){
          this.ctx.baseLayer.attr({'width': width});
          this.ctx.baseLayer.attr({'height': height});
          $(this.ctx.svg).width(width);
          $(this.ctx.svg).height(height);
          $(this.ctx.svg_div).width(width);
          $(this.ctx.svg_div).height(height);
        }
      },
      pointer: {
        getPosition: function(e){
          var offset  = $(this.ctx.svg_div).offset();
          
          return p    = {x: e.clientX - offset.left, 
                      y: e.clientY - offset.top};   
        },
        existElement: function(p){
          var exist = false; 
          for( var l in this.ctx.list){
            for(var e in this.ctx.elements){
              if(l == this.ctx.elementos[e]){
                for(var le in this.ctx.list[l]){
                  exist = Raphael.isPointInsidePath(this.ctx.list[l][le].border, p.x, p.y);     
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
});

