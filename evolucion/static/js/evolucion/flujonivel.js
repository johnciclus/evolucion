var fyn;

function parametro(r, pc, estilo){
	var fig = r.set();
	var atrFiETmp = clonar(atrFiE);
	
	atrFiETmp['stroke-dasharray'] = estilo.dasharray_fig;
	
	fig.push(r.rect(pc.x - 15, pc.y - 1, 30, 2, 1).attr(atrFiETmp),
			 r.circle(pc.x, pc.y, 7).attr(atrFiETmp));
    return fig;
};

function nivel(r, pc, estilo){
	var fig = r.set();
	var atrFiETmp = clonar(atrFiE);
	
	atrFiETmp['stroke-dasharray'] = estilo.dasharray_fig;
	
	fig.push(r.rect(pc.x - 14, pc.y - 14, 28, 28, 1).attr(atrFiETmp));
    return fig;
};

function flujo(r, pc, estilo){
	var fig = r.set();
	var ang = 0;
	var p0 = {x: pc.x + 30 - 12*Math.cos(ang + Math.PI/8), y: pc.y - 11 + 12*Math.sin(ang + Math.PI/8)};
	var p1 = {x: pc.x + 30 - 12*Math.cos(ang - Math.PI/8), y: pc.y - 11 + 12*Math.sin(ang - Math.PI/8)};
	var atrFiETmp = clonar(atrFiE);
	
	atrFiETmp['stroke-dasharray'] = estilo.dasharray_fig;
	
	fig.pathT = [
            ["M", pc.x, pc.y - 8],
            ["V", pc.y - 15],
            ["M", pc.x - 5, pc.y - 15],
            ["H", pc.x + 5]
        ];
    fig.pathLinI = [
            ["M", pc.x - 30, pc.y - 11],
            ["H", pc.x + 15]
        ];
    fig.pathLinD = [
            ["M", pc.x + 15, pc.y - 11],
            ["H", pc.x + 30]
        ];
    fig.pathFlecha = [
    		["M", pc.x + 30, pc.y - 11], 
    		["L", p0.x, p0.y], 
    		["L", p1.x, p1.y], 
    		["Z"]
    	];
    fig.pathNubI = [
            ["M", pc.x - 30, pc.y - 11],
            ["A", 6, 6, pc.x - 30, 1, 0, pc.x - 40, pc.y - 21],
            ["A", 6, 6, pc.x - 40, 1, 0, pc.x - 50, pc.y - 11],
            ["A", 6, 6, pc.x - 50, 1, 0, pc.x - 40, pc.y - 1],
            ["A", 6, 6, pc.x - 40, 1, 0, pc.x - 30, pc.y - 11]
        ];
    fig.pathNubD = [
            ["M", pc.x + 30, pc.y - 11],
            ["A", 6, 6, pc.x + 30, 1, 1, pc.x + 40, pc.y - 21],
            ["A", 6, 6, pc.x + 40, 1, 1, pc.x + 50, pc.y - 11],
            ["A", 6, 6, pc.x + 50, 1, 1, pc.x + 40, pc.y - 1],
            ["A", 6, 6, pc.x + 40, 1, 1, pc.x + 30, pc.y - 11]
        ];  
    
	fig.push(r.circle(pc.x, pc.y + 2, 10).attr(atrFiETmp),
			 r.path(fig.pathT).attr(atrFiETmp),
			 r.path(fig.pathLinI).attr(atrFiD),
			 r.path(fig.pathLinD).attr(atrFiD),
			 r.path(fig.pathFlecha).attr(atrFig),
			 r.path(fig.pathNubI).attr(atrFiETmp),
			 r.path(fig.pathNubD).attr(atrFiETmp),
			 r.circle(pc.x - 30, pc.y - 11, 4).attr(atrPun),
			 r.circle(pc.x + 30, pc.y - 11, 4).attr(atrPun));
			 
	fig[7].toFront();    	
	fig[8].toFront();
	fig[7].attr({cursor: "move"});    	
	fig[8].attr({cursor: "move"});
    return fig;
};

function varAuxiliar(r, pc, estilo){
	var fig = r.set();
	var atrFiETmp = clonar(atrFiE);
	
	atrFiETmp['stroke-dasharray'] = estilo.dasharray_fig;
	
	fig.push(r.circle(pc.x, pc.y, 12).attr(atrFiETmp));
    return fig;
};

function varExogena(r, pc, estilo){
	var fig = r.set();
	var atrFiETmp = clonar(atrFiE);
	
	atrFiETmp['stroke-dasharray'] = estilo.dasharray_fig;
	
	fig.push(r.circle(pc.x, pc.y, 12).attr(atrFiETmp),
			 r.circle(pc.x, pc.y, 7).attr(atrFiETmp));
    return fig;
};

function retardo(r, pc, estilo){
	var fig = r.set();
	var atrFiETmp = clonar(atrFiE);
	
	atrFiETmp['stroke-dasharray'] = estilo.dasharray_fig;
	
	fig.push(r.rect(pc.x - 15, pc.y - 15, 30, 30, 1).attr(atrFiETmp),
			 r.rect(pc.x - 15, pc.y, 10, 15, 1).attr(atrFiETmp),
			 r.rect(pc.x -  5, pc.y, 10, 15, 1).attr(atrFiETmp),
			 r.rect(pc.x +  5, pc.y, 10, 15, 1).attr(atrFiETmp));
    return fig;
};

function multiplicador(r, pc, estilo){
	var fig = r.set();
	var atrFiETmp = clonar(atrFiE);
	
	atrFiETmp['stroke-dasharray'] = estilo.dasharray_fig;
	
	fig.pathMarco = [
            ["M", pc.x - 10, pc.y - 10],
            ["V", pc.y + 10 ],
            ["H", pc.x + 10]
        ];
	fig.pathCurva = [
            ["M", pc.x - 10, pc.y ],
            ["L", pc.x - 5,  pc.y + 5],
            ["L", pc.x ,     pc.y - 5],
            ["L", pc.x + 5,  pc.y ],
            ["L", pc.x + 10, pc.y - 10]
        ];
        
	fig.push(r.rect(pc.x - 15, pc.y - 15, 30, 30, 1).attr(atrFiETmp),
			 r.path(fig.pathMarco).attr(atrFiETmp),
			 r.path(fig.pathCurva).attr(atrFiETmp));
    return fig;
};

function elfis(r, pc, estilo){
	var fig = r.set();
	var atrFiETmp = clonar(atrFiE);
	
	atrFiETmp['stroke-dasharray'] = estilo.dasharray_fig;
	
	fig.pathLin = [
            ["M", pc.x - 15, pc.y ],
            ["L", pc.x - 10, pc.y ],
            ["L", pc.x ,     pc.y + 14],
            ["L", pc.x + 10, pc.y ],
            ["L", pc.x + 15, pc.y ],
            ["M", pc.x - 15, pc.y + 14 ],
            ["L", pc.x - 10, pc.y + 14],
            ["L", pc.x ,     pc.y ],
            ["L", pc.x + 10, pc.y + 14],
            ["L", pc.x + 15, pc.y + 14]
        ];
        
	fig.push(r.rect(pc.x - 15, pc.y - 15, 30, 30, 1).attr(atrFiETmp),
			 r.path(fig.pathLin).attr(atrFiETmp));
    return fig;
};

