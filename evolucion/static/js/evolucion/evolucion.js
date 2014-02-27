/* Evolucion
 * By John Garavito 
 */

this.style = {
  arc:        { 'stroke-width': 2.5,   'stroke': '#555', 'stroke-linecap': 'round'},
  base:       { 'stroke-width': 0,     'stroke': '',     'fill': '#fff', 'fill-opacity': 0},
  border:     { 'stroke': '#008ec7'},     //atrBor
  border_dis: { 'stroke': '#fff'},        //atrDes
  container:  { 'stroke': '#888', 'stroke-width': 2.5 },   //atrCon
  curve:      { 'stroke-width': 1.0,  'stroke': '#555', 'stroke-linecap': 'round'},
  figure:     { 'stroke-width': 1.0,   'stroke': '#555', 'fill': '#555', 'stroke-linecap': 'round'},
  
  standard:   { 'stroke-width': 2.0,   'stroke': '#555', 'fill': '#fff', 'stroke-linecap': 'round'},  //atrFiE
  FiA:        { 'stroke-width': 2.0,   'stroke': '#555', 'fill': '#f55', 'stroke-linecap': 'round'},  //atrFiA
  heavy_line: { 'stroke-width': 3.0,   'stroke': '#555', 'fill': '#fff'},                             //atrFiD
  
  information_relation: { 'stroke-width': 1.5},
  line:       { 'stroke': '#008ec7',  'stroke-dasharray': '. '}, //atrLin
  material_relation: { 'stroke-width': 3.0},
  point:      { 'stroke': '#008ec7', 'fill': '#fff'},  //atrPun
  rectangle:  { 'stroke': '#aaa', 'fill': '#fff', 'stroke-dasharray': ''},
  symbol:     { 'font-size': 20,     'font-family': 'Verdana', 'fill': '#555', 'stroke': '#555'},
  text:       {  'font-size': 12, 'font-family': 'Verdana', 'fill': '#000'},  //atrTex
  title:      { 'font-size': 14, 'font-family': 'Verdana', 'fill': '#000'}  //atrTit
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
      
      pt = ctx.path.pointFromPercentage(fig[0].pathCurve, 0.5);
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
        var pt = ctx.path.pointFromPercentage(fig[0].pathCurve, 0.5);
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
        
        pt = ctx.path.nearestPoint(this.parent.from.fig.border, fig.p[0]);
              
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
        pt = ctx.path.nearestPoint(this.parent.to.fig.border, fig.p[3]);
              
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
  },
  
  clone: function(ctx, parent, p){
    var fig = ctx.r.set();
    
    fig.p = {x: p.x, y: p.y};
    
    fig.push(
      ctx.r.image('/static/icons/clone-icon.png', 0, 0, 24, 24)
    ); 
    fig[0].toFront();
    
    fig.moveToPoint = function(p){
      this[0].transform("T" + (p.x - 12) + "," + (p.y - 12));
    };
    return fig;
  },
  sector: function (ctx, parent, p, size, title){
    var fig = figures.figure(ctx);
    var cp, bb, op, width, height, middle_x, middle_y;
    var size_dp = size || {'width': 250, 'height': 500};
    
    fig.p = {x: p.x, y: p.y};
    fig.push(
      ctx.r.text(fig.p.x, fig.p.y, title).attr(style.title)
    );
    
    bb = fig[0].getBBox();
    op = {x: bb.x - 2, y: bb.y - 1};
    width = bb.width + 4;
    height = bb.height + 2;
    middle_x = op.x + width/2;
    middle_y = op.y + height + 2;
    
    cp = {  p0x: middle_x - size_dp.width/2, p0y: middle_y,
            p1x: middle_x + size_dp.width/2, p1y: middle_y, 
            p2x: middle_x + size_dp.width/2, p2y: middle_y + size_dp.height, 
            p3x: middle_x - size_dp.width/2, p3y: middle_y + size_dp.height };
    
    fig.push(
      ctx.r.rect(op.x, op.y, width, height, 4).attr(style.rectangle),
      ctx.r.rect(cp.p0x, cp.p0y, size_dp.width, size_dp.height, 0).attr(style.container),
      ctx.r.circle(cp.p0x, cp.p0y, 4).attr(style.point),
      ctx.r.circle(cp.p1x, cp.p1y, 4).attr(style.point),
      ctx.r.circle(cp.p2x, cp.p2y, 4).attr(style.point),
      ctx.r.circle(cp.p3x, cp.p3y, 4).attr(style.point),
      ctx.r.image('/static/icons/close.png', op.x + width - 12, op.y - 12, 24, 24),
      ctx.r.image('/static/icons/info.png', op.x + width - 36, op.y - 12, 24, 24)          
    );
      
    fig[1].toFront();
    fig[0].toFront();
    fig[7].toFront();
    fig[8].toFront();
    fig[7].hide();
    fig[8].hide();
    
    for(var i=0; i<3; i++){
      fig[i].attr({ cursor: "move"});
    }
    
    fig[3].attr({ cursor: "nw-resize"});
    fig[4].attr({ cursor: "ne-resize"});
    fig[5].attr({ cursor: "se-resize"});
    fig[6].attr({ cursor: "sw-resize"});
    
    fig.changeTitle = function(title){
      var bb, cp, op, width, height, middle_x, middle_y;
      
      this[0].attr('text', title);
      
      bb = this[0].getBBox();
      op = {x: bb.x - 2, y: bb.y -1};
      width = bb.width + 4;
      height = bb.height + 2;
      middle_x = op.x + width/2;
      
      this[1].attr('x', op.x);
      this[1].attr('y', op.y);
      this[1].attr('width', width);
      this[1].attr('height', height);
      this[1].transform('');
      
      this[2].attr('x', middle_x - (this[2].attr('width')/2));
      this[2].attr('y', op.y + height + 2);
      this[2].transform('');
      
      this[7].attr('x', op.x + width - 12);
      this[7].attr('y', op.y - 12);
      this[7].transform('');
      
      bb = this[2].getBBox();
      op = {x: bb.x, y: bb.y};
      width = bb.width;
      height = bb.height;
      
      cp = {  p0x: op.x,      p0y: op.y,
              p1x: op.x + width,  p1y: op.y, 
              p2x: op.x + width,  p2y: op.y + height, 
              p3x: op.x,          p3y: op.y + height};
              
      this[3].attr('cx', cp.p0x);
      this[3].attr('cy', cp.p0y);
      this[3].transform('');
      
      this[4].attr('cx', cp.p1x);
      this[4].attr('cy', cp.p1y);
      this[4].transform('');
      
      this[5].attr('cx', cp.p2x);
      this[5].attr('cy', cp.p2y);
      this[5].transform('');
      
      this[6].attr('cx', cp.p3x);
      this[6].attr('cy', cp.p3y);
      this[6].transform('');
    };
    fig.getArea = function(){
      var bb = this[2].getBBox();
      
      return [["M", bb.x, bb.y], 
          ["H", bb.x2], 
          ["V", bb.y2],
          ["H", bb.x],
          ["V", bb.y]]; 
    };
    fig.getBorder = function(){
      var bb = this[1].getBBox();
      
      this.border = [["M", bb.x - 2, bb.y -1], 
              ["H", bb.x2 + 2], 
              ["V", bb.y2 + 1],
              ["H", bb.x - 2],
              ["V", bb.y - 1]];
      return this.border;
    };
    fig.getSize = function(){
      var bb = this[2].getBBox(); 
      
      return {'width':  bb.width,
              'height': bb.height };
    };
    fig.showPoints = function(){
      fig[3].show();
      fig[4].show();
      fig[5].show();
      fig[6].show();
    };
    fig.hidePoints = function(){
      fig[3].hide();
      fig[4].hide();
      fig[5].hide();
      fig[6].hide();
    };
    
    fig[3].update = function (dx, dy) {
      var bb, bb_tit, dx_tit, op, width, height;
      
      bb = fig[2].getBBox();
      op = {x: bb.x, y: bb.y};
      width = bb.width;
      height  = bb.height;
      
      bb_tit = fig[1].getBBox();
      dx_tit = (op.x + width/2) - (bb_tit.x + (bb_tit.width/2));
      
      if( ((width - dx) > 10) && ((height - dy) > 10)){
        fig[0].transform("...T" + dx_tit + "," + dy);
        fig[1].transform("...T" + dx_tit + "," + dy);
        
        fig[2].attr('width',  width - dx);
        fig[2].attr('height', height  - dy);
        fig[2].transform("...T" + dx + "," + dy);
        fig[3].transform("...T" + dx + "," + dy);
        fig[4].transform("...T" + 0  + "," + dy);
        fig[6].transform("...T" + dx + "," + 0);
        
        fig[7].transform("...T" + dx_tit + "," + dy);
        fig[8].transform("...T" + dx_tit + "," + dy);
      }
    };
    fig[4].update = function (dx, dy) {
      var bb, bb_tit, dx_tit, op, width, height;
      
      bb = fig[2].getBBox();
      op = {x: bb.x, y: bb.y};
      width = bb.width;
      height  = bb.height;
      
      bb_tit = fig[1].getBBox();
      dx_tit = (op.x + width/2) -
      (bb_tit.x + (bb_tit.width/2));
      
      if( ((width + dx) > 10) && ((height - dy) > 10)){
        fig[0].transform("...T" + dx_tit + "," + dy);
        fig[1].transform("...T" + dx_tit + "," + dy);
        
        fig[2].attr('width',  width + dx);
        fig[2].attr('height', height  - dy);
        fig[2].transform("...T" + 0  + "," + dy);
        fig[3].transform("...T" + 0 + "," + dy);
        fig[4].transform("...T" + dx  + "," + dy);
        fig[5].transform("...T" + dx + "," + 0);
        
        fig[7].transform("...T" + dx_tit + "," + dy);
        fig[8].transform("...T" + dx_tit + "," + dy);
      }
    };
    fig[5].update = function (dx, dy) {
      var bb, bb_tit, dx_tit, op, width, height;
      
      bb = fig[2].getBBox();
      op = {x: bb.x, y: bb.y};
      width = bb.width;
      height  = bb.height;
      
      bb_tit = fig[1].getBBox();
      dx_tit = (op.x + width/2) -
      (bb_tit.x + (bb_tit.width/2));
      
      if( ((width + dx) > 10) && ((height + dy) > 10)){
        fig[0].transform("...T" + dx_tit + "," + 0);
        fig[1].transform("...T" + dx_tit + "," + 0);
        
        fig[2].attr('width',  width + dx);
        fig[2].attr('height', height  + dy);
        fig[2].transform("...T" + 0  + "," + 0);
        fig[4].transform("...T" + dx + "," + 0);
        fig[5].transform("...T" + dx + "," + dy);
        fig[6].transform("...T" + 0  + "," + dy);
        
        fig[7].transform("...T" + dx_tit + "," + 0);
        fig[8].transform("...T" + dx_tit + "," + 0);
      }
    };
    fig[6].update = function (dx, dy) {
      var bb, bb_tit, dx_tit, op, width, height;
      
      bb = fig[2].getBBox();
      op = {x: bb.x, y: bb.y};
      width = bb.width;
      height  = bb.height;
      
      bb_tit = fig[1].getBBox();
      dx_tit = (op.x + width/2) -
      (bb_tit.x + (bb_tit.width/2));
      
      if( ((width - dx) > 10) && ((height + dy) > 10)){
        fig[0].transform("...T" + dx_tit + "," + 0);
        fig[1].transform("...T" + dx_tit + "," + 0);
        
        fig[2].attr('width',  width - dx);
        fig[2].attr('height', height  + dy);
        fig[2].transform("...T" + dx + "," + 0);
        fig[3].transform("...T" + dx + "," + 0);
        fig[5].transform("...T" + 0  + "," + dy);
        fig[6].transform("...T" + dx + "," + dy);
        
        fig[7].transform("...T" + dx_tit + "," + 0);
        fig[8].transform("...T" + dx_tit + "," + 0);
      }
    };
    
    fig.hover(
      function(){
        fig[7].show();
        fig[8].show();
      },
      function(){
        fig[7].hide();
        fig[8].hide();
      }
    );
      
    fig[3].drag(moveActions.move, moveActions.start, moveActions.end);
    fig[4].drag(moveActions.move, moveActions.start, moveActions.end);
    fig[5].drag(moveActions.move, moveActions.start, moveActions.end);
    fig[6].drag(moveActions.move, moveActions.start, moveActions.end);
    
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
  roundDec: function(number, dec){
    var factor = Math.pow(10, dec);
    return Math.round(number*factor)/factor;
  },
  isNumber: function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
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
    
    this.ctx = ctx;
  },
  changeTitle: function(title){
    this.title = title;
    this.name = utils.textToVar(title);
    this.fig.changeTitle(title);                  //camTit
    this.ctx.changeTitle(this);                   //modTitMenu
    this.fig.border = this.fig.getBorder();
    if(typeof(this.restoreLinks) == 'function'){  //restEnl
      this.restoreLinks();
    }
    if(typeof(this.restoreCopies) == 'function'){ //restNomCop
      this.restoreCopies();
    }
  },
  changeDescription: function(description){       
    this.description = description;
  },
  position: function(){                           
    return this.fig.p;
  },
  moveDelta: function(dx, dy){                    
    var bb = this.fig[0].getBBox();
    this.fig.p  = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
        
    this.fig.transform("...T" + dx + "," + dy);
    this.fig.border = this.fig.getBorder();
  },
  integrateCtx: function(){
    this.ctx.integrateControls(this);
  },
  viewDetails: function(){
    var obj;
    
    if(this.name){
      obj = this;
    }
    else if(this.parent){
      obj = this.parent;
    }
    if(obj.ref){
      obj = obj.ref;
    }
    if(obj){
      obj.ctx.viewDetails(obj);
    }
  }
});

