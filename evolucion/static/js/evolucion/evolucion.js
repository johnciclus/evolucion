/* Evolucion
 * By John Garavito 
 */
$(document).ready(function(){ 
  (function(){
    
    this.style = {
      arc:        { 'stroke-width': 2.5,   'stroke': '#555', 'stroke-linecap': 'round'},
      base:       { 'stroke-width': 0,     'stroke': '',     'fill': '#fff', 'fill-opacity': 0},
      border:     { 'stroke': '#008ec7'},     //atrBor
      border_dis: { 'stroke': '#fff'},        //atrDes
      curve:      { 'stroke-width': 1.0,  'stroke': '#555', 'stroke-linecap': 'round'},
      figure:     { 'stroke-width': 1.0,   'stroke': '#555', 'fill': '#555', 'stroke-linecap': 'round'},
      information_relation: { 'stroke-width': 1.5},
      line:       { 'stroke': '#008ec7',  'stroke-dasharray': '. '}, //atrLin
      material_relation: { 'stroke-width': 3.0},
      point:      { 'stroke': '#008ec7', 'fill': '#fff'},  //atrPun
      rectangle:  { 'stroke': '#aaa', 'fill': '#fff', 'stroke-dasharray': ''},
      symbol:     { 'font-size': 20,     'font-family': 'Verdana', 'fill': '#555', 'stroke': '#555'},
      title:      { 'font-size': 14, 'font-family': 'Verdana', 'fill': '#000'}
    };
    
    this.figures = {
      arcWithArrow: function(r, cp, orientation, feedback){
        var fig = r.set();
        var angA = 300;
        var angB = 240;
        var Rad = 14;
        
        var ip = {  x: cp.x + (Rad * Math.cos(Math.PI*(angA/180))),
                    y: cp.y - (Rad * Math.sin(Math.PI*(angA/180)))};
        var fp = {  x: cp.x + (Rad * Math.cos(Math.PI*(angB/180))),
                    y: cp.y - (Rad * Math.sin(Math.PI*(angB/180)))};
        fig.pathArc =  [
                          ["M", ip.x, ip.y],
                          ["A", Rad, Rad, cp.x, 1, 0, fp.x, fp.y]
                        ];
                
        var angle, pt;
        if(orientation == "right"){
          ip.x -= 10;
          angle = Math.PI;
          pt = ip;
        }
        else if(orientation == "left"){
          fp.x += 10;
          angle = 0;
          pt = fp;
        }
        var p0 = {x: pt.x - 10*Math.cos(angle + Math.PI/8), y: pt.y + 10*Math.sin(angle + Math.PI/8)};
        var p1 = {x: pt.x - 10*Math.cos(angle - Math.PI/8), y: pt.y + 10*Math.sin(angle - Math.PI/8)};
        
        fig.pathArrow = [["M", pt.x, pt.y], ["L", p0.x, p0.y], ["L", p1.x, p1.y], ["Z"]];
        fig.push( r.path(fig.pathArc).attr(style.arc),
                  r.path(fig.pathArrow).attr(style.figure));
        
        if(feedback == "positive"){
          fig.push(r.text(cp.x, cp.y - 2, "+").attr(style.symbol));
        }
        else if(feedback == "negative"){
          fig.push(r.text(cp.x, cp.y - 2, "-").attr(style.symbol));
        }
        return fig;
      },
      curve: function(r, points , figureStyle){
        //points = Parameters x, y, ax, ay, bx, by, zx, zy
        
        var curveStyle = utils.clone(style.curve);
        var arrowStyle = utils.clone(style.figure);
        
        curveStyle['stroke']        = figureStyle['color'] || '#555';
        curveStyle['stroke-width']  = figureStyle['stroke-width'] || 1;
        arrowStyle['stroke']        = figureStyle['color'] || '#555';
        arrowStyle['stroke-width']  = figureStyle['stroke-width'] || 1;
        arrowStyle['fill']          = figureStyle['color'] || '#555';
         
        var angle = Math.atan2( ( points.by - points.zy), (points.bx - points.zx) );
        var p1 = {x: points.zx, y: points.zy};
        var p2 = {x: p1.x + 10*Math.cos(angle + Math.PI/8), y: p1.y + 10*Math.sin(angle + Math.PI/8)};
        var p3 = {x: p1.x + 10*Math.cos(angle - Math.PI/8), y: p1.y + 10*Math.sin(angle - Math.PI/8)};
        
        var fig = r.set();
        fig.pathCurve = [["M", points.x, points.y], ["C", points.ax, points.ay, points.bx, points.by, points.zx, points.zy]];
        fig.pathArrow = [["M", p1.x, p1.y], ["L", p2.x, p2.y], ["L", p3.x, p3.y], ["Z"]];
        fig.push(
          r.path(fig.pathCurve).attr(curveStyle),
          r.path(fig.pathArrow).attr(arrowStyle)
        );
        fig.modifyPoints = function(points){
          
          this.pathCurve[0][1] = points[0].x;
          this.pathCurve[0][2] = points[0].y;
          this.pathCurve[1][1] = points[1].x;
          this.pathCurve[1][2] = points[1].y;
          this.pathCurve[1][3] = points[2].x;
          this.pathCurve[1][4] = points[2].y;
          this.pathCurve[1][5] = points[3].x;
          this.pathCurve[1][6] = points[3].y;
          
          this[0].attr({path: this.pathCurve});
          
          var angle = Math.atan2( ( points[2].y - points[3].y), (points[2].x - points[3].x) );
          var p1 = {x: points[3].x, y: points[3].y};
          var p2 = {x: p1.x + 10*Math.cos(angle + Math.PI/8), y: p1.y + 10*Math.sin(angle + Math.PI/8)};
          var p3 = {x: p1.x + 10*Math.cos(angle - Math.PI/8), y: p1.y + 10*Math.sin(angle - Math.PI/8)};
          this.pathArrow = [["M", p1.x, p1.y], ["L", p2.x, p2.y], ["L", p3.x, p3.y], ["Z"]];
          this[1].attr({path: this.pathArrow});
        };
        return fig;
      },
      figure: function(ctx){
        var fig = ctx.r.set();
        fig.border = [];
        fig.moveToPoint = function(p){
          this.transform("T" + (p.x - this.p.x) + "," + (p.y - this.p.y));
        };
        return fig;
      },
      lines: function(r, points , figureStyle){   //linCur
        var lines = r.path(
          [["M", points.x, points.y], 
           ["L", points.ax, points.ay], 
           ["M", points.bx, points.by], 
           ["L", points.zx, points.zy]]).attr(figureStyle);
           
        lines.modifyPoints = function(points){
          this.attr({path:[ ["M", points[0].x, points[0].y], 
                            ["L", points[1].x, points[1].y], 
                            ["M", points[2].x, points[2].y], 
                            ["L", points[3].x, points[3].y]]});
        };
        return lines;
      },
      relation: function(ctx, parent, p, figureStyle){
        //Delete element s[i].remove(), s.exclude(s[i])
        
        var fig = ctx.r.set();
        var curveStyle = utils.clone(style.curve);
        
        fig.state = 'initial';
        fig.p = [];
        fig.from = undefined;
        fig.to = undefined;
        
        curveStyle['stroke-width'] = figureStyle['stroke-width'] || curveStyle['stroke-width'];
        
        if(!$.isArray(p)){
          fig.p[0] = p;
          fig.push(
            ctx.r.circle(fig.p[0].x, fig.p[0].y, 4).attr(style.point)
          );
          fig.moveToPoint = function(p){
            if(this.p.length == 1){
              this[0].attr({'cx': p.x, 'cy': p.y});
            }
            else if(this.p.length == 4){
              var ip    = {x: this.p[0].x, y: this.p[0].y};
              this.p[2] = {x: (p.x + ip.x)/2, y: (p.y + ip.y)/2};
              this.p[3] = {x: p.x, y: p.y};
              
              this[1].modifyPoints(this.p);
              this[2].attr({'cx': p.x, 'cy': p.y});
            }
          };
          fig.activateSecondControl = function(ctx, pt, alpha){
            this.state = 'extend';
            this[0].animate(style.border_dis, 500, function(){ this.remove(); });
            
            var dAx = 75 * Math.cos(alpha), dAy = -75 * Math.sin(alpha);
            this.p[0]={x: pt.x, y: pt.y };
            this.p[1]={x: pt.x + dAx, y: pt.y + dAy};
            this.p[2]={x: pt.x, y: pt.y};
            this.p[3]={x: pt.x, y: pt.y};
            
            var points = {  x:  this.p[0].x, y:  this.p[0].y, 
                            ax: this.p[1].x, ay: this.p[1].y, 
                            bx: this.p[2].x, by: this.p[2].y, 
                            zx: this.p[3].x, zy: this.p[3].y  };
            this.push(
              figures.curve(ctx.r, points, curveStyle),
              ctx.r.circle(this.p[0].x, this.p[0].y, 4).attr(style.point)
            );
          };
        }
        else{
          fig.state = 'extend';
          fig.timer = undefined;
          fig.p = p;
          var points = {  x:  fig.p[0].x, y:  fig.p[0].y, 
                ax: fig.p[1].x, ay: fig.p[1].y, 
                bx: fig.p[2].x, by: fig.p[2].y, 
                zx: fig.p[3].x, zy: fig.p[3].y };
          fig.push(
            figures.curve(ctx.r, points, curveStyle),
            figures.lines(ctx.r, points, style.line),
            ctx.r.circle(points.x,  points.y,  4).attr(style.point),
            ctx.r.circle(points.ax, points.ay, 4).attr(style.point),
            ctx.r.circle(points.bx, points.by, 4).attr(style.point),
            ctx.r.circle(points.zx, points.zy, 4).attr(style.point)
          );
          
          var bb, pt;
          
          pt = ctx.path.determinePercentage(fig[0].pathCurve, 0.5);
          fig.push(
            ctx.r.image('/static/icons/close.png', pt.x, pt.y - 12, 24, 24),
            ctx.r.image('/static/icons/info.png', pt.x - 24, pt.y - 12, 24, 24)
          );
          
          for(var i=2; i<7; i++){
            fig[i].toFront();
          }
          fig[6].hide();
          fig[7].hide();
          
          fig[2].attr({cursor: "move"});
          fig[3].attr({cursor: "move"});
          fig[4].attr({cursor: "move"});
          fig[5].attr({cursor: "move"});
          
          fig.hidePoints =  function(){
            fig[1].hide();
            fig[2].hide();
            fig[3].hide();
            fig[4].hide();
            fig[5].hide();
          };
          fig.showPoints = function(){
            fig[1].show();
            fig[2].show();
            fig[3].show();
            fig[4].show();
            fig[5].show();
          };
          fig.update = function(){
            var pt = ctx.path.determinePercentage(fig[0].pathCurve, 0.5);
            fig[6].attr('x', pt.x);
            fig[6].attr('y', pt.y - 12);
            fig[6].transform('');
            fig[7].attr('x', pt.x - 24);
            fig[7].attr('y', pt.y - 12);
            fig[7].transform('');
          };
          
          fig[2].update = function (dx, dy) {
            this.transform("...T" + dx + "," + dy);
            
            bb = this.getBBox();
            fig.p[0] = {x: (bb.x + bb.width/2), 
                  y: (bb.y + bb.height/2)};
            pt = ctx.path.determinePoint(this.parent.from.border, fig.p[0]);
                  
            this.transform("...T" + (pt.x - fig.p[0].x) + "," + (pt.y - fig.p[0].y));
                  
            bb = this.getBBox();
            fig.p[0] = {x: (bb.x + bb.width/2), 
                  y: (bb.y + bb.height/2)};
            fig[3].update(dx, dy);
          };
          fig[3].update = function (dx, dy) {
            this.transform("...T" + dx + "," + dy);
            
            var bb = this.getBBox();
            fig.p[1] = {x: (bb.x + (bb.width)/2), 
                  y: (bb.y + (bb.height)/2)};
            fig[0].modifyPoints(fig.p);
            fig[1].modifyPoints(fig.p);
            fig.update();
          };
          fig[4].update = function (dx, dy) {
            this.transform("...T" + dx + "," + dy);
            
            var bb = this.getBBox();
            fig.p[2] = {x: (bb.x + (bb.width)/2), 
                  y: (bb.y + (bb.height)/2)};
            fig[0].modifyPoints(fig.p);
            fig[1].modifyPoints(fig.p);
            fig.update();
          };
          fig[5].update = function (dx, dy) {
            this.transform("...T" + dx + "," + dy);
            
            bb = this.getBBox();
            fig.p[3] = {x: (bb.x + (bb.width)/2), 
                  y: (bb.y + (bb.height)/2)};
            pt = ctx.path.determinePoint(this.parent.to.border, fig.p[3]);
                  
            this.transform("...T" + (pt.x - fig.p[3].x) + "," + (pt.y - fig.p[3].y));
                  
            bb = this.getBBox();
            fig.p[3] = {x: (bb.x + (bb.width)/2), 
                  y: (bb.y + (bb.height)/2)};
            fig[4].update(dx, dy);
          };
          
          fig[2].drag(moveActions.move, moveActions.start, moveActions.end);
          fig[3].drag(moveActions.move, moveActions.start, moveActions.end);
          fig[4].drag(moveActions.move, moveActions.start, moveActions.end);
          fig[5].drag(moveActions.move, moveActions.start, moveActions.end);
          fig.hover(
            function(){
              fig[6].show();
              fig[7].show();
              fig.showPoints();
              clearInterval(fig.timer);
            },
            function(){
              fig[6].hide();
              fig[7].hide();
              fig.timer = setTimeout(function(){
                fig.hidePoints();
                }, 2000);
            }
          );
        }
        utils.parentReference(fig, parent);
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
              utils.parentReference(el, parent);
            }
            else{
              el.parent = parent;
            }
          });
          fig.parent = parent;
        }
      },
      textToVar: function(text){
        return text
          .toLowerCase()
          .replace(/\u000A+/g,'_')
          .replace(/[\u00E0-\u00E5]+/g,'a')
          .replace(/[\u00E8-\u00EB]+/g,'e')
          .replace(/[\u00EC-\u00EF]+/g,'i')
          .replace(/[\u00F2-\u00F6]+/g,'o')
          .replace(/[\u00F9-\u00FC]+/g,'u')
          .replace(/\u00F1+/g,'nh')
          .replace(/[^\w ]+/g,'')
          .replace(/ +/g,'_');
      },
      textToTitle: function(text){
        text = text.toLowerCase().replace(/\u000A+/g,' ').replace(/ +/g,' ');
        return text.charAt(0).toUpperCase() + text.slice(1);
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
        this.name = utils.textToVar(title);
        this.fig.changeTitle(title);                  //camTit
        this.ctx.changeTitle(this);                   //modTitMenu
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
      },
      viewControls: function(){
        var obj;
        if(this.name){
          obj = this;
        }else if(this.parent){
          obj = this.parent;
        }
        if(obj){
          obj.ctx.viewControls(obj);
        }
      }
    });
    
    this.EleBase = Unit.extend({
      init: function(ctx){
        this._super(ctx);
        
        this.definition     = ' ';
        this.units          = ' ';
        
        this.connec           = {};       //Connections
        this.connec['oriAce'] = true;     // (true || false)      Origin accepts
        this.connec['desAce'] = true;     // (true || false)      Destination accepts
        this.connec['oriQua'] = 'n';      // ('0' || '1' || 'n')  Origin Quantity 
        this.connec['desQua'] = 'n';      // ('0' || '1' || 'n')  Destination Quantity
        
        this.figGenerator = undefined;
        this.border = [];
        
        this.enteringRels = {};
        this.leavingRels  = {};
        
        this.enteringRelsQua = 0;
        this.leavingRelsQua = 0;
      },
      changeDefinition: function(definition){     	 //camDefi
        this.definition = definition;
      },
      changeUnits: function(units){               	 //camUnid
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
      existsOriginRel: function(des_id){
        var idOri, idDes;
        var exists = false;
        
        for(var rel in this.leavingRels){
          idOri = false;
          idDes = false;
          if(this.leavingRels[rel].to.id == des_id){
            idOri = true;
          }
          if(this.leavingRels[rel].from.id == this.id){
            idDes = true;
          }
          if(idOri && idDes){
            exists = true;
            break;
          }
        }
        return exists;
      },
      existsDestinationRel: function(ori_id){
        var idOri, idDes;
        var exists = false;
        
        for(var rel in this.enteringRels){
          idOri = false;
          idDes = false;
          if(this.enteringRels[rel].from.id == ori_id){
            idOri = true;
          }
          if(this.enteringRels[rel].to.id == this.id){
            idDes = true;
          }
          if(idOri && idDes){
            exists = true;
            break;
          }
        }
        return exists;
      },
      restoreLinks: function(){
        var oriRel, desRel, pts, pt;
        for(var rel in this.leavingRels){
          oriRel = this.leavingRels[rel];
          if(oriRel){
            //pts = oriRel.getRelationPoints();
            //pt = this.ctx.path.determinePoint(this.border, pts.po);
            //oriRel.changePoints({po: pt});
            //oriRel.changeTitle(this.title, oriRel.des.title);
          }
        }
        for(var rel in this.enteringRels){
          desRel = this.enteringRels[rel];
          if(desRel){
            //pts = desRel.getRelationPoints();
            //pt = this.ctx.path.determinePoint(this.border, pts.pd);
            //desRel.changePoints({pd: pt});
            //desRel.changeTitle(desRel.from.title, this.title);
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
        pp.animate(style.border_dis, 100, function(){ this.remove(); });
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
            el.enteringRels[rel].controlMove({pd: {dx: dx, dy: dy}});
          }
        }
        for(var rel in el.leavingRels){
          if(el.leavingRels[rel]){
            el.leavingRels[rel].controlMove({po: {dx: dx, dy: dy}});
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
              copy.changeTitle(this.title);
            }
          }
        }
      },
      createTextEditor: function(){
        var obj;
        if(this.name){
          obj = this;
        }else if(this.parent){
          obj = this.parent;
        }
        if(obj){
          obj.ctx.viewTextEditor(obj);
        }
      }
    });
    
    this.Relation = Unit.extend({
      init: function(ctx){
        this._super(ctx);
        
        this.from     = undefined;
        this.to       = undefined;
        this.selected = false;
      },
      changePoints: function(pt){
        var bb;
        if(pt.po){
          this.fig[2].transform("...T" + (pt.po.x - this.fig.p[0].x) +
                                "," + (pt.po.y - this.fig.p[0].y));
          bb = this.fig[2].getBBox();
          this.fig.p[0] ={x: (bb.x + (bb.width)/2), 
                          y: (bb.y + (bb.height)/2)};
          
          this.fig[0].modifyPoints(this.fig.p);
          this.fig[1].modifyPoints(this.fig.p);
        }
        else if(pt.pco){
          this.fig.p[1] = pt.pco;
        }
        else if(pt.pcd){
          this.fig.p[2] = pt.pcd;
        }
        else if(pt.pd){
          this.fig[5].transform("...T" + (pt.pd.x - this.fig.p[3].x) +
                                "," + (pt.pd.y - this.fig.p[3].y));
          bb = this.fig[5].getBBox();
          this.fig.p[3] ={x: (bb.x + (bb.width)/2), 
                          y: (bb.y + (bb.height)/2)};
          
          this.fig[0].modifyPoints(this.fig.p);
          this.fig[1].modifyPoints(this.fig.p);
        }
      },
      changeTitle: function(from_title, to_title){
        this.title = this.ctx.relationTitle(from_title, to_title);       
        this.name = utils.textToVar(this.title);
        //this.ctx.modTitMenu(this);
      },
      controlMove: function(cont){
        //cont po, pco, pd, pcd
        var pt, dx, dy;
        if(cont.po){
          dx = cont.po.dx;
          dy = cont.po.dy;
          
          pt = this.fig.p[0];
          this.fig.p[0] ={x: pt.x + dx - (this.fig.dx || 0), 
                  y: pt.y + dy - (this.fig.dy || 0)};
          pt = this.fig.p[1];
          this.fig.p[1] ={x: pt.x + dx - (this.fig.dx || 0), 
                  y: pt.y + dy - (this.fig.dy || 0)};
          
          this.fig[0].modifyPoints(this.fig.p);
          this.fig[1].modifyPoints(this.fig.p);
          
          this.fig[2].transform("...T" + (dx - (this.fig.dx || 0)) +
                       "," + (dy - (this.fig.dy || 0)));
          pt = this.fig[2].getBBox();
          this.fig.p[0] ={x: (pt.x + (pt.width)/2), 
                  y: (pt.y + (pt.height)/2)};
                     
          this.fig[3].transform("...T" + (dx - (this.fig.dx || 0)) +
                       "," + (dy - (this.fig.dy || 0)));
          pt = this.fig[3].getBBox();
          this.fig.p[1] ={x: (pt.x + (pt.width)/2), 
                  y: (pt.y + (pt.height)/2)};
        }
        else if(cont.pd){
          dx = cont.pd.dx;
          dy = cont.pd.dy;
          
          pt = this.fig.p[2];
          this.fig.p[2] ={x: pt.x + dx  - (this.fig.dx || 0), 
                  y: pt.y + dy  - (this.fig.dy || 0)};
                  
          pt = this.fig.p[3];
          this.fig.p[3] ={x: pt.x + dx  - (this.fig.dx || 0), 
                  y: pt.y + dy  - (this.fig.dy || 0)};
                  
          this.fig[0].modifyPoints(this.fig.p);
          this.fig[1].modifyPoints(this.fig.p);
          
          
          this.fig[4].transform("...T" + (dx - (this.fig.dx || 0)) +
                       "," + (dy - (this.fig.dy || 0)));
          pt = this.fig[4].getBBox();
          this.fig.p[2] ={x: (pt.x + (pt.width)/2), 
                  y: (pt.y + (pt.height)/2)};
                       
          this.fig[5].transform("...T" + (dx - (this.fig.dx || 0)) +
                       "," + (dy - (this.fig.dy || 0)));
          pt = this.fig[5].getBBox();
          this.fig.p[3] ={x: (pt.x + (pt.width)/2), 
                  y: (pt.y + (pt.height)/2)};
        }
        this.fig.dx = dx;
        this.fig.dy = dy;
        this.fig.update();
      },
      getRelationPoints :function(){
        return {po: this.fig.p[0], pd: this.fig.p[3]};
      },
      moveDelta: function(dx, dy){
        var bb;
        
        this.fig[2].transform("...T" + dx + "," + dy);
        bb = this.fig[2].getBBox();
        this.fig.p[0] ={x: (bb.x + (bb.width)/2), 
                y: (bb.y + (bb.height)/2)};
      
        this.fig[3].transform("...T" + dx + "," + dy);
        bb = this.fig[3].getBBox();
        this.fig.p[1] ={x: (bb.x + (bb.width)/2), 
                y: (bb.y + (bb.height)/2)};
        
        this.fig[4].transform("...T" + dx + "," + dy);
        bb = this.fig[4].getBBox();
        this.fig.p[2] ={x: (bb.x + (bb.width)/2), 
                y: (bb.y + (bb.height)/2)};
        
        this.fig[5].transform("...T" + dx + "," + dy);
        bb = this.fig[5].getBBox();
        this.fig.p[3] ={x: (bb.x + (bb.width)/2), 
                y: (bb.y + (bb.height)/2)};
        
        this.fig.update();
        
        this.fig[1].modifyPoints(this.fig.p);
        this.fig[0].modifyPoints(this.fig.p);
      },
      viewPoints: function(view){
        this.selected = view;
        if(this.selected){
          this.fig.showPoints();
        }else{
          this.fig.hidePoints();
        }
      },
      remove: function(){
        var relation;
        if(this.name){
          relation = this;
        }else if(this.parent){
          relation = this.parent;
        }
        if(relation){
          var list  = relation.list;
          
          relation.from.delLeavingRels(relation);
          relation.to.delEnteringRels(relation);
          
          if(list[relation.id]){
            delete(list[relation.id]);
          } 
          
          relation.ctx.deleteControls(relation);
          var limit = relation.ctx.limitAdjustList(list);
          relation.ctx.idx[relation.type] = ++limit;
          
          relation.fig.remove();
          relation.fig = undefined;
          relation = undefined;
        }
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
        this.svgDiv  = "";
        
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
      changeTitle: function(el){
        var title = utils.textToTitle(el.title);
        if(title.length > 16){
          title = title.substring(0,12)+'...'+title.substring(title.length-3, title.length);
        }
        $('#'+el.id+'-item>div.panel-heading>a>h4').html(title);
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
      limitAdjustList: function(list){
        var val;
        var limit = -1;
        var idx = -1;
        for(var i in list){
          idx = list[i].id.lastIndexOf('-');
          val = Number(list[i].id.substr(++idx));
          limit = (val > limit) ? val : limit;
        }
        return limit;
      },
      moveObjs: function(dx, dy){
        for(var i in this.list){
          for( var j in this.list[i]){
            this.list[i][j].moveDelta(dx, dy);    //mover
          }
        }
      },
      relationTitle: function (from_title, to_title) {
        var title;
    
        if(from_title.length > 9){
          title = from_title.substr(0,4)+'..'+
                  from_title.substr(-4);
        }
        else{
          title = from_title;
        }
        
        title += '-';
        
        if(to_title.length > 9){
          title += to_title.substr(0,4)+'..'+
                  to_title.substr(-4);
        }
        else{
          title += to_title;
        }
        return title;
      },
      viewControls: function(el){
        var isNotCurrent = false;
        var lists = $('#elements-'+el.ctx.id+'>div>.panel-collapse.in');
        if(lists.length == 0){ isNotCurrent = true; };
        lists.each(function(idx){
          if(this.id != (el.type+'-list')){
            $(this).collapse('hide');
            isNotCurrent = true;
          }
        });
        if(isNotCurrent){
          $('#'+el.type+'-list').collapse('show');
          isNotCurrent = false;
        }
        
        lists = $('#'+el.type+'-items>div>.panel-collapse.in');
        if(lists.length == 0){ isNotCurrent = true; };
        lists.each(function(idx){
          if(this.id != (el.id+'-item-body')){
            $(this).collapse('hide');
            isNotCurrent = true;
          }
        });
        if(isNotCurrent){
          $('#'+el.id+'-item-body').collapse('show');
        }
      },
      viewTextEditor: function(el){
        var bb = el.fig[1].getBBox();
        
        $("#svg-div-inf").append(
          "<div id='text-edit-control' class='svg-input' style='"+
          "left:"+(bb.x-10)+"px; top:" +(bb.y-5)+"px;'>"+
            "<textarea id='text-edit-input' rows='1' class='text-edit' style='"+
            "width:"+(bb.width+20)+"px; height:"+(bb.height+10)+"px;'>"+
              el.title+
            "</textarea>"+
          "</div>"
        );
        $("#text-edit-input").focus();
        $("#text-edit-input").mouseleave(function(){
          el.changeTitle($(this).val());
          $("#text-edit-control").remove();
        });
        $("#text-edit-input").focusout(function() {
          el.changeTitle($(this).val());
          $("#text-edit-control").remove();  
        });
      },
      
      panel: {
        getSize: function(){
          return {w: $(this.ctx.svgDiv).width(), h: $(this.ctx.svgDiv).height()};
        },
        resize: function(width, height){
          this.ctx.baseLayer.attr({'width': width});
          this.ctx.baseLayer.attr({'height': height});
          $(this.ctx.svg).width(width);
          $(this.ctx.svg).height(height);
          $(this.ctx.svgDiv).width(width);
          $(this.ctx.svgDiv).height(height);
        }
      },
      path: {
        determineAngle: function(path, pt){
          var pp = this.ctx.r.path(path);
          var tl = pp.getTotalLength();
          var pr = [];
          var cp, angle, cx = 0, cy = 0;
          
          for(var i=0; i < 50; i++){
            pr[i] = tl*(i/50);
            cp = pp.getPointAtLength(pr[i]);
            cx += cp.x;
            cy += cp.y;
          }
          cp = ({x: cx/50, y: cy/50});
          angle = Math.atan2( ( cp.y - pt.y), (pt.x - cp.x) );
          pp.remove();
          return angle;
        },
        determinePoint: function(path, pt){
          var pp = this.ctx.r.path(path).attr(style.border);
          var tl = pp.getTotalLength();
          var ep, diff, idx, minor;
          var pr = [];
          var r = [];
          
          pr[0]  = 0;
          pr[10] = tl;
          
          for(var i=1; i < 10; i++){
            pr[i] = tl*(i/10);
          } 
          
          diff = pr[10] - pr[0];
          
          while(diff > 2){
            for(var i=0; i<10; i++){
              ep = pp.getPointAtLength((pr[i]+pr[i+1])/2);
              r.push(Math.sqrt(Math.pow(ep.x - pt.x,2)+Math.pow(ep.y - pt.y,2)));
            }
            
            minor = Math.min.apply(Math, r);
            
            for(var i=0; i<10; i++){
              if(r[i] == minor){
                idx = i;
                break;
              }
            }
            pr[0] = pr[idx];
            pr[10] = pr[idx+1];
            
            for(var i=1; i<10; i++){
              pr[i] = (pr[0] + (pr[10]-pr[0])*(i/10));  
            }     
            diff = pr[10] - pr[0];
            r = [];
          }
          ep = pp.getPointAtLength(pr[idx]);
          pp.animate(style.border_dis, 500, function(){ this.remove(); });
          return {x: ep.x, y: ep.y};
        },
        determinePercentage: function(path, percentage){
          var pp = this.ctx.r.path(path);
          var pt = pp.getPointAtLength(percentage * pp.getTotalLength());
          pp.remove();
          pp = undefined;
          return pt; 
        }
      },
      pointer: {
        getPosition: function(e){
          var offset  = $(this.ctx.svgDiv).offset();
          
          return p    = {x: e.clientX - offset.left, 
                      y: e.clientY - offset.top};   
        },
        existElement: function(p){
          var exist = false; 
          for( var l in this.ctx.list){
            for(var e in this.ctx.elements){
              if(l == this.ctx.elements[e]){
                for(var le in this.ctx.list[l]){
                  exist = Raphael.isPointInsidePath(this.ctx.list[l][le].border, p.x, p.y);     
                  if(exist){
                    return this.ctx.list[l][le];
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
          
        },
        existRelation: function(sector, rel){
          
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
      verifyBrowsers: function(){
        var IE = (navigator.appName=='Microsoft Internet Explorer')?parseFloat((new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})")).exec(navigator.userAgent)[1]):-1;
        if(IE > -1 && IE < 9){
          //$('#alerta').css('display', 'block');
        }
      }
    });
    
  })();  
});