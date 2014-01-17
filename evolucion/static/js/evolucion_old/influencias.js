var inf;

function arcoConFlecha(r, pc, orie, real) {
	var fig = r.set();
	var angA = 300;
	var angB = 240;
	var Rad = 14;
	
	var pi = { x: pc.x + (Rad * Math.cos(Math.PI*(angA/180))),
			   y: pc.y - (Rad * Math.sin(Math.PI*(angA/180)))};
	var pf = { x: pc.x + (Rad * Math.cos(Math.PI*(angB/180))),
			   y: pc.y - (Rad * Math.sin(Math.PI*(angB/180)))};
	fig.pathArco = [
            ["M", pi.x, pi.y],
            ["A", Rad, Rad, pc.x, 1, 0, pf.x, pf.y]
        ];
        	
	var ang, pt;
	if(orie == "der"){
		pi.x -= 10;
		ang = Math.PI;
		pt = pi;
	}
	else if(orie == "izq"){
		pf.x += 10;
		ang = 0;
		pt = pf;
	}
	var p0 = {x: pt.x - 10*Math.cos(ang + Math.PI/8), y: pt.y + 10*Math.sin(ang + Math.PI/8)};
	var p1 = {x: pt.x - 10*Math.cos(ang - Math.PI/8), y: pt.y + 10*Math.sin(ang - Math.PI/8)};
	
	fig.pathFlecha = [["M", pt.x, pt.y], ["L", p0.x, p0.y], ["L", p1.x, p1.y], ["Z"]];
	fig.push(r.path(fig.pathArco).attr(atrArc),
			 r.path(fig.pathFlecha).attr(atrFig));
	
	if(real == "pos"){
		fig.push(r.text(pc.x, pc.y - 2, "+").attr(atrSim));
	}
	else if(real == "neg"){
		fig.push(r.text(pc.x, pc.y - 2, "-").attr(atrSim));
	}
    return fig;
};




function figCiclo(ctx, padre, p, titulo, orie, real){
	var bb, po, pt, ancho, alto, medio_x, tamEl;
	var fig = figura(ctx);;
	
	fig.p = {x: p.x, y: p.y};
	fig.push(
		ctx.r.text(fig.p.x, fig.p.y, titulo).attr(atrTit)
	);
	
	bb = fig[0].getBBox();
	po = {x: bb.x - 2, y: bb.y -1};
	ancho = bb.width + 4;
	alto = bb.height + 2;
	medio_x = po.x + ancho/2;
	tamEl = 35;
	pt = {'x': medio_x, 'y': po.y - (tamEl/2)};
	
	fig.push(
		ctx.r.rect(po.x, po.y, ancho, alto, 4).attr(atrRec),
		arcoConFlecha(ctx.r, pt, orie, real),
		ctx.r.image('images/cerrar.png', po.x + ancho - 12, po.y - 12, 24, 24)
	);
	
	fig[0].toFront();
	fig[3].toFront();
	fig[3].hide();
	
	for(var i=0; i<3; i++){
		fig[i].attr({ cursor: "move"});
	};
	
	fig.camTit = function(titulo){
		var bb, lim, po, ancho, alto, tamEl;
		
		bb = fig[0].getBBox();
		lim = bb.y;
		
		this[0].attr('text', titulo);
		
		bb = fig[0].getBBox();
		po = {x: bb.x - 2, y: bb.y -1};
		ancho = bb.width + 4;
		alto = bb.height + 2;
		medio_x = po.x + ancho/2;
				
		this[1].attr('x', po.x);
		this[1].attr('y', po.y);
		this[1].attr('width', ancho);
		this[1].attr('height', alto);
		this[1].transform('');
		
		var dy = bb.y - lim;
		
		this[2].transform("...T 0," + dy);
		
		this[3].attr('x', po.x + ancho - 12);
		this[3].attr('y', po.y - 12);
		this[3].transform('');
	};
	fig.camOri = function(orie){
		var bb, po, pt, medio_x, tamEl;
		var arc, acr_ant;
		
		bb = fig[0].getBBox();
		po = {x: bb.x - 2, y: bb.y -1};
		medio_x = po.x + ancho/2;
		tamEl = 35;
		pt = {'x': medio_x, 'y': po.y - (tamEl/2)};
		
		arc = arcoConFlecha(ctx.r, pt, orie, padre.real);
		arc.drag(padre.moverFig, padre.inicio, padre.fin);
		arc.attr({ cursor: "move"});
		arc.hover(
			function(){
				padre.fig[3].show();
			},
			function(){
				padre.fig[3].hide();
			}
		);
		refFigPadre(arc, padre);
		
		acr_ant = this.splice(2,1, arc);
		acr_ant.remove();
		acr_ant = undefined;
	};
	fig.camRea = function(real){
		var bb, po, pt, medio_x, tamEl;
		var arc, acr_ant;
		
		bb = fig[0].getBBox();
		po = {x: bb.x - 2, y: bb.y -1};
		medio_x = po.x + ancho/2;
		tamEl = 35;
		pt = {'x': medio_x, 'y': po.y - (tamEl/2)};
		
		arc = arcoConFlecha(ctx.r, pt, padre.orie, real);
		arc.drag(padre.moverFig, padre.inicio, padre.fin);
		arc.attr({ cursor: "move"});
		arc.hover(
			function(){
				padre.fig[3].show();
			},
			function(){
				padre.fig[3].hide();
			}
		);
		refFigPadre(arc, padre);
		
		acr_ant = this.splice(2,1, arc);
		acr_ant.remove();
		acr_ant = undefined;
	};
	fig.obtBorde = function(){
		var bb, po, ancho, alto, medio_x, tamEl;
		var arc;
		
		bb = fig[0].getBBox();
		po = {x: bb.x - 2, y: bb.y -1};
		ancho = bb.width + 4;
		alto = bb.height + 2;
		medio_x = po.x + ancho/2;
		tamEl = 35;
		
		this.borde 	  = [["M", po.x, po.y], 
						 ["H", po.x + (ancho - tamEl)/2],
						 ["V", po.y - tamEl],
						 ["H", po.x + (ancho + tamEl)/2],
						 ["V", po.y ],
						 ["H", po.x + (ancho)],
						 ["V", po.y + alto], 
						 ["H", po.x], 
						 ["V", po.y]];
		return this.borde;
	};
	fig.hover(
		function(){
			fig[3].show();
		},
		function(){
			fig[3].hide();
		}
	);
	refFigPadre(fig, padre);
	return fig;
};

