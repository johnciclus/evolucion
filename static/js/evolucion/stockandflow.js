/* Evolucion - Stock and Flow
 * By John Garavito
 */

this.figures = $.extend(this.figures, {
  saf_base: function(ctx, parent, figGenerator, p, title, figureStyle){
    var bb, op, width, height, el_size;
    var fig = figures.figure(ctx);
    var textStyle = utils.clone(style.text);
    var rectangleStyle = utils.clone(style.rectangle);
    
    textStyle['fill'] = figureStyle.color || style.text['fill']; 
    rectangleStyle['stroke-dasharray'] = figureStyle['stroke-dasharray'] || style.rectangle['stroke-dasharray'];
    
    fig.p = {x: p.x, y: p.y};
    fig.push(
      ctx.r.text(fig.p.x, fig.p.y, title).attr(textStyle)
    );
    
    bb = fig[0].getBBox();
    op = {x: bb.x - 2, y: bb.y -1};
    width = bb.width + 4;
    height = bb.height + 2;
    el_size = 30;
    
    fig.push(
      ctx.r.rect(op.x, op.y, width, height, 4).attr(rectangleStyle),
      figGenerator(ctx.r, {'x': op.x + width/2, 'y': op.y - el_size/2}, figureStyle),
      ctx.r.image('/static/icons/info.png',  op.x - 16, op.y - 16, 24, 24),
      ctx.r.image('/static/icons/close.png', op.x + width - 8, op.y - 16, 24, 24)
    );
    
    fig[1].toFront();
    fig[0].toFront();
    fig[3].toFront();
    fig[4].toFront();
    fig[3].hide();
    fig[4].hide();
    
    if(figureStyle.cursor){
      for(var i=0; i<3; i++){
        fig[i].attr({ 'cursor': figureStyle.cursor});
      };
    }
    
    fig.changeTitle = function(title){
      var bb, lim, op, width, height, el_size;
      
      bb = fig[0].getBBox();
      lim = bb.y;
      
      this[0].attr('text', title);
      
      bb = fig[0].getBBox();
      op = {x: bb.x - 2, y: bb.y -1};
      width = bb.width + 4;
      height = bb.height + 2;
      el_size = 30;
      
      this[1].attr('x', op.x);
      this[1].attr('y', op.y);
      this[1].attr('width', width);
      this[1].attr('height', height);
      this[1].transform('');
      
      var dy = bb.y - lim;
      this[2].transform("...T 0," + dy);
      
      this[3].attr('x', op.x - 16);
      this[3].attr('y', op.y - 16);
      this[3].transform('');
      
      this[4].attr('x', op.x + width - 8);
      this[4].attr('y', op.y - 16);
      this[4].transform('');
    };
    
    fig.getBorder = function(){
      var bb, op, width, height, el_size;
      var arc;
      
      bb = fig[0].getBBox();
      op = {x: bb.x - 2, y: bb.y -1};
      width  = bb.width + 4;
      height = bb.height + 2;
      el_size = 30;
      
      this.border     = [["M", op.x, op.y], 
               ["H", op.x + (width - el_size)/2],
               ["V", op.y - el_size],
               ["H", op.x + (width + el_size)/2],
               ["V", op.y ],
               ["H", op.x + (width)],
               ["V", op.y + height], 
               ["H", op.x], 
               ["V", op.y]];
      return this.border;
    };
    fig.hover(
      function(){
        fig[3].show();
        fig[4].show();
      },
      function(){
        fig[3].hide();
        fig[4].hide();
      }
    );
    utils.parentReference(fig, parent);
    return fig;
  },
  parameter: function(ctx, parent, p, title, figureStyle){
    var figGenerator = function(r, cp, figureStyle){
        var fig = r.set();
        var standardStyle = utils.clone(style.standard);
        
        standardStyle['stroke-dasharray'] = figureStyle['stroke-dasharray'];
        
        fig.push( r.rect(cp.x - 15, cp.y - 1, 30, 2, 1).attr(standardStyle),
                  r.circle(cp.x, cp.y, 7).attr(standardStyle));
        return fig;
    };
    
    return figures.saf_base(ctx, parent, figGenerator, p, title, figureStyle);
  },
  stock: function(ctx, parent, p, title, figureStyle){
    var figGenerator = function(r, cp, figureStyle){
      var fig = r.set();
      var standardStyle = utils.clone(style.standard);
      
      standardStyle['stroke-dasharray'] = figureStyle['stroke-dasharray'];
      
      fig.push(r.rect(cp.x - 14, cp.y - 14, 28, 28, 1).attr(standardStyle));
        return fig;
    };
            
    return figures.saf_base(ctx, parent, figGenerator, p, title, figureStyle);
  },
  flow: function(ctx, parent, p, title, figureStyle){
    var figGenerator = function(r, cp, figureStyle){
      var fig = r.set();
      var ang = 0;
      var p0 = {x: cp.x + 30 - 12*Math.cos(ang + Math.PI/8), y: cp.y - 11 + 12*Math.sin(ang + Math.PI/8)};
      var p1 = {x: cp.x + 30 - 12*Math.cos(ang - Math.PI/8), y: cp.y - 11 + 12*Math.sin(ang - Math.PI/8)};
      var standardStyle = utils.clone(style.standard);
      
      standardStyle['stroke-dasharray'] = figureStyle['stroke-dasharray'];
      
      fig.pathT = [
                ["M", cp.x, cp.y - 8],
                ["V", cp.y - 15],
                ["M", cp.x - 5, cp.y - 15],
                ["H", cp.x + 5]
            ];
      fig.pathLinI = [
              ["M", cp.x - 30, cp.y - 11],
              ["H", cp.x + 15]
          ];
      fig.pathLinD = [
              ["M", cp.x + 15, cp.y - 11],
              ["H", cp.x + 30]
          ];
      fig.pathArrow = [
          ["M", cp.x + 30, cp.y - 11], 
          ["L", p0.x, p0.y], 
          ["L", p1.x, p1.y], 
          ["Z"]
        ];
      fig.pathNubI = [
              ["M", cp.x - 30, cp.y - 11],
              ["A", 6, 6, cp.x - 30, 1, 0, cp.x - 40, cp.y - 21],
              ["A", 6, 6, cp.x - 40, 1, 0, cp.x - 50, cp.y - 11],
              ["A", 6, 6, cp.x - 50, 1, 0, cp.x - 40, cp.y - 1],
              ["A", 6, 6, cp.x - 40, 1, 0, cp.x - 30, cp.y - 11]
          ];
      fig.pathNubD = [
              ["M", cp.x + 30, cp.y - 11],
              ["A", 6, 6, cp.x + 30, 1, 1, cp.x + 40, cp.y - 21],
              ["A", 6, 6, cp.x + 40, 1, 1, cp.x + 50, cp.y - 11],
              ["A", 6, 6, cp.x + 50, 1, 1, cp.x + 40, cp.y - 1],
              ["A", 6, 6, cp.x + 40, 1, 1, cp.x + 30, cp.y - 11]
          ];  
      
      fig.push(
        r.circle(cp.x, cp.y + 2, 10).attr(standardStyle),
        r.path(fig.pathT).attr(standardStyle),
        r.path(fig.pathLinI).attr(style.heavy_line),
        r.path(fig.pathLinD).attr(style.heavy_line),
        r.path(fig.pathArrow).attr(style.figure),
        r.path(fig.pathNubI).attr(standardStyle),
        r.path(fig.pathNubD).attr(standardStyle),
        r.circle(cp.x - 30, cp.y - 11, 4).attr(style.point),
        r.circle(cp.x + 30, cp.y - 11, 4).attr(style.point));
           
      fig[7].toFront();     
      fig[8].toFront();
      fig[7].attr({cursor: "move"});      
      fig[8].attr({cursor: "move"});
      return fig;
    };
    
    var fig = figures.saf_base(ctx, parent, figGenerator, p, title, figureStyle);
    
    fig.timer = undefined;
    fig.getBorder = function(){
      var bb, op, width, height;
      
      bb = fig[0].getBBox();
      op = {x: bb.x - 2, y: bb.y -1};
      width = bb.width + 4;
      height = bb.height + 2;
      
      this.border     = [["M", op.x, op.y], 
               ["H", op.x + width],
               ["V", op.y + height], 
               ["H", op.x], 
               ["V", op.y]];
      return this.border;
    };
    fig.showPoints = function(){
      this[2][7].show();
      this[2][8].show();
    };
    fig.hidePoints = function(){
      this[2][7].hide();
      this[2][8].hide();
    };
    fig.detAli = function(op, dp){
      var type, ang, tol = 2;
      /*  Identificadores type flecha:
       *  V: vertical   -> (U: arriba, D: abajo)
       *  H: horizontal -> (L: izquieda, R: derecha)
       *  N: ninguno
       */
      ang = Math.atan2( ( op.y - dp.y), (dp.x - op.x) );
      if(dp.x - op.x > tol){
        if(dp.y - op.y > tol){
          if(ang > (-1/4)*Math.PI){
            type = 'HRVD';
            ang = (-1/2)*Math.PI;
          }
          else{
            type = 'VDHR';
            ang = 0;
          }
        }
        else if(dp.y - op.y < -1*tol){
          if(ang > (1/4)*Math.PI){
            type = 'VUHR';
            ang = 0;
          }
          else{
            type = 'HRVU';
            ang = (1/2)*Math.PI;
          }
        }
        else{
          type = 'HR';
          ang = 0;
        }
      }
      else if(dp.x - op.x < -1*tol){
        if(dp.y - op.y > tol){
          if(ang > (-3/4)*Math.PI){
            type = 'VDHL';
            ang = Math.PI;
          }
          else{
            type = 'HLVD';
            ang = (-1/2)*Math.PI;
          }
        }
        else if(dp.y - op.y < -1*tol){
          if(ang > (3/4)*Math.PI){
            type = 'HLVU';
            ang = (1/2)*Math.PI;
          }
          else{
            type = 'VUHL';
            ang = Math.PI;
          }
        }
        else{
          type = 'HL';
          ang = Math.PI;
        }
      }
      else{
        if(dp.y > op.y){
          type = 'VD';
          ang = (-1/2)*Math.PI;
        }
        else if(dp.y < op.y){
          type = 'VU';
          ang = (1/2)*Math.PI;
        }
        else{
          type = 'N';
          ang = 0;
        }
      }
      
      var res = {'type': type, 'ang': ang};
      return res;
    };
    fig.update = function(){
      var bb, op, dp, cp, pe, p0, p1, pt;
      var dx, dy, dx_nub_Ori = 0, dy_nub_Ori = 0, dx_nub_Des = 0, dy_nub_Des = 0;
      var ancho_tex = 0, alto_tex = 0;
      var ali, ang, ang_fin, sin_ang, cos_ang; 
      var el = this.parent;
      var fig = el.fig; 
      
      bb = fig[2][0].getBBox();
      cp = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
      bb = fig[2][7].getBBox();
      op = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
      bb = fig[2][8].getBBox();
      dp = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
      
      ali = fig.detAli(op, dp);
      
      sin_ang = utils.roundDec(Math.sin(ali.ang),4);
      cos_ang = utils.roundDec(Math.cos(ali.ang),4);
      
      switch(ali.type[1]){
        case 'U':
          dy_nub_Ori =  10;
          dy_nub_Des = -10; 
        break;
        case 'D':
          dy_nub_Ori = -10;
          dy_nub_Des =  10;
        break;
        case 'R':
          dx_nub_Ori = -10;
          dx_nub_Des =  10;
        break;
        case 'L':
          dx_nub_Ori =  10;
          dx_nub_Des = -10;
        break;
      }
      
      if(ali.type.length <= 2){
        if(ali.type[0] == 'H'){
          pe = {x: dp.x,  y: op.y};
          cp = {x: (op.x + pe.x)/2,  y: op.y + 11};
        }
        else if(ali.type[0] == 'V'){
          pe = {x: op.x,  y: dp.y};
          cp = {x: op.x + 11*sin_ang,  y: (op.y + pe.y)/2};
        }
        else{
          pe = {x: dp.x,  y: dp.y};
          cp = {x: op.x,  y: op.y};
        }
        ang_fin = sin_ang*(-90);
        
        var tmp = sin_ang;
        sin_ang = Math.abs(cos_ang);
        cos_ang = tmp;
      }
      else if(ali.type.length == 4){
        if(ali.type[0] == 'H'){
          pe = {x: dp.x,  y: op.y};
          cp = {x: (op.x + pe.x)/2,  y: op.y + 11*sin_ang};
        }
        else if(ali.type[0] == 'V'){
          pe = {x: op.x,  y: dp.y};
          cp = {x: op.x + 11*cos_ang,  y: (op.y + pe.y)/2};
        }
        else{
          pe = {x: dp.x,  y: dp.y};
          cp = {x: op.x,  y: op.y};
        }
        
        switch(ali.type[3]){
          case 'U':
            dx_nub_Des =   0;
            dy_nub_Des = -10;
          break;
          case 'D':
            dx_nub_Des =   0;
            dy_nub_Des =  10;
          break;
          case 'R':
            dx_nub_Des =  10;
            dy_nub_Des =   0;
          break;
          case 'L':
            dx_nub_Des = -10;
            dy_nub_Des =   0;
          break;
        }
        ang_fin = ali.ang*(180/Math.PI)-90;
      }
      
      bb = fig[1].getBBox();
      ancho_tex = bb.width;
    
      if(sin_ang == -1){
        alto_tex = bb.height;
      }
      else if(sin_ang == 0){
        alto_tex = -16;
      } 
      
      ang = fig[2][1].matrix.split();
      ang = ang.rotate;
      
      if(ang != ang_fin){
        fig[2][0].transform("...R"+(ang_fin-ang));
        fig[2][1].transform("...R"+(ang_fin-ang));
      }
      
      bb = fig[0].getBBox();
      pt = {  x: cp.x - (bb.x + bb.width/2),  
          y: cp.y + 16*sin_ang - alto_tex - bb.y};
      fig[0].transform("...T" + pt.x + "," + pt.y);
      
      bb = fig[1].getBBox();
      pt = {  x: cp.x - (bb.x + bb.width/2),
          y: cp.y + 15*sin_ang - alto_tex - bb.y};
      fig[1].transform("...T" + pt.x + "," + pt.y);
      
      bb = fig[2][0].getBBox();
      pt = {  x: cp.x + 2*cos_ang - (bb.x + bb.width/2),  
          y: cp.y + 2*sin_ang - (bb.y + bb.height/2)};
      fig[2][0].transform("...T" + pt.x + "," + pt.y);
      
      bb = fig[2][1].getBBox();
      pt = {  x: cp.x - 11.5*cos_ang - (bb.x + bb.width/2),  
          y: cp.y - 11.5*sin_ang - (bb.y + bb.height/2)};
      fig[2][1].transform("...T" + pt.x + "," + pt.y);
      
      p0 = {x: dp.x - 12*Math.cos(ali.ang + Math.PI/8), y: dp.y + 12*Math.sin(ali.ang + Math.PI/8)};
      p1 = {x: dp.x - 12*Math.cos(ali.ang - Math.PI/8), y: dp.y + 12*Math.sin(ali.ang - Math.PI/8)};
      
      fig[2].pathLinI = [
        ["M", op.x, op.y],
        ["L", pe.x, pe.y]
      ];
      fig[2].pathLinD = [
        ["M", pe.x, pe.y],
        ["L", dp.x, dp.y]
      ];
      fig[2].pathArrow = [
        ["M", dp.x, dp.y], 
        ["L", p0.x, p0.y], 
        ["L", p1.x, p1.y], 
        ["Z"]
      ];
      
      fig[2][2].attr({path: (fig[2].pathLinI)});
      fig[2][2].transform('');
      fig[2][3].attr({path: (fig[2].pathLinD)});
      fig[2][3].transform('');
      fig[2][4].attr({path: (fig[2].pathArrow)});
      fig[2][4].transform('');
      
      bb = fig[2][5].getBBox();
      pt = {  x: op.x + dx_nub_Ori - (bb.x + bb.width/2),
              y: op.y + dy_nub_Ori - (bb.y + bb.height/2)};
      fig[2][5].transform("...T" + pt.x + "," + pt.y);
      
      bb = fig[2][6].getBBox();
      pt = {  x: dp.x + dx_nub_Des - (bb.x + bb.width/2),  
              y: dp.y + dy_nub_Des - (bb.y + bb.height/2)};
      fig[2][6].transform("...T" + pt.x + "," + pt.y);
      
      
      bb = fig[1].getBBox();
      /*
      bb = fig[3].getBBox();
      pt = {  x: cp.x + ancho_tex/2 - (bb.x + bb.width/2),  
              y: cp.y + 15*sin_ang - 18 - alto_tex - bb.y};
              
      fig[3].transform("...T" + pt.x + "," + pt.y);
      fig[4].transform("...T" + pt.x + "," + pt.y);*/
     
      this[3].attr('x', bb.x - 16);
      this[3].attr('y', bb.y - 16);
      this[3].transform('');
      
      this[4].attr('x', bb.x + ancho_tex -8);
      this[4].attr('y', bb.y - 16);
      this[4].transform('');
            
      fig.border = fig.getBorder();
    };
    fig.connOriginStock = function(stock){
      var el = fig.parent;
      if(el.originStock != stock){
			stock.addLeavingFlow(el);
      		el.originStock = stock;
      		fig[2][7].update(0, 0);
      		fig[2][5].hide();	
      }
    };
    fig.connDestinationStock = function(stock){
      var el = fig.parent;
      if(el.destinationStock != stock){	
	      stock.addEnteringFlow(el);
	      el.destinationStock = stock;
	      fig[2][8].update(0, 0);
	      fig[2][6].hide();
      }
    };
    fig.disOriginStock = function(){
      var el = fig.parent;
      
      if(el.originStock){
        el.originStock.deleteLeavingFlow(el);
        el.originStock = undefined;
        fig[2][5].show();
      }
    };
    fig.disDestinationStock = function(){
      var el = fig.parent;
      
      if(el.destinationStock){
        el.destinationStock.deleteEnteringFlow(el);
        el.destinationStock = undefined;
        fig[2][6].show();
      }
    };
    fig[2][7].update = function (dx, dy){
      var bb, op, podx, pt;
      var el = fig.parent;
      
      if(el.originStock){
        bb = fig[2][7].getBBox();
        op = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
        podx = {x: op.x + dx, y: op.y + dy};
        pt = el.ctx.path.nearestPoint(el.originStock.fig.border, podx);
        
        fig[2][7].transform("...T"+(pt.x-op.x)+","+(pt.y-op.y));  
      }
      else{
        fig[2][7].transform("...T" + dx + "," + dy);
      }
      fig.update();
    };
    fig[2][8].update = function (dx, dy){
      var bb, dp, pddx, pt;
      var el = fig.parent;
      
      if(el.destinationStock){
        bb = fig[2][8].getBBox();
        dp = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
        pddx = {x: dp.x + dx, y: dp.y + dy};
        pt = el.ctx.path.nearestPoint(el.destinationStock.fig.border, pddx);
        
        fig[2][8].transform("...T"+(pt.x-dp.x)+","+(pt.y-dp.y));  
      }
      else{
        fig[2][8].transform("...T" + dx + "," + dy);
      }
      fig.update();
    };
    fig.hover(
      function(){
        fig.showPoints();
        clearInterval(fig.timer);
      },
      function(){
        fig.timer = setTimeout(function(){
          fig.hidePoints();
          }, 2000);
      }
    );
    
    return fig;
  },
  auxiliary: function(ctx, parent, p, title, figureStyle){
    var figGenerator = function(r, cp, figureStyle){
      var fig = r.set();
      var standardStyle = utils.clone(style.standard);
      
      standardStyle['stroke-dasharray'] = figureStyle['stroke-dasharray'];
      
      fig.push(r.circle(cp.x, cp.y, 12).attr(standardStyle));
        return fig;
    };
    
    return figures.saf_base(ctx, parent, figGenerator, p, title, figureStyle);
  },
  exogenous: function(ctx, parent, p, title, figureStyle){
    var figGenerator = function(r, cp, figureStyle){
      var fig = r.set();
      var standardStyle = utils.clone(style.standard);
      
      standardStyle['stroke-dasharray'] = figureStyle['stroke-dasharray'];
      
      fig.push(r.circle(cp.x, cp.y, 12).attr(standardStyle),
           r.circle(cp.x, cp.y, 7).attr(standardStyle));
        return fig;
    };
    
    return figures.saf_base(ctx, parent, figGenerator, p, title, figureStyle);
  },
  delay: function(ctx, parent, p, title, figureStyle){
    var figGenerator = function(r, cp, figureStyle){
      var fig = r.set();
      var standardStyle = utils.clone(style.standard);
      
      standardStyle['stroke-dasharray'] = figureStyle['stroke-dasharray'];
      
      fig.push(r.rect(cp.x - 15, cp.y - 15, 30, 30, 1).attr(standardStyle),
           r.rect(cp.x - 15, cp.y, 10, 15, 1).attr(standardStyle),
           r.rect(cp.x -  5, cp.y, 10, 15, 1).attr(standardStyle),
           r.rect(cp.x +  5, cp.y, 10, 15, 1).attr(standardStyle));
      return fig;
    };
    
    return figures.saf_base(ctx, parent, figGenerator, p, title, figureStyle);
  },
  multiplier: function(ctx, parent, p, title, figureStyle){
    var figGenerator = function(r, cp, figureStyle){
      var fig = r.set();
      var standardStyle = utils.clone(style.standard);
      
      standardStyle['stroke-dasharray'] = figureStyle['stroke-dasharray'];
      
      fig.pathMarco = [
                ["M", cp.x - 10, cp.y - 10],
                ["V", cp.y + 10 ],
                ["H", cp.x + 10]
            ];
      fig.pathCurva = [
                ["M", cp.x - 10, cp.y ],
                ["L", cp.x - 5,  cp.y + 5],
                ["L", cp.x ,     cp.y - 5],
                ["L", cp.x + 5,  cp.y ],
                ["L", cp.x + 10, cp.y - 10]
            ];
            
      fig.push(r.rect(cp.x - 15, cp.y - 15, 30, 30, 1).attr(standardStyle),
           r.path(fig.pathMarco).attr(standardStyle),
           r.path(fig.pathCurva).attr(standardStyle));
        return fig;
    };
    
    return figures.saf_base(ctx, parent, figGenerator, p, title, figureStyle);
  },
  fis: function(ctx, parent, p, title, figureStyle){
    var figGenerator = function(r, cp, figureStyle){
      var fig = r.set();
      var standardStyle = utils.clone(style.standard);
      
      standardStyle['stroke-dasharray'] = figureStyle['stroke-dasharray'];
      
      fig.pathLin = [
                ["M", cp.x - 15, cp.y ],
                ["L", cp.x - 10, cp.y ],
                ["L", cp.x ,     cp.y + 14],
                ["L", cp.x + 10, cp.y ],
                ["L", cp.x + 15, cp.y ],
                ["M", cp.x - 15, cp.y + 14 ],
                ["L", cp.x - 10, cp.y + 14],
                ["L", cp.x ,     cp.y ],
                ["L", cp.x + 10, cp.y + 14],
                ["L", cp.x + 15, cp.y + 14]
            ];
            
      fig.push(r.rect(cp.x - 15, cp.y - 15, 30, 30, 1).attr(standardStyle),
           r.path(fig.pathLin).attr(standardStyle));
        return fig;
    };
    
    return figures.saf_base(ctx, parent, figGenerator, p, title, figureStyle);
  },
  previous: function(ctx, parent, p, title, figureStyle){
    var figGenerator = function(r, cp, figureStyle){
      var fig = r.set();
      var standardStyle = utils.clone(style.standard);
      
      standardStyle['stroke-dasharray'] = figureStyle['stroke-dasharray'];
      
      fig.pathRom = [
                ["M", cp.x     , cp.y - 12],
                ["L", cp.x + 12, cp.y ],
                ["L", cp.x     , cp.y + 12],
                ["L", cp.x - 12, cp.y ],
                ["Z"]
            ];
      fig.pathLin = [
                ["M", cp.x - 12, cp.y ],
                ["L", cp.x + 12, cp.y ],
                ["M", cp.x     , cp.y ],
                ["L", cp.x     , cp.y + 12],
            ];
            
      fig.push(r.path(fig.pathRom).attr(standardStyle),
           r.path(fig.pathLin).attr(standardStyle));
        return fig;
    };
    
    return figures.saf_base(ctx, parent, figGenerator, p, title, figureStyle);
  },
  submodel: function(ctx, parent, p, title, figureStyle){
    var figGenerator = function(r, cp, figureStyle){
      var fig = r.set();
      var standardStyle = utils.clone(style.standard);
      
      standardStyle['stroke-dasharray'] = figureStyle['stroke-dasharray'];
      
      fig.pathLin = [
                ["M", cp.x - 2 , cp.y - 7],
                ["H", cp.x - 10],
                ["V", cp.y + 3],
                ["H", cp.x + 5],
                ["M", cp.x - 4, cp.y ],
                ["L", cp.x    , cp.y ],
                ["M", cp.x - 2, cp.y ],
                ["L", cp.x - 2, cp.y + 9],
            ];
            
      fig.push(r.rect(cp.x - 15, cp.y - 15, 30, 30, 1).attr(standardStyle),
           r.path(fig.pathLin).attr(standardStyle),
           r.rect(cp.x - 2, cp.y - 10, 7, 7, 1).attr(standardStyle),
           r.rect(cp.x + 5, cp.y, 7, 7, 1).attr(standardStyle),
           r.circle(cp.x - 2, cp.y + 9, 3).attr(standardStyle)
           );
        return fig;
    };
    
    return figures.saf_base(ctx, parent, figGenerator, p, title, figureStyle);
  }
});

