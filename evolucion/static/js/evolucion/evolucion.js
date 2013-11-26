var evo;

var atrTra = { 'stroke-width': 0, 		'stroke': '', 	  'fill': '#fff', 'fill-opacity': 0};
var atrArc = { 'stroke-width': 2.5, 	'stroke': '#555', 'stroke-linecap': 'round'};
var atrFig = { 'stroke-width': 1.0, 	'stroke': '#555', 'fill': '#555', 'stroke-linecap': 'round'};
var atrFiE = { 'stroke-width': 2.0, 	'stroke': '#555', 'fill': '#fff', 'stroke-linecap': 'round'};
var atrFiA = { 'stroke-width': 2.0, 	'stroke': '#555', 'fill': '#f55', 'stroke-linecap': 'round'};
var atrFiD = { 'stroke-width': 3.0, 	'stroke': '#555', 'fill': '#fff'};
var atrSim = { 'font-size': 20, 		'font-family': 'Verdana', 'fill': '#555', 'stroke': '#555'};
var atrCur = { 'stroke-width': 1.0, 	'stroke': '#555', 'stroke-linecap': 'round'};
var atrLin = { 'stroke': '#008ec7', 	'stroke-dasharray': '. '};
var atrBor = { 'stroke': '#008ec7'};

var atrTit = { 'font-size': 14, 'font-family': 'Verdana', 'fill': '#000'};
var atrTex = { 'font-size': 12, 'font-family': 'Verdana', 'fill': '#000'};
var atrRec = { 'stroke': '#aaa', 'fill': '#fff', 'stroke-dasharray': ''};
var atrCon = { 'stroke': '#888', 'stroke-width': 2.5};
var atrPun = { 'stroke': '#008ec7', 'fill': '#fff'};
var atrDes = { 'stroke': '#fff'};
var atrRMa = { 'stroke_width': 3.0};
var atrRIn = { 'stroke_width': 1.5};

function refFigPadre(fig, padre){
	if(fig.type == "set"){
		fig.forEach(function(el){
			if(el.type == "set"){
				refFigPadre(el, padre);
			}
			else{
				el.padre = padre;
			}
		});
		fig.padre = padre;
	}
};

function clonar(obj){
	return jQuery.extend(true, {}, obj);
};

function abrir(){
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
	})
	return false;
};

function asigModelo(modelo){
	editor.reiniciar();
	
	var ancho_svg, alto_svg;
	var nombre, titulo, p, pc, tam, desde, hasta;
	
	$(modelo).find('modelo:first').each(function(){
		ancho_svg = $(this).attr('ancho_svg').replace('px','');
		alto_svg  = $(this).attr('alto_svg').replace('px','');
		ancho_svg = Number(ancho_svg);
		alto_svg = Number(alto_svg);
		editor.modTamPan(ancho_svg, alto_svg);
		
		$(this).find('list_depen:first').each(function(){
			$(this).find('depen').each(function(){
				nombre = $(this).attr('nombre');
				titulo = $(this).attr('titulo');
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				tam	   = {'ancho': Number($(this).attr('ancho')), 
						  'alto':  Number($(this).attr('alto'))};
				
				var dp = new Depen(editor.r, p, tam, titulo);
				editor.listDepen.push(dp);
			});
		});
		
		$(this).find('list_activ:first').each(function(){
			$(this).find('activ').each(function(){
				nombre = $(this).attr('nombre');
				rol = $(this).attr('rol');
				desc = $(this).attr('descri');
				tiem = $(this).attr('tiempo');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var ac = new Activ(editor.r, p, rol, desc, tiem);
				editor.listActiv.push(ac);
			});
		});
		
		$(this).find('list_tabla:first').each(function(){
			$(this).find('tabla').each(function(){
				nombre = $(this).attr('nombre');
				titulo = $(this).attr('titulo');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var ta = new Tabla(editor.r, p, titulo);
				editor.listTabla.push(ta);
			});
		});
		
		$(this).find('list_u_entr:first').each(function(){
			$(this).find('u_entr').each(function(){
				nombre = $(this).attr('nombre');
				titu = $(this).attr('titulo');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var ue = new UEntr(editor.r, p, titu);
				editor.listUEntr.push(ue);
			});
		});
		
		$(this).find('list_u_sale:first').each(function(){
			$(this).find('u_sale').each(function(){
				nombre = $(this).attr('nombre');
				titu = $(this).attr('titulo');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var us = new USale(editor.r, p, titu);
				editor.listUSale.push(us);
			});
		});
		
		$(this).find('list_archi:first').each(function(){
			$(this).find('archi').each(function(){
				nombre = $(this).attr('nombre');
				titu = $(this).attr('titulo');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var ar = new Archi(editor.r, p, titu);
				editor.listArchi.push(ar);
			});
		});
		
		$(this).find('list_carpe:first').each(function(){
			$(this).find('carpe').each(function(){
				nombre = $(this).attr('nombre');
				titu = $(this).attr('titulo');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var ca = new Carpe(editor.r, p, titu);
				editor.listCarpe.push(ca);
			});
		});
		
		$(this).find('list_compu:first').each(function(){
			$(this).find('compu').each(function(){
				nombre = $(this).attr('nombre');
				titu = $(this).attr('titulo');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var co = new Compu(editor.r, p, titu);
				editor.listCompu.push(co);
			});
		});
		
		$(this).find('list_based:first').each(function(){
			$(this).find('based').each(function(){
				nombre = $(this).attr('nombre');
				titu = $(this).attr('titulo');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var bd = new BaseD(editor.r, p, titu);
				editor.listBaseD.push(bd);
			});
		});
		
		$(this).find('list_actbd:first').each(function(){
			$(this).find('actbd').each(function(){
				nombre = $(this).attr('nombre');
				titu = $(this).attr('titulo');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var abd = new ActDB(editor.r, p, titu);
				editor.listActDB.push(abd);
			});
		});
		
		$(this).find('list_docum:first').each(function(){
			$(this).find('docum').each(function(){
				nombre = $(this).attr('nombre');
				titu = $(this).attr('titulo');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var doc = new Docum(editor.r, p, titu);
				editor.listDocum.push(doc);
			});
		});
		
		$(this).find('list_docms:first').each(function(){
			$(this).find('docms').each(function(){
				nombre = $(this).attr('nombre');
				titu = $(this).attr('titulo');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var dcs = new Docms(editor.r, p, titu);
				editor.listDocms.push(dcs);
			});
		});
		
		$(this).find('list_impre:first').each(function(){
			$(this).find('impre').each(function(){
				nombre = $(this).attr('nombre');
				titu = $(this).attr('titulo');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var im = new Impre(editor.r, p, titu);
				editor.listImpre.push(im);
			});
		});
		
		$(this).find('list_papel:first').each(function(){
			$(this).find('papel').each(function(){
				nombre = $(this).attr('nombre');
				titu = $(this).attr('titulo');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var pp = new Papel(editor.r, p, titu);
				editor.listPapel.push(pp);
			});
		});
		
		$(this).find('list_incon:first').each(function(){
			$(this).find('incon').each(function(){
				nombre = $(this).attr('nombre');
				titu = $(this).attr('titulo');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var inc = new Incon(editor.r, p, titu);
				editor.listIncon.push(inc);
			});
		});
		
		$(this).find('list_union:first').each(function(){
			$(this).find('union').each(function(){
				
				desde = $(this).attr('desde');
				hasta = $(this).attr('hasta');
				tie_ini = $(this).attr('tie_ini');
				tie_fin = $(this).attr('tie_fin');
				
				pc      = $(this).attr('pc');
				eval('var pc='+pc);
				
				var un = new Union(editor.r, pc, 
					editor.busEleNom(desde),
					editor.busEleNom(hasta),
					tie_ini, tie_fin);
				editor.listUnion.push(un);
			});
		});
		
		$(this).find('list_undob:first').each(function(){
			$(this).find('undob').each(function(){
				
				desde = $(this).attr('desde');
				hasta = $(this).attr('hasta');
				
				pc      = $(this).attr('pc');
				eval('var pc='+pc);
				
				var un = new UnDob(editor.r, pc, 
					editor.busEleNom(desde),
					editor.busEleNom(hasta));
				editor.listUnDob.push(un);
			});
		});
		
		
	});
};