this.EleBase = Unit.extend({
  init: function(ctx){
    this._super(ctx);
    
    this.definition     = '';
    
    this.connec           = {};       //Connections
    this.connec['oriAce'] = true;     // (true || false)      Origin accepts
    this.connec['desAce'] = true;     // (true || false)      Destination accepts
    this.connec['oriQua'] = 'n';      // ('0' || '1' || 'n')  Origin Quantity 
    this.connec['desQua'] = 'n';      // ('0' || '1' || 'n')  Destination Quantity
    
    this.figGenerator = undefined;
    
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
        //pt = this.ctx.path.nearestPoint(this.border, pts.op);
        //oriRel.changePoints({op: pt});
        //oriRel.changeTitle(this.title, oriRel.des.title);
      }
    }
    for(var rel in this.enteringRels){
      desRel = this.enteringRels[rel];
      if(desRel){
        //pts = desRel.getRelationPoints();
        //pt = this.ctx.path.nearestPoint(this.border, pts.dp);
        //desRel.changePoints({dp: pt});
        //desRel.changeTitle(desRel.from.title, this.title);
      }
    }
  },
  start: function(){
    var el = this.parent;
    var fig = el.fig;
    
    fig.dx = 0;
    fig.dy = 0;

    for(var rel in el.enteringRels){
      el.enteringRels[rel].fig.dx = 0;
      el.enteringRels[rel].fig.dy = 0;
    }
    for(var rel in el.leavingRels){
      el.leavingRels[rel].fig.dx = 0;
      el.leavingRels[rel].fig.dy = 0;
    }
    
    var border = fig.getBorder();
    var pp = el.ctx.r.path(border).attr(style.border);
    pp.animate(style.border_dis, 100, function(){ this.remove(); });
    pp = undefined;
  },
  end: function(){
    var el = this.parent;
    var fig = el.fig;   
    var bb;
    
    fig.dx = 0;
    fig.dy = 0;
    
    bb = fig[1].getBBox();
    fig.p  = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
    
    for(var rel in el.enteringRels){
      el.enteringRels[rel].fig.dx = 0;
      el.enteringRels[rel].fig.dy = 0;
    }
    for(var rel in el.leavingRels){
      el.leavingRels[rel].fig.dx = 0;
      el.leavingRels[rel].fig.dy = 0;
    }
    fig.border = fig.getBorder();
  },
  moveFig: function(dx, dy){
    var el = this.parent;
    var fig = el.fig;   
      
    fig.transform("...T" + (dx - fig.dx) + "," + (dy - fig.dy));
    fig.dx = dx;
    fig.dy = dy;
    
    for(var rel in el.enteringRels){
      el.enteringRels[rel].controlMove({dp: {dx: dx, dy: dy}});
    }
    for(var rel in el.leavingRels){
      el.leavingRels[rel].controlMove({op: {dx: dx, dy: dy}});
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
      var clonesList= obj.clonesList;
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
      
      if(clonesList){
        for(var i in clonesList){
          clonesList[i].remove();
        }
      }
      if(ref){
        var clonesList = ref.clonesList;
        for(var i in clonesList){
          if(clonesList[i].id == obj.id){
            delete(clonesList[i]);
            var limit = obj.ctx.limitAdjustList(clonesList);
            ref.clonesListQua = ++limit;
            
            console.log(ref.clonesListQua);
          }
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
    
    this.dimension = undefined;
    
    this.clonesList = {};
    this.clonesListQua = 0;
  },
  figure: function(pos){
    this.fig = this.figGenerator(this.ctx, this, pos, this.title, {cursor: "move"});
    this.fig.border = this.fig.getBorder();
    for(var i=0; i<3; i++){
      this.fig[i].drag(this.moveFig, this.start, this.end);
    }
    this.fig[0].dblclick(this.createTextEditor);
    this.fig[3].click(this.remove);
    this.fig[4].click(this.viewDetails);
  },
  restoreCopies: function(){
    var clone;
    if(this.clonesList){
      for(var i in this.clonesList){
        clone = this.clonesList[i]; 
        if(clone){
          clone.changeTitle(this.title);
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

this.Clone = EleBase.extend({
  init: function(ctx, pos, el){
    this._super(ctx);
    
    this.type = "clone";
    var idx = this.ctx.idx[this.type]++;
        
    this.id = 'clone-'+idx;
    
    this.ref = el;     
    this.ref.clonesList[this.id] = this;
    var idx_clone = this.ref.clonesListQua++;
    
    this.title = el.title;
    this.name = utils.textToVar(this.title+" "+this.type+" "+idx_clone);
    
    this.list = this.ctx.list.clone;
    this.connec['desAce'] = false;
    this.figure(pos);
    this.integrateCtx();
    this.ref.viewDetails();
  },
  figure: function(p){
    this.fig = this.ref.figGenerator(this.ctx, this, p, this.title, {'stroke-dasharray': "-", dasharray_rec: "- ", color: "#555", cursor: "move"});
    this.fig.border = this.fig.getBorder();
    var figQua = this.fig.length-1;
    for(var i=0; i<(figQua-1); i++){
      this.fig[i].drag(this.moveFig, this.start, this.end);
    }
    this.fig[figQua-1].click(this.remove);
    this.fig[figQua].click(this.viewDetails);
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
    if(pt.op){
      this.fig[2].transform("...T" + (pt.op.x - this.fig.p[0].x) +
                            "," + (pt.op.y - this.fig.p[0].y));
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
    else if(pt.dp){
      this.fig[5].transform("...T" + (pt.dp.x - this.fig.p[3].x) +
                            "," + (pt.dp.y - this.fig.p[3].y));
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
  controlMove: function(cont, restore){
    //cont op, pco, dp, pcd
    
    var pt, dx, dy;
    if(cont.op){
      dx = cont.op.dx;
      dy = cont.op.dy;
      
      pt = this.fig.p[0];
      this.fig.p[0] ={x: pt.x + dx - (this.fig.dx || 0), 
              y: pt.y + dy - (this.fig.dy || 0)};
      pt = this.fig.p[1];
      this.fig.p[1] ={x: pt.x + dx - (this.fig.dx || 0), 
              y: pt.y + dy - (this.fig.dy || 0)};
      
      if(restore){
        console.log('\nrestore origin');
        console.log(this.id);
        console.log(this.to);
        
        console.log('Relation Point ');
        console.log(this.fig.pt_percent);
        
        pt = this.ctx.path.pointFromlength(this.to.fig.border, this.fig.pt_percent);
        
        console.log(pt);
        console.log(this.fig.p);
        
        var pre_pt = this.fig.p[3];
        var dx_con = pt.x - pre_pt.x;
        var dy_con = pt.y - pre_pt.y;
                
        this.fig.p[3] ={ x: pt.x, 
                         y: pt.y };
                         
        pt = this.fig.p[2];
        this.fig.p[2] ={ x: pt.x + dx_con, 
                         y: pt.y + dy_con };
        
        this.fig[4].transform("...T" + dx_con + "," + dy_con);
        this.fig[5].transform("...T" + dx_con + "," + dy_con);
        
      }
      
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
    else if(cont.dp){
      dx = cont.dp.dx;
      dy = cont.dp.dy;
      
      var percent;
      
      pt = this.fig.p[2];
      this.fig.p[2] ={x: pt.x + dx  - (this.fig.dx || 0), 
                      y: pt.y + dy  - (this.fig.dy || 0)};
              
      pt = this.fig.p[3];
      this.fig.p[3] ={x: pt.x + dx  - (this.fig.dx || 0), 
                      y: pt.y + dy  - (this.fig.dy || 0)};
      
      if(restore){
        console.log('\nRestore destination');
        console.log(this.id);
        console.log(this.from);
        
        console.log('Relation Point ');
        console.log(this.fig.pt_percent);
        
        pt = this.ctx.path.pointFromlength(this.from.fig.border, this.fig.pt_percent);
        
        var pre_pt = this.fig.p[0];
        var dx_con = pt.x - pre_pt.x;
        var dy_con = pt.y - pre_pt.y;
                
        this.fig.p[0] ={ x: pt.x, 
                         y: pt.y };
                         
        pt = this.fig.p[1];
        this.fig.p[1] ={ x: pt.x + dx_con, 
                         y: pt.y + dy_con };
        
        this.fig[2].transform("...T" + dx_con + "," + dy_con);
        this.fig[3].transform("...T" + dx_con + "," + dy_con);
        
      }
      
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
    return {op: this.fig.p[0], dp: this.fig.p[3]};
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

this.SecBase = Unit.extend({
  init: function(ctx){
    this._super(ctx);
    
    this.elements = {};
    this.relations = {};
    this.selected = false;
  },
  figure: function(p, size){
    this.fig = figures.sector(this.ctx, this, p, size, this.title);
    this.fig.border = this.fig.getBorder();
    for(var i=0; i<3; i++){
      this.fig[i].drag(this.moveFig, this.start, this.end);
    }
    this.fig[2].click(this.controls);
    this.fig[7].click(this.remove);
    this.fig[8].click(this.viewDetails);
    this.fig[0].dblclick(this.createTextEditor);
    this.viewControls(this.selected);
  },
  size: function(){
    var size = this.fig.getSize();
    return {  'width':  size.width,
              'height': size.height};
  },
  viewControls: function(view){
    this.selected = view;
    if(this.selected){
      this.fig.showPoints();
    }else{
      this.fig.hidePoints();
    }
  },
  controls: function(e){
    this.parent.viewControls(!this.parent.selected);
  },
  createTextEditor: function(e){
    this.parent.ctx.viewTextEditor(this.parent);
  },
  start: function(){
    var el = this.parent;
    var fig = el.fig;
    var list;
    
    fig.dx = 0;
    fig.dy = 0;
    
    el.selectElements();
    
    list = el.relations;
    
    for(var i in list){
      if(list[i].from){
        list[i].rel.fig.dx = 0;
        list[i].rel.fig.dy = 0;
      }
      else if(list[i].to){
        list[i].rel.fig.dx = 0;
        list[i].rel.fig.dy = 0;
      }
    }
    
    var border = fig.getBorder();
    var pp = el.ctx.r.path(border).attr(style.border);
    pp.animate(style.border_dis, 100, function(){ this.remove();});
  },
  moveFig: function(dx, dy){
    var el = this.parent;
    var fig = el.fig;   
    var listEle = el.elements;
    var list = el.relations;
    var pt;
    var dx_fig = dx - fig.dx;
    var dy_fig = dy - fig.dy;
    
    for(var i in listEle){
      listEle[i].moveDelta(dx_fig, dy_fig);
    }
    for(var i in list){
      if(list[i].from && list[i].to){
        list[i].rel.moveDelta(dx_fig, dy_fig);
      }
      if(!(list[i].from && list[i].to)){
        if(list[i].from){
          list[i].rel.controlMove({op: {dx: dx, dy: dy}});
        }
        else if(list[i].to){
          list[i].rel.controlMove({dp: {dx: dx, dy: dy}});
        }
      }
    }
    
    fig.transform("...T" + (dx_fig) + "," + (dy_fig));    
    fig.dx = dx;
    fig.dy = dy;
    
  },
  end: function(){
    var el = this.parent;
    var fig = el.fig;   
    var list, bb;
    
    fig.dx = 0;
    fig.dy = 0;
    bb = fig[1].getBBox();
    fig.p  = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
    
    list = el.relations;
    
    for(var i in list){
      if(list[i].from){
        list[i].rel.fig.dx = 0;
        list[i].rel.fig.dy = 0;
      }
      else if(list[i].to){
        list[i].rel.fig.dx = 0;
        list[i].rel.fig.dy = 0;
      }
    }
    
    fig.border = fig.getBorder();
  },
  selectElements: function(){
    var area = this.fig.getArea();
    var list, exists, leavingRels, enteringRels;
    
    this.elements = {};
    this.relations = {};
    
    for(var l in this.ctx.elements){
      list = this.ctx.list[this.ctx.elements[l]];
      for(var i in list){
        exists = this.ctx.sector.existElement(area, list[i]);
        if(exists){
          this.elements[list[i].id] = list[i];
          
          leavingRels  = list[i].leavingRels;
          enteringRels = list[i].enteringRels;
                        
          for(var idx in leavingRels){
            if(this.relations[leavingRels[idx].id]){
              this.relations[leavingRels[idx].id].from = true;
            }
            else{
              this.relations[leavingRels[idx].id] = {'rel': leavingRels[idx], 'from':true, 'to': false};
            }
          }
          for(var idx in enteringRels){
            if(this.relations[enteringRels[idx].id]){
              this.relations[enteringRels[idx].id].to = true;
            }
            else{
              this.relations[enteringRels[idx].id] = {'rel': enteringRels[idx], 'from': false, 'to': true};
            }
          }
        }
      }
    }
            
    list = this.ctx.list.clone;
    for(var i in list){
      exists = this.ctx.sector.existElement(area, list[i]);
      if(exists){
        this.elements[list[i].id] = list[i];
      }
    }
    if(this.ctx.list.cycle){
      list = this.ctx.list.cycle;
      for(var i in list){
        exists = this.ctx.sector.existElement(area, list[i]);
        if(exists){
          this.elements[list[i].id] = list[i];
        }
      }
    }
  },
  remove: function(){
    var obj;
    if(this.type == "seinf"){
      obj = this;
    }else if(this.parent){
      obj = this.parent;
    }
    if(obj){
      var list = obj.list;
      
      if(list){
        for(var i in list){
          if(list[i].id == obj.id){
            delete(list[i]);
          }
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

this.Editor = Class.extend({
  init: function(r){
    this.r = r;
    
    this.list     = {};
    this.idx      = {};
    this.tmp      = {};
    
    this.res      = {};        //Resources
    this.elements = [];
    this.states   = [];
    this.state    = this.state ||"";
            
    this.svg      = this.svg || "";
    this.svgDiv   = this.svgDiv || "";
    
    this.margin   = this.margin || 15;
            
    this.initBaseLayer();
  },
  activateState: function(state){
    this.state = state;
            
    var btns_info = $(this.div+'-workarea .toolbar .btn-info');
    btns_info.removeClass('btn-info');
    btns_info.addClass('btn-primary');
    
    $('#'+this.state+'-btn-'+this.id).removeClass('btn-primary');
    $('#'+this.state+'-btn-'+this.id).addClass('btn-info');
  },
  adjust: function(){
    var workAreaHeight = $('.work-area').height();
    
    $(this.divArea+' .sidebar').height(workAreaHeight);
    var toolbarHeight = ($(this.divArea+' .toolbar').outerHeight()||46);        
    $(this.language).height(workAreaHeight - toolbarHeight -2);
    
    var languageWidth = $(this.language).width();
    var languageHeight = $(this.language).height();
    
    if(languageWidth<=0){ languageWidth = 1024; }
    if(languageHeight<=0){ languageHeight = 768; }
    
    if($(this.svg).width()<languageWidth){
      $(this.svg).width(languageWidth);
      $(this.svgDiv).width(languageWidth);
    }
    if($(this.svg).height()<languageHeight){
      $(this.svg).height(languageHeight);
      $(this.svgDiv).height(languageHeight);
    }
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
    $('#'+el.id+'-item-body>div.panel-body>.name-field>p>b').html(el.name);
  },
  deleteControls: function(el){
    $('#'+el.id+'-item').remove();
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
  initWorkArea: function(){
    var workAreaHeight = $('.work-area').height();
    
    this.initToolbar();
    
    $(this.divArea+' .sidebar').height(workAreaHeight);
           
    var infToolbarHeight = ($(this.divArea+' .toolbar').outerHeight() || 46);
    var languageWidth  = ((Math.floor($('.work-area').width()*0.83)-2) || 1024);
    var languageHeight = workAreaHeight - infToolbarHeight -2;
    $(this.language).height(languageHeight);
    
    var svgDiv = $(this.svgDiv);
    svgDiv.width(languageWidth);
    svgDiv.height(languageHeight);
            
    var panel = svgDiv[0];
    var r = Raphael(panel, languageWidth, languageHeight);
    
    $(this.svgDiv+' svg').attr('id', this.svg.slice(1));
            
    return r;
  },
  initToolbar: function(){
    var ctx = this;
    $(this.divArea+' .toolbar .btn-group [title]').tooltip({ container: 'body' });
    
    $(this.divArea+' .toolbar .btn').hover(
      function() {  var name = this.id;
                    if(name.substring(0,name.indexOf('-')) != ctx.state){
                      $(this).removeClass('btn-primary'); 
                      $(this).addClass('btn-info');
                    }
                 },
      function() {  var name = this.id;
                    if(name.substring(0,name.indexOf('-')) != ctx.state){
                      $(this).removeClass('btn-info');
                      $(this).addClass('btn-primary'); 
                    }
                 }
    );
    
    $(this.divArea+' .toolbar .btn').click(function(){
      var name = $(this).attr('id');
      ctx.activateState(name.substring(0,name.indexOf('-')));
    });
  },
  integrateControls: function(el){
    var nameItemsCont = '#'+el.type+'-items';
    
    if(el.ctx.id=='saf'){
      evo.beh.integrateControls(el);
    }
    
    if(nameItemsCont && el.id && el.title){
      var html =
        "<div id='"+el.id+"-item' class='panel panel-default'>"+
          "<div class='panel-heading'>"+
            "<a data-toggle='collapse' data-parent='"+nameItemsCont+"' href='#"+el.id+"-item-body'>"+
              "<h4 class='panel-title'>"+
                el.title+
              "</h4>"+
            "</a>"+
          "</div>"+
          "<div id='"+el.id+"-item-body' class='panel-collapse collapse'>"+
            "<div class='panel-body'>"+
              "<div class='form-group centered name-field'>"+
                "<p>Nombre: <b>"+el.name+"</b></p>"+
              "</div>";
      
      if(el.description){
        html +=
            "<div class='form-group'>"+
              "<label for='"+el.id+"-description' class='control-label'>"+
                "Descripción"+
              "</label>"+
              "<textarea id='"+el.id+"-description' name='description' class='form-control' maxlength='200' cols='40' rows='5' placeholder='Descripción'>"+
              el.description+
              "</textarea>"+
            "</div>";
      }
      if(el.definition){
        html +=
            "<div class='form-group'>"+
              "<label for='"+el.id+"-definition' class='control-label'>"+
                "Definición"+
              "</label>"+
              "<textarea id='"+el.id+"-definition' name='definition' class='form-control' maxlength='200' cols='40' rows='5' placeholder='Definición'>"+
              el.definition+
              "</textarea>"+
            "</div>";
      }
      if(el.dimension){
        html += 
            "<div class='form-group'>"+
              "<label for='"+el.id+"-dimension' class='control-label'>Dimensión</label>"+
              "<input id='"+el.id+"-dimension' type='text' name='dimension' class='form-control' maxlength='200' placeholder='Dimensión' value='"+el.dimension+"'>"+
            "</div>";
      }
      if(el.units){
        html += 
            "<div class='form-group'>"+
              "<label for='"+el.id+"-units' class='control-label'>Unidades</label>"+
              "<input id='"+el.id+"-units' type='text' name='units' class='form-control' maxlength='200' placeholder='Unidades' value='"+el.units+"'>"+
            "</div>";
      }
      if(el.orientation){
        var left_checked  = '';
        var right_checked = '';
        
        if(el.orientation == 'left'){
          left_checked  = 'checked';
        }
        else if(el.orientation == 'right'){
          right_checked = 'checked';
        }
        
        html += 
            "<div class='form-group'>"+
              "<label for='"+el.id+"-orientation' class='control-label'>Orientación</label>"+
              "<div class='radio'>"+
                "<label>"+
                  "<input type='radio' name='"+el.id+"-orientation' id='"+el.id+"-orientation-left' value='left' "+left_checked+">"+
                  "Izquierda"+
                "</label>"+
              "</div>"+
              "<div class='radio'>"+
                "<label>"+
                  "<input type='radio' name='"+el.id+"-orientation' id='"+el.id+"-orientation-right' value='right' "+right_checked+">"+
                  "Derecha"+
                "</label>"+
              "</div>"+
            "</div>";
      }
      if(el.feedback){
        var negative_checked  = '';
        var positive_checked  = '';
        
        if(el.feedback == 'negative'){
          negative_checked  = 'checked';
        }
        else if(el.feedback == 'positive'){
          positive_checked = 'checked';
        }
        
        html += 
            "<div class='form-group'>"+
              "<label for='"+el.id+"-feedback' class='control-label'>Realimentación</label>"+
              "<div class='radio'>"+
                "<label>"+
                  "<input type='radio' name='"+el.id+"-feedback' id='"+el.id+"-feedback-negative' value='negative' "+negative_checked+">"+
                  "Negativa"+
                "</label>"+
              "</div>"+
              "<div class='radio'>"+
                "<label>"+
                  "<input type='radio' name='"+el.id+"-feedback' id='"+el.id+"-feedback-positive' value='positive' "+positive_checked+">"+
                  "Positiva"+
                "</label>"+
              "</div>"+
            "</div>";
      }
      html +=
            "</div>"+
          "</div>"+
        "</div>";
      
      $(nameItemsCont).append(html);
      
      if(el.description){
        $('#'+el.id+'-description').change(function(){         
          el.changeDescription($(this).val());          
        });
      }
      if(el.definition){
        $('#'+el.id+'-definition').change(function(){         
          el.changeDefinition($(this).val());          
        });
      }
      if(el.dimension){
        $('#'+el.id+'-dimension').change(function(){
          el.changeDimension($(this).val());
        });
      }
      if(el.units){
        $('#'+el.id+'-units').change(function(){
          el.changeUnits($(this).val());
        });
      }
      if(el.orientation){
        $("input:radio[name='"+el.id+"-orientation']").change(function(){
          el.changeOrientation($(this).val());
        });
      }
      if(el.feedback){
        $("input:radio[name='"+el.id+"-feedback']").change(function(){
          el.changeFeedback($(this).val());
        });
      }

    }
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
  viewDetails: function(el){
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
      /*$('#'+el.id+'-item-body').on('shown.bs.collapse', function () {
        
      });*/
      $('#'+el.id+'-item-body').collapse('show');
      
      /*var accordion_offset_top = $('#elements-'+el.ctx.id).offset().top;
      var item_offset_top = $('#'+el.id+'-item').offset().top;
      var offset = item_offset_top - accordion_offset_top;

      if(offset != 0){
        $(el.ctx.sidebar).scrollTop(offset);
      }*/
    }
    
    
  },
  viewTextEditor: function(el){
    var bb = el.fig[1].getBBox();
    
    $(this.svgDiv).append(
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
  
  cloneAsDOM: function(obj){
    var element = $('<clone />');
    element.append($('<name />').text(obj.name));
    element.append($('<reference />').text(obj.ref.name));
    
    pos = obj.position();
    position = element.append('<position />').children('position');
    position.append($('<x />').text(pos.x));
    position.append($('<y />').text(pos.y));
    
    leavingRelsQua = obj.leavingRelsQua;
    
    if(leavingRelsQua > 0){
      relations = element.append('<relations />').children('relations');
      rels = obj.leavingRels;
      for(var rel in rels){
        relation = relations.append('<to_relation />').children('to_relation');
        relation.text(rels[rel].to.name);
      }
    }
    return element;
  },
  elementAsDOM: function(obj){
    var element = $('<'+obj.type+' />');
    element.append($('<name />').text(obj.name));
    element.append($('<title />').text(obj.title));
    element.append($('<description />').text(obj.description));
    element.append($('<definition />').text(obj.definition));
    element.append($('<units />').text(obj.units));
    element.append($('<dimension />').text(obj.dimension));
    
    pos = obj.position();
    position = element.append('<position />').children('position');
    position.append($('<x />').text(pos.x));
    position.append($('<y />').text(pos.y));
    
    relations = element.append('<relations />').children('relations');
              
    enteringRelsQua = obj.enteringRelsQua;
    leavingRelsQua  = obj.leavingRelsQua;
    
    if(enteringRelsQua > 0 || leavingRelsQua > 0){
      if(enteringRelsQua > 0){
        rels = obj.enteringRels;
        for(var rel in rels){
          relation = relations.append('<entering_relation />').children('entering_relation');
          relation.text(rels[rel].from.name);
        }
      }
      if(leavingRelsQua > 0){
        rels = obj.leavingRels;
        for(var rel in rels){
          relation = relations.append('<leaving_relation />').children('leaving_relation');
          relation.text(rels[rel].to.name);
        }
      }
    }
    return element;
  },
  relationAsDOM: function(obj){
    var relation = $('<relation />');
    relation.append($('<origin />').text(obj.from.name));
    relation.append($('<destination />').text(obj.to.name));
    relation.append($('<description />').text(obj.description));
    
    var pos = obj.position();
    position = relation.append('<position />').children('position');
    op = position.append('<op />').children('op');
    op.append($('<x />').text(pos[0].x));
    op.append($('<y />').text(pos[0].y));
    opc = position.append('<opc />').children('opc');
    opc.append($('<x />').text(pos[1].x));
    opc.append($('<y />').text(pos[1].y));
    dpc = position.append('<dpc />').children('dpc');
    dpc.append($('<x />').text(pos[2].x));
    dpc.append($('<y />').text(pos[2].y));
    dp = position.append('<dp />').children('dp');
    dp.append($('<x />').text(pos[3].x));
    dp.append($('<y />').text(pos[3].y));
    
    return relation;
  },
  sectorAsDOM: function(obj){
    var sector = $('<'+obj.type+' />');
    sector.append($('<name />').text(obj.name));
    sector.append($('<title />').text(obj.title));
    sector.append($('<description />').text(obj.description));
    
    pos = obj.position();
    position = sector.append('<position />').children('position');
    position.append($('<x />').text(pos.x));
    position.append($('<y />').text(pos.y));
    
    size = obj.size();
    size_sector = sector.append('<size />').children('size');
    width = size_sector.append('<width />').children('width');
    width.text(size['width']);
    height = size_sector.append('<height />').children('height');
    height.text(size['height']);
    return sector;
  }
});

this.Evolucion = Class.extend({
  init: function(){
    this.current_container = 'overview';
    
    this.areas =  ['overview', 'prose', 'influences', 'stockandflow', 'equations', 'behaviors'];
    this.alias =  ['ove', 'pro', 'inf', 'saf', 'equ', 'beh'];
  
    for(i in this.areas){
      $('#'+this.areas[i]+'-link').click(function(event){
          event.preventDefault();
          var area = this.id.substring(0, this.id.lastIndexOf('-'));
          var idx = evo.areas.indexOf(area);
          evo.areas.splice(idx,1);
          
          for(j in evo.areas){
              $('#'+evo.areas[j]+'-area').hide();
          }
          evo.areas.splice(idx,0,area);
          
          evo.showArea(area);
      });
    }
    
    var workAreaHeight = $(window).height() - parseInt($('body').css('padding-top'));
    $('.work-area').height(workAreaHeight);
  },
  actions: {
    download: function(){
      alert('download');      
    },
    open: function(){
      $.ajaxFileUpload({
        url:'home/upload',
        secureuri:true,
        fileElementId:'file',
        dataType: 'xml',
        success: function (data, status)
        {
          if(typeof(data.error) != 'undefined')
          {
            if(data.error != '')
            {
              alert(data.error);
            }else
            {
              alert(data.msg);
            }
          }
          if(status == 'success'){
            asigModelo(data);
          }
        },
        error: function (data, status, e)
        {
          alert(e);
        }
      });
      return false;      
    },
    save: function(){
      if(evo.pro){
        evo.pro.saveAsDOM();
      }
      if(evo.inf){
        evo.inf.saveAsDOM();
      }
      if(evo.saf){
        evo.saf.saveAsDOM();
      }
      if(evo.equ){
        evo.equ.saveAsDOM();
      }
      if(evo.beh){
        evo.beh.saveAsDOM();
      }
      
      
      var root =  $('#xmldocument');
      var csrf =  $("#save_form > input[name='csrfmiddlewaretoken']");
      
      var frm  =  $('#save_form');
      
      $.ajax({
        type: frm.attr('method'),
        url: frm.attr('action'),
        data: {
          'csrfmiddlewaretoken':  csrf.val(),
          'model':                root.html()
        },
        success: function (data, textStatus, jqXHR) {
          evo.messages.success(data);
        },
        error: function(data) {
          evo.messages.error(data);
          //$(id_response).html("<p>Problemas de conexión, por favor refresque la página.</p>");
        }
      });            
    },
    simulate: function(){
      if(this.saf){
        this.saf.saveAsDOM();
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
    if(this.saf){
      this.saf.adjust();
    }
    if(this.equ){
      this.equ.adjust();
    }
    if(this.beh){
      this.beh.adjust();
    }
  },
  aliasArea: function(area_name){
    var idx = this.areas.indexOf(area_name);
    if(idx >=0){ return this.alias[idx]; }
    return undefined;
  },
  hideAreas: function(){
    for(i in this.areas){
      $('#'+this.areas[i]+'-area').hide();
    }
  },
  showArea: function(area){
    $('#'+area+'-area').show();
    this.current_container = area;
  },
  messages: {
    error: function(message){
      var alias = evo.aliasArea(evo.current_container);
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
    info: function(message){
      var alias = evo.aliasArea(evo.current_container);
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
    success: function(message){
      var alias = evo.aliasArea(evo.current_container);
      
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
    warning: function(message){
      var alias = evo.aliasArea(evo.current_container);
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
  openDOM: function(){
    //evo.inf.reset();
    //evo.saf.reset();
   
    var root        = $('#xmldocument');
    var model       = root.children('model:first');
    
    if(model.length>0){
      evo.inf.openAsDOM(model);
      evo.saf.openAsDOM(model);
    }
  },
  verifyBrowsers: function(){
    var IE = (navigator.appName=='Microsoft Internet Explorer')?parseFloat((new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})")).exec(navigator.userAgent)[1]):-1;
    if(IE > -1 && IE < 9){
      //$('#alerta').css('display', 'block');
    }
  }
});