this.Parameter = Element.extend({
  init: function(ctx, pos, title, description, definition, units, dimension){
    this._super(ctx);
    
    this.type = "parameter";
    var idx = this.ctx.idx[this.type]++;
    
    this.id = "parameter-"+idx;
    this.title = title || "Parametro "+idx;
    this.name = utils.textToVar(this.title);
    this.description = description || ""; 
    this.definition =  definition || "";
    this.units = units || "Adimensional";
    this.dimension = dimension || 1;
        
    this.list = this.ctx.list.parameter;
    this.parser = PEG.buildParser(this.ctx.rules.replace("/'%'",""));
    
    this.connec['desAce'] = false;
    
    this.figGenerator = figures.parameter;
    this.figure(pos);
    this.integrateCtx();
    this.viewDetails();
  }
});

this.Stock = Element.extend({
  init: function(ctx, pos, title, description, definition, units, dimension){
    this._super(ctx);
    
    this.type = "stock";
    var idx = this.ctx.idx[this.type]++;
    
    this.id = "stock-"+idx;
    this.title = title || "Nivel "+idx;
    this.name = utils.textToVar(this.title);
    this.description = description || ""; 
    this.definition =  definition || "";
    this.units = units || "Adimensional";
    this.dimension = dimension || 1;
    
    this.list = this.ctx.list.stock;
    this.parser = PEG.buildParser(this.ctx.rules.replace("/'%'",""));
    
    this.enteringFlow = {};
    this.leavingFlow = {};
    
    this.enteringFlowQua = 0;
    this.leavingFlowQua = 0;
    
    this.figGenerator = figures.stock;
    this.figure(pos);
    this.integrateCtx();
    this.viewDetails();
  },
  addEnteringFlow: function(flow){
    if(!this.enteringFlow[flow.id]){
      this.enteringFlow[flow.id] = flow;
      this.enteringFlowQua++;
    }
  },
  addLeavingFlow: function(flow){
    if(!this.leavingFlow[flow.id]){
      this.leavingFlow[flow.id] = flow;
      this.leavingFlowQua++;
    }
  },
  deleteEnteringFlow: function(flow){
    if(this.enteringFlow[flow.id]){
      delete(this.enteringFlow[flow.id]);
      this.enteringFlowQua--;
    }
  },
  deleteLeavingFlow: function(flow){
    if(this.leavingFlow[flow.id]){
      delete(this.leavingFlow[flow.id]);
      this.leavingFlowQua--;
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
    
    for(var f in el.enteringFlow){
      el.enteringFlow[f].start();
    }
    for(var f in el.leavingFlow){
      el.leavingFlow[f].start();
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
    
    for(var f in el.enteringFlow){
      el.enteringFlow[f].end();
    }
    for(var f in el.leavingFlow){
      el.leavingFlow[f].end();
    }
    
    fig.border = fig.getBorder();
  },
  moveFig: function(dx, dy){
    var el = this.parent;
    var fig = el.fig;
    
    fig.transform("...T" + (dx - fig.dx) + "," + (dy - fig.dy));
    fig.border = fig.getBorder();
    
    var from, to;
    
    for(var rel in el.enteringRels){
      from = el.enteringRels[rel].from;
      var is_related = false;
      
      if(from.originStock){
        if(from.originStock.id == el.id){
          is_related = true;
        }
      }
      if(from.destinationStock){
        if(from.destinationStock.id == el.id){
          is_related = true;
        }
      }
      
      if(!is_related || from.type != 'flow'){
        el.enteringRels[rel].controlMove({dp: {dx: dx, dy: dy}}, false);  
      }
    }
    for(var rel in el.leavingRels){
      to = el.leavingRels[rel].to;
      var is_related = false;
      
      if(to.originStock){
        if(to.originStock.id == el.id){
          is_related = true;
        }
      }
      if(to.destinationStock){
        if(to.destinationStock.id == el.id){
          is_related = true;
        }
      }
      
      if(!is_related || to.type != 'flow'){
        el.leavingRels[rel].controlMove({op: {dx: dx, dy: dy}}, false);
      }
    }
    
    for(var f in el.enteringFlow){
      el.enteringFlow[f].moveDestinationControl(dx, dy);
    }
    for(var f in el.leavingFlow){
      el.leavingFlow[f].moveOriginControl(dx, dy);
    }
    
    fig.dx = dx;
    fig.dy = dy;
  }
});

this.Flow = Element.extend({
  init: function(ctx, pos, controls_pos, title, description, definition, units, dimension){
    this._super(ctx);
    
    this.type = "flow";
    var idx = this.ctx.idx[this.type]++;
    
    this.id = "flow-"+idx;
    this.title = title || "Flujo "+idx;
    this.name = utils.textToVar(this.title);
    this.description = description || ""; 
    this.definition =  definition || "";
    this.units = units || "Adimensional";
    this.dimension = dimension || 1;
    this.selected = false;
    
    this.list = this.ctx.list.flow;
    this.parser = PEG.buildParser(this.ctx.rules.replace("/'%'",""));
    
    this.originStock 	  = undefined;
    this.destinationStock = undefined;
    
    this.figGenerator = figures.flow;
    this.figure(pos);
    
    if(controls_pos){
    	if(controls_pos.origin){
    		this.updateOriginControl(controls_pos.origin.position);	
	    }
	    if(controls_pos.destination){
	    	this.updateDestinationControl(controls_pos.destination.position);
	    }	
    }
    
    this.integrateCtx();
    this.viewDetails();
  },
  figure: function(pos){
    this.fig = this.figGenerator(this.ctx, this, pos, this.title, {});
    this.fig.border = this.fig.getBorder();
    this.fig[0].dblclick(this.createTextEditor);
    this.fig[2][7].drag(this.moveFig, this.start, this.end);
    this.fig[2][8].drag(this.moveFig, this.start, this.end);
    this.fig[3].click(this.viewDetails);
    this.fig[4].click(this.remove);
    this.viewControls(this.selected);
  },
  viewControls: function(selected){
    this.selected = selected;
    if(this.selected){
      this.fig.showPoints();
    }else{
      this.fig.hidePoints();
    }
  },
  moveControl: function(control, dx, dy){
    var el = control.parent;
    var fig = el.fig;
    var pt, bb, rel_x, rel_y;
    
    bb = fig[1].getBBox();
    rel_x= bb.x + bb.width/2;
    rel_y= bb.y + bb.height/2;
       
    control.update(dx - fig.dx, dy - fig.dy);
    fig.border = fig.getBorder();
    
    bb = fig[1].getBBox();
    pt = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
    rel_x = pt.x - rel_x;
    rel_y = pt.y - rel_y;
    
    for(var rel in el.enteringRels){
      pt = el.enteringRels[rel].getRelationPoints();
      pt = pt.dp;
      el.enteringRels[rel].controlMove({dp: {dx: pt.x + rel_x, dy: pt.y + rel_y}}, true);
    }
    for(var rel in el.leavingRels){
      pt = el.leavingRels[rel].getRelationPoints();
      pt = pt.op;
      el.leavingRels[rel].controlMove({op: {dx: pt.x + rel_x, dy: pt.y + rel_y}}, true);
    }
    
    fig.dx = dx;
    fig.dy = dy;
  },
  moveOriginControl: function(dx, dy){
  	this.moveControl(this.fig[2][7], dx, dy);
  },
  moveDestinationControl: function(dx, dy){
    this.moveControl(this.fig[2][8], dx, dy);
  },
  originPosition:  function(){
    var bb = this.fig[2][7].getBBox();
    return {'x': bb.x + bb.width/2, 'y': bb.y + bb.height/2};
  },
  destinationPosition:  function(){
    var bb = this.fig[2][8].getBBox();
    return {'x': bb.x + bb.width/2, 'y': bb.y + bb.height/2};
  },
  updateOriginControl: function(position){
  	var pos = this.originPosition();
  	
  	this.start();
  	this.moveOriginControl(position.x - pos.x, position.y - pos.y);
  	this.end();
  },  
  updateDestinationControl: function(position){
  	var pos = this.destinationPosition();
 	
  	this.start();
  	this.moveDestinationControl(position.x - pos.x, position.y - pos.y);
  	this.end();  	
  },
  deleteOriginStock: function(){
  	if(this.originStock){
		this.fig.disOriginStock();	
  	}
  },
  deleteDestinationStock: function(){
  	if(this.destinationStock){
  		this.fig.disDestinationStock();	
  	}
  },
  
  start: function(){
    var el;
    if(this.name){
      el = this;
    }else if(this.parent){
      el = this.parent;
    }
    
    var fig = el.fig; 
    var pt;
    
    fig.dx = 0;
    fig.dy = 0;
    
    for(var rel in el.enteringRels){
      if(el.enteringRels[rel]){
        pt = el.enteringRels[rel].getRelationPoints();
        pt = pt.dp;
        el.enteringRels[rel].fig.dx = pt.x;
        el.enteringRels[rel].fig.dy = pt.y;

        //Only for stocks
        el.enteringRels[rel].fig.pt_percent = el.ctx.path.percentageFromPath(el.enteringRels[rel].from.fig.border, el.enteringRels[rel].fig.p[0]);
      }
    }
    for(var rel in el.leavingRels){
      if(el.leavingRels[rel]){
        pt = el.leavingRels[rel].getRelationPoints();
        pt = pt.op;
        el.leavingRels[rel].fig.dx = pt.x;
        el.leavingRels[rel].fig.dy = pt.y;
        
        //Only for stocks
        el.leavingRels[rel].fig.pt_percent = el.ctx.path.percentageFromPath(el.leavingRels[rel].to.fig.border, el.leavingRels[rel].fig.p[3]);
      }
    }
    
    var border = fig.getBorder();
    var pp = el.ctx.r.path(border).attr(style.border);
    pp.animate(style.border_dis, 100, function(){ this.remove(); });
    pp = undefined;
  },
  end: function(){
  	var el;
    if(this.name){
      el = this;
    }else if(this.parent){
      el = this.parent;
    }

    var fig = el.fig;
    var bb, pt, stock;
    
    fig.dx = 0;
    fig.dy = 0;
    
    bb = fig[1].getBBox();
    fig.p  = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
        
    bb = fig[2][7].getBBox();
    pt = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
    for(var i=-1; i<2; i++){
    	for(var j=-1; j<2; j++){
    		if(i*j == 0){
    			stock = el.ctx.existStockPt({x: (pt.x + i*3), y: (pt.y + j*3)});
    			if(stock){ i=2; j=2; }	
    		}
    	}
    }
    if(stock){
      fig.connOriginStock(stock);
    }
    else{
      fig.disOriginStock();
    }
    
    bb = fig[2][8].getBBox();
	pt = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
	for(var i=-1; i<2; i++){
    	for(var j=-1; j<2; j++){
    		if(i*j == 0){
    			stock = el.ctx.existStockPt({x: (pt.x + i*3), y: (pt.y + j*3)});
    			if(stock){ i=2; j=2; }
    		}
    	}	
    }	  
	if(stock){
	  fig.connDestinationStock(stock);
	}
	else{
	  fig.disDestinationStock();
	}
    
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
    el.moveControl(this, dx, dy);
  }
});

this.Auxiliary = Element.extend({
  init: function(ctx, pos, title, description, definition, units, dimension){
    this._super(ctx);
    
    this.type = "auxiliary";
    var idx = this.ctx.idx[this.type]++;
    
    this.id = "auxiliary-"+idx;
    this.title = title || "Var. auxiliar "+idx;
    this.name = utils.textToVar(this.title);
    this.description = description || ""; 
    this.definition =  definition || "";
    this.units = units || "Adimensional";
    this.dimension = dimension || 1;
    
    this.list = this.ctx.list.auxiliary;
    this.parser = PEG.buildParser(this.ctx.rules.replace("/'%'",""));
    
    this.figGenerator = figures.auxiliary;
    this.figure(pos);
    this.integrateCtx();
    this.viewDetails();
  }
});

this.Exogenous = Element.extend({
  init: function(ctx, pos, title, description, definition, units, dimension){
    this._super(ctx);
    
    this.type = "exogenous";
    var idx = this.ctx.idx[this.type]++;
    
    this.id = "exogenous-"+idx;
    this.title = title || "Var. exogena "+idx;
    this.name = utils.textToVar(this.title);
    this.description = description || ""; 
    this.definition =  definition || "";
    this.units = units || "Adimensional";
    this.dimension = dimension || 1;
    
    this.list = this.ctx.list.exogenous;
    this.parser = PEG.buildParser(this.ctx.rules.replace("/'%'",""));
    this.connec['desAce'] = false;
    
    this.figGenerator = figures.exogenous;
    this.figure(pos);
    this.integrateCtx();
    this.viewDetails();
  }
});

this.Delay = Element.extend({
  init: function(ctx, pos, title, description, definition, units, dimension){
    this._super(ctx);
    
    this.type = "delay";
    var idx = this.ctx.idx[this.type]++;
    
    this.id = "delay-"+idx;
    this.title = title || "Retardo "+idx;
    this.name = utils.textToVar(this.title);
    this.description = description || ""; 
    this.definition =  definition || "";
    this.units = units || "Adimensional";
    this.dimension = dimension || 1;
    
    this.list = this.ctx.list.delay;
    this.parser = PEG.buildParser(this.ctx.rules.replace("/'%'",""));
    
    this.figGenerator = figures.delay;
    this.figure(pos);
    this.integrateCtx();
    this.viewDetails();
  }
});

this.Multiplier = Element.extend({
  init: function(ctx, pos, title, description, definition, units, dimension){
    this._super(ctx);
    
    this.type = "multiplier";
    var idx = this.ctx.idx[this.type]++;
    
    this.id = "multiplier-"+idx;
    this.title = title || "Multiplicador "+idx;
    this.name = utils.textToVar(this.title);
    this.description = description || ""; 
    this.definition =  definition || "";
    this.units = units || "Adimensional";
    this.dimension = dimension || 1;
    
    this.list = this.ctx.list.multiplier;
    this.parser = PEG.buildParser(this.ctx.rules.replace("/'%'",""));
    
    this.figGenerator = figures.multiplier;
    this.figure(pos);
    this.integrateCtx();
    this.viewDetails();
  }
});

this.Fis = Element.extend({
  init: function(ctx, pos, title, description, definition, units, dimension){
    this._super(ctx);
    
    this.type = "fis";
    var idx = this.ctx.idx[this.type]++;
    
    this.id = "fis-"+idx;
    this.title = title || "FIS "+idx;
    this.name = utils.textToVar(this.title);
    this.description = description || ""; 
    this.definition =  definition || "";
    this.units = units || "Adimensional";
    this.dimension = dimension || 1;
    
    this.list = this.ctx.list.fis;
    this.parser = PEG.buildParser(this.ctx.rules.replace("/'%'",""));
    
    this.figGenerator = figures.fis;
    this.figure(pos);
    this.integrateCtx();
    this.viewDetails();
  }
});

this.Previous = Element.extend({
  init: function(ctx, pos, title, description, definition, units, dimension){
    this._super(ctx);
    
    this.type = "previous";
    var idx = this.ctx.idx[this.type]++;
    
    this.id = "previous-"+idx;
    this.title = title || "Val. Anterior "+idx;
    this.name = utils.textToVar(this.title);
    this.description = description || ""; 
    this.definition =  definition || "";
    this.units = units || "Adimensional";
    this.dimension = dimension || 1;
    
    this.list = this.ctx.list.previous;
    this.parser = PEG.buildParser(this.ctx.rules.replace("/'%'",""));
    
    this.figGenerator = figures.previous;
    this.figure(pos);
    this.integrateCtx();
    this.viewDetails();
  }
});

this.Submodel = Element.extend({
  init: function(ctx, pos, title, description, definition, units, dimension){
    this._super(ctx);
    
    this.type = "submodel";
    var idx = this.ctx.idx[this.type]++;
    
    this.id = "submodel-"+idx;
    this.title = title || "Submodelo "+idx;
    this.name = utils.textToVar(this.title);
    this.description = description || ""; 
    this.definition =  definition || "";
    this.units = units || "Adimensional";
    this.dimension = dimension || 1;
    
    this.list = this.ctx.list.submodel;
    this.parser = PEG.buildParser(this.ctx.rules.replace("/'%'",""));
    this.connec['desAce'] = false;
    
    this.figGenerator = figures.submodel;
    this.figure(pos);
    this.integrateCtx();
    this.viewDetails();
  }
});

this.RelationSaf = Relation.extend({
  init: function(ctx, pos, from, to, description){
    this._super(ctx);
    
    this.type = "relation";
    var idx = this.ctx.idx[this.type]++;
    
    this.id = "relation-"+idx;
    
    this.title = this.ctx.relationTitle(from.title, to.title);
    this.name = utils.textToVar(this.title);
    this.description = description || "";
    
    this.list = this.ctx.list.relation;
    this.from = from;
    this.to = to;
    
    this.from.addLeavingRels(this);
    this.to.addEnteringRels(this);
    
    this.figGenerator = figures.stockAndFlowfRelation;
    this.figure(pos);
    this.integrateCtx();
    this.viewDetails();
  },
  figure: function(pos){
    this.fig = this.figGenerator(this.ctx, this, pos, {});
    this.fig[6].click(this.viewDetails);
    this.fig[7].click(this.remove);
    this.viewPoints(this.selected);
  }
});

this.SectorSaf = SecBase.extend({
  init: function(ctx, pos, size, title){
    this._super(ctx);
    
    this.type = 'sectorsaf';
    var idx = this.ctx.idx[this.type]++;
    
    this.id = this.type+'-'+idx;
    this.title = title || "Sector "+idx;
    this.name = utils.textToVar(this.title);
    
    this.list = this.ctx.list[this.type];
    this.figure(pos, size);
    this.integrateCtx();
    this.viewDetails();
  }
});

this.StockAndFlow = Editor.extend({
  init: function(){
    this.id       = 'saf';
    this.div      = '#stockandflow';
    this.divArea  = '#stockandflow-area';
    this.svg      = '#svg-saf';
    this.svgDiv   = '#svg-div-saf';
    this.language = '#language-saf';
    this.sidebar  = '#stockandflow-sidebar';
    this.state    = 'cursor';
    this.controls = {	'parameter': 	['description', 'definition', 'dimension', 'units'], 
    					'stock': 		['description', 'definition', 'dimension', 'units'], 
    					'flow': 		['description', 'definition', 'dimension', 'units'], 
                      	'auxiliary': 	['description', 'definition', 'dimension', 'units'], 
                      	'exogenous': 	['description', 'definition', 'dimension', 'units'], 
                      	'delay': 		['description', 'definition', 'dimension', 'units'],
                      	'multiplier': 	['description', 'definition', 'dimension', 'units'], 
                      	'fis': 			['description', 'definition', 'units'], 
                      	'previous': 	['description', 'definition', 'dimension', 'units'],
                      	'submodel': 	['description', 'definition', 'units'],
                      	'clone': 		[],
                      	'relation': 	['description'],
                      	'sectorsaf': 	['description']}
    
    this.rules    = "start = bin bin = one:spe sym:('+'/'-'/'*'/'/') two:bin { return one + sym + two; } / one:spe '^(' two:bin ')' { return 'Math.pow('+one +','+ two+')'} / spe spe = '|' arg:bin '|' { return 'Math.abs('+arg+')'; } / '(' one:bin ')' { return '('+one+')'; } / 'sqrt(' one:bin ')(' two:bin ')' {return 'Math.pow(' + two + ',1/' + one + ')';} / 'sqrt(' arg:bin ')' {return 'Math.sqrt('+arg+')'; } / 'frac(' one:bin ')(' two:bin ')' {return '(('+ one +')/('+ two +'))'; } / fun:('SIN'/'COS'/'TAN') '(' arg:bin ')' { return 'Math.'+ fun.toLowerCase() + '('+arg+')'; } / 'CSC' arg:bin { return '1/Math.sin('+arg+')'; } / 'SEC' arg:bin { return '1/Math.cos('+arg+')'; } / 'COT' arg:bin { return '1/Math.tan('+arg+')'; } / evo evo = 'INT(' one:bin ')' { return 'INT('+one +')';} / 'INTLINEAL(' ext:int ',' ini:num ',' dlt:num com:args { return 'INTLINEAL('+ ext + ',' + ini + ',' + dlt + com; } / 'INTPASO(' ext:int ',' ini:num ',' dlt:num com:args { return 'INTPASO('+ ext + ',' + ini + ',' + dlt + com; } / 'INTSPLINE(' ext:int ',' ini:num ',' dlt:num com:args { return 'INTSPLINE('+ ext + ',' + ini + ',' + dlt + com; } / 'RETARDO(' src:var ',' tmp:num ',' ord:int ',' ini:num ')' { return 'RETARDO('+src + ',' + tmp + ',' + ord + ',' + ini + ')';} / 'ROUND(' one:bin ')' { return 'ROUND('+one +')';} / var args = ',' one:num two:args { return ','+one+two} / ')' var = 't'/'it'/'ft'/'dt'/'%' / con con = 'pi' {return 'Math.PI';} / 'e' {return 'Math.E';} / num num = real / int real = arg:$([+-]?[0-9]*[.][0-9]+) { return arg; } int = arg:$([+-]?[0-9]+) { return arg; }";
    
    this._super(this.initWorkArea());
    
    this.elements = [ 'parameter', 'stock', 'flow', 
                      'auxiliary', 'exogenous', 'delay',
                      'multiplier', 'fis', 'previous',
                      'submodel', 'clone'];
    this.states   = this.elements.concat(
                    ['relation', 'sectorsaf']);
    
    for(var i in this.states){
      this.list[this.states[i]] = {};
      this.idx[this.states[i]]  = 0;
      this.tmp[this.states[i]]  = undefined;
    }
    
    this.defActions();
    this.defineCtx();
    this.activateState(this.state);
  },
  defActions: function(){
    $(this.svgDiv).mouseenter(function(e){
      var pos = saf.pointer.getPosition(e);
      switch(saf.state){
        case 'parameter': {
          saf.tmp.parameter = new figures.parameter(saf, undefined, pos, "Parametro "+saf.idx.parameter, {cursor: "move"});
          break;
        }
        case 'stock': {
          saf.tmp.stock = new figures.stock(saf, undefined, pos, "Nivel "+saf.idx.stock, {cursor: "move"});
          break;
        }
        case 'flow': {
          saf.tmp.flow = new figures.flow(saf, undefined, pos, "Flujo "+saf.idx.flow, {cursor: "move"});
          break;
        }
        case 'auxiliary': {
          saf.tmp.auxiliary = new figures.auxiliary(saf, undefined, pos, "Var. auxiliar "+saf.idx.auxiliary, {cursor: "move"});
          break;
        }
        case 'exogenous': {
          saf.tmp.exogenous = new figures.exogenous(saf, undefined, pos, "Var. exogena "+saf.idx.exogenous, {cursor: "move"});
          break;
        }
        case 'delay': {
          saf.tmp.delay = new figures.delay(saf, undefined, pos, "Retardo "+saf.idx.delay, {cursor: "move"});
          break;
        }
        case 'multiplier': {
          saf.tmp.multiplier = new figures.multiplier(saf, undefined, pos, "Multiplicador "+saf.idx.multiplier, {cursor: "move"});
          break;
        }
        case 'fis': {
          saf.tmp.fis = new figures.fis(saf, undefined, pos, "FIS "+saf.idx.fis, {cursor: "move"});
          break;
        }
        case 'previous': {
          saf.tmp.previous = new figures.previous(saf, undefined, pos, "Val. Anterior "+saf.idx.previous, {cursor: "move"});
          break;
        }
        case 'submodel': {
          saf.tmp.submodel = new figures.submodel(saf, undefined, pos, "Submodelo "+saf.idx.submodel, {cursor: "move"});
          break;
        }
        case 'clone': {
          saf.tmp.clone = new figures.clone(saf, undefined, pos);
          break;
        }
        case 'relation': {
          saf.tmp.relation = new figures.relation(saf, undefined, pos, {});
          break;
        }       
        case 'sectorsaf': {
          saf.tmp.sectorsaf = new figures.sector(saf, undefined, pos, undefined, "Sector "+saf.idx.sectorsaf);
          break;
        }
      }
    });
    $(this.svgDiv).mouseleave(function(e){
      switch(saf.state){
        case 'parameter': {
          if(saf.tmp.parameter){
            saf.tmp.parameter.remove();
            saf.tmp.parameter = undefined;
          }
          break;
        }
        case 'stock': {
          if(saf.tmp.stock){
            saf.tmp.stock.remove();
            saf.tmp.stock = undefined;
          }
          break;
        }
        case 'flow': {
          if(saf.tmp.flow){
            saf.tmp.flow.remove();
            saf.tmp.flow = undefined;
          }
          break;
        }
        case 'auxiliary': {
          if(saf.tmp.auxiliary){
            saf.tmp.auxiliary.remove();
            saf.tmp.auxiliary = undefined;
          }
          break;
        }
        case 'exogenous': {
          if(saf.tmp.exogenous){
            saf.tmp.exogenous.remove();
            saf.tmp.exogenous = undefined;
          }
          break;
        }
        case 'delay': {
          if(saf.tmp.delay){
            saf.tmp.delay.remove();
            saf.tmp.delay = undefined;
          }
          break;
        }
        case 'multiplier': {
          if(saf.tmp.multiplier){
            saf.tmp.multiplier.remove();
            saf.tmp.multiplier = undefined;
          }
          break;
        }
        case 'fis': {
          if(saf.tmp.fis){
            saf.tmp.fis.remove();
            saf.tmp.fis = undefined;
          }
          break;
        }
        case 'previous': {
          if(saf.tmp.previous){
            saf.tmp.previous.remove();
            saf.tmp.previous = undefined;
          }
          break;
        }
        case 'submodel': {
          if(saf.tmp.submodel){
            saf.tmp.submodel.remove();
            saf.tmp.submodel = undefined;
          }
          break;
        }
        case 'clone': {
          if(saf.tmp.clone){
            saf.tmp.clone.remove();
            saf.tmp.clone = undefined;
          }
          break;
        }
        case 'relation': {
          if(saf.tmp.relation){
            saf.tmp.relation.remove();
            saf.tmp.relation = undefined;
          }
          break;
        }
        case 'sectorsaf': {
          if(saf.tmp.sectorsaf){
            saf.tmp.sectorsaf.remove();
            saf.tmp.sectorsaf = undefined;
          }
          break;
        }
      }
    });
    $(this.svgDiv).mousemove(function(e){
      var pos = saf.pointer.getPosition(e);
      switch(saf.state){
        case 'parameter': {
          if(saf.tmp.parameter){
            saf.tmp.parameter.moveToPoint(pos);
          }
          break;
        }
        case 'stock': {
          if(saf.tmp.stock){
            saf.tmp.stock.moveToPoint(pos);
          }
          break;
        }
        case 'flow': {
          if(saf.tmp.flow){
            saf.tmp.flow.moveToPoint(pos);
          }
          break;
        }
        case 'auxiliary': {
          if(saf.tmp.auxiliary){
            saf.tmp.auxiliary.moveToPoint(pos);
          }
          break;
        }
        case 'exogenous': {
          if(saf.tmp.exogenous){
            saf.tmp.exogenous.moveToPoint(pos);
          }
          break;
        }
        case 'delay': {
          if(saf.tmp.delay){
            saf.tmp.delay.moveToPoint(pos);
          }
          break;
        }
        case 'multiplier': {
          if(saf.tmp.multiplier){
            saf.tmp.multiplier.moveToPoint(pos);
          }
          break;
        }
        case 'fis': {
          if(saf.tmp.fis){
            saf.tmp.fis.moveToPoint(pos);
          }
          break;
        }
        case 'previous': {
          if(saf.tmp.previous){
            saf.tmp.previous.moveToPoint(pos);
          }
          break;
        }
        case 'submodel': {
          if(saf.tmp.submodel){
            saf.tmp.submodel.moveToPoint(pos);
          }
          break;
        }
        case 'clone': {
          if(saf.tmp.clone){
            saf.tmp.clone.moveToPoint(pos);
          }
          break;
        }
        case 'relation': {
          if(saf.tmp.relation){
            saf.tmp.relation.moveToPoint(pos);
          }
          break;
        }
        case 'sectorsaf': {
          if(saf.tmp.sectorsaf){
            saf.tmp.sectorsaf.moveToPoint(pos);
          }
          break;
        }
      }
    });
    $(this.svgDiv).click(function(e){
      var pos = saf.pointer.getPosition(e);
      var alpha;
      switch(saf.state){
        case 'parameter': {
          if(saf.tmp.parameter){
            var parameter = new Parameter(saf, pos);
            saf.list.parameter[parameter.id] = parameter;
            
            saf.activateState('cursor');
            saf.tmp.parameter.remove();
            saf.tmp.parameter = undefined;
          }
          break;
        }
        case 'stock': {
          if(saf.tmp.stock){
            var stock = new Stock(saf, pos);
            saf.list.stock[stock.id] = stock;
            
            saf.activateState('cursor');
            saf.tmp.stock.remove();
            saf.tmp.stock = undefined;
          }
          break;
        }
        case 'flow': {
          if(saf.tmp.flow){
            var flow = new Flow(saf, pos);
            saf.list.flow[flow.id] = flow;
            
            saf.activateState('cursor');
            saf.tmp.flow.remove();
            saf.tmp.flow = undefined;
          }
          break;
        }
        case 'auxiliary': {
          if(saf.tmp.auxiliary){
            var auxiliary = new Auxiliary(saf, pos);
            saf.list.auxiliary[auxiliary.id] = auxiliary;
            
            saf.activateState('cursor');
            saf.tmp.auxiliary.remove();
            saf.tmp.auxiliary = undefined;
          }
          break;
        }
        case 'exogenous': {
          if(saf.tmp.exogenous){
            var exogenous = new Exogenous(saf, pos);
            saf.list.exogenous[exogenous.id] = exogenous;
            
            saf.activateState('cursor');
            saf.tmp.exogenous.remove();
            saf.tmp.exogenous = undefined;
          }
          break;
        }
        case 'delay': {
          if(saf.tmp.delay){
            var delay = new Delay(saf, pos);
            saf.list.delay[delay.id] = delay;
            
            saf.activateState('cursor');
            saf.tmp.delay.remove();
            saf.tmp.delay = undefined;
          }
          break;
        }
        case 'multiplier': {
          if(saf.tmp.multiplier){
          var multiplier = new Multiplier(saf, pos);
            saf.list.multiplier[multiplier.id] = multiplier;
            
            saf.activateState('cursor');
            saf.tmp.multiplier.remove();
            saf.tmp.multiplier = undefined;
          }
          break;
        }
        case 'fis': {
          if(saf.tmp.fis){
            var fis = new Fis(saf, pos);
            saf.list.fis[fis.id] = fis;
            
            saf.activateState('cursor');
            saf.tmp.fis.remove();
            saf.tmp.fis = undefined;
          }
          break;
        }
        case 'previous': {
          if(saf.tmp.previous){
            var previous = new Previous(saf, pos);
            saf.list.previous[previous.id] = previous;
            
            saf.activateState('cursor');
            saf.tmp.previous.remove();
            saf.tmp.previous = undefined;
          }
          break;
        }
        case 'submodel': {
          if(saf.tmp.submodel){
            var submodel = new Submodel(saf, pos);
            saf.list.submodel[submodel.id] = submodel;
            
            saf.activateState('cursor');
            saf.tmp.submodel.remove();
            saf.tmp.submodel = undefined;
          }
          break;
        }
        case 'clone': {
          var el = saf.pointer.existElement(pos);
          if(el){
            var cp = new Clone(saf, pos, el);
            saf.list.clone[cp.id] = cp;
            
            saf.activateState('cursor');
            saf.tmp.clone.remove();
            saf.tmp.clone = undefined;
          }
          break;
        }
        case 'relation': {
          var el = saf.pointer.existElement(pos);
          var relation = saf.tmp.relation;
          if(el){
            pos		= saf.path.nearestPoint(el.fig.border, pos);
            alpha 	= saf.path.angleFromPoint(el.fig.border, pos);
            if(relation.state == 'initial' && el.connec['oriAce']){
              relation.from = el;
              relation.activateSecondControl(saf, pos, alpha);
            }
            else if(relation.state == 'extend' && el.connec['desAce']){
              var is_itself = false;
              var is_clone = false;
              var has_clone_relation = false; 		//
              var origin_relation = false;
              var destination_relation = false;
              var exist_relation = false;
              
              if(relation.from.id == el.id){
                is_itself = true;
              }
              if(relation.from.type == 'clone'){
              	if(relation.from.ref.id == el.id){
              		is_clone = true;	
              	}
              	var ref = relation.from.ref;
              	exist_relation = ref.existsOriginRel(el.id);
              }
              origin_relation = el.existsOriginRel(relation.from.id);
              destination_relation  = el.existsDestinationRel(relation.from.id);
              
              if(!is_itself && !origin_relation && !destination_relation && !is_clone && !exist_relation){
                relation.p[3] = pos;
                
                var rel = new RelationSaf(saf, relation.p, relation.from, el);

                saf.list.relation[rel.id] = rel;
                
                saf.activateState('cursor');
                saf.tmp.relation.remove();
                saf.tmp.relation = undefined;
              }
            }
          }
          break;
        }
        case 'sectorsaf': {
          if(saf.tmp.sectorsaf){
            var sectorsaf = new SectorSaf(saf, pos);
            saf.list.sectorsaf[sectorsaf.id] = sectorsaf;
            
            saf.activateState('cursor');
            saf.tmp.sectorsaf.remove();
            saf.tmp.sectorsaf = undefined;
          }
          break;
        }
      }
    });
  },
  defineCtx: function(){
    this.panel.ctx = this;
    this.path.ctx = this;
    this.pointer.ctx = this;
    this.sector.ctx = this;
    this.objects.ctx = this;
  },
  
  saveAsDOM: function(){
    var model, stockandflow, size;
    var elements, element, group, position, position, pos,
        relation, relations, op, pco, dp, pcd, flows, flow, rels, 
        enteringRelsQua, leavingRelsQua, enteringFlowQua, leavingFlowQua, 
        from, to, size, size_sector, width, height;
    
    model = $('#xmldocument model:first');
    
    stock_and_flow = model.children('stock_and_flow:last');
    
    if($.isEmptyObject(stock_and_flow[0])){
      stock_and_flow = model.append($('<stock_and_flow />')).children('stock_and_flow:last');  
    }
    else{
      stock_and_flow.empty();
    }
    
    size = this.panel.getSize();
    stock_and_flow.attr('width', size.w+'px');
    stock_and_flow.attr('height', size.h+'px');
    
    if(stock_and_flow){
    
      elements =  { 
        'parameter':  'parameters',
        'stock':      'stocks',
        'flow':       'flows',
        'auxiliary':  'auxiliaries',
        'exogenous':  'exogenous_vars',
        'delay':      'delays',
        'multiplier': 'multipliers',
        'fis':        'fis_vars',
        'previous':   'previous_vals',
        'submodel':   'submodels'
      };
      for(var el in elements){
        list = saf.list[el];
        group = stock_and_flow.append('<'+elements[el]+' />').children(elements[el]+':last');
        
        for(var i in list){
          element = this.elementAsDOM(list[i]);
          group.append(element);
                    
          if(el == 'stock'){
            enteringFlowQua = list[i].enteringFlowQua;
            leavingFlowQua  = list[i].leavingFlowQua;
            
            stock_flows = element.append('<stock_flows />').children('stock_flows:last');
            if(enteringFlowQua > 0){
              fls = list[i].enteringFlow;
              for(var fl in fls){
                flow = stock_flows.append('<enteringFlow />').children('enteringFlow:last');
                flow.text(fls[fl].name);  
              }
            }
            if(leavingFlowQua > 0){
              fls = list[i].leavingFlow;
              for(var fl in fls){
                flow = stock_flows.append('<leavingFlow />').children('leavingFlow:last');
                flow.text(fls[fl].name);  
              }
            }
          }
          if(el == 'flow'){
          	var pos  = list[i].originPosition();
          	origin   = element.append('<origin />').children('origin:last');
          	if(list[i].originStock){
          	  origin.append($('<name />').text(list[i].originStock.name));
            }         	
          	position = origin.append('<position />').children('position:last');
			position.append($('<x />').text(pos.x));
			position.append($('<y />').text(pos.y));
			
			var pos = list[i].destinationPosition();
            destination = element.append('<destination />').children('destination:last');
            if(list[i].destinationStock){ 
              destination.append($('<name />').text(list[i].destinationStock.name));
            }            
            position = destination.append('<position />').children('position:last');
            position.append($('<x />').text(pos.x));
            position.append($('<y />').text(pos.y));
          }
        }
      }
      
      list = saf.list['clone'];
      group = stock_and_flow.append('<clones />').children('clones:last');
      for(var i in list){
        element = this.cloneAsDOM(list[i]);
        group.append(element);
      }
      
      list = saf.list['relation'];
      group = stock_and_flow.append('<relations />').children('relations:last');
      for(var i in list){
        relation = this.relationAsDOM(list[i]);
        group.append(relation);
      }
      
      list = saf.list['sectorsaf'];
      group = stock_and_flow.append('<sectors />').children('sectors:last');
      for(var i in list){
        sectorsaf = this.sectorAsDOM(list[i]);
        group.append(sectorsaf);
      }
    
    }
    else{
      return false;
    }
  },
  openAsDOM: function(model){
    var stock_and_flow  = model.children('stock_and_flow:last');
    
    var width = Number(stock_and_flow.attr('width').replace('px',''));
    var height= Number(stock_and_flow.attr('height').replace('px',''));
       
    var group, name, title, description, definition, 
        units, dimension, position, pos, relations, 
        enteringRels, leavingRels, el;
    
    this.panel.resize(width, height);
    
    var elements = [{ 'class': Parameter,   'el': 'parameter',  'group':  'parameters'    },
                    { 'class': Stock,       'el': 'stock',      'group':  'stocks'        },
                    { 'class': Flow,        'el': 'flow',       'group':  'flows'         },
                    { 'class': Auxiliary,   'el': 'auxiliary',  'group':  'auxiliaries'   },
                    { 'class': Exogenous,   'el': 'exogenous',  'group':  'exogenous_vars'},
                    { 'class': Delay,       'el': 'delay',      'group':  'delays'        },
                    { 'class': Multiplier,  'el': 'multiplier', 'group':  'multipliers'   },
                    { 'class': Fis,         'el': 'fis',        'group':  'fis_vars'      },
                    { 'class': Previous,    'el': 'previous',   'group':  'previous_vals' },
                    { 'class': Submodel,    'el': 'submodel',   'group':  'submodels'     }];
        
    $.each(elements, function(idx, values){
            
      group = stock_and_flow.find(values.group+'>'+values.el);
      
      group.each(function( idx, element ) {
        name          = $(element).children('name:last').text();
        title         = $(element).children('title:last').text();
        description   = $(element).children('description:last').text();
        definition    = $(element).children('definition:last').text();
        units         = $(element).children('units:last').text();
        dimension     = $(element).children('dimension:last').text();
        
        position      = $(element).children('position:last');
        relations     = $(element).children('relations:last');
        
        pos = {'x':  Number($(position).children('x').text()), 'y':  Number($(position).children('y').text())};
        
        enteringRels  = [];
        leavingRels   = [];
        
        $(relations).children('entering_relation').each(function( idx, relation ) {
          enteringRels.push({'from': $(relation).text()});
        });
        
        $(relations).children('leaving_relation').each(function( idx, relation ) {
          leavingRels.push({'to': $(relation).text()});
        });
        
        if(values.group == 'flows'){
        	var origin 		= $(element).children('origin');
        	var destination = $(element).children('destination');
        	var origin_position  		= $(origin).children('position:last');
        	var destination_position  	= $(destination).children('position:last');
        	
        	var controls_pos = {	'origin': 		{'name': 		$(origin).children('name').text(),
        											 'position': 	{'x':  		Number($(origin_position).children('x').text()), 'y':  Number($(origin_position).children('y').text())}},
        							'destination':  {'name': 		$(destination).children('name').text(),
        											 'position': 	{'x':  Number($(destination_position).children('x').text()), 'y':  Number($(destination_position).children('y').text())}}
        					   };
        	
        	el = new Flow(saf, pos, controls_pos, title, description, definition, units, dimension);
        }
        else{
        	el = new values.class(saf, pos, title, description, definition, units, dimension);	
        }
                
        saf.list[values.el][el.id] = el;
      });
    });
    
    var clones  = stock_and_flow.find('clones>clone');
      
    clones.each(function( idx, clone ) {
      name          = $(clone).children('name:last').text();
      reference     = $(clone).children('reference:last').text();
      
      position      = $(clone).children('position:last');
      relations     = $(clone).children('relations:last');
      
      from_relations = [];
      to_relations   = [];
      
      $(relations).children('from_relation').each(function( idx, relation ) {
        from_relations.push({'type': $(relation).attr('type'), 'from': $(relation).text()});
      });
      
      $(relations).children('to_relation').each(function( idx, relation ) {
        to_relations.push({'type': $(relation).attr('type'), 'to': $(relation).text()});
      });
      
      pos = {'x':  Number($(position).children('x').text()), 'y':  Number($(position).children('y').text())};
        
      var el = saf.objects.getByName(reference);
      
      if(el){        
        var c = new Clone(saf, pos, el);
        saf.list.clone[c.id] = c;
      }
    });
      
    var relations  = stock_and_flow.find('relations>relation');
      
    relations.each(function( idx, relation ) {
      origin          = $(relation).children('origin:last').text();
      destination     = $(relation).children('destination:last').text();
      description     = $(relation).children('description:last').text();
      
      position      = $(relation).children('position:last');
              
      pos = [ {'x': Number($(position).find('op>x').text()),  'y': Number($(position).find('op>y').text()) },
              {'x': Number($(position).find('opc>x').text()), 'y': Number($(position).find('opc>y').text()) },
              {'x': Number($(position).find('dpc>x').text()), 'y': Number($(position).find('dpc>y').text()) },
              {'x': Number($(position).find('dp>x').text()),  'y': Number($(position).find('dp>y').text()) }
            ];
      
      var from_el = saf.objects.getByName(origin);
      var to_el   = saf.objects.getByName(destination);
              
      if(from_el && to_el){        
        var rel = new RelationSaf(saf, pos, from_el, to_el, description);
        saf.list.relation[rel.id] = rel;
      }
    });
    
    var sectors  = stock_and_flow.find('sectors>sectorsaf');
      
    sectors.each(function( idx, sector ) {
      name          = $(sector).children('name:last').text();
      title         = $(sector).children('title:last').text();
      description   = $(sector).children('description:last').text();
      
      position      = $(sector).children('position:last');
      size          = $(sector).children('size:last');
                      
      pos = {'x':     Number($(position).children('x').text()), 'y':      Number($(position).children('y').text())};
      sis = {'width': Number($(size).children('width').text()), 'height': Number($(size).children('height').text())};
      
      var s = new SectorSaf(saf, pos, sis, title, description);
      saf.list.sectorsaf[s.id] = s;
    });

  },

  objects: {
    hasAttribute: function(el_class, attribute_name){
  		return (this.ctx.controls[el_class].indexOf(attribute_name) != -1);
  	},
    getByName: function(name){
      var elmts = this.ctx.elements;
      var list;
      for( var el in elmts ){
        list = this.ctx.list[elmts[el]];
        for(var i in list){
          if(list[i].name == name){
            return list[i];  
          }
        }
      }
      return false;
    },
    getById: function(id){
      var elmts = this.ctx.elements;
      var list;
      for( var el in elmts ){
        list = this.ctx.list[elmts[el]];
        for(var i in list){
          if(list[i].id == id){
            return list[i];  
          }
        }
      }
      return false;
    }
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
    angleFromPoint: function(path, pt){
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
    nearestPoint: function(path, pt){
      var pp = this.ctx.r.path(path).attr(style.border);
      
      var ep = pp.getPointAtLength(this.percentageFromPath(path, pt));
      pp.animate(style.border_dis, 500, function(){ this.remove(); });
      return {x: ep.x, y: ep.y};
    },
    percentageFromPath: function(path, pt){
      var pp = this.ctx.r.path(path);
      var tl = pp.getTotalLength();
      var diff, idx, minor;
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
      pp.remove();
      return pr[idx];
    },
    pointFromPercentage: function(path, percentage){
      var pp = this.ctx.r.path(path);
      var pt = pp.getPointAtLength(percentage * pp.getTotalLength());
      pp.remove();
      pp = undefined;
      return pt; 
    },
    pointFromlength: function(path, length){
      var pp = this.ctx.r.path(path);
      var pt = pp.getPointAtLength(length);
      pp.remove();
      pp = undefined;
      return pt; 
    },
  },
  pointer: {
    getPosition: function(e){
      var offset  = $(this.ctx.svgDiv).offset();
      
      return pos  = {x: e.clientX - offset.left, 
                     y: e.clientY - offset.top};   
    },
    existElement: function(pos){
      var exist = false; 
      for( var l in this.ctx.list){
        for(var e in this.ctx.elements){
          if(l == this.ctx.elements[e]){
            for(var le in this.ctx.list[l]){
              exist = Raphael.isPointInsidePath(this.ctx.list[l][le].fig.border, pos.x, pos.y);     
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
      var position = el.position();
      return Raphael.isPointInsidePath(sector, position.x, position.y);
    },
    existRelation: function(sector, rel){
      var position = rel.position();
      var existsOri = Raphael.isPointInsidePath(sector, position[0].x, position[0].y);
      var existsDes = Raphael.isPointInsidePath(sector, position[3].x, position[3].y);
      return {'from': existsOri, 'to': existsDes};
    }
  },
  
  existStockPt: function(pos){
    var exist = false;
    if(this.list.stock){ 
      for( var n in this.list.stock){
        exist = Raphael.isPointInsidePath(this.list.stock[n].fig.border, pos.x, pos.y);     
        if(exist){
          return this.list.stock[n];
        }
      }
    }
    return undefined;
  }
});