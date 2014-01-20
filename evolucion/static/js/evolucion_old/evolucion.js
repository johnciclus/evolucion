var atrFiE = { 'stroke-width': 2.0, 	'stroke': '#555', 'fill': '#fff', 'stroke-linecap': 'round'};
var atrFiA = { 'stroke-width': 2.0, 	'stroke': '#555', 'fill': '#f55', 'stroke-linecap': 'round'};
var atrFiD = { 'stroke-width': 3.0, 	'stroke': '#555', 'fill': '#fff'};

var atrTex = { 'font-size': 12, 'font-family': 'Verdana', 'fill': '#000'};
var atrCon = { 'stroke': '#888', 'stroke-width': 2.5};

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
	});
	return false;
};

function asigModelo(modelo){
	editor.reiniciar();
	
	var ancho_svg, alto_svg;
	var name, title, p, pc, tam, desde, hasta;
	
	$(modelo).find('modelo:first').each(function(){
		ancho_svg = $(this).attr('ancho_svg').replace('px','');
		alto_svg  = $(this).attr('alto_svg').replace('px','');
		ancho_svg = Number(ancho_svg);
		alto_svg = Number(alto_svg);
		editor.modTamPan(ancho_svg, alto_svg);
		
		$(this).find('list_depen:first').each(function(){
			$(this).find('depen').each(function(){
				name = $(this).attr('name');
				title = $(this).attr('title');
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				tam	   = {'ancho': Number($(this).attr('ancho')), 
						  'alto':  Number($(this).attr('alto'))};
				
				var dp = new Depen(editor.r, p, tam, title);
				editor.listDepen.push(dp);
			});
		});
		
		$(this).find('list_activ:first').each(function(){
			$(this).find('activ').each(function(){
				name = $(this).attr('name');
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
				name = $(this).attr('name');
				title = $(this).attr('title');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var ta = new Tabla(editor.r, p, title);
				editor.listTabla.push(ta);
			});
		});
		
		$(this).find('list_u_entr:first').each(function(){
			$(this).find('u_entr').each(function(){
				name = $(this).attr('name');
				title = $(this).attr('title');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var ue = new UEntr(editor.r, p, title);
				editor.listUEntr.push(ue);
			});
		});
		
		$(this).find('list_u_sale:first').each(function(){
			$(this).find('u_sale').each(function(){
				name = $(this).attr('name');
				title = $(this).attr('title');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var us = new USale(editor.r, p, title);
				editor.listUSale.push(us);
			});
		});
		
		$(this).find('list_archi:first').each(function(){
			$(this).find('archi').each(function(){
				name = $(this).attr('name');
				title = $(this).attr('title');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var ar = new Archi(editor.r, p, title);
				editor.listArchi.push(ar);
			});
		});
		
		$(this).find('list_carpe:first').each(function(){
			$(this).find('carpe').each(function(){
				name = $(this).attr('name');
				title = $(this).attr('title');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var ca = new Carpe(editor.r, p, title);
				editor.listCarpe.push(ca);
			});
		});
		
		$(this).find('list_compu:first').each(function(){
			$(this).find('compu').each(function(){
				name = $(this).attr('name');
				title = $(this).attr('title');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var co = new Compu(editor.r, p, title);
				editor.listCompu.push(co);
			});
		});
		
		$(this).find('list_based:first').each(function(){
			$(this).find('based').each(function(){
				name = $(this).attr('name');
				title = $(this).attr('title');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var bd = new BaseD(editor.r, p, title);
				editor.listBaseD.push(bd);
			});
		});
		
		$(this).find('list_actbd:first').each(function(){
			$(this).find('actbd').each(function(){
				name = $(this).attr('name');
				title = $(this).attr('title');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var abd = new ActDB(editor.r, p, title);
				editor.listActDB.push(abd);
			});
		});
		
		$(this).find('list_docum:first').each(function(){
			$(this).find('docum').each(function(){
				name = $(this).attr('name');
				title = $(this).attr('title');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var doc = new Docum(editor.r, p, title);
				editor.listDocum.push(doc);
			});
		});
		
		$(this).find('list_docms:first').each(function(){
			$(this).find('docms').each(function(){
				name = $(this).attr('name');
				title = $(this).attr('title');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var dcs = new Docms(editor.r, p, title);
				editor.listDocms.push(dcs);
			});
		});
		
		$(this).find('list_impre:first').each(function(){
			$(this).find('impre').each(function(){
				name = $(this).attr('name');
				title = $(this).attr('title');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var im = new Impre(editor.r, p, title);
				editor.listImpre.push(im);
			});
		});
		
		$(this).find('list_papel:first').each(function(){
			$(this).find('papel').each(function(){
				name = $(this).attr('name');
				title = $(this).attr('title');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var pp = new Papel(editor.r, p, title);
				editor.listPapel.push(pp);
			});
		});
		
		$(this).find('list_incon:first').each(function(){
			$(this).find('incon').each(function(){
				name = $(this).attr('name');
				title = $(this).attr('title');
				
				p      = {'x': Number($(this).attr('x')),
				          'y': Number($(this).attr('y'))};
				
				var inc = new Incon(editor.r, p, title);
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



function figSecto(ctx, parent, p, tam, title){
	var fig = figure(ctx);
	var pc, bb, po, ancho, alto, medio_x, medio_y;
	var tam_dp = tam || {'ancho': 250, 'alto': 500};
	
	fig.p = {x: p.x, y: p.y};
	fig.push(
		ctx.r.text(fig.p.x, fig.p.y, title).attr(atrTit)
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
		ctx.r.rect(po.x, po.y, ancho, alto, 4).attr(style.rectangle),
		ctx.r.rect(pc.p0x, pc.p0y, tam_dp.ancho, tam_dp.alto, 0).attr(atrCon),
		ctx.r.circle(pc.p0x, pc.p0y, 4).attr(style.point),
		ctx.r.circle(pc.p1x, pc.p1y, 4).attr(style.point),
		ctx.r.circle(pc.p2x, pc.p2y, 4).attr(style.point),
		ctx.r.circle(pc.p3x, pc.p3y, 4).attr(style.point),
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
	
	fig.changeTitle = function(title){
		var bb, pc, po, ancho, alto, medio_x, medio_y;
		
		this[0].attr('text', title);
		
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
	fig.getBorder = function(){
		var bb = this[1].getBBox();
		
		this.border = [["M", bb.x - 2, bb.y -1], 
					  ["H", bb.x2 + 2], 
					  ["V", bb.y2 + 1],
					  ["H", bb.x - 2],
					  ["V", bb.y - 1]];
		return this.border;
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
		
	fig[3].drag(moveFig, start, end);
	fig[4].drag(moveFig, start, end);
	fig[5].drag(moveFig, start, end);
	fig[6].drag(moveFig, start, end);
	
	utils.parentReference(fig, parent);
	return fig;
};

function figCopia(ctx, parent, p){
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

function figRelac(ctx, parent, p, figureStyle){
	
};

var Sector = Unidad.extend({
	init: function(ctx){
		this._super(ctx);
		
		this.elements = {};
		this.relaciones = {};
		this.selected = false;
	},
	figure: function(p, tam){
		this.fig = figSecto(this.ctx, this, p, tam, this.title);
		this.border = this.fig.getBorder();
		for(var i=0; i<3; i++){
			this.fig[i].drag(this.moveFig, this.start, this.end);
		}
		this.fig[2].click(this.controles);
		this.fig[7].click(this.remove);
		this.fig[0].dblclick(this.createTextEditor);
		this.viewControls(this.selected);
	},
	size: function(){
		var tam = this.fig.obtTam()
		return {	'width':  tam.width,
					'height': tam.height};
	},
	viewControls: function(vis){
		this.selected = vis;
		if(this.selected){
			this.fig.mosCont();
		}else{
			this.fig.ocuCont();
		}
	},
	controles: function(e){
		this.parent.viewControls(!this.parent.selected);
	},
	createTextEditor: function(e){
		this.parent.ctx.agrEditorTexto(this.parent);
	},
	start: function(){
		var el = this.parent;
		var elFig = el.fig;
		var listRel;
		
		elFig.dx = 0;
		elFig.dy = 0;
		
		el.selecElementos();
		
		listRel = el.relaciones;
		
		for(var i in listRel){
			if(listRel[i].origen){
				listRel[i].rel.fig.dx = 0;
				listRel[i].rel.fig.dy = 0;
			}
			else if(listRel[i].destino){
				listRel[i].rel.fig.dx = 0;
				listRel[i].rel.fig.dy = 0;
			}
		}
		
		var border = elFig.getBorder();
		var pp = el.ctx.r.path(border).attr(style.border);
		pp.animate(style.border_dis, 100, function(){ this.remove()});
	},
	moveFig: function(dx, dy){
		var el = this.parent;
		var elFig = el.fig;		
		var listEle = el.elements;
		var listRel = el.relaciones;
		var pt;
		var dx_fig = dx - elFig.dx;
		var dy_fig = dy - elFig.dy;
		
		for(var i in listEle){
			listEle[i].mover(dx_fig, dy_fig);
		}
		for(var i in listRel){
			if(listRel[i].origen && listRel[i].destino){
				listRel[i].rel.mover(dx_fig, dy_fig);
			}
			if(!(listRel[i].origen && listRel[i].destino)){
				if(listRel[i].origen){
					listRel[i].rel.controlMove({po: {dx: dx, dy: dy}});
				}
				else if(listRel[i].destino){
					listRel[i].rel.controlMove({pd: {dx: dx, dy: dy}});
				}
			}
		}
		
		elFig.transform("...T" + (dx_fig) + "," + (dy_fig));		
		elFig.dx = dx;
		elFig.dy = dy;
		
	},
	end: function(){
		var el = this.parent;
		var elFig = el.fig;		
		var listRel;
		
		elFig.dx = 0;
		elFig.dy = 0;
		
		listRel = el.relaciones;
		
		for(var i in listRel){
			if(listRel[i].origen){
				listRel[i].rel.fig.dx = 0;
				listRel[i].rel.fig.dy = 0;
			}
			else if(listRel[i].destino){
				listRel[i].rel.fig.dx = 0;
				listRel[i].rel.fig.dy = 0;
			}
		}
		
		el.border = elFig.getBorder();
	},
	selecElementos: function(){
		var area = this.fig.obtArea();
		var list, existe, relSalOri, relSalDes;
		
		this.elements = {};
		this.relaciones = {};
		
		for(var l in this.ctx.elements){
			list = this.ctx.list[this.ctx.elements[l]];
			for(var i in list){
				existe = this.ctx.existeElSector(area, list[i]);
				if(existe){
					this.elements[list[i].id] = list[i];
					relSalOri = list[i].relacSal;
					relSalDes = list[i].relacIng;
					
					for(var idx in relSalOri){
						if(this.relaciones[relSalOri[idx].id]){
							this.relaciones[relSalOri[idx].id].origen = true;
						}
						else{
							this.relaciones[relSalOri[idx].id] = {'rel': relSalOri[idx], 'origen':true, 'destino': false};
						}
					}
					for(var idx in relSalDes){
						if(this.relaciones[relSalDes[idx].id]){
							this.relaciones[relSalDes[idx].id].destino = true;
						}
						else{
							this.relaciones[relSalDes[idx].id] = {'rel': relSalDes[ind], 'origen': false, 'destino': true};
						}
					}
				}
			}
		}
		list = this.ctx.list.clone;
		for(var i in list){
			existe = this.ctx.existeElSector(area, list[i]);
			if(existe){
				this.elements[list[i].id] = list[i];
			}
		}
		if(this.ctx.list.cycle){
			list = this.ctx.list.cycle;
			for(var i in list){
				existe = this.ctx.existeElSector(area, list[i]);
				if(existe){
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
			
			obj.ctx.eliminarControlesEle(obj);
			var limit = obj.ctx.ajuLimLista(list);
			obj.ctx.idx[obj.type] = ++limit;
			
			obj.fig.remove();
			obj.fig = undefined;
			obj = undefined;
		}
	}
});

var Copia = EleBase.extend({
	init: function(ctx, p, el){
		this._super(ctx);
		
		this.type = "clone";
		var idx = this.ctx.idx[this.type]++;
				
		this.id = 'copia_'+idx;
		
		this.title = el.title;
		this.name = utils.textToVar(this.title);
		this.ref = el;
		el.listCopias[this.id] = this;
		
		this.list = this.ctx.list.clone;
		this.cone['desAce'] = false;
		this.figure(p);
		this.integrateCtx();
	},
	figure: function(p){
		this.fig = this.ref.genFig(this.ctx, this, p, this.title, {dasharray_fig: "-", dasharray_rec: "- ", color: "#555", cursor: "move"});
		this.border = this.fig.getBorder();
		var cant = this.fig.length-1;
		for(var i=0; i<cant; i++){
			this.fig[i].drag(this.moveFig, this.start, this.end);
		}
		this.fig[cant].click(this.remove);
	}
});

var Secto = Sector.extend({
	init: function(ctx, p, tam, title){
		this._super(ctx);
		
		this.type = 'se'+ctx.id;
		var idx = this.ctx.idx[this.type]++;
		
		this.id = this.type+'_'+idx;
		this.title = title || "Sector "+idx;
		this.name = utils.textToVar(this.title);
		
		this.list = this.ctx.list[this.type];
		this.figure(p, tam);
		this.integrateCtx();
	}
});


var Editor = Class.extend({
	init: function(r){
		this.estTexto = "titEdit";
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
	
	visAtributosEle: function(el){
		$('#menu-elementos-'+this.id).accordion("option", "active", this.indMenu[el.type]);
		$('#'+el.id+'_item_conte').toggle();
	}	
});

var Evolucion = Class.extend({
	init: function(){
				
		require([evo.cont_actual], function() {
    	evo.scrollaDiv($('#'+evo.cont_actual));        
    });
	},
		
});
