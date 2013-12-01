/********************************
 * Dynamos, Javascript library for System Dynamics Simulations
 * By John Garavito Suárez
 * MIT Licensed.
 * Requires: Simple JavaScript Inheritance & Jquery
 ********************************/

/********************************
 *Librerias Integradas de Evolucion Web
********************************/
var PI 		= Math.PI;
var LN2		= Math.LN2;
var TRUE  	= true;
var FALSE 	= false;

function ABS(x){
	return Math.abs(x);
}
function ACOS(x){
	return Math.acos(x);
}
function ACOSH(x){
	return Math.log(x + Math.sqrt(x * x - 1));
}
function AND(){
	var rst;
	if(arguments[0]==0 || arguments[0]==1 || typeof(arguments[0])=="boolean"){
			rst=arguments[0];
		}
		else{
			return undefined;
		}
	for(var i=1; i<arguments.length; i++){
		if(arguments[i]==0 || arguments[i]==1 || typeof(arguments[i])=="boolean"){
			rst*=arguments[i];
		}
		else{
			return undefined;
		}
	}
	return rst;
}
function ASIN(x){
	return Math.asin(x);
}
function ASINH(x){
	return Math.log(x + Math.sqrt(x * x + 1));
}
function ATAN(x){
	return Math.atan(x);
}
function ATANH(x){
	return 0.5 * Math.log((1 + x) / (1 - x))
}
function BINOM(n,k){
	if(n>=0 && k>=0 && (n-k)>=0){
		return FACT(n)/((FACT(k))*(FACT(n-k)));
	}
	else{
		return undefined;
	}
}
function BOOL(x){
	if(x>0){
		return true;
	}
	else{
		return false;
	}
}
function CHS(x){
	return -x;
}
function COS(x){
	return Math.cos(x);
}
function COSH(x){
	return (Math.exp(x) + Math.exp(-x)) / 2; 
}
function COSWAVE(amplitud,periodo,t){
	if(periodo>0){
		return amplitud*COS(2*PI*(t/periodo));
	}
	else{
		return undefined; 
	}
}
function COTAN(x){
	return 1/Math.tan(x);
}
function CUBE(x){
	return x*x*x;
}
function DEGTOGRAD(x){
	return 100*(x/90);
}
function DEGTORAD(x){
	return PI*(x/180);
}
function EXP(x){
	return Math.exp(x);
}
function EXPRND(media){
	var lambda = 1/media;
	return (-1*Math.log(Math.random()))/lambda;
}
function FACT(x){
	var rst=x;
	if(x==0){
		return 1;
	}
	else if(x<0){
		return undefined;
	}
	for(var i=x-1; i>=1; i--){
		rst*=i;
	}
	return rst;
}
function FRAC(x){
	return x-INT(x);
}
function int(x){
	return parseInt(roundDec(x,10));
}
function INT(x){
	return parseInt(roundDec(x,10));
}
function GRADTODEG(x){
	return 90*(x/100);
}
function GRADTORAD(x){
	return PI*(x/200);
}
function IF(condicion,valor1,valor2){
	if(condicion){
		return valor1;
	}
	else{
		return valor2;
	}
}
function INTLINEAL(){
	var tipoExtra, x1, dx, y=[];;
	if(arguments.length>=4){
		if(isFinite(arguments[0])){
			tipoExtra=arguments[0];
		}
		else{
			return undefined;
		}
		if(isFinite(arguments[1])){
			x1=arguments[1];
		}
		else{
			return undefined;
		}
		if(isFinite(arguments[2])){
			dx=arguments[2];
		}
		else{
			return undefined;
		}
		for(var i=3;i<arguments.length;i++){
			if(isFinite(arguments[i])){
				y.push(arguments[i]);
			}
			else{
				return undefined;
			}
		}
	}
	function evalIntLineal(x){
		var y1;
		var x2=x1+(dx*(y.length-1));
		if(x<x1 || x>x2){
			switch(tipoExtra){
				case 0:		//ciclica
					if(x<x1){
						x=x2+((x-x2)%(x1-x2));
					}
					else if(x>x2){
						x=x1+((x-x1)%(x2-x1));
					}
					y1=evalIntLineal(x);
				break;
				case 1:		//nula
					y1=0;
				break;
				case 2:		//extremos
					if(x<x1){
						y1=y[0];
					}
					else if(x>x2){
						y1=y[y.length-1];
					}
				break;
			}
		}
		else{
			var xa, ya, xs, ys;
			var ind=roundDec(((x-x1)/dx),4);
			ind=INT(ind);
			if(ind==(y.length-1)){
				ind--;
			}	
			xa=ind*dx;
			xs=(ind+1)*dx;
			ya=y[ind];
			ys=y[ind+1];
			y1=((ys-ya)/(xs-xa))*(x-xa)+ya;
			//alert(x+'-'+xa+'-'+xs+'-'+ya+'-'+ys);
		}
		return y1;
	}
	return evalIntLineal;
}
function INTPASO(){
	var tipoExtra, x1, dx, y=[];;
	if(arguments.length>=4){
		if(isFinite(arguments[0])){
			tipoExtra=arguments[0];
		}
		else{
			return undefined;
		}
		if(isFinite(arguments[1])){
			x1=arguments[1];
		}
		else{
			return undefined;
		}
		if(isFinite(arguments[2])){
			dx=arguments[2];
		}
		else{
			return undefined;
		}
		for(var i=3;i<arguments.length;i++){
			if(isFinite(arguments[i])){
				y.push(arguments[i]);
			}
			else{
				return undefined;
			}
		}
	}
	function evalIntPaso(x){
		var y1;
		var x2=x1+(dx*(y.length-1));
		if(x<x1 || x>x2){
			switch(tipoExtra){
				case 0:		//ciclica
					if(x<x1){
						x=x2+((x-x2)%(x1-x2));
					}
					else if(x>x2){
						x=x1+((x-x1)%(x2-x1));
					}
					y1=evalIntPaso(x);
				break;
				case 1:		//nula
					y1=0;
				break;
				case 2:		//extremos
					if(x<x1){
						y1=y[0];
					}
					else if(x>x2){
						y1=y[y.length-1];
					}
				break;
			}
		}
		else{
			var ind=roundDec(((x-x1)/dx),4);
			ind=INT(ind);
			if(ind==(y.length-1)){
				ind--;
			}
			y1=y[ind];
		}
		return y1;
	}
	return evalIntPaso;
}
function INTSPLINE(){
	var tipoExtra, x1, dx, y=[];
	var a=[], b=[], c=[], d=[], h=[], n;
	var A=[], B=[];
	if(arguments.length>=4){
		if(isFinite(arguments[0])){
			tipoExtra=arguments[0];
		}
		else{
			return undefined;
		}
		if(isFinite(arguments[1])){
			x1=arguments[1];
		}
		else{
			return undefined;
		}
		if(isFinite(arguments[2])){
			dx=arguments[2];
		}
		else{
			return undefined;
		}
		for(var i=3;i<arguments.length;i++){
			if(isFinite(arguments[i])){
				y.push(arguments[i]);
			}
			else{
				return undefined;
			}
		}
		n=y.length;
		for(var i=0; i<(n-1); i++){
			h[i]=dx;
		}
		for(var i=0; i<n; i++){
			a[i]=y[i];
			c[i]=0;
			
			A[i]=[];
			if(i==0){
				A[i][0]=1;
				for(var j=1; j<n; j++){
					A[i][j]=0;
				}
			}
			if(i>0&&i<n-1){
				for(var j=0; j<i-1; j++){
					A[i][j]=0;
				}
				A[i][i-1]=h[i-1];
				A[i][i]  =2*(h[i-1]+h[i]);
				A[i][i+1]=h[i];
				for(var j=i+2; j<n; j++){
					A[i][j]=0;
				}
			}
			if(i==(n-1)){
				for(var j=0; j<n-1; j++){
					A[i][j]=0;
				}
				A[i][n-1]=1;
			}
		}
		for(var i=0; i<n; i++){
			if(i==0){
				B[i]=0;
			}
			if(i>0&&i<n-1){
				B[i]= ((3/h[i])*(a[i+1]-a[i]))-((3/h[i-1])*(a[i]-a[i-1]));
			}
			if(i==(n-1)){
				B[i]=0;
			}
		}
		var tmp=0;
		var error=1;
		var tol=0.0001;
		var e=[];
		while(error>tol){
			for(var i=0; i<n; i++){
				tmp=B[i];
				for(var j=0; j<i; j++){
					tmp-=(A[i][j]*c[j]);
				}
				for(var j=i+1; j<n; j++){
					tmp-=(A[i][j]*c[j]);
				}
				c[i]=(tmp/A[i][i]);
			}
			for(var i=0; i<n; i++){
				e[i]=B[i];
				for(var j=0; j<n; j++){
					e[i]-=(A[i][j]*c[j]);
				}
			}
			error=e[0];
			for(var i=1; i<n; i++){
				if(e[i]>error){
					error=e[i];
				}
			}
		}
		for(var i=0; i<(n-1); i++){
			b[i]=((1/h[i])*(a[i+1]-a[i]))-((h[i]/3)*((2*c[i])+c[i+1]));
			d[i]=(c[i+1]-c[i])/(3*h[i]);
		}
	}
	function evalIntSpline(x){
		var y1;
		var x2=x1+(dx*(y.length-1));
		if(x<x1 || x>x2){
			switch(tipoExtra){
				case 0:		//ciclica
					if(x<x1){
						x=x2+((x-x2)%(x1-x2));
					}
					else if(x>x2){
						x=x1+((x-x1)%(x2-x1));
					}
					y1=evalIntSpline(x);
				break;
				case 1:		//nula
					y1=0;
				break;
				case 2:		//extremos
					if(x<x1){
						y1=y[0];
					}
					else if(x>x2){
						y1=y[y.length-1];
					}
				break;
			}
		}
		else{
			var ind=roundDec(((x-x1)/dx),4);
			ind=INT(ind);
			if(ind==(y.length-1)){
				ind--;
			}
			var xi=(x1+ind*dx);
			y1=a[ind]+(b[ind]*(x-xi))+(c[ind]*(x-xi)*(x-xi))+(d[ind]*(x-xi)*(x-xi)*(x-xi));
		}
		return y1;
	}
	return evalIntSpline;
}
function INVPCT(x){
	return x*100;
}
function LG(x){
	return (Math.log(x)/Math.log(10));
}
function LN(x){
	return Math.log(x);
}
function MAX(){
	var max=arguments[0];
	for(var i=1; i<arguments.length; i++){
		if(arguments[i]>max){
			max=arguments[i];
		}
	}
	return max;
}
function MIN(){
	var min=arguments[0];
	for(var i=1; i<arguments.length; i++){
		if(arguments[i]<min){
			min=arguments[i];
		}
	}
	return min;
}
function MOD(x,y){
	return x%y;
}
function NORMAL(media,des){	//Pendiente
	
}
function NOT(x){
	if(x==0 || x==1){
		return 1-x;
	}
	else if(typeof(x)=="boolean"){
		return !x;
	}
}
function NUMEROACIERTOS(pob, pro){	//Pendiente
	
}
function OR(){
	var rst;
	if(arguments[0]==0 || arguments[0]==1 || typeof(arguments[0])=="boolean"){
			rst=arguments[0];
		}
		else{
			return undefined;
		}
	for(var i=1; i<arguments.length; i++){
		if(arguments[i]==0 || arguments[i]==1 || typeof(arguments[i])=="boolean"){
			rst=arguments[i]||rst;
		}
		else{
			return undefined;
		}
	}
	return rst;
}
function PCT(x){
	return x/100;
}
function POWER(base, exp){
	return Math.pow(base,exp);
}
function PRED(x){
	return Math.floor(roundDec(x,10));
}
function PROD(){
	var p;
	if(isFinite(arguments[0])){
		p=arguments[0];
	}
	for(var i=1; i<arguments.length; i++){
		if(isFinite(arguments[i])){
			p*=arguments[i];
		}
	}
	return p;
}
function PULSE(vol,pri,intlo,t,dt){
	if(t>=pri){
		if(((t-pri)%intlo)==0){
			return vol/dt;
		}
	}
	return 0;
}
function PULSEIF(cond,vol,dt){
	if(cond || eval(cond)){
		return vol/dt;
	}
	return 0;
}
function RADTODEG(x){
	return (180*x)/Math.PI;
}
function RADTOGRAD(x){
	return (200*x)/Math.PI;
}
function RAMPA(m,pri,t){
	if(t>=pri){
		return m*(t-pri);
	}
	return 0;
}
function RANDOM(min,max){
	return min+(Math.random()*(max-min));
}
function RETARDO(datos, t_ajuste, orden, v_ini){ //Pendiente
	
}
function ROUND(x){
	return roundDec(x,0);
}
function SIGN(x){
	return x/Math.abs(x);
}
function SIN(x){
	return Math.sin(x);
}
function SINH(x){
	return (Math.exp(x) - Math.exp(-x)) / 2;
}
function SINWAVE(amplitud,periodo,t){
	if(periodo>0){
		return amplitud*SIN(2*PI*(t/periodo));
	}
	else{
		return undefined; 
	}
}
function SQR(x){
	return x*x;
}
function SQRT(x){
	return Math.sqrt(x);
}
function STEP(altura,tiempo_paso,t){
	if(t>=tiempo_paso){
		return altura;
	}
	else{
		return 0;
	}
}
function SUC(x){
	return Math.ceil(x);
}
function SUM(){
	var s;
	if(isFinite(arguments[0])){
		s=arguments[0];
	}
	for(var i=1; i<arguments.length; i++){
		if(isFinite(arguments[i])){
			s+=arguments[i];
		}
	}
	return s;
}
function SUMARETARDO(ret){ //Pendiente
	
}
function TAN(x){
	return Math.tan(x);
}
function TANH(x){
	return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
}
function XOR(x,y){
	return (x+y)%2;
}
/********************************
********************************/