function figRelMa(ctx, padre, p){
	return figRelac(ctx, padre, p, atrRMa); 
};

function figRelIn(ctx, padre, p){
	return figRelac(ctx, padre, p, atrRIn); 
};


var Ciclo = Elemento.extend({
	init: function(ctx, p, titu){
		this._super(ctx);
		
		this.tipo = "ciclo";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "ciclo_"+ind;
		this.titulo = titu || "Ciclo "+ind;
		this.nombre = evo.convTexVar(this.titulo);

		
		this.orie = "der";
		this.real = "pos";
		this.lista = this.ctx.lista.ciclo;
		
		this.figura(p);
		this.intMenuEle();
	},
	camOrientacion: function(orie){
		if(orie == "der" || orie == "izq"){
			this.orie = orie;
			this.fig.camOri(orie);
		}
	},
	camRealimentacion: function(real){
		if(real == "pos" || real == "neg"){
			this.real = real;
			this.fig.camRea(real);
		}
	},
	figura: function(p){
		this.fig = figCiclo(this.ctx, this, p, this.titulo, this.orie, this.real);
		this.borde = this.fig.obtBorde();
		for(var i=0; i<3; i++){
			this.fig[i].drag(this.moverFig, this.inicio, this.fin);
			this.fig[i].dblclick(this.editorTexto);
		}
		this.fig[3].click(this.remover);
	}
});

var RelMa = Relacion.extend({
	init: function(ctx, p, ori, des){
		// p = puntos relación
		this._super(ctx);
		
		this.tipo = "relma";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "relma_"+ind;
		
		this.titulo = this.ctx.titRel(ori.titulo, des.titulo);			  
		this.nombre = evo.convTexVar(this.titulo);
		
		this.ori = ori;
		this.des = des;
		
		this.ori.agreRelSal(this);
		this.des.agreRelIng(this);
		
		this.lista = this.ctx.lista.relma;
		this.figura(p);
		this.intMenuEle();
	},
	figura: function(p){
		this.fig = figRelMa(this.ctx, this, p);
		this.fig[0].click(this.controles);
		this.fig[1].click(this.controles);
		this.fig[6].click(this.remover);
		this.visCont(this.selec);
	}
});

var RelIn = Relacion.extend({
	init: function(ctx, p, ori, des){
		this._super(ctx);
		
		this.tipo = "relin";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "relin_"+ind;
		
		this.titulo = this.ctx.titRel(ori.titulo, des.titulo);
		this.nombre = evo.convTexVar(this.titulo);
		
		this.ori = ori;
		this.des = des;
		
		this.ori.agreRelSal(this);
		this.des.agreRelIng(this);
		
		this.lista = this.ctx.lista.relin;
		this.figura(p);
		this.intMenuEle();
	},
	figura: function(p){
		this.fig = figRelIn(this.ctx, this, p);
		this.fig[0].click(this.controles);
		this.fig[1].click(this.controles);
		this.fig[6].click(this.remover);
		this.visCont(this.selec);
	}
});