function roundDec(num,dec){
    var fac=Math.pow(10,dec);
    return Math.round(num*fac)/fac;
}


function curva(r, pm , attr){
	//pm = Parametros x, y, ax, ay, bx, by, zx, zy
	
	var atrCurvaTmp = clonar(atrCur);
	var atrFlechaTmp = clonar(atrFig);
	atrCurvaTmp['stroke'] = attr.color || '#555';
	atrCurvaTmp['stroke-width'] = attr.stroke_width || 1;
	atrFlechaTmp['stroke'] = attr.color || '#555';
	atrFlechaTmp['stroke-width'] = attr.stroke_width || 1;
	atrFlechaTmp['fill'] = attr.color || '#555';
	 
	var ang = Math.atan2( ( pm.by - pm.zy), (pm.bx - pm.zx) );
	var p1 = {x: pm.zx, y: pm.zy};
	var p2 = {x: p1.x + 10*Math.cos(ang + Math.PI/8), y: p1.y + 10*Math.sin(ang + Math.PI/8)};
	var p3 = {x: p1.x + 10*Math.cos(ang - Math.PI/8), y: p1.y + 10*Math.sin(ang - Math.PI/8)};
	
	var fig = r.set();
	fig.pathCurve = [["M", pm.x, pm.y], ["C", pm.ax, pm.ay, pm.bx, pm.by, pm.zx, pm.zy]];
	fig.pathArrow = [["M", p1.x, p1.y], ["L", p2.x, p2.y], ["L", p3.x, p3.y], ["Z"]];
	fig.push(
		r.path(fig.pathCurve).attr(atrCurvaTmp),
		r.path(fig.pathArrow).attr(atrFlechaTmp)
	);
	fig.modPm = function(pm){
		
		this.pathCurve[0][1] = pm[0].x;
		this.pathCurve[0][2] = pm[0].y;
		this.pathCurve[1][1] = pm[1].x;
		this.pathCurve[1][2] = pm[1].y;
		this.pathCurve[1][3] = pm[2].x;
		this.pathCurve[1][4] = pm[2].y;
		this.pathCurve[1][5] = pm[3].x;
		this.pathCurve[1][6] = pm[3].y;
		this[0].attr({path: this.pathCurve});
		
		var ang = Math.atan2( ( pm[2].y - pm[3].y), (pm[2].x - pm[3].x) );
		var p1 = {x: pm[3].x, y: pm[3].y};
		var p2 = {x: p1.x + 10*Math.cos(ang + Math.PI/8), y: p1.y + 10*Math.sin(ang + Math.PI/8)};
		var p3 = {x: p1.x + 10*Math.cos(ang - Math.PI/8), y: p1.y + 10*Math.sin(ang - Math.PI/8)};
		this.pathArrow = [["M", p1.x, p1.y], ["L", p2.x, p2.y], ["L", p3.x, p3.y], ["Z"]];
		this[1].attr({path: this.pathArrow});
	}
	return fig;
};

function linCur(r, pm , attr){
	var lineas = r.path(
		[["M", pm.x, pm.y], 
		 ["L", pm.ax, pm.ay], 
		 ["M", pm.bx, pm.by], 
		 ["L", pm.zx, pm.zy]]).attr(attr);
		 
	lineas.modPm = function(pm){
		this.attr({path:[["M", pm[0].x, pm[0].y], 
						 ["L", pm[1].x, pm[1].y], 
						 ["M", pm[2].x, pm[2].y], 
						 ["L", pm[3].x, pm[3].y]]});
	}
	return lineas;
};


function inicio() {
	this.dx = this.dy = 0;
};

function moveFig(dx, dy) {
	this.update(dx - (this.dx || 0), dy - (this.dy || 0));
	this.dx = dx;
	this.dy = dy;
};

function fin(){
	this.dx = this.dy = 0;
};

function figura(ctx){
	var fig = ctx.r.set();
	fig.borde = [];
	fig.move = function(p){
		var dx = p.x - this.p.x;
		var dy = p.y - this.p.y;
		
		this.transform("T" + dx + "," + dy);
	};
	return fig;
};