var Dynamos = Class.extend({
	init: function(listas){
		this.elmts={};

		this.param={}, 		this.vaaux={},		this.vaexo={},
		this.nivel={},		this.flujo={},		this.retar={},		
		this.multi={}, 		this.elfis={}, 		this.vaant={},		
		this.submo={},  	this.copia={};
		
		this.estaticos={};

		this.pri; 
		this.ti=0, this.tf=100, this.dt=1;
		
		this.series = {};
		
		this.loadListas(listas);	
	},
	loadListas: function(listasElmts){
		this.param=listasElmts.param, 		this.vaaux=listasElmts.vaaux,		this.vaexo=listasElmts.vaexo,
		this.nivel=listasElmts.nivel,		this.flujo=listasElmts.flujo,		this.retar=listasElmts.retar,		
		this.multi=listasElmts.multi, 		this.elfis=listasElmts.elfis, 		this.vaant=listasElmts.vaant,		
		this.submo=listasElmts.submo,  		this.copia=listasElmts.copia;
		
		this.estaElementos();
		this.pri=this.estaPrioridad();
	},
	anaElem: function(elemAna, tipo){
		var elem = new Object();
		elemAna.children('id').each(function(){
			elem.id = $(this).text();
		});
		elemAna.children('dim').each(function(){
			elem.dim = parseInt($(this).text());
		});
		elemAna.children('defi').each(function(){
			elem.defi = $(this).text();
		});
		elemAna.children('des').each(function(){
			elem.des = $(this).text();
		});
		elemAna.children('flujos').each(function(){
			$(this).children('entran').each(function(){
				elem.flujoIng=[];
				$(this).children('ing').each(function(){
					elem.flujoIng.push($(this).text());
				});
			});
			$(this).children('salen').each(function(){
				elem.flujoSal=[];
				$(this).children('sal').each(function(){
					elem.flujoSal.push($(this).text());
				});
			});
		});
		elemAna.children('conexiones').each(function(){
			$(this).children('entran').each(function(){
				elem.relacIng=[];
				$(this).children('ing').each(function(){
					elem.relacIng.push($(this).text());
				});
			});
			$(this).children('salen').each(function(){
				elem.relacSal=[];
				$(this).children('sal').each(function(){
					elem.relacSal.push($(this).text());
				});
			});
		});
		elem.tipo = tipo;
		var div;
		switch(tipo){
			case 'param':
				sysDyn.parametros.push(elem);
				div = '#divParametros';
			break;
			case 'vaaux':
				sysDyn.auxiliares.push(elem);
				div = '#divAuxiliares';
			break;
			case 'nivel':
				sysDyn.niveles.push(elem);
				div = '#divNiveles';
			break;
			case 'flujo':
				sysDyn.flujos.push(elem);
				div = '#divFlujos';
			break;
			case 'multi':
				sysDyn.multiplicadores.push(elem);
				div = '#divMultiplicadores';
			break;
			
		}
		$('<div class="campo"></div>').html('<label for="'+elem.id+'_tx"><input type="checkbox" id="'+elem.id+'_cb"/>'+elem.id+': </label><input id="'+elem.id+'_tx" type="text" value="'+elem.defi+'">').appendTo(div);
	},
	estaElementos: function(){
		for(var i in this.param){
			this.elmts[this.param[i].id] = this.param[i];
		}
		for(var i in this.vaaux){
			this.elmts[this.vaaux[i].id] = this.vaaux[i];
		}
		for(var i in this.vaexo){
			this.elmts[this.vaexo[i].id] = this.vaexo[i];
		}
		for(var i in this.nivel){
			this.elmts[this.nivel[i].id] = this.nivel[i];
		}
		for(var i in this.flujo){
			this.elmts[this.flujo[i].id] = this.flujo[i];
		}
		for(var i in this.retar){
			this.elmts[this.retar[i].id] = this.retar[i];
		}
		for(var i in this.multi){
			this.elmts[this.multi[i].id] = this.multi[i];
		}
		for(var i in this.elfis){
			this.elmts[this.elfis[i].id] = this.elfis[i];
		}
		for(var i in this.vaant){
			this.elmts[this.vaant[i].id] = this.vaant[i];
		}
		for(var i in this.submo){
			this.elmts[this.submo[i].id] = this.submo[i];
		}
	},
	estaPrioridad: function(){
		var pilaAdm=[], pilaEsp=[];
		var cant = 0;
		for(var i in this.elmts){
			pilaEsp.push(i);
			cant++;
		}
		
		while(pilaAdm.length < cant){
			for(var i=0; i<pilaEsp.length; i++){
				if(this.elmts[pilaEsp[i]].cantRelIng == 0){
					pilaAdm.push(pilaEsp[i]);
					pilaEsp.splice(i,1);
					i--;
				}
				else if(this.esAdmitido(this.elmts[pilaEsp[i]], pilaAdm)){
					pilaAdm.push(pilaEsp[i]);
					pilaEsp.splice(i,1);
					i--;
				}
			}
		}
		return pilaAdm;
	},
	esAdmitido: function(el, pilaAdm){
		var esAdm=true;
		var esAdmAct;
		var relIni;
		
		for(var i in el.relacIng){
			esAdmAct=false;
			for(var j=0; j<pilaAdm.length; j++){			
				if(el.relacIng[i].ori.id == pilaAdm[j]){
					esAdmAct=true;
					j=pilaAdm.length;
				}
			}
			esAdm = (esAdm && esAdmAct);
			if(!esAdm){
				return false;
			}
		}
		return esAdm;
	},
	genCodigoJS: function(elmts){
		var el;
		var codigo=
		'var t_serie=[];';
		
		for(var i in elmts){
			el = this.elmts[elmts[i]];
			codigo+=
			'\n'+'var '+el.nombre+'_serie=[];';
		}
		
		codigo+=
		'\n'+
		'\n'+'var ti='+this.ti+';'+
		'\n'+'var tf='+this.tf+';'+
		'\n'+'var dt='+this.dt+';'+
		'\n'+'var t=ti;'+
		'\n';
		for(var i in this.pri){
			/*if($("#"+el.nombre+'_cb').is(':checked')){
				if(el.dim == 1){
					codigo+=
					'\n'+'var '+el.nombre+'_serie=[];';
				}
				else if(el.dim > 1){
					for(var j=0; j<el.dim; j++){
						codigo+=
						'\n'+'var '+el.nombre+'_'+j+'_serie=[];';
					}
				}
			}*/
			el = this.elmts[this.pri[i]];
			
			if(	el.tipo=='param' || el.tipo=='nivel' || el.tipo=='flujo' || el.tipo=='vaaux'){
				/*if(esEstatico(elmts[pri[i]])){
					estaticos.push(elmts[pri[i]].nombre);
				}*/
				codigo+=
				'\n'+'var '+el.nombre+'='+this.adapVector(el.defi)+';';
			}
			else if(el.tipo=='multi'){
				if(el.dim == 1){
					codigo+=
					'\n'+'var '+el.nombre+'_func='+this.adapVector(el.defi)+';';
					codigo+=
					'\n'+'var '+el.nombre+'='+el.nombre+'_func('+el.relacIng[0]+');';
				}
				else if(el.dim > 1){
					// Falta definir codigo para multiplicadores con dimensión mayor que uno.
				}
			}
		}
		
		codigo+=
		'\n'+
		'\n'+'while(t<=tf){';
		
		for(var i in elmts){
			el = this.elmts[elmts[i]];
			codigo+=
			'\n\t'+el.nombre+'_serie.push('+el.nombre+');';
		}
		
		codigo+=
		'\n\t'+'t_serie.push(t);'+
		'\n\t'+'t=t+dt;';
		
		for(var i in this.pri){
			/*if($("#"+el.nombre+'_cb').is(':checked')){
				if(el.dim == 1){
					codigo+=
					'\n\t'+el.nombre+'_serie.push(roundDec('+el.nombre+',4));';
				}
				else if(el.dim > 1){
					for(var j=0; j<el.dim; j++){
						codigo+=
						'\n\t'+el.nombre+'_'+j+'_serie.push(roundDec('+el.nombre+'['+j+']'+',4));';
					}
				}
			}*/
			
			el = this.elmts[this.pri[i]];
			
			if(el.tipo=='vaaux' || el.tipo=='flujo'){
				if(el.dim == 1){
					codigo+=
					'\n\t'+el.nombre+'='+this.adapVector(el.defi)+';';
				}
				else if(el.dim > 1){
					var vector=this.sepVector(el.defi);
					for(var j=0; j<el.dim; j++){
						vector[j]=this.adapVector(vector[j]);
						codigo+=
						'\n\t'+el.nombre+'['+j+']='+vector[j]+';';
					}
				}
			}
			else if(el.tipo=='multi'){
				if(el.dim == 1){
					codigo+=
					'\n\t'+el.nombre+'='+el.nombre+'_func('+el.relacIng[0]+');';
				}
				else if(el.dim > 1){
					// Falta definir codigo para multiplicadores con dimensión mayor que uno.
				}
			}
			else if(el.tipo=='nivel'){
				if(el.dim == 1){
					if(el.cantFluIng > 0 || el.cantFluSal > 0){
						var ind=0;
						codigo+=
						'\n\t'+el.nombre+'='+el.nombre+'+(';
						
						for(var j in el.flujoIng){
							codigo+=
							el.flujoIng[j].nombre;
							if(ind != (el.cantFluIng-1)){
								codigo+='+';
								console.log('+');
							}
							ind++;
						}
						for(var j in el.flujoSal){
							codigo+=
							'-'+el.flujoSal[j].nombre;
						}
						codigo+=
						')*dt;';
					}
				}
				else if(el.dim > 1){
					for(var k=0; k<el.dim; k++){
						codigo+=			
						'\n\t'+el.nombre+'['+k+']='+el.nombre+'['+k+']+'+'(';
						
						var flujoIng=el.flujoIng;
						var flujoSal=el.flujoSal;
						
						for(var j=0; j<flujoIng.length-1;j++){
							codigo+=
							flujoIng[j]+'['+k+']+';
						}
						if(flujoIng.length>0){
							codigo+=
							flujoIng[flujoIng.length-1]+'['+k+']';
						}
						for(var j=0; j<flujoSal.length;j++){
							codigo+=
							'-'+flujoSal[j]+'['+k+']';
						}
						codigo+=
						')*dt;';
					}
				}
			}
		
		}
		codigo+=
		'\n'+'}';
		return codigo;
	},
	genCodigoMT: function(elmts){
		var el, codigo='';
		
		for(var i in this.pri){
			/*if($("#"+el.nombre+'_cb').is(':checked')){
				if(el.dim == 1){
					codigo+=
					'\n'+el.nombre+'_serie.push(roundDec('+el.nombre+',4));';
				}
				else if(el.dim > 1){
					for(var j=0; j<el.dim; j++){
						codigo+=
						'\n'+el.nombre+'_'+j+'_serie.push(roundDec('+el.nombre+'['+j+']'+',4));';
					}
				}
			}*/
			
			el = this.elmts[this.pri[i]];
			
			if(el.tipo=='vaaux' || el.tipo=='flujo'){
				if(el.dim == 1){
					codigo+=
					'\n'+el.nombre+'(t+Δ) = '+this.adapVector(el.defi)+';';
				}
				else if(el.dim > 1){
					var vector=this.sepVector(el.defi);
					for(var j=0; j<el.dim; j++){
						vector[j]=this.adapVector(vector[j]);
						codigo+=
						'\n'+el.nombre+'['+j+']='+vector[j]+';';
					}
				}
			}
			else if(el.tipo=='multi'){
				if(el.dim == 1){
					codigo+=
					'\n'+el.nombre+'(t+Δ) = '+el.nombre+'_func('+el.relacIng[0]+');';
				}
				else if(el.dim > 1){
					// Falta definir codigo para multiplicadores con dimensión mayor que uno.
				}
			}
			else if(el.tipo=='nivel'){
				if(el.dim == 1){
					if(el.cantFluIng > 0 || el.cantFluSal > 0){
						var ind=0;
						codigo+=
						'\n'+el.nombre+'(t+Δ) = '+el.nombre+'(t)+(';
						
						for(var j in el.flujoIng){
							codigo+=
							el.flujoIng[j].nombre;
							if(ind != (el.cantFluIng-1)){
								codigo+='+';
								console.log('+');
							}
							ind++;
						}
						for(var j in el.flujoSal){
							codigo+=
							'-'+el.flujoSal[j].nombre;
						}
						codigo+=
						')*Δ;';
					}
				}
				else if(el.dim > 1){
					for(var k=0; k<el.dim; k++){
						codigo+=			
						'\n'+el.nombre+'['+k+']='+el.nombre+'['+k+']+'+'(';
						
						var flujoIng=el.flujoIng;
						var flujoSal=el.flujoSal;
						
						for(var j=0; j<flujoIng.length-1;j++){
							codigo+=
							flujoIng[j]+'['+k+']+';
						}
						if(flujoIng.length>0){
							codigo+=
							flujoIng[flujoIng.length-1]+'['+k+']';
						}
						for(var j=0; j<flujoSal.length;j++){
							codigo+=
							'-'+flujoSal[j]+'['+k+']';
						}
						codigo+=
						')*dt;';
					}
				}
			}
		}
		return codigo;
	},
	simular: function(elmts){
		var codigo, tiempo, elseval;
		
		this.estaElementos();
		this.pri=this.estaPrioridad();
		codigo = this.genCodigoJS(elmts);
		this.series = {};
		elseval = {};
		tiempo;
		
		console.log(codigo);
		
		jQuery.globalEval(codigo);
		
		jQuery.globalEval('console.log(evo);');
		
		tiempo = eval('t_serie');
		this.series['tiempo'] = tiempo;
		
		var nombre;
		
		for(var i in elmts){
			nombre = this.elmts[elmts[i]].nombre+'_serie';
			elseval[elmts[i]] = eval(nombre);
		}
		this.series['elseval'] = elseval;
		
		return this.series;
	},
	
	load: function(modelFyN, viewer, divs, controls){
		var response = $.get(modelFyN, modelLoaded);
		this.viewer = viewer;
		function modelLoaded(data, textStatus, jqXHR){
			if(textStatus == 'success'){
				var model = response.responseXML;
				
				$(divs.param).empty();
				$(divs.vaaux).empty();
				$(divs.nivel).empty();
				$(divs.flujo).empty();
				$(divs.multi).empty();
				
				$(model).find('flujonivel').each(function(){
					$(this).children('param').each(function(){ 
						this.anaElem($(this), 'param');
					});
					$(this).children('vaaux').each(function(){ 
						this.anaElem($(this), 'vaaux');
					});
					$(this).children('nivel').each(function(){ 
						this.anaElem($(this), 'nivel');
					});
					$(this).children('flujo').each(function(){ 
						this.anaElem($(this), 'flujo');
					});
					$(this).children('multi').each(function(){ 
						this.anaElem($(this), 'multi');
					});
				});
				
				$(divs.accordion).accordion({ header: "h2",  collapsible: true});
				$(divs.accordion+' .ui-accordion-content').css('height', '470px');
				$(divs.accordion+' .ui-accordion-content').css('overflow-y', 'scroll'); 
				
				$(controls.ti).val(this.ti);
				$(controls.tf).val(this.tf);
				$(controls.dt).val(this.dt); 
				
				$(controls.ti).change(function(){
					this.ti=$(controls.ti).val();
					this.adapVisualizador();
					this.simular(this.viewer);
				});
				$(controls.tf).change(function(){
					this.tf=$(controls.tf).val();
					this.adapVisualizador();
					this.simular(this.viewer);
				});
				$(controls.dt).change(function(){
					this.dt=$(controls.dt).val();
					if(this.dt==0){
						this.dt=1;
					}
					this.adapVisualizador();
					this.simular(this.viewer);
				});
				
				this.estaElementos();
				this.pri=this.estaPrioridad();
				
				for(var i=0;i<this.elmts.length;i++){
					if(this.elmts[i].tipo=='param'){
						//$("#"+this.elmts[i].id).spinner({step: 0.01});
						//$("#"+this.elmts[i].id).addClass('ui-widget-content');
					}
					$("#"+this.elmts[i].id+"_cb").unbind();
					$("#"+this.elmts[i].id+"_cb").change(function(){
						this.simular(this.viewer);
						console.log('change');
					});
					$("#"+this.elmts[i].id+"_tx").unbind();
					$("#"+this.elmts[i].id+"_tx").change(function(){
						this.camDef($(this).attr('id'), $(this).val());
						this.simular(this.viewer);
					});
				};
			};
		};
	},
	esEstatico: function(elem){
		var estAct = false;
		var estAnt;
		if(elem.relacIng){
			for(var i=0; i<elem.relacIng.length; i++){
				estAnt=estAct;
				estAct=false;
				for(var j in this.param){
					if(elem.relacIng[i]==this.param[j].id){
						if((i!=0) && (!estAnt)){
							return false;
						}
						estAct=true;
						break;
					}
				}
				for(var j in estaticos){
					if(elem.relacIng[i]==this.estaticos[j]){
						if((i!=0) && (!estAnt)){
							return false;
						}
						estAct=true;
						break;
					}
				}
			}
		}
		return estAct;
	},
	sepVector: function(cadena){
		var llave=0;   	//[ ]
		var paren=0;	//( )
		var corche=0;	//{ }
		var ini=0;
		var fin=0;
		var vector=[];
		for(var i=0; i<cadena.length; i++){
			switch(cadena[i]){
				case '[':
					llave++;
				break;
				case ']':
					llave--;
				break;
				case '(':
					paren++;
				break;
				case ')':
					paren--;
				break;
				case '{':
					corche++;
				break;
				case '}':
					corche--;
				break;
				case ',':
					if(llave==1 && paren==0 && corche==0){
						ini=fin;
						fin=i;
						vector.push(cadena.substring(ini+1,fin));
					}
				break;
			}
		}
		ini=fin;
		fin=cadena.length-1;
		vector.push(cadena.substring(ini+1,fin));
		return vector;
	},
	adapVector: function(cadena){
		var j=0;
		var num;
		var val;
		/*var vCad=[];
		for(var i=0; i<cadena.length; i++){
			vCad.push(cadena[i]);
		}*/ 
		//falta definir función para numero con más de un digito
		
		for(var i=0; i<cadena.length; i++){
			if(cadena[i]=='['){
				for(j=i+1; j<cadena.length; j++){
					if(cadena[j]==']'){
						val=cadena.substring(i+1,j)
						if(isFinite(val)){
							num=parseInt(val);
							num--;
							cadena=cadena.substring(0,i+1)+num+cadena.substring(j,cadena.length);
						}
						i=j+1;
						j=cadena.length;
					}
					else if(cadena[j]=='['){
						i=j;
					}
				}
			}
		}
		return cadena;
	},
		
	camDef: function(idArg, valArg){
		for(var i=0; i<this.elmts.length;i++){
			if(this.elmts[i].id==idArg){
				this.elmts[i].defi=valArg;
				i=this.elmts.length;
			}
		}
	},
	reset: function(){
		this.elmts={};
	
		this.param={}, 		this.vaaux={},		this.vaexo={},
		this.nivel={},		this.flujo={},		this.retar={},		
		this.multi={}, 		this.elfis={}, 		this.vaant={},		
		this.submo={},  	this.copia={};
		
		this.estaticos={};
		this.pri, this.ti=0, this.tf=100, this.dt=1;
		this.viewer = '';
		
		if(this.chart){
			this.chart.destroy();
		}
		this.chart = undefined;
	}
});