var Influencias = Editor.extend({
	init: function(r){
		// Modelo de Evolución.Influencias //
		
		this.rec['camara'] = this.r.image('/images/camara_normal.png',-24,-24,24,24);
				
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
			elements = 	{
				'conce': {'el': 'concept', 	'group': 'concepts'},
				'ciclo': {'el': 'cycle', 	'group': 'cycles'},
			};
			for(var el in elements){
				list = inf.lista[el];				
				group = influence.append('<'+elements[el]['group']+' />').children(elements[el]['group']);
				
				for(var i in list){
					element = group.append('<'+elements[el]['el']+' />').children(elements[el]['el']+':last');
					element.append($('<name />').text(list[i].nombre));
					element.append($('<title />').text(list[i].titulo));
					element.append($('<description />').text(list[i].desc));
					if(el == 'conce'){
						element.append($('<units />').text(list[i].unid));
					}
					if(el == 'ciclo'){
						element.append($('<orientation />').text(list[i].orie));
						element.append($('<feedback />').text(list[i].real));
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
									
									if(rels[rel].tipo == 'relma'){
										relation.attr('type', 'material');
									}else if(rels[rel].tipo == 'relin'){
										relation.attr('type', 'information');	
									}
									relation.text(rels[rel].ori.nombre);
								}
							}
							if(cantRelSal > 0){
								rels = list[i].relacSal;
								for(var rel in rels){
									relation = relations.append('<relation_to />').children('relation_to:last');
									if(rels[rel].tipo == 'relma'){
										relation.attr('type', 'material');
									}else if(rels[rel].tipo == 'relin'){
										relation.attr('type', 'information');	
									}
									relation.text(rels[rel].des.nombre);
								}
							}
						}
					}
				}
			}
			
			list = inf.lista['copia'];
			group = influence.append('<copies />').children('copies');
			for(var i in list){
				
				element = group.append('<copy />').children('copy:last');
				element.append($('<reference />').text(list[i].nombre));
				
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
							relation.text(rels[rel].des.nombre);
						}
					}
				}
			}
			
			list = inf.lista['relma'];
			group = influence.append('<material_relations />').children('material_relations');
			for(var i in list){
				
				relation = group.append('<relation />').children('relation:last');
				relation.append($('<origin />').text(list[i].ori.nombre));
				relation.append($('<destination />').text(list[i].des.nombre));
				relation.append($('<description />').text(list[i].desc));
				
				pos = list[i].pos();
				position = relation.append('<position />').children('position');
				po = position.append('<po />').children('po');
				po.append($('<x />').text(pos[0].x));
				po.append($('<y />').text(pos[0].y));
				pco = position.append('<pco />').children('pco');
				pco.append($('<x />').text(pos[1].x));
				pco.append($('<y />').text(pos[1].y));
				pcd = position.append('<pcd />').children('pcd');
				pcd.append($('<x />').text(pos[2].x));
				pcd.append($('<y />').text(pos[2].y));
				pd = position.append('<pd />').children('pd');
				pd.append($('<x />').text(pos[3].x));
				pd.append($('<y />').text(pos[3].y));
			}
			
			list = inf.lista['relin'];
			group = influence.append('<information_relations />').children('information_relations');
			console.log(group);
			for(var i in list){
				
				relation = group.append('<relation />').children('relation:last');
				relation.append($('<origin />').text(list[i].ori.nombre));
				relation.append($('<destination />').text(list[i].des.nombre));
				relation.append($('<description />').text(list[i].desc));
				
				pos = list[i].pos();
				position = relation.append('<position />').children('position');
				po = position.append('<po />').children('po');
				po.append($('<x />').text(pos[0].x));
				po.append($('<y />').text(pos[0].y));
				pco = position.append('<pco />').children('pco');
				pco.append($('<x />').text(pos[1].x));
				pco.append($('<y />').text(pos[1].y));
				pcd = position.append('<pcd />').children('pcd');
				pcd.append($('<x />').text(pos[2].x));
				pcd.append($('<y />').text(pos[2].y));
				pd = position.append('<pd />').children('pd');
				pd.append($('<x />').text(pos[3].x));
				pd.append($('<y />').text(pos[3].y));
			}
			
			list = inf.lista['seinf'];
			group = influence.append('<sectors />').children('sectors');
			for(var i in list){
				
				sector = group.append('<sector />').children('sector:last');
				sector.append($('<name />').text(list[i].nombre));
				sector.append($('<title />').text(list[i].titulo));
				sector.append($('<description />').text(list[i].desc));
				
				pos = list[i].pos();
				position = sector.append('<position />').children('position');
				position.append($('<x />').text(pos.x));
				position.append($('<y />').text(pos.y));
				
				size = list[i].size();
				size_sector = sector.append('<size />').children('size');
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
	
	existeNivelPt: function(p){
    var existe = false;
    if(this.list.nivel){  
      for( var n in this.list.nivel){
        existe = Raphael.isPointInsidePath(this.list.nivel[n].borde, p.x, p.y);     
        if(existe){
          return this.list.nivel[n];
        }
      }
    }
    return undefined;
  },
	
	modTitMenu: function(el){
		$('#'+el.id+'_item_nombre').html(el.titulo);
	}
	// fin de la Vista de Evolución.Influencias //
});

$(document).ready(function() {
	// Controlador del modulo Influencias //
	
	var panel = document.getElementById("svg-div-inf");
	var r = Raphael(panel, $("#lenguaje-inf").width(), $("#lenguaje-inf").height());
	inf = new Influencias(r);
	inf.activarModo(inf.modo);
	evo.inf = inf;
	
	// Fin del Controlador del modulo Influencias //
});
