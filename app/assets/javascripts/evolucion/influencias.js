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


function figConce(ctx, padre, p, titulo, estilo){
	var bb, po, ancho, alto;
	var fig = figura(ctx);
	var atrTitTmp = clonar(atrTit);
	var atrRectTmp = clonar(atrRec);
	
	atrTitTmp['fill'] = estilo.color || atrTit['fill']; 
	atrRectTmp['stroke-dasharray'] = estilo.dasharray_rec || atrRec['stroke-dasharray'];
	
	fig.p = {x: p.x, y: p.y};
	fig.push(
		ctx.r.text(fig.p.x, fig.p.y, titulo).attr(atrTitTmp)
	);
	
	bb = fig[0].getBBox();
	po = {x: bb.x - 2, y: bb.y -1};
	ancho = bb.width + 4;
	alto = bb.height + 2;
	
	fig.push(
		ctx.r.rect(po.x, po.y, ancho, alto, 4).attr(atrRectTmp),
		ctx.r.image('images/cerrar.png', po.x + ancho - 12, po.y - 12, 24, 24)
	);
	
	fig[0].toFront();
	fig[2].toFront();
	fig[2].hide();
	
	for(var i=0; i<2; i++){
		fig[i].attr({ cursor: "move"});
	}
	
	fig.camTit = function(titulo){
		var bb, po, ancho, alto;
		
		this[0].attr('text', titulo);
		
		bb = fig[0].getBBox();
		po = {x: bb.x - 2, y: bb.y -1};
		ancho = bb.width + 4;
		alto = bb.height + 2;
		
		this[1].attr('x', po.x);
		this[1].attr('y', po.y);
		this[1].attr('width', ancho);
		this[1].attr('height', alto);
		this[1].transform('');
		
		this[2].attr('x', po.x + ancho - 12);
		this[2].attr('y', po.y - 12);
		this[2].transform('');
		
	};
	fig.obtBorde = function(){
		var bb, po, ancho, alto;
		bb = this[0].getBBox();
		po = {x: bb.x - 2, y: bb.y -1};
		ancho = bb.width + 4;
		alto = bb.height + 2;
		
		this.borde = [	["M", po.x, po.y], 
						["H", po.x + ancho], 
						["V", po.y + alto],
						["H", po.x],
						["V", po.y]];
		return this.borde;
	};
	fig.hover(
		function(){
			fig[2].show();
		},
		function(){
			fig[2].hide();
		}
	);
	refFigPadre(fig, padre);
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


var Conce = Elemento.extend({
	init: function(ctx, p, titu){
		this._super(ctx);
		
		this.tipo = "conce";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "conce_"+ind;
		this.titulo = titu || "Concepto "+ind;
		this.nombre = evo.convTexVar(this.titulo);
		
		this.unid = " ";
		this.lista = this.ctx.lista.conce;
		this.genFig = figConce;
		this.figura(p);
		this.intMenuEle();
	},
	camUnids: function(unid){
		this.unid = unid;
	},
	figura: function(p){
		this.fig = figConce(this.ctx, this, p, this.titulo, {});
		this.borde = this.fig.obtBorde();
		for(var i=0; i<2; i++){
			this.fig[i].drag(this.moverFig, this.inicio, this.fin);
			this.fig[i].dblclick(this.editorTexto);
		}
		this.fig[2].click(this.remover);
	}
});

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
		
		this._super(r);
		this.id 	 = 'inf';
		this.modo 	 = 'curso-inf';
		this.div     = '#influencias';
		this.svg	 = '#svg-inf';
		this.svg_div = '#svg-div-inf';
		this.len_div = '#lenguaje-inf';
		
		this.elementos =['conce', 'copia'];
		
		this.modos = this.elementos.concat(
						'relma',	'relin',	
						'ciclo',	'seinf');
						
		for(var i in this.modos){
			this.lista[this.modos[i]] = {};
			this.ind[this.modos[i]] = 0;
			this.tmp[this.modos[i]] = undefined;
		}
		
		this.rec['camara'] = this.r.image('/images/camara_normal.png',-24,-24,24,24);
		
		/*jQuery.ajax({
        type: "GET",
        url: "/images/camara.svg",
        dataType: "xml",
        success: function(svg){
        	rec['camara'] = inf.r.importSVG(svg);
        }
    	});*/
		// Fin del modelo Evolución.Influencias //
		
		// Vista de Evolución.Influencias //
				
		$('#icons-inf li').hover(
			function(){
				$(this).addClass('ui-state-hover');
				$(this).children().css('background-position','0px 24px')
			},
			function() {
				if($(this).attr('id') != inf.modo){
					$(this).removeClass('ui-state-hover');
					$(this).children().css('background-position','0px 0px')
				}
			}
		);
		$('#icons-inf li').click(function(){
			inf.activarModo($(this).attr('id'));
		});
		
		$("#menu-elementos-inf").accordion({ header: "h3" , heightStyle: "content", collapsible: true});	//autoHeight: false,
		$("#menu-elementos-inf > div > h3 ").css('padding','3px 0px 3px 25px');
		$("#menu-elementos-inf > div > div").css('padding','2px 0px');	
		
		$(this.svg_div).children().attr('id', 'svg-inf');
		
		$(this.svg_div).mouseenter(function(e){
			var p = inf.obtPosMouse(e);
			switch(inf.modo){
				case 'conce-inf': {
					if(inf.tmp.conce){
						inf.tmp.conce.remover();
						inf.tmp.conce = undefined;
					}
					inf.tmp.conce = figConce(inf, undefined, p, "Concepto "+inf.ind['conce'], {});
					break;
				}
				case 'relma-inf': {
					if(inf.tmp.relma){
						inf.tmp.relma.remover();
						inf.tmp.relma = undefined;
					}
					inf.tmp.relma = new figRelMa(inf, undefined, p);
					break;
				}
				case 'relin-inf': {
					if(inf.tmp.relin){
						inf.tmp.relin.remover();
						inf.tmp.relin = undefined;
					}
					inf.tmp.relin = new figRelIn(inf, undefined, p);
					break;
				}
				case 'ciclo-inf': {
					if(inf.tmp.ciclo){
						inf.tmp.ciclo.remover();
						inf.tmp.ciclo = undefined;
					}
					inf.tmp.ciclo = new figCiclo(inf, undefined, p, "Ciclo "+ inf.ind['ciclo'], "der", "pos");
					break;
				}
				case 'copia-inf': {
					if(inf.tmp.copia){
						inf.tmp.copia.remover();
						inf.tmp.copia = undefined;
					}
					inf.tmp.copia = new figCopia(inf, undefined, p);
					break;
				}
				case 'secto-inf': {
					if(inf.tmp.seinf){
						inf.tmp.seinf.remover();
						inf.tmp.seinf = undefined;
					}
					inf.tmp.seinf = new figSecto(inf, undefined, p, undefined, "Sector "+inf.ind['seinf']);
					break;
				}
			}
		});
		$(this.svg_div).mouseleave(function(e){
			switch(inf.modo){
				case 'conce-inf': {
					if(inf.tmp.conce){
						inf.tmp.conce.remove();
						inf.tmp.conce = undefined;
					}
					break;
				}
				case 'relma-inf': {
					if(inf.tmp.relma){
						inf.tmp.relma.remove();
						inf.tmp.relma = undefined;
					}
					break;
				}
				case 'relin-inf': {
					if(inf.tmp.relin){
						inf.tmp.relin.remove();
						inf.tmp.relin = undefined;
					}
					break;
				}
				case 'ciclo-inf': {
					if(inf.tmp.ciclo){
						inf.tmp.ciclo.remove();
						inf.tmp.ciclo = undefined;
					}
					break;
				}
				case 'copia-inf': {
					if(inf.tmp.copia){
						inf.tmp.copia.remove();
						inf.tmp.copia = undefined;
					}
					break;
				}
				case 'secto-inf': {
					if(inf.tmp.seinf){
						inf.tmp.seinf.remove();
						inf.tmp.seinf = undefined;
					}
					break;
				}
			}
		});
		$(this.svg_div).mousemove(function(e){
			var p = inf.obtPosMouse(e);
			switch(inf.modo){
				case 'conce-inf': {
					if(inf.tmp.conce){
						inf.tmp.conce.move(p);						
					}
					break;
				}
				case 'relma-inf': {
					if(inf.tmp.relma){
						inf.tmp.relma.move(p);
					}
					break;
				}
				case 'relin-inf': {
					if(inf.tmp.relin){
						inf.tmp.relin.move(p);
					}
					break;
				}
				case 'ciclo-inf': {
					if(inf.tmp.ciclo){
						inf.tmp.ciclo.move(p);
					}
					break;
				}
				case 'copia-inf': {
					if(inf.tmp.copia){
						inf.tmp.copia.move(p);
					}
					break;
				}
				case 'secto-inf': {
					if(inf.tmp.seinf){
						inf.tmp.seinf.move(p);
					}
					break;
				}
			}
		});
		$(this.svg_div).click(function(e){
			var p = inf.obtPosMouse(e);
			var alpha;
			switch(inf.modo){
				case 'conce-inf': {
					if(inf.tmp.conce){
						var c = new Conce(inf, p);
						inf.lista.conce[c.id] = c;
						inf.activarModo('curso-inf');
						inf.tmp.conce.remove();
						inf.tmp.conce = undefined;
					}
					break;					
				}
				case 'relma-inf': {
					var el = inf.existeElPt(p);
					var relac = inf.tmp.relma;
					if(el){
						p = inf.detPunEnPath(el.borde, p);
						alpha = inf.detAngEnPath(el.borde, p);
						if(relac.estado == 'inicial' && el.cone['aceOri']){
							relac.ori = el;
							relac.actSegPun(inf, p, alpha);
						}
						else if(relac.estado == 'extendido' && el.cone['aceDes']){
							var noEsMismo = false;
							var noExRelac = false;
								
							if(relac.ori.id != el.id){
								noEsMismo = true;
							}
							noExRelac = !el.exisRelDes(relac.ori.id);
							
							if(noEsMismo && noExRelac){
								relac.p[3] = p;
								
								var rm = new RelMa(inf, relac.p, relac.ori, el);

								inf.lista.relma[rm.id] = rm;
								
								inf.activarModo('curso-inf');
								inf.tmp.relma.remove();
								inf.tmp.relma = undefined;
							}
						}
					}
					break;
				}
				case 'relin-inf': {
					var el = inf.existeElPt(p);
					var relac = inf.tmp.relin;
					if(el){
						p = inf.detPunEnPath(el.borde, p);
						alpha = inf.detAngEnPath(el.borde, p);
						if(relac.estado == 'inicial' && el.cone['aceOri']){
							relac.ori = el;
							relac.actSegPun(inf, p, alpha);
						}
						else if(relac.estado == 'extendido' && el.cone['aceDes']){
							var noEsMismo = false;
							var noExRelac = false;
								
							if(relac.ori.id != el.id){
								noEsMismo = true;
							}
							noExRelac = !el.exisRelDes(relac.ori.id);
							
							if(noEsMismo && noExRelac){
								relac.p[3] = p;
								
								var ri = new RelIn(inf, relac.p, relac.ori, el);

								inf.lista.relin[ri.id] = ri;
								
								inf.activarModo('curso-inf');
								inf.tmp.relin.remove();
								inf.tmp.relin = undefined;
							}
						}
					}
					break;
				}
				case 'ciclo-inf': {
					var ci = new Ciclo(inf, p);
					inf.lista.ciclo[ci.id] = ci;
					
					inf.activarModo('curso-inf');
					inf.tmp.ciclo.remove();
					inf.tmp.ciclo = undefined;
					break;
				}
				case 'copia-inf': {
					var el = inf.existeElPt(p);
					if(el){
						var cp = new Copia(inf, p, el);
						inf.lista.copia[cp.id] = cp;
						
						inf.activarModo('curso-inf');
						inf.tmp.copia.remove();
						inf.tmp.copia = undefined;
					}
					break;
				}
				case 'secto-inf': {
					var se = new Secto(inf, p);
					inf.lista.seinf[se.id] = se;
					
					inf.activarModo('curso-inf');
					inf.tmp.seinf.remove();
					inf.tmp.seinf = undefined;
					break;
				}
			}
		});
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
	
	integrarControlesEle: function(el){
		var nomCont;
		switch(el.tipo){
			case 'conce': {
				nomCont = '#ListaConcep';				
				$("#menu-elementos-inf").accordion("option", "active", 0);
				break;
			}
			case 'relma': {
				nomCont = '#ListaRelMat';
				$("#menu-elementos-inf" ).accordion("option", "active", 1);
				break;
			}
			case 'relin': {
				nomCont = '#ListaRelInf';
				$("#menu-elementos-inf" ).accordion("option", "active", 2);
				break;
			}	
			case 'ciclo': {
				nomCont = '#ListaCiclos';
				$("#menu-elementos-inf" ).accordion("option", "active", 3);
				break;
			}
			case 'seinf': {
				nomCont = '#ListaSecInf';
				$("#menu-elementos-inf").accordion("option", "active", 4);
				break;
			}
		}
		if(nomCont && el.id && el.titulo){
			var html =
				"<div id='"+el.id+"_item'"+
				"class='eleMenu' >"+
					"<a id='"+el.id+"_item_tit' href='#'>"+
					"<div id='"+el.id+"_item_nombre' "+
					"class='eleTit' >"+
						el.titulo+
					"</div>"+
					"</a>"+
					"<div id='"+el.id+"_item_conte' "+
					"class='eleCont' >";
			if(el.desc){
				html +=	"<div id='"+el.id+"_item_conte_desc' "+
						"class='eleContTit'"+
						">Descripci&oacute;n.</div>"+
						"<textarea id='"+el.id+"_item_conte_desc_TA' rows='4' "+
						"class='eleContTA'>"+
						"</textarea>";
			}
			if(el.unid){
				html += "<div id='"+el.id+"_item_conte_uni' "+
						"class='eleContTit'"+
						">Unidades.</div>"+
						"<input id='"+el.id+"_item_conte_uni_IT' type='text' "+
						"class='eleContIT' />";
			}
			if(el.orie){
				html += "<div id='"+el.id+"_item_conte_ori' "+
						"class='eleContTit'"+
						">Orientaci&oacute;n.</div>"+
						"<form>"+
							"<div id='"+el.id+"_item_conte_ori_radio_set'>"+
								"<input type='radio' id='"+el.id+"_item_conte_ori_pos_IR' name='"+el.id+"_item_conte_ori_IR' value='der' checked='checked'/>"+
								"<label for='"+el.id+"_item_conte_ori_pos_IR'>Derecha</label>"+
								"<input type='radio' id='"+el.id+"_item_conte_ori_neg_IR' name='"+el.id+"_item_conte_ori_IR' value='izq' />"+
								"<label for='"+el.id+"_item_conte_ori_neg_IR'>Izquierda</label>"+
							"</div>"+
						"</form>";
			}
			if(el.real){
				html += "<div id='"+el.id+"_item_conte_rea' "+
						"class='eleContTit'"+
						">Realimentaci&oacute;n.</div>"+
						"<form>"+
							"<div id='"+el.id+"_item_conte_rea_radio_set'>"+
								"<input type='radio' id='"+el.id+"_item_conte_rea_pos_IR' name='"+el.id+"_item_conte_rea_IR' value='pos' checked='checked'/>"+
								"<label for='"+el.id+"_item_conte_rea_pos_IR'>Positiva</label>"+
								"<input type='radio' id='"+el.id+"_item_conte_rea_neg_IR' name='"+el.id+"_item_conte_rea_IR' value='neg' />"+
								"<label for='"+el.id+"_item_conte_rea_neg_IR'>Negativa</label>"+
							"</div>"+
						"</form>";
			}
			html +=	"</div>"+
				"</div>";
				
			$(nomCont).append(html);
			
			$('#'+el.id+'_item_tit').click(function(){
				$('#'+el.id+'_item_conte').toggle();
				return false;
			});
			if(el.desc){
				$('#'+el.id+'_item_conte_desc').css('width', '75px');
				$('#'+el.id+'_item_conte_desc_TA').change(function(){					
					el.camDesc($(this).val());					
				});
			}
			if(el.unid){
				$('#'+el.id+'_item_conte_uni').css('width', '60px');
				$('#'+el.id+'_item_conte_uni_IT').change(function(){
					el.camUnids($(this).val());
				});
			}
			if(el.orie){
				$("#"+el.id+"_item_conte_ori_radio_set").buttonset();
				$("#"+el.id+"_item_conte_ori_radio_set label span").css('padding', '0.1em 0.3em');
				$("input:radio[name='"+el.id+"_item_conte_ori_IR']").change(function(){
					el.camOrientacion($(this).val());
				});
			}
			if(el.real){
				$("#"+el.id+"_item_conte_rea_radio_set").buttonset();
				$("#"+el.id+"_item_conte_rea_radio_set label span").css('padding', '0.1em 0.3em');
				$("input:radio[name='"+el.id+"_item_conte_rea_IR']").change(function(){
					el.camRealimentacion($(this).val());
				});
			}
		}
	},
	eliminarControlesEle: function(el){
		$('#'+el.id+'_item').remove();
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
