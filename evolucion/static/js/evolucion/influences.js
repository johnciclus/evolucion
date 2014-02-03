/* Evolucion - Influences
 * By John Garavito
 */

this.figures = $.extend(this.figures, {
  concept: function(ctx, parent, p, title, figureStyle){
    var bb, op, width, height;
    var fig             = figures.figure(ctx);
    var titleStyle      = utils.clone(style.title);
    var rectangleStyle  = utils.clone(style.rectangle);
    
    titleStyle['fill']  = figureStyle.color || style.title['fill']; 
    rectangleStyle['stroke-dasharray'] = figureStyle.dasharray_rec || style.rectangle['stroke-dasharray'];
    
    fig.p = {x: p.x, y: p.y};
    fig.push(
      ctx.r.text(fig.p.x, fig.p.y, title).attr(titleStyle)
    );
    
    bb = fig[0].getBBox();
    op = {x: bb.x - 2, y: bb.y -1};
    width = bb.width + 4;
    height = bb.height + 2;
    
    fig.push(
      ctx.r.rect(op.x, op.y, width, height, 4).attr(rectangleStyle),
      ctx.r.image('/static/icons/close.png',  op.x + width - 12, op.y - 12, 24, 24),
      ctx.r.image('/static/icons/info.png', op.x + width -36, op.y - 12, 24, 24)
    );
    
    fig[0].toFront();
    fig[2].toFront();
    fig[3].toFront();
    fig[2].hide();
    fig[3].hide();
    
    for(var i=0; i<2; i++){
      fig[i].attr({ cursor: "move"});
    }
    
    fig.changeTitle = function(title){
      var bb, op, width, height;
      
      this[0].attr('text', title);
      
      bb = fig[0].getBBox();
      op = {x: bb.x - 2, y: bb.y -1};
      width = bb.width + 4;
      height = bb.height + 2;
      
      this[1].attr('x', op.x);
      this[1].attr('y', op.y);
      this[1].attr('width', width);
      this[1].attr('height', height);
      this[1].transform('');
      
      this[2].attr('x', op.x + width - 12);
      this[2].attr('y', op.y - 12);
      this[2].transform('');
      
      this[3].attr('x', op.x + width -36);
      this[3].attr('y', op.y - 12);
      this[3].transform('');
      
    };
    fig.getBorder = function(){
      var bb, op, width, height;
      bb = this[0].getBBox();
      op = {x: bb.x - 2, y: bb.y -1};
      width = bb.width + 4;
      height = bb.height + 2;
      
      this.border = [ ["M", op.x, op.y], 
                      ["H", op.x + width], 
                      ["V", op.y + height],
                      ["H", op.x],
                      ["V", op.y]];
      return this.border;
    };
    fig.hover(
      function(){
        fig[2].show();
        fig[3].show();
      },
      function(){
        fig[2].hide();
        fig[3].hide();
      }
    );
    utils.parentReference(fig, parent);
    return fig;
  },
  cycle: function(ctx, parent, p, title, orientation, feedback){        
    var bb, op, pt, width, height, middle_x, el_size;
    var fig   = figures.figure(ctx);
    
    fig.p = {x: p.x, y: p.y};
    fig.push(
      ctx.r.text(fig.p.x, fig.p.y, title).attr(style.title)
    );
    
    bb = fig[0].getBBox();
    op = {x: bb.x - 2, y: bb.y -1};
    width = bb.width + 4;
    height = bb.height + 2;
    middle_x = op.x + width/2;
    el_size = 35;
    pt = {'x': middle_x, 'y': op.y - (el_size/2)};
    
    fig.push(
      ctx.r.rect(op.x, op.y, width, height, 4).attr(style.rectangle),
      figures.arcWithArrow(ctx.r, pt, orientation, feedback),
      ctx.r.image('/static/icons/close.png',  op.x + width - 12, op.y - 12, 24, 24),
      ctx.r.image('/static/icons/info.png', op.x + width -36, op.y - 12, 24, 24)
    );
    
    fig[0].toFront();
    fig[3].toFront();
    fig[4].toFront();
    fig[3].hide();
    fig[4].hide();
    
    for(var i=0; i<3; i++){
      fig[i].attr({ cursor: "move"});
    };
    
    fig.changeTitle = function(title){
      var bb, limit, op, width, height, el_size;
      
      bb = fig[0].getBBox();
      limit = bb.y;
      
      this[0].attr('text', title);
      
      bb = fig[0].getBBox();
      op = {x: bb.x - 2, y: bb.y -1};
      width = bb.width + 4;
      height = bb.height + 2;
      middle_x = op.x + width/2;
          
      this[1].attr('x', op.x);
      this[1].attr('y', op.y);
      this[1].attr('width', width);
      this[1].attr('height', height);
      this[1].transform('');
      
      var dy = bb.y - limit;
      
      this[2].transform("...T 0," + dy);
      
      this[3].attr('x', op.x + width - 12);
      this[3].attr('y', op.y - 12);
      this[3].transform('');
      
      this[4].attr('x', op.x + width - 36);
      this[4].attr('y', op.y - 12);
      this[4].transform('');
    };
    fig.changeOrientation = function(orientation){
      var bb, op, pt, middle_x, el_size;
      var arc, anterior_arc;
      
      bb = fig[0].getBBox();
      op = {x: bb.x - 2, y: bb.y -1};
      middle_x = op.x + width/2;
      el_size = 35;
      pt = {'x': middle_x, 'y': op.y - (el_size/2)};
      
      arc = figures.arcWithArrow(ctx.r, pt, orientation, parent.feedback);
      arc.drag(parent.moveFig, parent.start, parent.end);
      arc.attr({ cursor: "move"});
      arc.hover(
        function(){
          parent.fig[3].show();
          parent.fig[4].show();
        },
        function(){
          parent.fig[3].hide();
          parent.fig[4].hide();
        }
      );
      utils.parentReference(arc, parent);
      
      anterior_arc = this.splice(2,1, arc);
      anterior_arc.remove();
      anterior_arc = undefined;
    };
    fig.changeFeedback = function(feedback){
      var bb, op, pt, middle_x, el_size;
      var arc, anterior_arc;
      
      bb = fig[0].getBBox();
      op = {x: bb.x - 2, y: bb.y -1};
      middle_x = op.x + width/2;
      el_size = 35;
      pt = {'x': middle_x, 'y': op.y - (el_size/2)};
      
      arc = figures.arcWithArrow(ctx.r, pt, parent.orientation, feedback);
      arc.drag(parent.moveFig, parent.start, parent.end);
      arc.attr({ cursor: "move"});
      arc.hover(
        function(){
          parent.fig[3].show();
          parent.fig[4].show();
        },
        function(){
          parent.fig[3].hide();
          parent.fig[4].hide();
        }
      );
      utils.parentReference(arc, parent);
      
      anterior_arc = this.splice(2,1, arc);
      anterior_arc.remove();
      anterior_arc = undefined;
    };
    fig.getBorder = function(){
      var bb, op, width, height, middle_x, el_size;
      var arc;
      
      bb = fig[0].getBBox();
      op = {x: bb.x - 2, y: bb.y -1};
      width = bb.width + 4;
      height = bb.height + 2;
      middle_x = op.x + width/2;
      el_size = 35;
      
      this.border    = [["M", op.x, op.y], 
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
  materialRelation: function(ctx, parent, p){
    return figures.relation(ctx, parent, p, style.material_relation);
  },
  informationRelation: function(ctx, parent, p){
    return figures.relation(ctx, parent, p, style.information_relation);
  }
});

this.Concept = Element.extend({
  init: function(ctx, pos, title, description, units){
    this._super(ctx);
    
    this.type         = "concept";
    var idx           = this.ctx.idx[this.type]++;
    
    this.id           = "concept-"+idx;
    this.title        = title || "Concepto "+idx;
    this.name         = utils.textToVar(this.title);
    
    this.description  = description || " ";
    this.units        = units || " ";
    this.list         = this.ctx.list.concept;
    
    this.figGenerator = figures.concept;
    this.figure(pos);
    this.integrateCtx();
    this.viewDetails();
  },
  changeUnits: function(units){
    this.units = units;
  },
  figure: function(p){
    this.fig = this.figGenerator(this.ctx, this, p, this.title, {});
    this.border = this.fig.getBorder();
    for(var i=0; i<2; i++){
      this.fig[i].drag(this.moveFig, this.start, this.end);
      this.fig[i].dblclick(this.createTextEditor);
    }
    this.fig[2].click(this.remove);
    this.fig[3].click(this.viewDetails);
  }
});

this.Cycle = Element.extend({
  init: function(ctx, pos, title, description, orientation, feedback){
    this._super(ctx);
    
    this.type         = "cycle";
    var idx           = this.ctx.idx[this.type]++;
    
    this.id           = "cycle-"+idx;
    this.title        = title || "Ciclo "+idx;
    this.name         = utils.textToVar(this.title);
    
    this.description  = description || " ";
    this.orientation  = orientation || "right";
    this.feedback     = feedback    || "positive";
    this.list         = this.ctx.list.cycle;
    
    this.enteringRels   = undefined;
    this.enteringRelsQua= undefined;
    this.leavingRels    = undefined;
    this.leavingRelsQua = undefined;
    
    this.figGenerator = figures.cycle;
    this.figure(pos);
    this.integrateCtx();
    this.viewDetails();
},
  changeOrientation: function(orientation){
    if(orientation == "right" || orientation == "left"){
      this.orientation = orientation;
      this.fig.changeOrientation(orientation);
    }
  },
  changeFeedback: function(feedback){
    if(feedback == "positive" || feedback == "negative"){
        this.feedback = feedback;
        this.fig.changeFeedback(feedback);
      }
    },
  figure: function(p){
    this.fig = this.figGenerator(this.ctx, this, p, this.title, this.orientation, this.feedback);
    this.border = this.fig.getBorder();
    for(var i=0; i<3; i++){
      this.fig[i].drag(this.moveFig, this.start, this.end);
      this.fig[i].dblclick(this.createTextEditor);
    }
    this.fig[3].click(this.remove);
    this.fig[4].click(this.viewDetails);
  }
});

this.MaterialRel = Relation.extend({
  init: function(ctx, pos, from, to, description){
    // p = relation points
  this._super(ctx);
  
  this.type = "material";
  var idx = this.ctx.idx[this.type]++;
  
  this.id = "material-"+idx;
    this.title = this.ctx.relationTitle(from.title, to.title);       
    this.name = utils.textToVar(this.title);
    this.description = description || " ";
    
    this.list = this.ctx.list.material;
    this.from = from;
    this.to = to;
            
    this.from.addLeavingRels(this);
    this.to.addEnteringRels(this);
    
    this.figGenerator = figures.materialRelation;
    this.figure(pos);
    this.integrateCtx();
    this.viewDetails();
  },
  figure: function(pos){
    this.fig = this.figGenerator(this.ctx, this, pos);
    this.fig[6].click(this.remove);
    this.fig[7].click(this.viewDetails);
    this.viewPoints(this.selected);
  }
});

this.InformationRel = Relation.extend({
  init: function(ctx, pos, from, to, description){
    this._super(ctx);
    
    this.type = "information";
    var idx = this.ctx.idx[this.type]++;
  
    this.id = "information-"+idx;
    
    this.title = this.ctx.relationTitle(from.title, to.title);
    this.name = utils.textToVar(this.title);
    this.description = description || " ";
    
    this.list = this.ctx.list.information;
    this.from = from;
    this.to = to;
    
    this.from.addLeavingRels(this);
    this.to.addEnteringRels(this);
    
    this.figGenerator = figures.informationRelation;
    this.figure(pos);
    this.integrateCtx();
    this.viewDetails();
  },
  figure: function(pos){
    this.fig = this.figGenerator(this.ctx, this, pos);
    this.fig[6].click(this.remove);
    this.fig[7].click(this.viewDetails);
    this.viewPoints(this.selected);
  }
});

this.SectorInf = SecBase.extend({
  init: function(ctx, p, size, title, description){
    this._super(ctx);
    
    this.type = 'sectorinf';
    var idx = this.ctx.idx[this.type]++;
  
    this.id = this.type+'-'+idx;
    this.title = title || "Sector "+idx;
    this.name = utils.textToVar(this.title);
    this.description = description || " ";
    
    this.list = this.ctx.list[this.type];
    this.figure(p, size);
    this.integrateCtx();
    this.viewDetails();
  }
});

this.Influences = Editor.extend({
  init: function(){
    this.id       = 'inf';
    this.div      = '#influences';
    this.divArea  = '#influences-area';
    this.svg      = '#svg-inf';
    this.svgDiv   = '#svg-div-inf';
    this.language = '#language-inf';
    this.sidebar  = '#influences-sidebar';
    this.state    = 'cursor';
    
    this._super(this.initWorkArea());
    
    this.elements = ['concept', 'clone'];
    this.states   = this.elements.concat(
                    ['cycle', 'material', 'information', 'sectorinf']);
    
    for(var i in this.states){
      this.list[this.states[i]] = {};
      this.idx[this.states[i]]  = 0;
      this.tmp[this.states[i]]  = undefined;
    }
    
    this.defActions();
    this.defineCtx();
    this.activateState(this.state);
    
    //this.rec['camara'] = this.r.image('/images/camara_normal.png',-24,-24,24,24);
  },
  defActions: function(){
    $(this.svgDiv).mouseenter(function(e){
      var p = inf.pointer.getPosition(e);
      switch(inf.state){
        case 'concept': {
          if(inf.tmp.concept){
            inf.tmp.concept.remove();
            inf.tmp.concept = undefined;
          }
          inf.tmp.concept = figures.concept(inf, undefined, p, "Concepto "+inf.idx['concept'], {});
          break;
        }
        case 'cycle': {
          if(inf.tmp.cycle){
            inf.tmp.cycle.remove();
            inf.tmp.cycle = undefined;
          }
          inf.tmp.cycle = new figures.cycle(inf, undefined, p, "Ciclo "+ inf.idx['cycle'], "right", "positive");
          break;
        }
        case 'clone': {
          if(inf.tmp.clone){
            inf.tmp.clone.remove();
            inf.tmp.clone = undefined;
          }
          inf.tmp.clone = new figures.clone(inf, undefined, p);
          break;
        }
        case 'material': {
          if(inf.tmp.material){
            inf.tmp.material.remove();
            inf.tmp.material = undefined;
          }
          inf.tmp.material = new figures.materialRelation(inf, undefined, p);
          break;
        }
        case 'information': {
          if(inf.tmp.information){
            inf.tmp.information.remove();
            inf.tmp.information = undefined;
          }
          inf.tmp.information = new figures.informationRelation(inf, undefined, p);
          break;
        }
        case 'sectorinf': {
          if(inf.tmp.sectorinf){
            inf.tmp.sectorinf.remove();
            inf.tmp.sectorinf = undefined;
          }
          inf.tmp.sectorinf = new figures.sector(inf, undefined, p, undefined, "Sector "+inf.idx['sectorinf']);
          break;
        }
      }
    });
    $(this.svgDiv).mouseleave(function(e){
      switch(inf.state){
        case 'concept': {
          if(inf.tmp.concept){
            inf.tmp.concept.remove();
            inf.tmp.concept = undefined;
          }
          break;
        }
        case 'cycle': {
          if(inf.tmp.cycle){
            inf.tmp.cycle.remove();
            inf.tmp.cycle = undefined;
          }
          break;
        }
        case 'clone': {
          if(inf.tmp.clone){
            inf.tmp.clone.remove();
            inf.tmp.clone = undefined;
          }
          break;
        }
        case 'material': {
          if(inf.tmp.material){
            inf.tmp.material.remove();
            inf.tmp.material = undefined;
          }
          break;
        }
        case 'information': {
          if(inf.tmp.information){
            inf.tmp.information.remove();
            inf.tmp.information = undefined;
          }
          break;
        }
        case 'sectorinf': {
          if(inf.tmp.sectorinf){
            inf.tmp.sectorinf.remove();
            inf.tmp.sectorinf = undefined;
          }
          break;
        }
      }
    });
    $(this.svgDiv).mousemove(function(e){
      var p = inf.pointer.getPosition(e);
      switch(inf.state){
        case 'concept': {
          if(inf.tmp.concept){
            inf.tmp.concept.moveToPoint(p);            
          }
          break;
        }
        case 'cycle': {
          if(inf.tmp.cycle){
            inf.tmp.cycle.moveToPoint(p);
          }
          break;
        }
        case 'clone': {
          if(inf.tmp.clone){
            inf.tmp.clone.moveToPoint(p);
          }
          break;
        }
        case 'material': {
          if(inf.tmp.material){
            inf.tmp.material.moveToPoint(p);
          }
          break;
        }
        case 'information': {
          if(inf.tmp.information){
            inf.tmp.information.moveToPoint(p);
          }
          break;
        }
        
        case 'sectorinf': {
          if(inf.tmp.sectorinf){
            inf.tmp.sectorinf.moveToPoint(p);
          }
          break;
        }
      }
    });
    $(this.svgDiv).click(function(e){
      var p = inf.pointer.getPosition(e);
      var alpha;
      switch(inf.state){
        case 'concept': {
          if(inf.tmp.concept){
            var c = new Concept(inf, p);
            inf.list.concept[c.id] = c;
            inf.activateState('cursor');
            inf.tmp.concept.remove();
            inf.tmp.concept = undefined;
          }
          break;          
        }
        case 'cycle': {
          if(inf.tmp.cycle){
            var cycle = new Cycle(inf, p);
            inf.list.cycle[cycle.id] = cycle;
            
            inf.activateState('cursor');
            inf.tmp.cycle.remove();
            inf.tmp.cycle = undefined;
          }
          break;
        }
        case 'clone': {
          var el = inf.pointer.existElement(p);
                        
          if(el){
            var clone = new Clone(inf, p, el);
            inf.list.clone[clone.id] = clone;
            
            inf.activateState('cursor');
            inf.tmp.clone.remove();
            inf.tmp.clone = undefined;
          }
          break;
        }
        case 'material': {
          var el = inf.pointer.existElement(p);
          var relation = inf.tmp.material;
          if(el){
            p     = inf.path.determinePoint(el.border, p);
            alpha = inf.path.determineAngle(el.border, p);
            
            if(relation.state == 'initial' && el.connec['oriAce']){
              relation.from = el;
              relation.activateSecondControl(inf, p, alpha);
            }
            else if(relation.state == 'extend' && el.connec['desAce']){
              var is_itself = false;
              var exist_relation = false;
                
              if(relation.from.id == el.id){
                is_itself = true;
              }
              exist_relation = el.existsDestinationRel(relation.from.id);
              
              if(!is_itself && !exist_relation){
                relation.p[3] = p;
                
                console.log(relation.p);
                
                var material = new MaterialRel(inf, relation.p, relation.from, el);
  
                inf.list.material[material.id] = material;
                
                inf.activateState('cursor');
                inf.tmp.material.remove();
                inf.tmp.material = undefined;
              }
            }
          }
          break;
        }
        case 'information': {
          var el = inf.pointer.existElement(p);
          var relation = inf.tmp.information;
          if(el){
            p     = inf.path.determinePoint(el.border, p);
            alpha = inf.path.determineAngle(el.border, p);
            if(relation.state == 'initial' && el.connec['oriAce']){
              relation.from = el;
              relation.activateSecondControl(inf, p, alpha);
            }
            else if(relation.state == 'extend' && el.connec['desAce']){
              var is_itself = false;
              var exist_relation = false;
                
              if(relation.from.id == el.id){
                is_itself = true;
              }
              exist_relation = el.existsDestinationRel(relation.from.id);
              
              if(!is_itself && !exist_relation){
                relation.p[3] = p;
                
                var information = new InformationRel(inf, relation.p, relation.from, el);
  
                inf.list.information[information.id] = information;
                
                inf.activateState('cursor');
                inf.tmp.information.remove();
                inf.tmp.information = undefined;
              }
            }
          }
          break;
        }
        case 'sectorinf': {
          if(inf.tmp.sectorinf){
            var sectorinf = new SectorInf(inf, p);
            inf.list.sectorinf[sectorinf.id] = sectorinf;
            
            inf.activateState('cursor');
            inf.tmp.sectorinf.remove();
            inf.tmp.sectorinf = undefined;
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
    var model, influences, size;
    var elements, element, group, list, position, pos, 
        relation, relations, enteringRelsQua, leavingRelsQua, rels;
    
    model = $('#xmldocument model:first');
    
    influences = model.children('influences');
    
    if($.isEmptyObject(influences[0])){
      influences = model.append($('<influences />')).children('influences'); 
    }
    else{
      influences.empty();
    }
    
    size = this.panel.getSize();
    
    influences.attr('width',  size.w+'px');
    influences.attr('height', size.h+'px');
    
    if(model){
      elements =  {
        'concept':  'concepts',
        'cycle':    'cycles'
      };
      for(var el in elements){
        list = inf.list[el];
        group = influences.append('<'+elements[el]+' />').children(elements[el]);
        
        for(var i in list){
          
          element = group.append('<'+el+' />').children(el+':last');
          element.append($('<name />').text(list[i].name));
          element.append($('<title />').text(list[i].title));
          element.append($('<description />').text(list[i].description));
          
          if(list[i].units){
            element.append($('<units />').text(list[i].units));
          }
          if(list[i].orientation && list[i].feedback){
            element.append($('<orientation />').text(list[i].orientation));
            element.append($('<feedback />').text(list[i].feedback));
          }
          
          pos = list[i].position();

          position = element.append('<position />').children('position');
          position.append($('<x />').text(pos.x));
          position.append($('<y />').text(pos.y));
          
          if(list[i].enteringRels || list[i].leavingRels){
            relations = element.append('<relations />').children('relations');
            enteringRelsQua = list[i].enteringRelsQua;
            leavingRelsQua  = list[i].leavingRelsQua;
            
            if(enteringRelsQua > 0 || leavingRelsQua > 0){
              if(enteringRelsQua > 0){
                rels = list[i].enteringRels;
                for(var rel in rels){
                  relation = relations.append('<from_relation />').children('from_relation:last');
                  
                  if(rels[rel].type == 'material'){
                    relation.attr('type', 'material');
                  }else if(rels[rel].type == 'information'){
                    relation.attr('type', 'information'); 
                  }
                  
                  relation.text(rels[rel].from.name);
                }
              }
              if(leavingRelsQua > 0){
                rels = list[i].leavingRels;
                for(var rel in rels){
                  relation = relations.append('<to_relation />').children('to_relation:last');
                  if(rels[rel].type == 'material'){
                    relation.attr('type', 'material');
                  }else if(rels[rel].type == 'information'){
                    relation.attr('type', 'information'); 
                  }
                  relation.text(rels[rel].to.name);
                }
              }
            }
          }
        }
      }
      
      list = inf.list['clone'];
      group = influences.append('<clones />').children('clones');
      for(var i in list){
        element = this.cloneAsDOM(list[i]);
        group.append(element);
      }
      
      list = inf.list['material'];
      group = influences.append('<material_relations />').children('material_relations');
      for(var i in list){
        relation = this.relationAsDOM(list[i]);
        group.append(relation);
      }
      
      list = inf.list['information'];
      group = influences.append('<information_relations />').children('information_relations');
      for(var i in list){
        relation = this.relationAsDOM(list[i]);
        group.append(relation);
      }
      
      list = inf.list['sectorinf'];
      group = influences.append('<sectors />').children('sectors');
      for(var i in list){
        sectorinf = this.sectorAsDOM(list[i]);
        group.append(sectorinf);
        
      }   
    }
    else{
      return false;
    }
  },
  openAsDOM: function(model){
    
      var name, title, description, units, position, pos, relations, from_relations, to_relations,  p, pc, size, from, to;
      
      
      var influences  = model.children('influences');
      
      var width = Number(influences.attr('width').replace('px',''));
      var height= Number(influences.attr('height').replace('px',''));
      
      this.panel.resize(width, height);
        
      var concepts  = influences.find('concepts>concept');
      
      concepts.each(function( idx, concept ) {
        name          = $(concept).children('name').text();
        title         = $(concept).children('title').text();
        description   = $(concept).children('description').text();
        units         = $(concept).children('units').text();
        
        position      = $(concept).children('position');
        relations     = $(concept).children('relations');
        
        from_relations = [];
        to_relations   = [];
        
        $(relations).children('from_relation').each(function( idx, relation ) {
          from_relations.push({'type': $(relation).attr('type'), 'from': $(relation).text()});
        });
        
        $(relations).children('to_relation').each(function( idx, relation ) {
          to_relations.push({'type': $(relation).attr('type'), 'to': $(relation).text()});
        });
        
        pos = {'x':  Number($(position).children('x').text()), 'y':  Number($(position).children('y').text())};
        
        var c = new Concept(inf, pos, title, description, units);
        inf.list.concept[c.id] = c;
      });
      
      var cycles  = influences.find('cycles>cycle');
      
      cycles.each(function( idx, cycle ) {
        name          = $(cycle).children('name').text();
        title         = $(cycle).children('title').text();
        description   = $(cycle).children('description').text();
        orientation   = $(cycle).children('orientation').text();
        feedback      = $(cycle).children('feedback').text();
        position      = $(cycle).children('position');
                        
        pos = {'x':  Number($(position).children('x').text()), 'y':  Number($(position).children('y').text())};
        
        var c = new Cycle(inf, pos, title, description, orientation, feedback);
        inf.list.cycle[c.id] = c;
      });
      
      var clones  = influences.find('clones>clone');
      
      clones.each(function( idx, clone ) {
        name          = $(clone).children('name').text();
        reference     = $(clone).children('reference').text();
        
        position      = $(clone).children('position');
        relations     = $(clone).children('relations');
        
        from_relations = [];
        to_relations   = [];
        
        $(relations).children('from_relation').each(function( idx, relation ) {
          from_relations.push({'type': $(relation).attr('type'), 'from': $(relation).text()});
        });
        
        $(relations).children('to_relation').each(function( idx, relation ) {
          to_relations.push({'type': $(relation).attr('type'), 'to': $(relation).text()});
        });
        
        pos = {'x':  Number($(position).children('x').text()), 'y':  Number($(position).children('y').text())};
          
        var el = inf.objects.getByName(reference);
        
        if(el){        
          var c = new Clone(inf, pos, el);
          inf.list.clone[c.id] = c;
        }
      });
      
      var material_relations  = influences.find('material_relations>relation');
      
      material_relations.each(function( idx, relation ) {
        origin          = $(relation).children('origin').text();
        destination     = $(relation).children('destination').text();
        description     = $(relation).children('description').text();
        
        position      = $(relation).children('position');
                
        pos = [ {'x': Number($(position).find('op>x').text()),  'y': Number($(position).find('op>y').text()) },
                {'x': Number($(position).find('opc>x').text()), 'y': Number($(position).find('opc>y').text()) },
                {'x': Number($(position).find('dpc>x').text()), 'y': Number($(position).find('dpc>y').text()) },
                {'x': Number($(position).find('dp>x').text()),  'y': Number($(position).find('dp>y').text()) }
              ];
        
        var from_el = inf.objects.getByName(origin);
        var to_el   = inf.objects.getByName(destination);
                
        if(from_el && to_el){        
          var rel = new MaterialRel(inf, pos, from_el, to_el, description);
          inf.list.material[rel.id] = rel;
        }
      });
      
      var information_relations  = influences.find('information_relations>relation');
      
      information_relations.each(function( idx, relation ) {
        origin          = $(relation).children('origin').text();
        destination     = $(relation).children('destination').text();
        description     = $(relation).children('description').text();
        
        position      = $(relation).children('position');
                
        pos = [ {'x': Number($(position).find('op>x').text()),  'y': Number($(position).find('op>y').text()) },
                {'x': Number($(position).find('opc>x').text()), 'y': Number($(position).find('opc>y').text()) },
                {'x': Number($(position).find('dpc>x').text()), 'y': Number($(position).find('dpc>y').text()) },
                {'x': Number($(position).find('dp>x').text()),  'y': Number($(position).find('dp>y').text()) }
              ];
        
        var from_el = inf.objects.getByName(origin);
        var to_el   = inf.objects.getByName(destination);
                
        if(from_el && to_el){        
          var rel = new InformationRel(inf, pos, from_el, to_el, description);
          inf.list.information[rel.id] = rel;
        }
      });
      
      var sectors  = influences.find('sectors>sectorinf');
      
      sectors.each(function( idx, sector ) {
        name          = $(sector).children('name').text();
        title         = $(sector).children('title').text();
        description   = $(sector).children('description').text();
        
        position      = $(sector).children('position');
        size          = $(sector).children('size');
                        
        pos = {'x':     Number($(position).children('x').text()), 'y':      Number($(position).children('y').text())};
        sis = {'width': Number($(size).children('width').text()), 'height': Number($(size).children('height').text())};
        
        var s = new SectorInf(inf, pos, sis, title, description);
        inf.list.sectorinf[s.id] = s;
      });
  },
  
  objects: {
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
      var position = el.position();
      return Raphael.isPointInsidePath(sector, position.x, position.y);
    },
    existRelation: function(sector, rel){
      var position = rel.position();
      var existsOri = Raphael.isPointInsidePath(sector, position[0].x, position[0].y);
      var existsDes = Raphael.isPointInsidePath(sector, position[3].x, position[3].y);
      return {'from': existsOri, 'to': existsDes};
      }
    } 
});