/* Evolucion - Influences
 * By John Garavito
 */
$(document).ready(function(){
  (function(){
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
      init: function(ctx, p, title){
        this._super(ctx);
        
        this.type         = "concept";
        var idx           = this.ctx.idx[this.type]++;
        
        this.id           = "concept-"+idx;
        this.title        = title || "Concepto "+idx;
        this.name         = utils.textToVar(this.title);
        
        this.units        = " ";
        this.list         = this.ctx.list.concept;
        
        this.figGenerator = figures.concept;
        this.figure(p);
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
      init: function(ctx, p, title){
        this._super(ctx);
        
        this.type         = "cycle";
        var idx           = this.ctx.idx[this.type]++;
        
        this.id           = "cycle-"+idx;
        this.title        = title || "Ciclo "+idx;
        this.name         = utils.textToVar(this.title);
        
        this.orientation  = "right";
        this.feedback     = "positive";
        this.list         = this.ctx.list.cycle;
        
        this.figGenerator = figures.cycle;
        this.figure(p);
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
      init: function(ctx, p, from, to){
        // p = relation points
        this._super(ctx);
        
        this.type = "material";
        var idx = this.ctx.idx[this.type]++;
        
        this.id = "material-"+idx;
        this.title = this.ctx.relationTitle(from.title, to.title);       
        this.name = utils.textToVar(this.title);
        
        this.list = this.ctx.list.material;
        this.from = from;
        this.to = to;
                
        this.from.addLeavingRels(this);
        this.to.addEnteringRels(this);
        
        this.figGenerator = figures.materialRelation;
        this.figure(p);
        this.integrateCtx();
        this.viewDetails();
      },
      figure: function(p){
        this.fig = this.figGenerator(this.ctx, this, p);
        this.fig[6].click(this.remove);
        this.fig[7].click(this.viewDetails);
        this.viewPoints(this.selected);
      }
    });
    
    this.InformationRel = Relation.extend({
      init: function(ctx, p, from, to){
        this._super(ctx);
        
        this.type = "information";
        var idx = this.ctx.idx[this.type]++;
        
        this.id = "information-"+idx;
        
        this.title = this.ctx.relationTitle(from.title, to.title);
        this.name = utils.textToVar(this.title);
        
        this.list = this.ctx.list.information;
        this.from = from;
        this.to = to;
        
        this.from.addLeavingRels(this);
        this.to.addEnteringRels(this);
        
        this.figGenerator = figures.informationRelation;
        this.figure(p);
        this.integrateCtx();
        this.viewDetails();
      },
      figure: function(p){
        this.fig = this.figGenerator(this.ctx, this, p);
        this.fig[6].click(this.remove);
        this.fig[7].click(this.viewDetails);
        this.viewPoints(this.selected);
      }
    });
    
    this.SectorInf = SecBase.extend({
      init: function(ctx, p, size, title){
        this._super(ctx);
        
        this.type = 'sectorinf';
        var idx = this.ctx.idx[this.type]++;
        
        this.id = this.type+'-'+idx;
        this.title = title || "Sector "+idx;
        this.name = utils.textToVar(this.title);
        
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
        
        this.elements = ['concept'];
        this.states   = this.elements.concat(
                        ['clone', 'cycle', 'material', 'information', 'sectorinf']);
        
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
      },
      
      saveAsDom: function(){
        var model, influence, size;
        var elements, element, group, list, position, pos, 
          relations, cantRelIng, cantRelSal,
          relation, rels;
        
        model = $('#xmldocument model:first');
        
        influence = model.children('influence');
        
        if($.isEmptyObject(influence[0])){
          influence = model.append($('<influence />')).children('influence'); 
        }
        else{
          influence.empty();
        }
        
        size = this.obtTamPan();
        influence.attr('width', size.w);
        influence.attr('height', size.h);
        
        if(model){
          elements =  {
            'conce': {'el': 'concept',  'group': 'concepts'},
            'cycle': {'el': 'cycle',  'group': 'cycles'},
          };
          for(var el in elements){
            list = inf.list[el];        
            group = influence.append('<'+elements[el]['group']+' />').children(elements[el]['group']);
            
            for(var i in list){
              element = group.append('<'+elements[el]['el']+' />').children(elements[el]['el']+':last');
              element.append($('<name />').text(list[i].name));
              element.append($('<title />').text(list[i].title));
              element.append($('<description />').text(list[i].desc));
              if(el == 'conce'){
                element.append($('<units />').text(list[i].unid));
              }
              if(el == 'cycle'){
                element.append($('<orientation />').text(list[i].orientation));
                element.append($('<feedback />').text(list[i].feedback));
              }
              
              pos = list[i].pos();
              position = element.append('<position />').children('position');
              position.append($('<x />').text(pos.x));
              position.append($('<y />').text(pos.y));
              
              if(el == 'conce'){
                relations = element.append('<relations />').children('relations');
                cantRelIng = list[i].cantRelIng;
                cantRelSal = list[i].cantRelSal;
                
                if(cantRelIng > 0 || cantRelSal > 0){
                  if(cantRelIng > 0){
                    rels = list[i].relacIng;
                    for(var rel in rels){
                      relation = relations.append('<relation_from />').children('relation_from:last');
                      
                      if(rels[rel].type == 'material'){
                        relation.attr('type', 'material');
                      }else if(rels[rel].type == 'relin'){
                        relation.attr('type', 'information'); 
                      }
                      relation.text(rels[rel].from.name);
                    }
                  }
                  if(cantRelSal > 0){
                    rels = list[i].relacSal;
                    for(var rel in rels){
                      relation = relations.append('<relation_to />').children('relation_to:last');
                      if(rels[rel].type == 'material'){
                        relation.attr('type', 'material');
                      }else if(rels[rel].type == 'relin'){
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
          group = influence.append('<copies />').children('copies');
          for(var i in list){
            
            element = group.append('<copy />').children('copy:last');
            element.append($('<reference />').text(list[i].name));
            
            pos = list[i].pos();
            position = element.append('<position />').children('position');
            position.append($('<x />').text(pos.x));
            position.append($('<y />').text(pos.y));
            
            cantRelSal = list[i].cantRelSal;
            
            if(cantRelSal > 0){
              relations = element.append('<relations />').children('relations');
              if(cantRelSal > 0){
                rels = list[i].relacSal;
                for(var rel in rels){
                  relation = relations.append('<relation_to />').children('relation_to');
                  relation.text(rels[rel].to.name);
                }
              }
            }
          }
          
          list = inf.list['material'];
          group = influence.append('<material_relations />').children('material_relations');
          for(var i in list){
            
            relation = group.append('<relation />').children('relation:last');
            relation.append($('<origin />').text(list[i].from.name));
            relation.append($('<destination />').text(list[i].to.name));
            relation.append($('<description />').text(list[i].desc));
            
            pos = list[i].pos();
            position = relation.append('<position />').children('position');
            op = position.append('<op />').children('op');
            op.append($('<x />').text(pos[0].x));
            op.append($('<y />').text(pos[0].y));
            pco = position.append('<pco />').children('pco');
            pco.append($('<x />').text(pos[1].x));
            pco.append($('<y />').text(pos[1].y));
            pcd = position.append('<pcd />').children('pcd');
            pcd.append($('<x />').text(pos[2].x));
            pcd.append($('<y />').text(pos[2].y));
            dp = position.append('<dp />').children('dp');
            dp.append($('<x />').text(pos[3].x));
            dp.append($('<y />').text(pos[3].y));
          }
          
          list = inf.list['relin'];
          group = influence.append('<information_relations />').children('information_relations');
          for(var i in list){
            
            relation = group.append('<relation />').children('relation:last');
            relation.append($('<origin />').text(list[i].from.name));
            relation.append($('<destination />').text(list[i].to.name));
            relation.append($('<description />').text(list[i].desc));
            
            pos = list[i].pos();
            position = relation.append('<position />').children('position');
            op = position.append('<op />').children('op');
            op.append($('<x />').text(pos[0].x));
            op.append($('<y />').text(pos[0].y));
            pco = position.append('<pco />').children('pco');
            pco.append($('<x />').text(pos[1].x));
            pco.append($('<y />').text(pos[1].y));
            pcd = position.append('<pcd />').children('pcd');
            pcd.append($('<x />').text(pos[2].x));
            pcd.append($('<y />').text(pos[2].y));
            dp = position.append('<dp />').children('dp');
            dp.append($('<x />').text(pos[3].x));
            dp.append($('<y />').text(pos[3].y));
          }
          
          list = inf.list['sectorinf'];
          group = influence.append('<sectors />').children('sectors');
          for(var i in list){
            
            sectorinf = group.append('<sectorinf />').children('sectorinf:last');
            sectorinf.append($('<name />').text(list[i].name));
            sectorinf.append($('<title />').text(list[i].title));
            sectorinf.append($('<description />').text(list[i].desc));
            
            pos = list[i].pos();
            position = sectorinf.append('<position />').children('position');
            position.append($('<x />').text(pos.x));
            position.append($('<y />').text(pos.y));
            
            size = list[i].size();
            size_sector = sectorinf.append('<size />').children('size');
            width = size_sector.append('<width />').children('width');
            width.text(size['width']);
            height = size_sector.append('<height />').children('height');
            height.text(size['height']);
          }   
        }
        else{
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
          var pos = el.position();
          return Raphael.isPointInsidePath(sector, pos.x, pos.y);
        },
        existRelation: function(sector, rel){
          var pos = rel.position();
          var existsOri = Raphael.isPointInsidePath(sector, pos[0].x, pos[0].y);
          var existsDes = Raphael.isPointInsidePath(sector, pos[3].x, pos[3].y);
          return {'from': existsOri, 'to': existsDes};
        }
      } 
    });
  })();
});