function valAnterior(r, pc, estilo){
	var fig = r.set();
	var atrFiETmp = clonar(atrFiE);
	
	atrFiETmp['stroke-dasharray'] = estilo.dasharray_fig;
	
	fig.pathRom = [
            ["M", pc.x     , pc.y - 12],
            ["L", pc.x + 12, pc.y ],
           	["L", pc.x     , pc.y + 12],
           	["L", pc.x - 12, pc.y ],
           	["Z"]
        ];
	fig.pathLin = [
            ["M", pc.x - 12, pc.y ],
            ["L", pc.x + 12, pc.y ],
            ["M", pc.x     , pc.y ],
            ["L", pc.x     , pc.y + 12],
        ];
        
	fig.push(r.path(fig.pathRom).attr(atrFiETmp),
			 r.path(fig.pathLin).attr(atrFiETmp));
    return fig;
};

function subModelo(r, pc, estilo){
	var fig = r.set();
	var atrFiETmp = clonar(atrFiE);
	
	atrFiETmp['stroke-dasharray'] = estilo.dasharray_fig;
	
	fig.pathLin = [
            ["M", pc.x - 2 , pc.y - 7],
            ["H", pc.x - 10],
            ["V", pc.y + 3],
           	["H", pc.x + 5],
           	["M", pc.x - 4, pc.y ],
            ["L", pc.x    , pc.y ],
            ["M", pc.x - 2, pc.y ],
            ["L", pc.x - 2, pc.y + 9],
        ];
        
	fig.push(r.rect(pc.x - 15, pc.y - 15, 30, 30, 1).attr(atrFiETmp),
			 r.path(fig.pathLin).attr(atrFiETmp),
			 r.rect(pc.x - 2, pc.y - 10, 7, 7, 1).attr(atrFiETmp),
			 r.rect(pc.x + 5, pc.y, 7, 7, 1).attr(atrFiETmp),
			 r.circle(pc.x - 2, pc.y + 9, 3).attr(atrFiETmp)
			 );
    return fig;
};