function figSecto(ctx, padre, p, tam, titulo){
	var fig = figura(ctx);
	var pc, bb, po, ancho, alto, medio_x, medio_y;
	var tam_dp = tam || {'ancho': 250, 'alto': 500};
	
	fig.p = {x: p.x, y: p.y};
	fig.push(
		ctx.r.text(fig.p.x, fig.p.y, titulo).attr(atrTit)
	);
	
	bb = fig[0].getBBox();
	po = {x: bb.x - 2, y: bb.y - 1};
	ancho = bb.width + 4;
	alto = bb.height + 2;
	medio_x = po.x + ancho/2;
	medio_y = po.y + alto + 2;
	
	pc = {	p0x: medio_x - tam_dp.ancho/2, p0y: medio_y,
			p1x: medio_x + tam_dp.ancho/2, p1y: medio_y, 
			p2x: medio_x + tam_dp.ancho/2, p2y: medio_y + tam_dp.alto, 
			p3x: medio_x - tam_dp.ancho/2, p3y: medio_y + tam_dp.alto}
	
	fig.push(
		ctx.r.rect(po.x, po.y, ancho, alto, 4).attr(atrRec),
		ctx.r.rect(pc.p0x, pc.p0y, tam_dp.ancho, tam_dp.alto, 0).attr(atrCon),
		ctx.r.circle(pc.p0x, pc.p0y, 4).attr(atrPun),
		ctx.r.circle(pc.p1x, pc.p1y, 4).attr(atrPun),
		ctx.r.circle(pc.p2x, pc.p2y, 4).attr(atrPun),
		ctx.r.circle(pc.p3x, pc.p3y, 4).attr(atrPun),
		ctx.r.image('/images/cerrar.png', po.x + ancho - 12, po.y - 12, 24, 24)
	);
		
	fig[1].toFront();
	fig[0].toFront();
	fig[7].toFront();
	fig[7].hide();
	
	for(var i=0; i<3; i++){
		fig[i].attr({ cursor: "move"});
	}
	
	fig[3].attr({ cursor: "nw-resize"});
	fig[4].attr({ cursor: "ne-resize"});
	fig[5].attr({ cursor: "se-resize"});
	fig[6].attr({ cursor: "sw-resize"});
	
	fig.camTit = function(titulo){
		var bb, pc, po, ancho, alto, medio_x, medio_y;
		
		this[0].attr('text', titulo);
		
		bb = this[0].getBBox();
		po = {x: bb.x - 2, y: bb.y -1};
		ancho = bb.width + 4;
		alto = bb.height + 2;
		medio_x = po.x + ancho/2;
		
		this[1].attr('x', po.x);
		this[1].attr('y', po.y);
		this[1].attr('width', ancho);
		this[1].attr('height', alto);
		this[1].transform('');
		
		this[2].attr('x', medio_x - (this[2].attr('width')/2));
		this[2].attr('y', po.y + alto + 2);
		this[2].transform('');
		
		this[7].attr('x', po.x + ancho - 12);
		this[7].attr('y', po.y - 12);
		this[7].transform('');
		
		bb = this[2].getBBox();
		po = {x: bb.x, y: bb.y};
		ancho = bb.width;
		alto = bb.height;
		
		pc = {	p0x: po.x, 			p0y: po.y,
				p1x: po.x + ancho,	p1y: po.y, 
				p2x: po.x + ancho, 	p2y: po.y + alto, 
				p3x: po.x, 	        p3y: po.y + alto};
						
		this[3].attr('cx', pc.p0x);
		this[3].attr('cy', pc.p0y);
		this[3].transform('');
		
		this[4].attr('cx', pc.p1x);
		this[4].attr('cy', pc.p1y);
		this[4].transform('');
		
		this[5].attr('cx', pc.p2x);
		this[5].attr('cy', pc.p2y);
		this[5].transform('');
		
		this[6].attr('cx', pc.p3x);
		this[6].attr('cy', pc.p3y);
		this[6].transform('');
	};
	fig.obtArea = function(){
		var bb = this[2].getBBox();
		
		return [["M", bb.x, bb.y], 
				["H", bb.x2], 
				["V", bb.y2],
				["H", bb.x],
				["V", bb.y]]; 
	};
	fig.obtBorde = function(){
		var bb = this[1].getBBox();
		
		this.borde = [["M", bb.x - 2, bb.y -1], 
					  ["H", bb.x2 + 2], 
					  ["V", bb.y2 + 1],
					  ["H", bb.x - 2],
					  ["V", bb.y - 1]];
		return this.borde;
	};
	fig.obtTam = function(){
		var bb = this[2].getBBox(); 
		
		return {'width': bb.width	,
				'height': bb.height	}
	}
	fig.mosCont = function(){
		fig[3].show();
		fig[4].show();
		fig[5].show();
		fig[6].show();
	};
	fig.ocuCont = function(){
		fig[3].hide();
		fig[4].hide();
		fig[5].hide();
		fig[6].hide();
	};
	
	fig[3].update = function (dx, dy) {
		var bb, bb_tit, dx_tit, po, ancho, alto;
		
		bb = fig[2].getBBox();
		po = {x: bb.x, y: bb.y};
		ancho = bb.width;
		alto  = bb.height;
		
		bb_tit = fig[1].getBBox();
		dx_tit = (po.x + ancho/2) - (bb_tit.x + (bb_tit.width/2));
		
		if( ((ancho - dx) > 10) && ((alto - dy) > 10)){
			fig[0].transform("...T" + dx_tit + "," + dy);
			fig[1].transform("...T" + dx_tit + "," + dy);
			
			fig[2].attr('width',  ancho - dx);
			fig[2].attr('height', alto  - dy);
			fig[2].transform("...T" + dx + "," + dy);
			fig[3].transform("...T" + dx + "," + dy);
			fig[4].transform("...T" + 0  + "," + dy);
			fig[6].transform("...T" + dx + "," + 0);
			
			fig[7].transform("...T" + dx_tit + "," + dy);
		}
	};
	fig[4].update = function (dx, dy) {
		var bb, bb_tit, dx_tit, po, ancho, alto;
		
		bb = fig[2].getBBox();
		po = {x: bb.x, y: bb.y};
		ancho = bb.width;
		alto  = bb.height;
		
		bb_tit = fig[1].getBBox();
		dx_tit = (po.x + ancho/2) -
		(bb_tit.x + (bb_tit.width/2));
		
		if( ((ancho + dx) > 10) && ((alto - dy) > 10)){
			fig[0].transform("...T" + dx_tit + "," + dy);
			fig[1].transform("...T" + dx_tit + "," + dy);
			
			fig[2].attr('width',  ancho + dx);
			fig[2].attr('height', alto  - dy);
			fig[2].transform("...T" + 0  + "," + dy);
			fig[3].transform("...T" + 0 + "," + dy);
			fig[4].transform("...T" + dx  + "," + dy);
			fig[5].transform("...T" + dx + "," + 0);
			
			fig[7].transform("...T" + dx_tit + "," + dy);
		}
	};
	fig[5].update = function (dx, dy) {
		var bb, bb_tit, dx_tit, po, ancho, alto;
		
		bb = fig[2].getBBox();
		po = {x: bb.x, y: bb.y};
		ancho = bb.width;
		alto  = bb.height;
		
		bb_tit = fig[1].getBBox();
		dx_tit = (po.x + ancho/2) -
		(bb_tit.x + (bb_tit.width/2));
		
		if( ((ancho + dx) > 10) && ((alto + dy) > 10)){
			fig[0].transform("...T" + dx_tit + "," + 0);
			fig[1].transform("...T" + dx_tit + "," + 0);
			
			fig[2].attr('width',  ancho + dx);
			fig[2].attr('height', alto  + dy);
			fig[2].transform("...T" + 0  + "," + 0);
			fig[4].transform("...T" + dx + "," + 0);
			fig[5].transform("...T" + dx + "," + dy);
			fig[6].transform("...T" + 0  + "," + dy);
			
			fig[7].transform("...T" + dx_tit + "," + 0);
		}
	};
	fig[6].update = function (dx, dy) {
		var bb, bb_tit, dx_tit, po, ancho, alto;
		
		bb = fig[2].getBBox();
		po = {x: bb.x, y: bb.y};
		ancho = bb.width;
		alto  = bb.height;
		
		bb_tit = fig[1].getBBox();
		dx_tit = (po.x + ancho/2) -
		(bb_tit.x + (bb_tit.width/2));
		
		if( ((ancho - dx) > 10) && ((alto + dy) > 10)){
			fig[0].transform("...T" + dx_tit + "," + 0);
			fig[1].transform("...T" + dx_tit + "," + 0);
			
			fig[2].attr('width',  ancho - dx);
			fig[2].attr('height', alto  + dy);
			fig[2].transform("...T" + dx + "," + 0);
			fig[3].transform("...T" + dx + "," + 0);
			fig[5].transform("...T" + 0  + "," + dy);
			fig[6].transform("...T" + dx + "," + dy);
			
			fig[7].transform("...T" + dx_tit + "," + 0);
		}
	};
	
	fig.hover(
		function(){
			fig[7].show();
		},
		function(){
			fig[7].hide();
		}
	);
		
	fig[3].drag(moveFig, inicio, fin);
	fig[4].drag(moveFig, inicio, fin);
	fig[5].drag(moveFig, inicio, fin);
	fig[6].drag(moveFig, inicio, fin);
	
	refFigPadre(fig, padre);
	return fig;
};