function figFyN(ctx, padre, func, p, titulo, estilo){
	var bb, po, ancho, alto, tamEl;
	var fig = figura(ctx);
	var atrTexTmp = clonar(atrTex);
	var atrRectTmp = clonar(atrRec);
	
	atrTexTmp['fill'] = estilo.color || atrTex['fill']; 
	atrRectTmp['stroke-dasharray'] = estilo.dasharray_rec || atrRec['stroke-dasharray'];
	
	fig.p = {x: p.x, y: p.y};
	fig.push(
		ctx.r.text(fig.p.x, fig.p.y, titulo).attr(atrTexTmp)
	);
	
	bb = fig[0].getBBox();
	po = {x: bb.x - 2, y: bb.y -1};
	ancho = bb.width + 4;
	alto = bb.height + 2;
	tamEl = 30;
	
	fig.push(
		ctx.r.rect(po.x, po.y, ancho, alto, 4).attr(atrRectTmp),
		func(ctx.r, {'x': po.x + ancho/2, 'y': po.y - tamEl/2}, estilo),
		ctx.r.image('/images/cerrar.png', po.x + ancho - 12, po.y - 12, 24, 24)
	);
	
	fig[1].toFront();
	fig[0].toFront();
	fig[3].toFront();
	fig[3].hide();
	
	if(estilo.cursor){
		for(var i=0; i<3; i++){
			fig[i].attr({ 'cursor': estilo.cursor});
		};
	}
	
	fig.camTit = function(titulo){
		var bb, lim, po, ancho, alto, tamEl;
		
		bb = fig[0].getBBox();
		lim = bb.y;
		
		this[0].attr('text', titulo);
		
		bb = fig[0].getBBox();
		po = {x: bb.x - 2, y: bb.y -1};
		ancho = bb.width + 4;
		alto = bb.height + 2;
		tamEl = 30;
		
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
	
	fig.obtBorde = function(){
		var bb, po, ancho, alto, tamEl;
		var arc;
		
		bb = fig[0].getBBox();
		po = {x: bb.x - 2, y: bb.y -1};
		ancho = bb.width + 4;
		alto = bb.height + 2;
		tamEl = 30;
		
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

function figParam(ctx, padre, p, titulo, estilo){
	return figFyN(ctx, padre, parametro, p, titulo, estilo);
};

function figNivel(ctx, padre, p, titulo, estilo){
	return figFyN(ctx, padre, nivel, p, titulo, estilo);
};

function figFlujo(ctx, padre, p, titulo, estilo){
	var fig = figFyN(ctx, padre, flujo, p, titulo, estilo);
	
	fig.timer = undefined;
	fig.obtBorde = function(){
		var bb, po, ancho, alto;
		
		bb = fig[0].getBBox();
		po = {x: bb.x - 2, y: bb.y -1};
		ancho = bb.width + 4;
		alto = bb.height + 2;
		
		this.borde 	  = [["M", po.x, po.y], 
						 ["H", po.x + ancho],
						 ["V", po.y + alto], 
						 ["H", po.x], 
						 ["V", po.y]];
		return this.borde;
	};
	fig.mosCont = function(){
		this[2][7].show();
		this[2][8].show();
	};
	fig.ocuCont = function(){
		this[2][7].hide();
		this[2][8].hide();
	};
	fig.detAli = function(po, pd){
		var tipo, ang, tol = 2;
		/*	Identificadores tipo flecha:
		 * 	V: vertical   -> (U: arriba, D: abajo)
		 * 	H: horizontal -> (L: izquieda, R: derecha)
		 *  N: ninguno
		 */
		ang = Math.atan2( ( po.y - pd.y), (pd.x - po.x) );
		if(pd.x - po.x > tol){
			if(pd.y - po.y > tol){
				if(ang > (-1/4)*Math.PI){
					tipo = 'HRVD';
					ang = (-1/2)*Math.PI;
				}
				else{
					tipo = 'VDHR';
					ang = 0;
				}
			}
			else if(pd.y - po.y < -1*tol){
				if(ang > (1/4)*Math.PI){
					tipo = 'VUHR';
					ang = 0;
				}
				else{
					tipo = 'HRVU';
					ang = (1/2)*Math.PI;
				}
			}
			else{
				tipo = 'HR';
				ang = 0;
			}
		}
		else if(pd.x - po.x < -1*tol){
			if(pd.y - po.y > tol){
				if(ang > (-3/4)*Math.PI){
					tipo = 'VDHL';
					ang = Math.PI;
				}
				else{
					tipo = 'HLVD';
					ang = (-1/2)*Math.PI;
				}
			}
			else if(pd.y - po.y < -1*tol){
				if(ang > (3/4)*Math.PI){
					tipo = 'HLVU';
					ang = (1/2)*Math.PI;
				}
				else{
					tipo = 'VUHL';
					ang = Math.PI;
				}
			}
			else{
				tipo = 'HL';
				ang = Math.PI;
			}
		}
		else{
			if(pd.y > po.y){
				tipo = 'VD';
				ang = (-1/2)*Math.PI;
			}
			else if(pd.y < po.y){
				tipo = 'VU';
				ang = (1/2)*Math.PI;
			}
			else{
				tipo = 'N';
				ang = 0;
			}
		}
		
		var res = {'tipo': tipo, 'ang': ang};
		return res;
	};
	fig.act = function(){
		var bb, po, pd, pc, pe, p0, p1, pt;
		var dx, dy, dx_nub_Ori = 0, dy_nub_Ori = 0, dx_nub_Des = 0, dy_nub_Des = 0;
		var ancho_tex = 0, alto_tex = 0;
		var ali, ang, ang_fin, sin_ang, cos_ang; 
		var el = this.padre;
		var elFig = el.fig;	
		
		bb = fig[2][0].getBBox();
		pc = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
		bb = fig[2][7].getBBox();
		po = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
		bb = fig[2][8].getBBox();
		pd = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
		
		ali = fig.detAli(po, pd);
		
		sin_ang = roundDec(Math.sin(ali.ang),4);
		cos_ang = roundDec(Math.cos(ali.ang),4);
		
		switch(ali.tipo[1]){
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
		
		if(ali.tipo.length <= 2){
			if(ali.tipo[0] == 'H'){
				pe = {x: pd.x, 	y: po.y};
				pc = {x: (po.x + pe.x)/2,  y: po.y + 11};
			}
			else if(ali.tipo[0] == 'V'){
				pe = {x: po.x, 	y: pd.y};
				pc = {x: po.x + 11*sin_ang,  y: (po.y + pe.y)/2};
			}
			else{
				pe = {x: pd.x, 	y: pd.y};
				pc = {x: po.x,  y: po.y};
			}
			ang_fin = sin_ang*(-90);
			
			var tmp = sin_ang;
			sin_ang = Math.abs(cos_ang);
			cos_ang = tmp;
		}
		else if(ali.tipo.length == 4){
			if(ali.tipo[0] == 'H'){
				pe = {x: pd.x, 	y: po.y};
				pc = {x: (po.x + pe.x)/2,  y: po.y + 11*sin_ang};
			}
			else if(ali.tipo[0] == 'V'){
				pe = {x: po.x, 	y: pd.y};
				pc = {x: po.x + 11*cos_ang,  y: (po.y + pe.y)/2};
			}
			else{
				pe = {x: pd.x, 	y: pd.y};
				pc = {x: po.x,  y: po.y};
			}
			
			switch(ali.tipo[3]){
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
		pt = {	x: pc.x - (bb.x + bb.width/2),  
				y: pc.y + 16*sin_ang - alto_tex - bb.y};
		fig[0].transform("...T" + pt.x + "," + pt.y);
		
		bb = fig[1].getBBox();
		pt = {	x: pc.x - (bb.x + bb.width/2),
				y: pc.y + 15*sin_ang - alto_tex - bb.y};
		fig[1].transform("...T" + pt.x + "," + pt.y);
		
		bb = fig[2][0].getBBox();
		pt = {	x: pc.x + 2*cos_ang - (bb.x + bb.width/2),  
				y: pc.y + 2*sin_ang - (bb.y + bb.height/2)};
		fig[2][0].transform("...T" + pt.x + "," + pt.y);
		
		bb = fig[2][1].getBBox();
		pt = {	x: pc.x - 11.5*cos_ang - (bb.x + bb.width/2),  
				y: pc.y - 11.5*sin_ang - (bb.y + bb.height/2)};
		fig[2][1].transform("...T" + pt.x + "," + pt.y);
		
		p0 = {x: pd.x - 12*Math.cos(ali.ang + Math.PI/8), y: pd.y + 12*Math.sin(ali.ang + Math.PI/8)};
		p1 = {x: pd.x - 12*Math.cos(ali.ang - Math.PI/8), y: pd.y + 12*Math.sin(ali.ang - Math.PI/8)};
		
		fig[2].pathLinI = [
			["M", po.x, po.y],
			["L", pe.x, pe.y]
		];
		fig[2].pathLinD = [
			["M", pe.x, pe.y],
			["L", pd.x, pd.y]
		];
		fig[2].pathFlecha = [
			["M", pd.x, pd.y], 
			["L", p0.x, p0.y], 
			["L", p1.x, p1.y], 
			["Z"]
		];
		
		fig[2][2].attr({path: (fig[2].pathLinI)});
		fig[2][2].transform('');
		fig[2][3].attr({path: (fig[2].pathLinD)});
		fig[2][3].transform('');
		fig[2][4].attr({path: (fig[2].pathFlecha)});
		fig[2][4].transform('');
		
		bb = fig[2][5].getBBox();
		pt = {	x: po.x + dx_nub_Ori - (bb.x + bb.width/2),
				y: po.y + dy_nub_Ori - (bb.y + bb.height/2)};
		fig[2][5].transform("...T" + pt.x + "," + pt.y);
		
		bb = fig[2][6].getBBox();
		pt = {	x: pd.x + dx_nub_Des - (bb.x + bb.width/2),  
				y: pd.y + dy_nub_Des - (bb.y + bb.height/2)};
		fig[2][6].transform("...T" + pt.x + "," + pt.y);
		
		bb = fig[3].getBBox();
		pt = {	x: pc.x + ancho_tex/2 - (bb.x + bb.width/2),  
				y: pc.y + 15*sin_ang - 12 - alto_tex - bb.y};
		fig[3].transform("...T" + pt.x + "," + pt.y);	
					
		fig.padre.borde = fig.obtBorde();
	};
	fig.conNivelOri = function(nivel){
		var el = fig.padre;
		nivel.agreFluSal(el);
		el.nivelOri = nivel;
		fig[2][7].update(0, 0);
		fig[2][5].hide();
	};
	fig.conNivelDes = function(nivel){
		var el = fig.padre;
		nivel.agreFluIng(el);
		el.nivelDes = nivel;
		fig[2][8].update(0, 0);
		fig[2][6].hide();
	};
	fig.desNivelOri = function(){
		var el = fig.padre;
		
		if(el.nivelOri){
			el.nivelOri.elimFluSal(el);
			el.nivelOri = undefined;
			fig[2][5].show();
		}
	};
	fig.desNivelDes = function(){
		var el = fig.padre;
		
		if(el.nivelDes){
			el.nivelDes.elimFluIng(el);
			el.nivelDes = undefined;
			fig[2][6].show();
		}
	};
	fig[2][7].update = function (dx, dy){
		var bb, po, podx, pt;
		var el = fig.padre;
		
		if(el.nivelOri){
			bb = fig[2][7].getBBox();
			po = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
			podx = {x: po.x + dx, y: po.y + dy};
			pt = el.ctx.detPunEnPath(el.nivelOri.borde, podx);
			
			fig[2][7].transform("...T"+(pt.x-po.x)+","+(pt.y-po.y));	
		}
		else{
			fig[2][7].transform("...T" + dx + "," + dy);
		}
		fig.act();
	};
	fig[2][8].update = function (dx, dy){
		var bb, pd, pddx, pt;
		var el = fig.padre;
		
		if(el.nivelDes){
			bb = fig[2][8].getBBox();
			pd = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
			pddx = {x: pd.x + dx, y: pd.y + dy};
			pt = el.ctx.detPunEnPath(el.nivelDes.borde, pddx);
			
			fig[2][8].transform("...T"+(pt.x-pd.x)+","+(pt.y-pd.y));	
		}
		else{
			fig[2][8].transform("...T" + dx + "," + dy);
		}
		fig.act();
	};
	fig.hover(
		function(){
			fig.mosCont();
			clearInterval(fig.timer);
		},
		function(){
			fig.timer = setTimeout(function(){
				fig.ocuCont();
				}, 2000);
		}
	);
	
	return fig;
};

function figVaAux(ctx, padre, p, titulo, estilo){
	return figFyN(ctx, padre, varAuxiliar, p, titulo, estilo);
};

function figVaExo(ctx, padre, p, titulo, estilo){
	return figFyN(ctx, padre, varExogena, p, titulo, estilo);
};

function figRetar(ctx, padre, p, titulo, estilo){
	return figFyN(ctx, padre, retardo, p, titulo, estilo);
};

function figMulti(ctx, padre, p, titulo, estilo){
	return figFyN(ctx, padre, multiplicador, p, titulo, estilo);
};

function figElFis(ctx, padre, p, titulo, estilo){
	return figFyN(ctx, padre, elfis, p, titulo, estilo);
};

function figVaAnt(ctx, padre, p, titulo, estilo){
	return figFyN(ctx, padre, valAnterior, p, titulo, estilo);
};

function figVaAnt(ctx, padre, p, titulo, estilo){
	return figFyN(ctx, padre, valAnterior, p, titulo, estilo);
};

function figSubmo(ctx, padre, p, titulo, estilo){
	return figFyN(ctx, padre, subModelo, p, titulo, estilo);
}; 


var Param = Elemento.extend({
	init: function(ctx, p, titu){
		this._super(ctx);
		
		this.tipo = "param";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "param_"+ind;
		this.titulo = titu || "Parametro "+ind;
		this.nombre = evo.convTexVar(this.titulo);
		this.defi = " ";
		this.unid = "Adimensional";
		
		this.lista = this.ctx.lista.param;
		this.cone['aceDes'] = false;
		
		this.genFig = figParam;
		this.figura(p);
		this.intMenuEle();
	}
});

var Nivel = Elemento.extend({
	init: function(ctx, p, titu){
		this._super(ctx);
		
		this.tipo = "nivel";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "nivel_"+ind;
		this.titulo = titu || "Nivel "+ind;
		this.nombre = evo.convTexVar(this.titulo);
		this.defi = " ";
		this.unid = "Adimensional";
		
		this.lista = this.ctx.lista.nivel;
		
		this.flujoIng = {};
		this.flujoSal = {};
		
		this.cantFluIng = 0;
		this.cantFluSal = 0;
		
		this.genFig = figNivel;
		this.figura(p);
		this.intMenuEle();
	},
	agreFluIng: function(flu){
		if(!this.flujoIng[flu.id]){
			this.flujoIng[flu.id] = flu;
			this.cantFluIng++;
		}
	},
	agreFluSal: function(flu){
		if(!this.flujoSal[flu.id]){
			this.flujoSal[flu.id] = flu;
			this.cantFluSal++;
		}
	},
	elimFluIng: function(flu){
		if(this.flujoIng[flu.id]){
			delete(this.flujoIng[flu.id]);
			this.cantFluIng--;
		}
	},
	elimFluSal: function(flu){
		if(this.flujoSal[flu.id]){
			delete(this.flujoSal[flu.id]);
			this.cantFluSal--;
		}
	},
	inicio: function(){
		var el = this.padre;
		var elFig = el.fig;
		
		elFig.dx = 0;
		elFig.dy = 0;
		
		for(var rel in el.relacIng){
			el.relacIng[rel].fig.dx = 0;
			el.relacIng[rel].fig.dy = 0;
		}
		for(var rel in el.relacSal){
			el.relacSal[rel].fig.dx = 0;
			el.relacSal[rel].fig.dy = 0;
		}
		for(var f in el.flujoIng){
			el.flujoIng[f].inicio();
		}
		for(var f in el.flujoSal){
			el.flujoSal[f].inicio();
		}
		
		var borde = elFig.obtBorde();
		var pp = el.ctx.r.path(borde).attr(atrBor);
		pp.animate(atrDes, 100, function(){ this.remove()});
		pp = undefined;
	},
	moverFig: function(dx, dy){
		var el = this.padre;
		var elFig = el.fig;
		var dx_fig = dx - elFig.dx;
		var dy_fig = dy - elFig.dy;
		
		elFig.transform("...T" + dx_fig + "," + dy_fig);
		el.borde = elFig.obtBorde();

		for(var rel in el.relacIng){
			el.relacIng[rel].transUbiCont({pd: {dx: dx, dy: dy}});
		}
		for(var rel in el.relacSal){
				el.relacSal[rel].transUbiCont({po: {dx: dx, dy: dy}});
		}
		for(var f in el.flujoIng){
			el.flujoIng[f].moverConDes(dx_fig, dy_fig);
		}
		for(var f in el.flujoSal){
			el.flujoSal[f].moverConOri(dx_fig, dy_fig);
		}
		
		elFig.dx = dx;
		elFig.dy = dy;
		
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
		for(var f in el.flujoIng){
			el.flujoIng[f].fin();
		}
		for(var f in el.flujoSal){
			el.flujoSal[f].fin();
		}
		el.borde = elFig.obtBorde();
	}
});

var Flujo = Elemento.extend({
	init: function(ctx, p, titu){
		this._super(ctx);
		
		this.tipo = "flujo";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "flujo_"+ind;
		this.titulo = titu || "Flujo "+ind;
		this.nombre = evo.convTexVar(this.titulo);
		this.defi = " ";
		this.unid = "Adimensional";
		this.selec = false;
		
		this.lista = this.ctx.lista.flujo;
		
		this.nivelOri = undefined;
		this.nivelDes = undefined;
		
		this.genFig = figFlujo;
		this.figura(p);
		
		this.intMenuEle();
	},
	figura: function(p){
		this.fig = this.genFig(this.ctx, this, p, this.titulo, {});
		this.borde = this.fig.obtBorde();
		this.fig[0].dblclick(this.editorTexto);
		this.fig[3].click(this.remover);
		for(var i=0; i<7; i++){
			this.fig[2][i].click(this.controles);
		}
		this.fig[2][7].drag(this.moverFig, this.inicio, this.fin);
		this.fig[2][8].drag(this.moverFig, this.inicio, this.fin);
		this.visCont(this.selec);
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
	moverConOri: function(dx, dy){
		this.moverCon(this.fig[2][7], dx, dy);
	},
	moverConDes: function(dx, dy){
		this.moverCon(this.fig[2][8], dx, dy);
	},
	inicio: function(){
		var el;
		if(this.tipo){
			el = this;
		}else if(this.padre){
			el = this.padre;
		}
		//console.log(el);
		var elFig = el.fig;	
		var pt;
		
		elFig.dx = 0;
		elFig.dy = 0;
		
		for(var rel in el.relacIng){
			if(el.relacIng[rel]){
				pt = el.relacIng[rel].obtPtsRel();
				pt = pt.pd;
				el.relacIng[rel].fig.dx = pt.x;
				el.relacIng[rel].fig.dy = pt.y;
			}
		}
		for(var rel in el.relacSal){
			if(el.relacSal[rel]){
				pt = el.relacSal[rel].obtPtsRel();
				pt = pt.po;
				el.relacSal[rel].fig.dx = pt.x;
				el.relacSal[rel].fig.dy = pt.y;
			}
		}
		
		var borde = elFig.obtBorde();
		var pp = el.ctx.r.path(borde).attr(atrBor);
		pp.animate(atrDes, 100, function(){ this.remove()});
		pp = undefined;
	},
	moverCon: function(con, dx, dy){
		var el = con.padre;
		var elFig = el.fig;
		var pt, bb, dx_rel, dy_rel;
		
		bb = elFig[1].getBBox();
		dx_rel= bb.x + bb.width/2;
		dy_rel= bb.y + bb.height/2;
		
		con.update(dx - elFig.dx, dy - elFig.dy);
		el.borde = elFig.obtBorde();
		
		bb = elFig[1].getBBox();
		pt = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
		dx_rel = pt.x - dx_rel;
		dy_rel = pt.y - dy_rel;
		
		for(var rel in el.relacIng){
			if(el.relacIng[rel]){
				pt = el.relacIng[rel].obtPtsRel();
				pt = pt.pd;
				el.relacIng[rel].transUbiCont({pd: {dx: pt.x + dx_rel, dy: pt.y + dy_rel}});
			}
		}
		for(var rel in el.relacSal){
			if(el.relacSal[rel]){
				pt = el.relacSal[rel].obtPtsRel();
				pt = pt.po;
				el.relacSal[rel].transUbiCont({po: {dx: pt.x + dx_rel, dy: pt.y + dy_rel}});
			}
		}
		
		elFig.dx = dx;
		elFig.dy = dy;
	},
	moverFig: function(dx, dy){
		var el = this.padre;
		el.moverCon(this, dx, dy);
	},
	fin: function(){
		var el;
		if(this.tipo){
			el = this;
		}else if(this.padre){
			el = this.padre;
		}
		//console.log(el);
		var elFig = el.fig;
		var bb, pt, nivel;
		
		elFig.dx = 0;
		elFig.dy = 0;
		
		bb = elFig[1].getBBox();
		elFig.p  = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
		
		if(this == elFig[2][7]){
			bb = elFig[2][7].getBBox();
			pt = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
			nivel = el.ctx.existeNivelPt(pt);
			if(nivel){
				elFig.conNivelOri(nivel);
			}
			else{
				elFig.desNivelOri();
			}
		}
		else if(this == elFig[2][8]){
			bb = elFig[2][8].getBBox();
			pt = {x: bb.x + bb.width/2, y: bb.y + bb.height/2};
			nivel = el.ctx.existeNivelPt(pt);
			if(nivel){
				elFig.conNivelDes(nivel);
			}
			else{
				elFig.desNivelDes();
			}
		}
		
		for(var rel in el.relacIng){
			el.relacIng[rel].fig.dx = 0;
			el.relacIng[rel].fig.dy = 0;
		}
		for(var rel in el.relacSal){
			el.relacSal[rel].fig.dx = 0;
			el.relacSal[rel].fig.dy = 0;
		}
		el.borde = elFig.obtBorde();
	}
});

var VaAux = Elemento.extend({
	init: function(ctx, p, titu){
		this._super(ctx);
		
		this.tipo = "vaaux";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "vaaux_"+ind;
		this.titulo = titu || "Var. auxiliar "+ind;
		this.nombre = evo.convTexVar(this.titulo);
		this.defi = " ";
		this.unid = "Adimensional";
		
		this.lista = this.ctx.lista.vaaux;
		
		this.genFig = figVaAux;
		this.figura(p);
		this.intMenuEle();
	}
});

var VaExo = Elemento.extend({
	init: function(ctx, p, titu){
		this._super(ctx);
		
		this.tipo = "vaexo";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "vaexo_"+ind;
		this.titulo = titu || "Var. exogena "+ind;
		this.nombre = evo.convTexVar(this.titulo);
		this.defi = " ";
		this.unid = "Adimensional";
		
		this.lista = this.ctx.lista.vaexo;
		this.cone['aceDes'] = false;
		
		this.genFig = figVaExo;
		this.figura(p);
		this.intMenuEle();
	}
});

var Retar = Elemento.extend({
	init: function(ctx, p, titu){
		this._super(ctx);
		
		this.tipo = "retar";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "retar_"+ind;
		this.titulo = titu || "Retardo "+ind;
		this.nombre = evo.convTexVar(this.titulo);
		this.defi = " ";
		this.unid = "Adimensional";
		
		this.lista = this.ctx.lista.retar;
		
		this.genFig = figRetar;
		this.figura(p);
		this.intMenuEle();
	}
});

var Multi = Elemento.extend({
	init: function(ctx, p, titu){
		this._super(ctx);
		
		this.tipo = "multi";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "multi_"+ind;
		this.titulo = titu || "Multiplicador "+ind;
		this.nombre = evo.convTexVar(this.titulo);
		this.defi = " ";
		this.unid = "Adimensional";
		
		this.lista = this.ctx.lista.multi;
		
		this.genFig = figMulti;
		this.figura(p);
		this.intMenuEle();
	}
});

var ElFis = Elemento.extend({
	init: function(ctx, p, titu){
		this._super(ctx);
		
		this.tipo = "elfis";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "elfis_"+ind;
		this.titulo = titu || "FIS "+ind;
		this.nombre = evo.convTexVar(this.titulo);
		this.defi = " ";
		this.unid = "Adimensional";
		
		this.lista = this.ctx.lista.elfis;
		
		this.genFig = figElFis;
		this.figura(p);
		this.intMenuEle();
	}
});

var VaAnt = Elemento.extend({
	init: function(ctx, p, titu){
		this._super(ctx);
		
		this.tipo = "vaant";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "vaant_"+ind;
		this.titulo = titu || "Val. Anterior "+ind;
		this.nombre = evo.convTexVar(this.titulo);
		this.defi = " ";
		this.unid = "Adimensional";
		
		this.lista = this.ctx.lista.vaant;
		
		this.genFig = figVaAnt;
		this.figura(p);
		this.intMenuEle();
	}
});

var Submo = Elemento.extend({
	init: function(ctx, p, titu){
		this._super(ctx);
		
		this.tipo = "submo";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "submo_"+ind;
		this.titulo = titu || "Submodelo "+ind;
		this.nombre = evo.convTexVar(this.titulo);
		this.defi = " ";
		this.unid = "Adimensional";
		
		this.lista = this.ctx.lista.submo;
		this.cone['aceDes'] = false;
		
		this.genFig = figSubmo;
		this.figura(p);
		this.intMenuEle();
	}
});

var Relac = Relacion.extend({
	init: function(ctx, p, ori, des){
		this._super(ctx);
		
		this.tipo = "relac";
		var ind = this.ctx.ind[this.tipo]++;
		
		this.id = "relac_"+ind;
		
		this.titulo = this.ctx.titRel(ori.titulo, des.titulo);
		this.nombre = evo.convTexVar(this.titulo);
		
		this.ori = ori;
		this.des = des;
		
		this.ori.agreRelSal(this);
		this.des.agreRelIng(this);
		
		this.lista = this.ctx.lista.relac;
		this.figura(p);
		this.intMenuEle();
	},
	figura: function(p){
		this.fig = figRelac(this.ctx, this, p, {});
		this.fig[0].click(this.controles);
		this.fig[1].click(this.controles);
		this.fig[6].click(this.remover);
		this.visCont(this.selec);
	}
});


var FlujoNivel = Editor.extend({
	init: function(r){
		// Modelo de Evolución.FlujoNivel //
		
		this._super(r);
		this.id 	 = 'fyn';
		this.modo 	 = 'curso-fyn';
		this.div     = '#flujonivel';
		this.svg	 = '#svg-fyn';
		this.svg_div = '#svg-div-fyn';
		this.len_div = '#lenguaje-fyn';
		
		this.elementos = [
						'param',	'nivel',	'flujo',
						'vaaux',	'vaexo',	'retar',
						'multi',	'elfis',	'vaant',
						'submo',	'copia'];
		
		this.modos = this.elementos.concat(
						'relac',	'sefyn');
		
		for(var i in this.modos){
			this.lista[this.modos[i]] = {};
			this.ind[this.modos[i]] = 0;
			this.tmp[this.modos[i]] = undefined;
		}
		
		this.indMenu = {};
		for(var i=0; i<10; i++){
			this.indMenu[this.modos[i]]=i;
		}
		for(var i=11; i<13; i++){
			this.indMenu[this.modos[i]]=i-1;
		}
						
		// Fin del modelo Evolución.FlujoNivel //
		
		
		// Vista de Evolución.FlujoNivel //
		this.estTexto = "textEdit";
		
		$('#icons-fyn li').hover(
			function(){
				$(this).addClass('ui-state-hover');
				$(this).children().css('background-position','0px 24px')
			},
			function() {
				if($(this).attr('id') != fyn.modo){
					$(this).removeClass('ui-state-hover');
					$(this).children().css('background-position','0px 0px')
				}
			}
		);
		$('#icons-fyn li').click(function(){
			fyn.activarModo($(this).attr('id'));
		});
		
		$("#menu-elementos-fyn").accordion({ header: "h3" , heightStyle: "content", collapsible: true});	//autoHeight: false,
		$("#menu-elementos-fyn > div > h3 ").css('padding','3px 0px 3px 25px');
		$("#menu-elementos-fyn > div > div").css('padding','2px 0px');	
		
		$(this.svg_div).children().attr('id', 'svg-fyn');
				
		$(this.svg_div).mouseenter(function(e){
			var p = fyn.obtPosMouse(e);
			switch(fyn.modo){
				case 'param-fyn': {
					fyn.tmp.param = new figParam(fyn, undefined, p, "Parametro "+fyn.ind.param, {cursor: "move"});
					break;
				}
				case 'nivel-fyn': {
					fyn.tmp.nivel = new figNivel(fyn, undefined, p, "Nivel "+fyn.ind.nivel, {cursor: "move"});
					break;
				}
				case 'flujo-fyn': {
					fyn.tmp.flujo = new figFlujo(fyn, undefined, p, "Flujo "+fyn.ind.flujo, {cursor: "move"});
					break;
				}
				case 'vaaux-fyn': {
					fyn.tmp.vaaux = new figVaAux(fyn, undefined, p, "Var. auxiliar "+fyn.ind.vaaux, {cursor: "move"});
					break;
				}
				case 'vaexo-fyn': {
					fyn.tmp.vaexo = new figVaExo(fyn, undefined, p, "Var. exogena "+fyn.ind.vaexo, {cursor: "move"});
					break;
				}
				case 'retar-fyn': {
					fyn.tmp.retar = new figRetar(fyn, undefined, p, "Retardo "+fyn.ind.retar, {cursor: "move"});
					break;
				}
				case 'multi-fyn': {
					fyn.tmp.multi = new figMulti(fyn, undefined, p, "Multiplicador "+fyn.ind.multi, {cursor: "move"});
					break;
				}
				case 'elfis-fyn': {
					fyn.tmp.elfis = new figElFis(fyn, undefined, p, "FIS "+fyn.ind.elfis, {cursor: "move"});
					break;
				}
				case 'vaant-fyn': {
					fyn.tmp.vaant = new figVaAnt(fyn, undefined, p, "Val. Anterior "+fyn.ind.vaant, {cursor: "move"});
					break;
				}
				case 'submo-fyn': {
					fyn.tmp.submo = new figSubmo(fyn, undefined, p, "Submodelo "+fyn.ind.submo, {cursor: "move"});
					break;
				}
				case 'copia-fyn': {
					fyn.tmp.copia = new figCopia(fyn, undefined, p);
					break;
				}
				case 'relac-fyn': {
					fyn.tmp.relac = new figRelac(fyn, undefined, p, {});
					break;
				}				
				case 'secto-fyn': {
					fyn.tmp.sefyn = new figSecto(fyn, undefined, p, undefined, "Sector "+fyn.ind.sefyn);
					break;
				}
			}
		});
		$(this.svg_div).mouseleave(function(e){
			switch(fyn.modo){
				case 'param-fyn': {
					if(fyn.tmp.param){
						fyn.tmp.param.remove();
						fyn.tmp.param = undefined;
					}
					break;
				}
				case 'nivel-fyn': {
					if(fyn.tmp.nivel){
						fyn.tmp.nivel.remove();
						fyn.tmp.nivel = undefined;
					}
					break;
				}
				case 'flujo-fyn': {
					if(fyn.tmp.flujo){
						fyn.tmp.flujo.remove();
						fyn.tmp.flujo = undefined;
					}
					break;
				}
				case 'vaaux-fyn': {
					if(fyn.tmp.vaaux){
						fyn.tmp.vaaux.remove();
						fyn.tmp.vaaux = undefined;
					}
					break;
				}
				case 'vaexo-fyn': {
					if(fyn.tmp.vaexo){
						fyn.tmp.vaexo.remove();
						fyn.tmp.vaexo = undefined;
					}
					break;
				}
				case 'retar-fyn': {
					if(fyn.tmp.retar){
						fyn.tmp.retar.remove();
						fyn.tmp.retar = undefined;
					}
					break;
				}
				case 'multi-fyn': {
					if(fyn.tmp.multi){
						fyn.tmp.multi.remove();
						fyn.tmp.multi = undefined;
					}
					break;
				}
				case 'elfis-fyn': {
					if(fyn.tmp.elfis){
						fyn.tmp.elfis.remove();
						fyn.tmp.elfis = undefined;
					}
					break;
				}
				case 'vaant-fyn': {
					if(fyn.tmp.vaant){
						fyn.tmp.vaant.remove();
						fyn.tmp.vaant = undefined;
					}
					break;
				}
				case 'submo-fyn': {
					if(fyn.tmp.submo){
						fyn.tmp.submo.remove();
						fyn.tmp.submo = undefined;
					}
					break;
				}
				case 'copia-fyn': {
					if(fyn.tmp.copia){
						fyn.tmp.copia.remove();
						fyn.tmp.copia = undefined;
					}
					break;
				}
				case 'relac-fyn': {
					if(fyn.tmp.relac){
						fyn.tmp.relac.remove();
						fyn.tmp.relac = undefined;
					}
					break;
				}
				case 'secto-fyn': {
					if(fyn.tmp.sefyn){
						fyn.tmp.sefyn.remove();
						fyn.tmp.sefyn = undefined;
					}
					break;
				}
			}
		});
		$(this.svg_div).mousemove(function(e){
			var p = fyn.obtPosMouse(e);
			switch(fyn.modo){
				case 'param-fyn': {
					if(fyn.tmp.param){
						fyn.tmp.param.move(p);
					}
					break;
				}
				case 'nivel-fyn': {
					if(fyn.tmp.nivel){
						fyn.tmp.nivel.move(p);
					}
					break;
				}
				case 'flujo-fyn': {
					if(fyn.tmp.flujo){
						fyn.tmp.flujo.move(p);
					}
					break;
				}
				case 'vaaux-fyn': {
					if(fyn.tmp.vaaux){
						fyn.tmp.vaaux.move(p);
					}
					break;
				}
				case 'vaexo-fyn': {
					if(fyn.tmp.vaexo){
						fyn.tmp.vaexo.move(p);
					}
					break;
				}
				case 'retar-fyn': {
					if(fyn.tmp.retar){
						fyn.tmp.retar.move(p);
					}
					break;
				}
				case 'multi-fyn': {
					if(fyn.tmp.multi){
						fyn.tmp.multi.move(p);
					}
					break;
				}
				case 'elfis-fyn': {
					if(fyn.tmp.elfis){
						fyn.tmp.elfis.move(p);
					}
					break;
				}
				case 'vaant-fyn': {
					if(fyn.tmp.vaant){
						fyn.tmp.vaant.move(p);
					}
					break;
				}
				case 'submo-fyn': {
					if(fyn.tmp.submo){
						fyn.tmp.submo.move(p);
					}
					break;
				}
				case 'copia-fyn': {
					if(fyn.tmp.copia){
						fyn.tmp.copia.move(p);
					}
					break;
				}
				case 'relac-fyn': {
					if(fyn.tmp.relac){
						fyn.tmp.relac.move(p);
					}
					break;
				}
				case 'secto-fyn': {
					if(fyn.tmp.sefyn){
						fyn.tmp.sefyn.move(p);
					}
					break;
				}
			}
		});
		$(this.svg_div).click(function(e){
			var p = fyn.obtPosMouse(e);
			var alpha;
			switch(fyn.modo){
				case 'param-fyn': {
					var pa = new Param(fyn, p);
					fyn.lista.param[pa.id] = pa;
					
					fyn.activarModo('curso-fyn');
					fyn.tmp.param.remove();
					fyn.tmp.param = undefined;
					break;
				}
				case 'nivel-fyn': {
					var ni = new Nivel(fyn, p);
					fyn.lista.nivel[ni.id] = ni;
					
					fyn.activarModo('curso-fyn');
					fyn.tmp.nivel.remove();
					fyn.tmp.nivel = undefined;
					break;
				}
				case 'flujo-fyn': {
					var fl = new Flujo(fyn, p);
					fyn.lista.flujo[fl.id] = fl;
					
					fyn.activarModo('curso-fyn');
					fyn.tmp.flujo.remove();
					fyn.tmp.flujo = undefined;
					break;
				}
				case 'vaaux-fyn': {
					var va = new VaAux(fyn, p);
					fyn.lista.vaaux[va.id] = va;
					
					fyn.activarModo('curso-fyn');
					fyn.tmp.vaaux.remove();
					fyn.tmp.vaaux = undefined;
					break;
				}
				case 'vaexo-fyn': {
					var ve = new VaExo(fyn, p);
					fyn.lista.vaexo[ve.id] = ve;
					
					fyn.activarModo('curso-fyn');
					fyn.tmp.vaexo.remove();
					fyn.tmp.vaexo = undefined;
					break;
				}
				case 'retar-fyn': {
					var re = new Retar(fyn, p);
					fyn.lista.retar[re.id] = re;
					
					fyn.activarModo('curso-fyn');
					fyn.tmp.retar.remove();
					fyn.tmp.retar = undefined;
					break;
				}
				case 'multi-fyn': {
					var mu = new Multi(fyn, p);
					fyn.lista.multi[mu.id] = mu;
					
					fyn.activarModo('curso-fyn');
					fyn.tmp.multi.remove();
					fyn.tmp.multi = undefined;
					break;
				}
				case 'elfis-fyn': {
					var ef = new ElFis(fyn, p);
					fyn.lista.elfis[ef.id] = ef;
					
					fyn.activarModo('curso-fyn');
					fyn.tmp.elfis.remove();
					fyn.tmp.elfis = undefined;
					break;
				}
				case 'vaant-fyn': {
					var va = new VaAnt(fyn, p);
					fyn.lista.vaant[va.id] = va;
					
					fyn.activarModo('curso-fyn');
					fyn.tmp.vaant.remove();
					fyn.tmp.vaant = undefined;
					break;
				}
				case 'submo-fyn': {
					var su = new Submo(fyn, p);
					fyn.lista.submo[su.id] = su;
					
					fyn.activarModo('curso-fyn');
					fyn.tmp.submo.remove();
					fyn.tmp.submo = undefined;
					break;
				}
				case 'copia-fyn': {
					var el = fyn.existeElPt(p);
					if(el){
						var cp = new Copia(fyn, p, el);
						fyn.lista.copia[cp.id] = cp;
						
						fyn.activarModo('curso-fyn');
						fyn.tmp.copia.remove();
						fyn.tmp.copia = undefined;
					}
					break;
				}
				case 'relac-fyn': {
					var el = fyn.existeElPt(p);
					var relac = fyn.tmp.relac;
					if(el){
						p = fyn.detPunEnPath(el.borde, p);
						alpha = fyn.detAngEnPath(el.borde, p);
						if(relac.estado == 'inicial' && el.cone['aceOri']){
							relac.ori = el;
							relac.actSegPun(fyn, p, alpha);
						}
						else if(relac.estado == 'extendido' && el.cone['aceDes']){
							var noEsMismo = false;
							var noExRelOri = false;
							var noExRelDes = false;
								
							if(relac.ori.id != el.id){
								noEsMismo = true;
							}
							noExRelOri = !el.exisRelOri(relac.ori.id);
							noExRelDes = !el.exisRelDes(relac.ori.id);
							
							if(noEsMismo && noExRelOri && noExRelDes){
								relac.p[3] = p;
								
								var re = new Relac(fyn, relac.p, relac.ori, el);

								fyn.lista.relac[re.id] = re;
								
								fyn.activarModo('curso-fyn');
								fyn.tmp.relac.remove();
								fyn.tmp.relac = undefined;
							}
						}
					}
					break;
				}
				case 'secto-fyn': {
					var se = new Secto(fyn, p);
					fyn.lista.sefyn[se.id] = se;
					
					fyn.activarModo('curso-fyn');
					fyn.tmp.sefyn.remove();
					fyn.tmp.sefyn = undefined;
					break;
				}
			}
		});
	},
	saveAsDom: function(){
		var model, prose, influence, stock_and_flow, behavior, list;
		var elements, element, group, position, pos, po, pco, pd, pcd, relations, relation, flows, flow, rels, cantRelIng, cantRelSal, cantFluIng, cantFluSal, from, to, size, size_sector, width, height;
		
		model = $('#xmldocument model:first');
		
		stock_and_flow = model.children('stock_and_flow');
		
		if($.isEmptyObject(stock_and_flow[0])){
			stock_and_flow = model.append($('<stock_and_flow />')).children('stock_and_flow');	
		}
		else{
			stock_and_flow.empty();
		}
		
		size = this.obtTamPan();
		stock_and_flow.attr('width', size.w);
		stock_and_flow.attr('height', size.h);
		
		if(model){
		
			elements = 	{	
				'param': {'el': 'parameter', 	'group': 'parameters'},
				'nivel': {'el': 'stock',     	'group': 'stocks'},
				'flujo': {'el': 'flow', 		'group': 'flows'},
				'vaaux': {'el': 'auxiliary', 	'group': 'auxiliaries'},
				'vaexo': {'el': 'exogenous', 	'group': 'vars_exogenous'},
				'retar': {'el': 'delay', 		'group': 'delays'},
				'multi': {'el': 'multiplier', 	'group': 'multipliers'},
				'elfis': {'el': 'fis', 			'group': 'vars_fis'},
				'vaant': {'el': 'previous', 	'group': 'vars_previous'},
				'submo': {'el': 'submodel', 	'group': 'submodels'}	
			};
			for(var el in elements){
				list = fyn.lista[el];
				group = stock_and_flow.append('<'+elements[el]['group']+' />').children(elements[el]['group']);
				
				for(var i in list){
					
					element = group.append('<'+elements[el]['el']+' />').children(elements[el]['el']+':last');
					element.append($('<name />').text(list[i].nombre));
					element.append($('<title />').text(list[i].titulo));
					element.append($('<description />').text(list[i].desc));
					element.append($('<definition />').text(list[i].defi));
					element.append($('<units />').text(list[i].unid));
					element.append($('<dimension />').text(list[i].dim));
					
					pos = list[i].pos();
					position = element.append('<position />').children('position');
					position.append($('<x />').text(pos.x));
					position.append($('<y />').text(pos.y));
					
					relations = element.append('<relations />').children('relations');
										
					cantRelIng = list[i].cantRelIng;
					cantRelSal = list[i].cantRelSal;
					
					if(cantRelIng > 0 || cantRelSal > 0){
						if(cantRelIng > 0){
							rels = list[i].relacIng;
							for(var rel in rels){
								relation = relations.append('<relation_from />').children('relation_from');
								relation.text(rels[rel].ori.nombre);
							}
						}
						if(cantRelSal > 0){
							rels = list[i].relacSal;
							for(var rel in rels){
								relation = relations.append('<relation_to />').children('relation_to');
								relation.text(rels[rel].des.nombre);
							}
						}
					}
					if(el == 'nivel'){
						cantFluIng = list[i].cantFluIng;
						cantFluSal = list[i].cantFluSal;
						flows = element.append('<stock_flows />').children('stock_flows');
						if(cantFluIng > 0){
							fls = list[i].flujoIng;
							for(var fl in fls){
								flow = flows.append('<flow_enter />').children('flow_enter');
								flow.text(fls[fl].nombre);	
							}
						}
						if(cantFluSal > 0){
							fls = list[i].flujoSal;
							for(var fl in fls){
								flow = flows.append('<flow_leave />').children('flow_leave');
								flow.text(fls[fl].nombre);	
							}
						}
					}
					if(el == 'flujo'){
						from = element.append('<from />').children('from');
						from.text(list[i].nivelOri.nombre);
						to = element.append('<to />').children('to');
						to.text(list[i].nivelDes.nombre);
					}
				}
			}
			
			list = fyn.lista['copia'];
			group = stock_and_flow.append('<copies />').children('copies');
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
			
			list = fyn.lista['relac'];
			group = stock_and_flow.append('<relations />').children('relations');
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
			
			list = fyn.lista['sefyn'];
			group = stock_and_flow.append('<sectors />').children('sectors');
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
		var nomCont = '#'+el.tipo+'-'+this.id+'-div';
		$("#menu-elementos-fyn").accordion("option", "active", this.indMenu[el.tipo]);
		
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
			if(el.defi){
				html +=	"<div id='"+el.id+"_item_conte_defi' "+
						"class='eleContTit'"+
						">Definici&oacute;n.</div>"+
						"<textarea id='"+el.id+"_item_conte_defi_TA' rows='4' "+
						"class='eleContTA'>"+
						"</textarea>";
			}
			if(el.dim){
				html += "<div id='"+el.id+"_item_conte_dim' "+
						"class='eleContTit'"+
						">Dimensi&oacute;n.</div>"+
						"<input id='"+el.id+"_item_conte_dim_IT' type='text' "+
						"class='eleContIT' value='"+el.dim+"'/>";
			}
			if(el.unid){
				html += "<div id='"+el.id+"_item_conte_uni' "+
						"class='eleContTit'"+
						">Unidades.</div>"+
						"<input id='"+el.id+"_item_conte_uni_IT' type='text' "+
						"class='eleContIT' value='"+el.unid+"'/>";
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
			if(el.defi){
				$('#'+el.id+'_item_conte_defi').css('width', '70px');
				$('#'+el.id+'_item_conte_defi_TA').change(function(){					
					el.camDefi($(this).val());					
				});
			}
			if(el.unid){
				$('#'+el.id+'_item_conte_uni').css('width', '60px');
				$('#'+el.id+'_item_conte_uni_IT').change(function(){
					el.camUnid($(this).val());
				});
			}
			
			com.integrarControlesEle(el);
		}
	},
	eliminarControlesEle: function(el){
		$('#'+el.id+'_item').remove();
		com.eliminarControlesEle(el);
	},
	modTitMenu: function(el){
		$('#'+el.id+'_item_nombre').html(el.titulo);
		com.modTitMenu(el);
	}
	// fin de la Vista de Evolución.FlujoNivel //
});

$(document).ready(function() {
	// Controlador del modulo Flujo Nivel //
	
	var r = Raphael("svg-div-fyn", $("#lenguaje-fyn").width(), $("#lenguaje-fyn").height());
	fyn = new FlujoNivel(r);
	fyn.activarModo(fyn.modo);
	evo.fyn = fyn;
	evo.dyn = new Dynamos(evo.fyn.lista);
	
	// Fin del Controlador del modulo Flujo Nivel //
});