function figCopia(ctx, padre, p){
	var fig = ctx.r.set();
	
	fig.p = {x: p.x, y: p.y};
	
	fig.push(
		ctx.r.image('/images/camara_normal.png', 0, 0, 24, 24)
	); 
	fig[0].toFront();
	
	fig.move = function(p){
		this[0].transform("T" + (p.x - 12) + "," + (p.y - 12));
	};
	return fig;
};

function figRelac(ctx, padre, p, attr){
	//Eliminar elemento s[i].remove(), s.exclude(s[i])
	
	var fig = ctx.r.set();
	var atrCurTmp = clonar(atrCur);
	
	fig.estado = 'inicial';
	fig.p = [];
	fig.ori = undefined;
	fig.des = undefined;
	
	atrCurTmp['stroke_width'] = attr.stroke_width || atrCurTmp['stroke_width'];
	
	if(!$.isArray(p)){
		fig.p[0] = p;
		fig.push(
			ctx.r.circle(fig.p[0].x, fig.p[0].y, 4).attr(atrPun)
		);
		
		fig.move = function(p){
			if(this.p.length == 1){
				this[0].attr({'cx': p.x, 'cy': p.y});
			}
			else if(this.p.length == 4){
				var pi    = {x: this.p[0].x, y: this.p[0].y};
				this.p[2] = {x: (p.x + pi.x)/2, y: (p.y + pi.y)/2};
				this.p[3] = {x: p.x, y: p.y};
				
				this[1].modPm(this.p);
				this[2].attr({'cx': p.x, 'cy': p.y});
			}
		};
		fig.actSegPun = function(ctx, pt, alpha){
			this.estado = 'extendido';
			this[0].animate(atrDes, 500, function(){ this.remove()});
			
			var dAx = 75 * Math.cos(alpha), dAy = -75 * Math.sin(alpha);
			this.p[0]={x: pt.x, y: pt.y };
			this.p[1]={x: pt.x + dAx, y: pt.y + dAy};
			this.p[2]={x: pt.x, y: pt.y};
			this.p[3]={x: pt.x, y: pt.y};
			
			var pm = {	x:  this.p[0].x, y:  this.p[0].y, 
						ax: this.p[1].x, ay: this.p[1].y, 
						bx: this.p[2].x, by: this.p[2].y, 
						zx: this.p[3].x, zy: this.p[3].y};
			this.push(
				curva(ctx.r, pm, atrCurTmp),
				ctx.r.circle(this.p[0].x, this.p[0].y, 4).attr(atrPun)
			);
		};
	}
	else{
		fig.estado = 'extendido';
		fig.timer = undefined;
		fig.p = p;
		var pm = {	x:  fig.p[0].x, y:  fig.p[0].y, 
					ax: fig.p[1].x, ay: fig.p[1].y, 
					bx: fig.p[2].x, by: fig.p[2].y, 
					zx: fig.p[3].x, zy: fig.p[3].y };
		fig.push(
			curva(ctx.r, pm, atrCurTmp),
			linCur(ctx.r, pm, atrLin),
			ctx.r.circle(pm.x,  pm.y,  4).attr(atrPun),
			ctx.r.circle(pm.ax, pm.ay, 4).attr(atrPun),
			ctx.r.circle(pm.bx, pm.by, 4).attr(atrPun),
			ctx.r.circle(pm.zx, pm.zy, 4).attr(atrPun)
		);
		
		var bb, pt;
		
		pt = ctx.detPorEnPath(fig[0].pathCurve, 0.5);
		fig.push(
			ctx.r.image('/images/cerrar.png', pt.x - 12, pt.y - 12, 24, 24)
		);
		
		for(var i=2; i<6; i++){
			fig[i].toFront();
		}
		fig[6].hide();
		
		fig[2].attr({cursor: "move"});
		fig[3].attr({cursor: "move"});
		fig[4].attr({cursor: "move"});
		fig[5].attr({cursor: "move"});
		
		fig.ocuCont =  function(){
			fig[1].hide();
			fig[2].hide();
			fig[3].hide();
			fig[4].hide();
			fig[5].hide();
		};
		fig.mosCont = function(){
			fig[1].show();
			fig[2].show();
			fig[3].show();
			fig[4].show();
			fig[5].show();
		};
		fig.act = function(){
			var pt = ctx.detPorEnPath(fig[0].pathCurve, 0.5);
			fig[6].attr('x', pt.x - 12);
			fig[6].attr('y', pt.y - 12);
			fig[6].transform('');
		};
		
		fig[2].update = function (dx, dy) {
			this.transform("...T" + dx + "," + dy);
			
			bb = this.getBBox();
			fig.p[0] = {x: (bb.x + bb.width/2), 
						y: (bb.y + bb.height/2)};
			pt = ctx.detPunEnPath(this.padre.ori.borde, fig.p[0]);
						
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
			fig[0].modPm(fig.p);
			fig[1].modPm(fig.p);
			fig.act();
		};
		fig[4].update = function (dx, dy) {
			this.transform("...T" + dx + "," + dy);
			
			var bb = this.getBBox();
			fig.p[2] = {x: (bb.x + (bb.width)/2), 
						y: (bb.y + (bb.height)/2)};
			fig[0].modPm(fig.p);
			fig[1].modPm(fig.p);
			fig.act();
		};
		fig[5].update = function (dx, dy) {
			this.transform("...T" + dx + "," + dy);
			
			bb = this.getBBox();
			fig.p[3] = {x: (bb.x + (bb.width)/2), 
						y: (bb.y + (bb.height)/2)};
			pt = ctx.detPunEnPath(this.padre.des.borde, fig.p[3]);
						
			this.transform("...T" + (pt.x - fig.p[3].x) + "," + (pt.y - fig.p[3].y));
						
			bb = this.getBBox();
			fig.p[3] = {x: (bb.x + (bb.width)/2), 
						y: (bb.y + (bb.height)/2)};
			fig[4].update(dx, dy);
		};
				
		fig[2].drag(moveFig, inicio, fin);
		fig[3].drag(moveFig, inicio, fin);
		fig[4].drag(moveFig, inicio, fin);
		fig[5].drag(moveFig, inicio, fin);
		fig.hover(
			function(){
				fig[6].show();
				fig.mosCont();
				clearInterval(fig.timer);
			},
			function(){
				fig[6].hide();
				fig.timer = setTimeout(function(){
					fig.ocuCont();
					}, 2000);
			}
		);
	}
	refFigPadre(fig, padre);
	return fig;
};


var Unidad = Class.extend({
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

var EleBase = Unidad.extend({
	init: function(ctx){
		this._super(ctx);
		
		this.defi  = ' ';
		this.unid  = ' ';
		
		this.cone = {};
		this.cone['aceOri'] = true;	// (true || false)
		this.cone['aceDes'] = true;	// (true || false)
		this.cone['canOri'] = 'n';	// ('0' || '1' || 'n')
		this.cone['canDes'] = 'n';	// ('0' || '1' || 'n')
		
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
			var lista 	= obj.lista;
			var listaCop= obj.listCopias;
			var ref   	= obj.ref;
					
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

var Elemento = EleBase.extend({
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

var Sector = Unidad.extend({
	init: function(ctx){
		this._super(ctx);
		
		this.elementos = {};
		this.relaciones = {};
		this.selec = false;
	},
	figura: function(p, tam){
		this.fig = figSecto(this.ctx, this, p, tam, this.titulo);
		this.borde = this.fig.obtBorde();
		for(var i=0; i<3; i++){
			this.fig[i].drag(this.moverFig, this.inicio, this.fin);
		}
		this.fig[2].click(this.controles);
		this.fig[7].click(this.remover);
		this.fig[0].dblclick(this.editorTexto);
		this.visCont(this.selec);
	},
	size: function(){
		var tam = this.fig.obtTam()
		return {	'width':  tam.width,
					'height': tam.height};
	},
	visCont: function(vis){
		this.selec = vis;
		if(this.selec){
			this.fig.mosCont();
		}else{
			this.fig.ocuCont();
		}
	},
	controles: function(e){
		this.padre.visCont(!this.padre.selec);
	},
	editorTexto: function(e){
		this.padre.ctx.agrEditorTexto(this.padre);
	},
	inicio: function(){
		var el = this.padre;
		var elFig = el.fig;
		var listaRel;
		
		elFig.dx = 0;
		elFig.dy = 0;
		
		el.selecElementos();
		
		listaRel = el.relaciones;
		
		for(var i in listaRel){
			if(listaRel[i].origen){
				listaRel[i].rel.fig.dx = 0;
				listaRel[i].rel.fig.dy = 0;
			}
			else if(listaRel[i].destino){
				listaRel[i].rel.fig.dx = 0;
				listaRel[i].rel.fig.dy = 0;
			}
		}
		
		var borde = elFig.obtBorde();
		var pp = el.ctx.r.path(borde).attr(atrBor);
		pp.animate(atrDes, 100, function(){ this.remove()});
	},
	moverFig: function(dx, dy){
		var el = this.padre;
		var elFig = el.fig;		
		var listaEle = el.elementos;
		var listaRel = el.relaciones;
		var pt;
		var dx_fig = dx - elFig.dx;
		var dy_fig = dy - elFig.dy;
		
		for(var i in listaEle){
			listaEle[i].mover(dx_fig, dy_fig);
		}
		for(var i in listaRel){
			if(listaRel[i].origen && listaRel[i].destino){
				listaRel[i].rel.mover(dx_fig, dy_fig);
			}
			if(!(listaRel[i].origen && listaRel[i].destino)){
				if(listaRel[i].origen){
					listaRel[i].rel.transUbiCont({po: {dx: dx, dy: dy}});
				}
				else if(listaRel[i].destino){
					listaRel[i].rel.transUbiCont({pd: {dx: dx, dy: dy}});
				}
			}
		}
		
		elFig.transform("...T" + (dx_fig) + "," + (dy_fig));		
		elFig.dx = dx;
		elFig.dy = dy;
		
	},
	fin: function(){
		var el = this.padre;
		var elFig = el.fig;		
		var listaRel;
		
		elFig.dx = 0;
		elFig.dy = 0;
		
		listaRel = el.relaciones;
		
		for(var i in listaRel){
			if(listaRel[i].origen){
				listaRel[i].rel.fig.dx = 0;
				listaRel[i].rel.fig.dy = 0;
			}
			else if(listaRel[i].destino){
				listaRel[i].rel.fig.dx = 0;
				listaRel[i].rel.fig.dy = 0;
			}
		}
		
		el.borde = elFig.obtBorde();
	},
	selecElementos: function(){
		var area = this.fig.obtArea();
		var lista, existe, relSalOri, relSalDes;
		
		this.elementos = {};
		this.relaciones = {};
		
		for(var l in this.ctx.elementos){
			lista = this.ctx.lista[this.ctx.elementos[l]];
			for(var i in lista){
				existe = this.ctx.existeElSector(area, lista[i]);
				if(existe){
					this.elementos[lista[i].id] = lista[i];
					relSalOri = lista[i].relacSal;
					relSalDes = lista[i].relacIng;
					
					for(var ind in relSalOri){
						if(this.relaciones[relSalOri[ind].id]){
							this.relaciones[relSalOri[ind].id].origen = true;
						}
						else{
							this.relaciones[relSalOri[ind].id] = {'rel': relSalOri[ind], 'origen':true, 'destino': false};
						}
					}
					for(var ind in relSalDes){
						if(this.relaciones[relSalDes[ind].id]){
							this.relaciones[relSalDes[ind].id].destino = true;
						}
						else{
							this.relaciones[relSalDes[ind].id] = {'rel': relSalDes[ind], 'origen': false, 'destino': true};
						}
					}
				}
			}
		}
		lista = this.ctx.lista.copia;
		for(var i in lista){
			existe = this.ctx.existeElSector(area, lista[i]);
			if(existe){
				this.elementos[lista[i].id] = lista[i];
			}
		}
		if(this.ctx.lista.ciclo){
			lista = this.ctx.lista.ciclo;
			for(var i in lista){
				existe = this.ctx.existeElSector(area, lista[i]);
				if(existe){
					this.elementos[lista[i].id] = lista[i];
				}
			}
		}
	},
	remover: function(){
		var obj;
		if(this.tipo == "seinf"){
			obj = this;
		}else if(this.padre){
			obj = this.padre;
		}
		if(obj){
			var lista = obj.lista;
			
			if(lista){
				for(var i in lista){
					if(lista[i].id == obj.id){
						delete(lista[i]);
					}
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

var Relacion = Unidad.extend({
	init: function(ctx){
		this._super(ctx);
		this.ori = undefined;
		this.des = undefined;
		this.selec = false;
	},
	camPt: function(pt){
		var bb;
		if(pt.po){
			this.fig[2].transform("...T" + (pt.po.x - this.fig.p[0].x) +
									 "," + (pt.po.y - this.fig.p[0].y));
			bb = this.fig[2].getBBox();
			this.fig.p[0] ={x: (bb.x + (bb.width)/2), 
							y: (bb.y + (bb.height)/2)};
			
			this.fig[0].modPm(this.fig.p);
			this.fig[1].modPm(this.fig.p);
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
			
			this.fig[0].modPm(this.fig.p);
			this.fig[1].modPm(this.fig.p);
		}
	},
	camTitulo: function(titFrom, titTo){
		this.titulo = this.ctx.titRel(titFrom, titTo);			  
		this.nombre = evo.convTexVar(this.titulo);
		this.ctx.modTitMenu(this);
	},
	obtPtsRel :function(){
		return {po: this.fig.p[0], pd: this.fig.p[3]};
	},
	transUbiCont: function(cont){
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
			
			this.fig[0].modPm(this.fig.p);
			this.fig[1].modPm(this.fig.p);
			
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
							
			this.fig[0].modPm(this.fig.p);
			this.fig[1].modPm(this.fig.p);
			
			
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
		this.fig.act();
	},
	mover: function(dx, dy){
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
		
		this.fig.act();
		
		this.fig[1].modPm(this.fig.p);
		this.fig[0].modPm(this.fig.p);
	},
	visCont: function(vis){
		this.selec = vis;
		if(this.selec){
			this.fig.mosCont();
		}else{
			this.fig.ocuCont();
		}
	},
	controles: function(e){
		this.padre.visCont(!this.padre.selec);
	},
	remover: function(){
		var rel;
		if(this.tipo){
			rel = this;
		}else if(this.padre){
			rel = this.padre;
		}
		if(rel){
			var listaRel  = rel.lista;
			
			rel.ori.elimRelSal(rel);
			rel.des.elimRelIng(rel);
			
			if(listaRel[rel.id]){
				delete(listaRel[rel.id]);
			}	
			
			rel.ctx.eliminarControlesEle(rel);
			var lim = rel.ctx.ajuLimLista(listaRel);
			rel.ctx.ind[rel.tipo] = ++lim;
			
			rel.fig.remove();
			rel.fig = undefined;
			rel = undefined;
		}
	}
});


var Copia = EleBase.extend({
	init: function(ctx, p, el){
		this._super(ctx);
		
		this.tipo = "copia";
		var ind = this.ctx.ind[this.tipo]++;
				
		this.id = 'copia_'+ind;
		
		this.titulo = el.titulo;
		this.nombre = evo.convTexVar(this.titulo);
		this.ref = el;
		el.listCopias[this.id] = this;
		
		this.lista = this.ctx.lista.copia;
		this.cone['aceDes'] = false;
		this.figura(p);
		this.intMenuEle();
	},
	figura: function(p){
		this.fig = this.ref.genFig(this.ctx, this, p, this.titulo, {dasharray_fig: "-", dasharray_rec: "- ", color: "#555", cursor: "move"});
		this.borde = this.fig.obtBorde();
		var cant = this.fig.length-1;
		for(var i=0; i<cant; i++){
			this.fig[i].drag(this.moverFig, this.inicio, this.fin);
		}
		this.fig[cant].click(this.remover);
	}
});

var Secto = Sector.extend({
	init: function(ctx, p, tam, titulo){
		this._super(ctx);
		
		this.tipo = 'se'+ctx.id;
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = this.tipo+'_'+ind;
		this.titulo = titulo || "Sector "+ind;
		this.nombre = evo.convTexVar(this.titulo);
		
		this.lista = this.ctx.lista[this.tipo];
		this.figura(p, tam);
		this.intMenuEle();
	}
});


var Editor = Class.extend({
	init: function(r){
		this.r = r;
		
		this.lista = {};
		this.ind = {};
		this.tmp = {};
		this.rec = {};
		this.elementos = [];
		
		this.iniCapaBase();
		this.estTexto = "titEdit";
		this.margen = 15;
	},
	activarModo: function(modo){
		$('#'+this.modo).removeClass('ui-state-hover');
		$('#'+this.modo).children().css('background-position','0px 0px');

		$('#'+modo).addClass('ui-state-hover');
		$('#'+modo).children().css('background-position','0px 24px');
		
		this.modo = modo;
	},
	iniCapaBase: function(){
		this.capaBase = this.r.rect(0, 0, this.r.width, this.r.height).attr(atrTra);
		this.capaBase.ctx = this;
		/*this.capaBase.click(function(){
			$(this.ctx.svg).focus();
			evo.scrollaDiv($(this.ctx.div));
		});*/
		this.capaBase.update = function(dx, dy){
			this.ctx.movObjs(dx, dy);
			this.ctx.ajuTamPan(dx, dy);
		};
		this.capaBase.inicio = function(){
			this.dx = this.dy = 0;
			this.attr({cursor: "move"});
		};
		this.capaBase.fin = function(){
			this.dx = this.dy = 0;
			this.attr({cursor: ""});
		};
		this.capaBase.drag(moveFig, this.capaBase.inicio, this.capaBase.fin);
	},
	obtPosMouse: function(e){
		var offset    = $(this.svg_div).offset();
		var offsetInf = $(this.div).offset();
		
		return p = {x: e.clientX - offset.left, 
					y: e.clientY - (offset.top - offsetInf.top)};
	},
	obtTamPan: function(){
		return {w: $(this.svg_div).width(), h: $(this.svg_div).height()};
	},
	modTamPan: function(w, h){
		$(this.svg_div).width(w);
		$(this.svg_div).height(h);
		$(this.svg).width(w);
		$(this.svg).height(h);
		this.capaBase.attr({'width': w});
		this.capaBase.attr({'height': h});
	},
	movObjs: function(dx, dy){
		for(var i in this.lista){
			for( var j in this.lista[i]){
				this.lista[i][j].mover(dx, dy);
			}
		}
	},
	ajuTamPan: function(dx, dy){
		var tamPan = this.obtTamPan();
		var sel = this.r.set();
		var bb;
		
		for(var i in this.lista){
			for( var j in this.lista[i]){
				sel.push(this.lista[i][j].fig);
			}
		}
		if(sel.length > 0){
			bb = sel.getBBox();
			
			if((bb.x2 + dx)>(tamPan.w - this.margen)){
				this.modTamPan(bb.x2 + dx + this.margen, tamPan.h);
			}
			else if((bb.x + dx) < this.margen){
				this.modTamPan(tamPan.w + this.margen - (bb.x + dx) , tamPan.h);
				this.movObjs(this.margen - (bb.x + dx), 0);
			}
			if((bb.y2 + dy)>(tamPan.h - this.margen)){
				this.modTamPan(tamPan.w, bb.y2 + dy + this.margen);
			}
			else if((bb.y + dy) < this.margen){
				this.modTamPan(tamPan.w, tamPan.h + this.margen - (bb.y + dy));
				this.movObjs(0, this.margen - (bb.y + dy));
			}	
		}
		sel = undefined;
	},
	existeElPt: function(p){
		var existe = false;	
		for( var l in this.lista){
			for(var e in this.elementos){
				if(l == this.elementos[e]){
					for(var le in this.lista[l]){
						existe = Raphael.isPointInsidePath(this.lista[l][le].borde, p.x, p.y);			
						if(existe){
							return this.lista[l][le];
						}	
					}
				}
			}
		}
		return undefined;
	},
	existeNivelPt: function(p){
		var existe = false;
		if(this.lista.nivel){	
			for( var n in this.lista.nivel){
				existe = Raphael.isPointInsidePath(this.lista.nivel[n].borde, p.x, p.y);			
				if(existe){
					return this.lista.nivel[n];
				}
			}
		}
		return undefined;
	},
	
	existeElSector: function(sector, el){
		var pos = el.pos();
		return Raphael.isPointInsidePath(sector, pos.x, pos.y);
	},
	existeRelSector: function(sector, rel){
		var pos = rel.pos();
		var existeOri = Raphael.isPointInsidePath(sector, pos[0].x, pos[0].y);
		var existeDes = Raphael.isPointInsidePath(sector, pos[3].x, pos[3].y);
		return {'origen': existeOri, 'destino': existeDes};
	},
	agrEditorTexto: function(el){
		var bb = el.fig[1].getBBox();
		$(this.len_div).append(
			"<div id='texteditcont' class='svginput' style='"+
			"left:"+bb.x+"px;"+
			"top:"+bb.y+"px;'>"+
				"<textarea id='"+el.id+"_textedit' rows='1' class='"+this.estTexto+"' style='"+
				"width:"+(bb.width+2)+"px;"+
				"height:"+(bb.height+2)+"px;'>"+
					el.titulo+
				"</textarea>"+
			"</div>"
		);
		$("#"+el.id+"_textedit").focus();
		$("#"+el.id+"_textedit").mouseleave(function(){
			el.camTitulo($(this).val());;
			$("#texteditcont").remove();
		});
		$("#"+el.id+"_textedit").focusout(function() {
			el.camTitulo($(this).val());;
			$("#texteditcont").remove();	
		});
	},
	visAtributosEle: function(el){
		$('#menu-elementos-'+this.id).accordion("option", "active", this.indMenu[el.tipo]);
		$('#'+el.id+'_item_conte').toggle();
	},
	
	ajuLimLista: function(lista){
		var b, val;
		var lim = -1;
		for(var i in lista){
			b = lista[i].id.lastIndexOf('_');
			val = Number(lista[i].id.substr(++b));
			lim = (val > lim) ? val : lim;
		}
		return lim;
	},
	titRel: function(titFrom, titTo){
		var tituloFrom, tituloTo;
		
		if(titFrom.length > 9){
			tituloFrom =titFrom.substr(0,4)+'..'+
						titFrom.substr(-4);
		}
		else{
			tituloFrom = titFrom;
		}
		if(titTo.length > 9){
			tituloTo =	titTo.substr(0,4)+'..'+
						titTo.substr(-4);
		}
		else{
			tituloTo = titTo;
		}
		return tituloFrom+' - '+tituloTo;
	},
	detPunEnPath: function(path, pt){
		var pp = this.r.path(path).attr(atrBor);
		var tl = pp.getTotalLength();
		var pe, dif, id, men;
		var pr = [];
		var r = [];
		
		pr[0]  = 0;
		pr[10] = tl;
		
		for(var i=1; i < 10; i++){
			pr[i] = tl*(i/10)
		}	
		
		dif = pr[10] - pr[0];
		
		while(dif > 2){
			for(var i=0; i<10; i++){
				pe = pp.getPointAtLength((pr[i]+pr[i+1])/2);
				r.push(Math.sqrt(Math.pow(pe.x - pt.x,2)+Math.pow(pe.y - pt.y,2)));
			}
			
			men = Math.min.apply(Math, r);
			
			for(var i=0; i<10; i++){
				if(r[i] == men){
					id = i;
					break;
				}
			}
			pr[0] = pr[id];
			pr[10] = pr[id+1];
			
			for(var i=1; i<10; i++){
				pr[i] = (pr[0] + (pr[10]-pr[0])*(i/10));	
			}			
			dif = pr[10] - pr[0];
			r = [];
		}
		pe = pp.getPointAtLength(pr[5]);
		pp.animate(atrDes, 500, function(){ this.remove()});
		return {x: pe.x, y: pe.y};
	},
	detAngEnPath: function(path, pt){
		var pp = this.r.path(path);
		var tl = pp.getTotalLength();
		var pr = [];
		var pc, ang, cx = 0, cy = 0;
		
		for(var i=0; i < 50; i++){
			pr[i] = tl*(i/50)
			pc = pp.getPointAtLength(pr[i]);
			cx += pc.x;
			cy += pc.y;
		}
		pc = ({x: cx/50, y: cy/50});
		ang = Math.atan2( ( pc.y - pt.y), (pt.x - pc.x) );
		pp.remove();
		return ang;
	},
	detPorEnPath: function(path, porcent){
		var pp = this.r.path(path);
		var pt = pp.getPointAtLength(porcent * pp.getTotalLength())
		pp.remove();
		pp = undefined;
		return pt; 
	}
});

var Evolucion = Class.extend({
	init: function(){
		
		this.cont_actual = 'inicio';
		
		// Vista de Evolución //
		
		this.anchoNav	= $('#nav').width();
		this.anchoTit	= $('#titulo').width();
	
		$(window).resize(function(){
			evo.ajustar();
		});
		$(document).mousedown(function(e){
			if(e.which==2){
				return false;
			}
		});
		$('#nav ul a').click(function(){
			if(evo.cont_actual != 'inicio'){
				$('#enl-'+evo.cont_actual).children().css('background-color', '');
				$('#enl-'+evo.cont_actual).children().css('color', '#DFC395');
			}
			evo.cont_actual = $(this).attr('href').substring(1);
			$('#enl-'+evo.cont_actual).children().css('background-color', '#E45E00');
			$('#enl-'+evo.cont_actual).children().css('color', '#FFF');
			
			require([evo.cont_actual], function() {
            	evo.scrollaDiv($('#'+evo.cont_actual));        
            });
			return false;
		});
		$('#enl-usuario').click(function(){
			$('#login').slideToggle();
			return false;
		});
		$('#logo').click(function(){
			if(evo.cont_actual != 'inicio'){
				$('#enl-'+evo.cont_actual).children().css('background-color', '');
				$('#enl-'+evo.cont_actual).children().css('color', '#DFC395');
			}
			evo.cont_actual = $(this).attr('href').substring(1);
			evo.scrollaDiv($('#'+evo.cont_actual));
			return false;
		});
		$('#titulo').mouseenter(
			function(){
				$('#menu').slideDown()
			}
		);
		$('#menu').mouseleave(
			function(){
				$('#menu').slideUp()
			}			
		);
		$('#encabezado').mouseleave(
			function(){
				$('#menu').slideUp()
			}
		);
		$('#abrir').click(function(e){
			evo.abrir();
			e.preventDefault();
		});
		$('#guardar').click(function(e){
			evo.guardar();
			e.preventDefault();
		});
		$('#descargar').click(function(e){
			
			e.preventDefault();
		});
		$('.cont-lenguaje').hover(
			function(){
				$(this).css('background-color', '#FFF');
			},
			function(){
				$(this).css('background-color', '#EEE');
			}
		);
		$('#inicio').css('padding-top','60px');
		
		// Fin de la Vista de Evolución //
	},
	guardar: function(){
		var root = $('#xmldocument');
		
		var model = $('#xmldocument model:first');
		$(model).attr('id', 1);
		
		if(this.pro){
			this.pro.saveAsDom();
		}
		if(this.inf){
			this.inf.saveAsDom();
		}
		if(this.fyn){
			this.fyn.saveAsDom();
		}
		if(this.ecu){
			this.ecu.saveAsDom();
		}
		if(this.com){
			this.com.saveAsDom();
		}
		
		$.ajax({
			url: '/save',
			type: 'POST',
			//headers: {	'X-CSRF-Token': $("meta[name='csrf-token']").attr('content')},
			//beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'))},
			data: {'model': root.html()},
			success: function(data){
				
			},
			error: function(data){
				
			}		
		});
	},
	simular: function(){
		if(this.fyn){
			this.fyn.saveAsDom();
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
	},
	mensajeInfo: function(text){
		var notice = $("<div id='notice' class='notice'></div>");
    	notice.append("<span class='ui-icon ui-icon-alert' style='float: left;'></span>");
    	notice.append('<p>'+text+'</p>');
    	$('#encabezado').append(notice);
    	notice.slideDown(1000).delay(4000).slideUp(1000, function(){this.remove()});
	},
	mensajeError: function(text){
		
	},
	
	// Vista de Evolución //
	ajustar: function(){
		var anchoWin = $(window).width();
		var altoWin = $(window).height();
		
		$('#inicio').width(anchoWin);
		$('#inicio').height(altoWin);
		$('#prosa').width(anchoWin);
		$('#prosa').height(altoWin);
		$('#influencias').width(anchoWin);
		$('#influencias').height(altoWin);
		$('#flujonivel').width(anchoWin);
		$('#flujonivel').height(altoWin);
		$('#ecuaciones').width(anchoWin);
		$('#ecuaciones').height(altoWin);
		$('#comportamientos').width(anchoWin);
		$('#comportamientos').height(altoWin);
		
		$('.cont-herramientas').width(anchoWin);
		$('.cont-lenguaje').width(anchoWin - 158);
		
		$('#lenguaje-pro').height(altoWin - 55);
		$('#lenguaje-pro').width(anchoWin - 20);
		$('#elementos-inf').height(altoWin - 90);
		$('#lenguaje-inf').height(altoWin - 90);
		$('#elementos-fyn').height(altoWin - 90);
		$('#lenguaje-fyn').height(altoWin - 90);
		$('#elementos-ecu').height(altoWin - 55);
		$('#lenguaje-ecu').height(altoWin - 55);
		$('#elementos-com').height(altoWin - 55);
		$('#lenguaje-com').height(altoWin - 55);
		
		var anchoConEnc = $('#conte-encabezado').width();
		this.anchoNav	= $('#nav').width();
		this.anchoTit	= $('#titulo').width();
		if((this.anchoNav+30) > (anchoConEnc-this.anchoTit)){
			var ancho = (anchoConEnc - this.anchoTit - 100)/5;
			$('#nav .casilla').width(ancho+'px');
		}
		else{
			$('#nav .casilla').width('');
		}
		
		var anchoSvg = $('#svg-inf').width();
		if((anchoWin - 158) > anchoSvg){
			$('#svg-inf').width(anchoWin - 158);
			$('#svg-div-inf').width(anchoWin - 158);
		}
		anchoSvg = $('#svg-fyn').width();
		if((anchoWin - 158) > anchoSvg){
			$('#svg-fyn').width(anchoWin - 158);
			$('#svg-div-fyn').width(anchoWin - 158);
		}
		var altoSvg = $('#svg-inf').height();
		if((altoWin - 90) > altoSvg){
			$('#svg-inf').height(altoWin - 90);
			$('#svg-div-inf').height(altoWin - 90);
		}
		altoSvg = $('#svg-fyn').height();
		if((altoWin - 90) > altoSvg){
			$('#svg-fyn').height(altoWin - 90);
			$('#svg-div-fyn').height(altoWin - 90);
		}
		
		this.scrollaDiv($('#'+this.cont_actual));
	},
	scrollaDiv: function(element){
		var offset = element.offset();
		
		$('body,html').animate({
			scrollTop: offset.top
		}, 200);
	},
	vIE: function(){
		var IE = (navigator.appName=='Microsoft Internet Explorer')?parseFloat((new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})")).exec(navigator.userAgent)[1]):-1;
		if(IE > -1 && IE < 9){
			$('#alerta').css('display', 'block');
		}
	},
	
	// Fin de la Vista de Evolución //
	convTexVar: function(text){
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
});
