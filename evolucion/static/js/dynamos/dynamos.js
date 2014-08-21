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
	return 0.5 * Math.log((1 + x) / (1 - x));
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
/*function int(x){
	return parseInt(utils.roundDec(x,10));
}*/
function INT(x){
	return parseInt(utils.roundDec(x,10));
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
			var ind=utils.roundDec(((x-x1)/dx),4);
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
			var ind=utils.roundDec(((x-x1)/dx),4);
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
			var ind=utils.roundDec(((x-x1)/dx),4);
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
function NUMEROACIERTOS(pob, pro){
	var successes = 0;
	var value;
	for(var i=1; i<=pob; i++){
		value = Math.random();
		if(value > (1-pro)){
			successes++;	
		}
	}
	return successes;
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
	return Math.floor(utils.roundDec(x,10));
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
	return utils.roundDec(x,0);
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
	init: function(lists){   
		this.elements={};
    this.static_elements={};
    
    if(lists){
  		this.parameter=lists.parameter,   this.auxiliary=lists.auxiliary,   this.exogenous=lists.exogenous,
      this.stock=lists.stock,           this.flow=lists.flow,             this.delay=lists.delay,   
      this.multiplier=lists.multiplier, this.fis=lists.fis,               this.previous=lists.previous,   
      this.submodel=lists.submodel,     this.clone=lists.clone;
		}
		
		this.priority;
		 
		this.it=0, this.ft=100, this.dt=1;
		
		this.series = {};
	},
	analyze: function(element, type){
		var element = new Object();
		element.children('id').each(function(){
			element.id = $(this).text();
		});
		element.children('dimension').each(function(){
			element.dimension = parseInt($(this).text());
		});
		element.children('definition').each(function(){
			element.definition = $(this).text();
		});
		element.children('description').each(function(){
			element.description = $(this).text();
		});
		element.children('flujos').each(function(){
			$(this).children('entran').each(function(){
				element.enteringFlow=[];
				$(this).children('ing').each(function(){
					element.enteringFlow.push($(this).text());
				});
			});
			$(this).children('salen').each(function(){
				element.leavingFlow=[];
				$(this).children('sal').each(function(){
					element.leavingFlow.push($(this).text());
				});
			});
		});
		element.children('conexiones').each(function(){
			$(this).children('entran').each(function(){
				element.enteringRels=[];
				$(this).children('ing').each(function(){
					element.enteringRels.push($(this).text());
				});
			});
			$(this).children('salen').each(function(){
				element.leavingRels=[];
				$(this).children('sal').each(function(){
					element.leavingRels.push($(this).text());
				});
			});
		});
		element.type = type;
		var div;
		switch(type){
			case 'parameter':
				sysDyn.parametros.push(element);
				div = '#divParametros';
			break;
			case 'auxiliary':
				sysDyn.auxiliares.push(element);
				div = '#divAuxiliares';
			break;
			case 'stock':
				sysDyn.niveles.push(element);
				div = '#divNiveles';
			break;
			case 'flow':
				sysDyn.flujos.push(element);
				div = '#divFlujos';
			break;
			case 'multiplier':
				sysDyn.multiplicadores.push(element);
				div = '#divMultiplicadores';
			break;
			
		}
		$('<div class="campo"></div>').html('<label for="'+element.id+'_tx"><input type="checkbox" id="'+element.id+'_cb"/>'+element.id+': </label><input id="'+element.id+'_tx" type="text" value="'+element.definition+'">').appendTo(div);
	},
	
	setElements: function(){
		this.elements={};
		for(var i in this.parameter){
			this.elements[this.parameter[i].id] = this.parameter[i];
		}
		for(var i in this.auxiliary){
			this.elements[this.auxiliary[i].id] = this.auxiliary[i];
		}
		for(var i in this.exogenous){
			this.elements[this.exogenous[i].id] = this.exogenous[i];
		}
		for(var i in this.stock){
			this.elements[this.stock[i].id] = this.stock[i];
		}
		for(var i in this.flow){
			this.elements[this.flow[i].id] = this.flow[i];
		}
		for(var i in this.delay){
			this.elements[this.delay[i].id] = this.delay[i];
		}
		for(var i in this.multiplier){
			this.elements[this.multiplier[i].id] = this.multiplier[i];
		}
		for(var i in this.fis){
			this.elements[this.fis[i].id] = this.fis[i];
		}
		for(var i in this.previous){
			this.elements[this.previous[i].id] = this.previous[i];
		}
		for(var i in this.submodel){
			this.elements[this.submodel[i].id] = this.submodel[i];
		}
	},
	setPriority: function(){
		var allowed_stack=[], standby_stack=[];
		var quantity = 0;
		for(var i in this.elements){
			standby_stack.push(i);
			quantity++;
		}
		
		while(allowed_stack.length < quantity){
			for(var i=0; i<standby_stack.length; i++){
				if(this.elements[standby_stack[i]].enteringRelsQua == 0){
					allowed_stack.push(standby_stack[i]);
					standby_stack.splice(i,1);
					i--;
				}
				else if(this.isAdmitted(this.elements[standby_stack[i]], allowed_stack)){
					allowed_stack.push(standby_stack[i]);
					standby_stack.splice(i,1);
					i--;
				}
			}
		}
		return allowed_stack;
	},
	isAdmitted: function(element, allowed_stack){
		var esAdm=true;
		var esAdmAct;
		var relIni;
		
		for(var i in element.enteringRels){
			esAdmAct=false;
			for(var j=0; j<allowed_stack.length; j++){
			  console.log('isAdmitted');
			  console.log(element);
				if(element.enteringRels[i].from.id == allowed_stack[j]){
					esAdmAct=true;
					j=allowed_stack.length;
				}
			}
			esAdm = (esAdm && esAdmAct);
			if(!esAdm){
				return false;
			}
		}
		return esAdm;
	},
	
	generateJS: function(evaluated){
		this.setElements();
    	this.priority=this.setPriority();
		
		var element;
		var code=
		'var t_serie=[];';
		
		for(var i in evaluated){
			element = this.elements[evaluated[i]];
			code+=
			'\n'+'var '+element.name+'_serie=[];';
		}
		
		code+=
		'\n'+
		'\n'+'var it='+this.it+';'+
		'\n'+'var ft='+this.ft+';'+
		'\n'+'var dt='+this.dt+';'+
		'\n'+'var t=it;'+
		'\n';
		for(var i in this.priority){
			/*if($("#"+element.name+'_cb').is(':checked')){
				if(element.dimension == 1){
					code+=
					'\n'+'var '+element.name+'_serie=[];';
				}
				else if(element.dimension > 1){
					for(var j=0; j<element.dimension; j++){
						code+=
						'\n'+'var '+element.name+'_'+j+'_serie=[];';
					}
				}
			}*/
			element = this.elements[this.priority[i]];
			
			if(element.type=='parameter' || element.type=='stock' || element.type=='flow' || element.type=='auxiliary'){
				/*if(isStatic(elements[priority[i]])){
					static_elements.push(elements[priority[i]].name);
				}*/
				code+=
				'\n'+'var '+element.name+'='+this.arrayAdapt(element.parser.parse(element.definition))+';';
			}
			else if(element.type=='multiplier'){
				if(element.dimension == 1){
					code+=
					'\n'+'var '+element.name+'_func='+this.arrayAdapt(element.parser.parse(element.definition))+';';
					code+=
					'\n'+'var '+element.name+'='+element.name+'_func('+element.enteringRels[0]+');';
				}
				else if(element.dimension > 1){
					// Falta definir code para multiplicadores con dimensión mayor que uno.
				}
			}
			else if(element.type=='delay'){
				var parameters = element.definition.substring(8,element.definition.length-1).split(',');
				var source     = parameters[0];
				var time       = parameters[1];
				var order      = parameters[2];
				var initial    = parameters[3];
				
				code+=
					'\n'+'var '+element.name+'_stock = [';
				for(var j=0; j<(order-1); j++){
					code+=
					initial+',';
				}
				code+=
					initial+']';
								
				code+=
					'\nvar '+element.name+'_flow  = [';
						
				for(var j=0; j<(order-1); j++){
					if(j==0){
						code+=
						'('+order+'/'+time+')'+'*('+source+'-'+element.name+'_stock['+j+']),';	
					}
					else{
						code+=
						'('+order+'/'+time+')'+'*('+element.name+'_stock['+(j-1)+']-'+element.name+'_stock['+(j)+']),';
					}
				}
				if(order==1){
					code+=
					'('+order+'/'+time+')'+'*('+source+'-'+element.name+'_stock['+order-1+'])];';	
				}
				else{
					code+=
					'('+order+'/'+time+')'+'*('+element.name+'_stock['+(order-2)+']-'+element.name+'_stock['+(order-1)+'])];';
				}
				
				code+=
				'\nvar '+element.name+'='+element.name+'_stock['+(order-1)+'];';
			}
		}
		
		code+=
		'\n'+
		'\n'+'while(t<=ft){';
		
		for(var i in evaluated){
			element = this.elements[evaluated[i]];
			code+=
			'\n\t'+element.name+'_serie.push('+element.name+');';
		}
		
		code+=
		'\n\t'+'t_serie.push(t);'+
		'\n\t'+'t=t+dt;';
		
		for(var i in this.priority){
			/*if($("#"+element.name+'_cb').is(':checked')){
				if(element.dimension == 1){
					code+=
					'\n\t'+element.name+'_serie.push(utils.roundDec('+element.name+',4));';
				}
				else if(element.dimension > 1){
					for(var j=0; j<element.dimension; j++){
						code+=
						'\n\t'+element.name+'_'+j+'_serie.push(utils.roundDec('+element.name+'['+j+']'+',4));';
					}
				}
			}*/
			
			element = this.elements[this.priority[i]];
			
			if(element.type=='auxiliary' || element.type=='flow'){
				if(element.dimension == 1){
					code+=
					'\n\t'+element.name+'='+this.arrayAdapt(element.parser.parse(element.definition))+';';
				}
				else if(element.dimension > 1){
					var vector=this.arrayConvert(element.parser.parse(element.definition));
					for(var j=0; j<element.dimension; j++){
						vector[j]=this.arrayAdapt(vector[j]);
						code+=
						'\n\t'+element.name+'['+j+']='+vector[j]+';';
					}
				}
			}
			else if(element.type=='multiplier'){
				if(element.dimension == 1){
					code+=
					'\n\t'+element.name+'='+element.name+'_func('+element.enteringRels[0]+');';
				}
				else if(element.dimension > 1){
					// Falta definir code para multiplicadores con dimensión mayor que uno.
				}
			}
			else if(element.type=='stock'){
				if(element.dimension == 1){
					if(element.enteringFlowQua > 0 || element.leavingFlowQua > 0){
						var ind=0;
						code+=
						'\n\t'+element.name+'='+element.name+'+(';
						
						for(var j in element.enteringFlow){
							code+=
							element.enteringFlow[j].name;
							if(ind != (element.enteringFlowQua-1)){
								code+='+';
								console.log('+');
							}
							ind++;
						}
						for(var j in element.leavingFlow){
							code+=
							'-'+element.leavingFlow[j].name;
						}
						code+=
						')*dt;';
					}
				}
				else if(element.dimension > 1){
					for(var k=0; k<element.dimension; k++){
						code+=			
						'\n\t'+element.name+'['+k+']='+element.name+'['+k+']+'+'(';
						
						var enteringFlow=element.enteringFlow;
						var leavingFlow=element.leavingFlow;
						
						for(var j=0; j<enteringFlow.length-1;j++){
							code+=
							enteringFlow[j]+'['+k+']+';
						}
						if(enteringFlow.length>0){
							code+=
							enteringFlow[enteringFlow.length-1]+'['+k+']';
						}
						for(var j=0; j<leavingFlow.length;j++){
							code+=
							'-'+leavingFlow[j]+'['+k+']';
						}
						code+=
						')*dt;';
					}
				}
			}
			else if(element.type=='delay'){
				var parameters = element.definition.substring(8,element.definition.length-1).split(',');
				var source     = parameters[0];
				var time       = parameters[1];
				var order      = parameters[2];
				var initial    = parameters[3];
								
				for(var j=0; j<order; j++){
					code+=
					'\n\t'+element.name+'_stock['+j+'] = '+ element.name+'_stock['+j+']+'+element.name+'_flow['+j+']*dt;';
					if(j==0){
						code+=
						'\n\t'+element.name+'_flow['+j+'] = '+ '('+order+'/'+time+')*('+source+'-'+element.name+'_stock['+j+']);';	
					}
					else{
						code+=
						'\n\t'+element.name+'_flow['+j+'] = '+ '('+order+'/'+time+')*('+element.name+'_stock['+(j-1)+']-'+element.name+'_stock['+j+']);';
					}
				}
				code+=
				'\n\t'+element.name+'='+element.name+'_stock['+(order-1)+'];';
			}
			
			
		}
		code+=
		'\n'+'}';
		return code;
	},
	generateMath: function(evaluated){
		this.setElements();
    	this.priority=this.setPriority();
		
		var element, code='';
		
		for(var i in this.priority){
			/*if($("#"+element.name+'_cb').is(':checked')){
				if(element.dimension == 1){
					code+=
					'\n'+element.name+'_serie.push(utils.roundDec('+element.name+',4));';
				}
				else if(element.dimension > 1){
					for(var j=0; j<element.dimension; j++){
						code+=
						'\n'+element.name+'_'+j+'_serie.push(utils.roundDec('+element.name+'['+j+']'+',4));';
					}
				}
			}*/
			
			element = this.elements[this.priority[i]];
			
			if(element.type=='auxiliary' || element.type=='flow'){
				if(element.dimension == 1){
					code+=
					'\n'+element.name+'(t+Δ) = '+this.arrayAdapt(element.definition)+';';
				}
				else if(element.dimension > 1){
					var vector=this.arrayConvert(element.definition);
					for(var j=0; j<element.dimension; j++){
						vector[j]=this.arrayAdapt(vector[j]);
						code+=
						'\n'+element.name+'['+j+']='+vector[j]+';';
					}
				}
			}
			else if(element.type=='multiplier'){
				if(element.dimension == 1){
					code+=
					'\n'+element.name+'(t+Δ) = '+element.name+'_func('+element.enteringRels[0]+');';
				}
				else if(element.dimension > 1){
					// Falta definir code para multiplicadores con dimensión mayor que uno.
				}
			}
			else if(element.type=='stock'){
				if(element.dimension == 1){
					if(element.enteringFlowQua > 0 || element.leavingFlowQua > 0){
						var ind=0;
						code+=
						'\n'+element.name+'(t+Δ) = '+element.name+'(t)+(';
						
						for(var j in element.enteringFlow){
							code+=
							element.enteringFlow[j].name;
							if(ind != (element.enteringFlowQua-1)){
								code+='+';
								console.log('+');
							}
							ind++;
						}
						for(var j in element.leavingFlow){
							code+=
							'-'+element.leavingFlow[j].name;
						}
						code+=
						')*Δ;';
					}
				}
				else if(element.dimension > 1){
					for(var k=0; k<element.dimension; k++){
						code+=			
						'\n'+element.name+'['+k+']='+element.name+'['+k+']+'+'(';
						
						var enteringFlow=element.enteringFlow;
						var leavingFlow=element.leavingFlow;
						
						for(var j=0; j<enteringFlow.length-1;j++){
							code+=
							enteringFlow[j]+'['+k+']+';
						}
						if(enteringFlow.length>0){
							code+=
							enteringFlow[enteringFlow.length-1]+'['+k+']';
						}
						for(var j=0; j<leavingFlow.length;j++){
							code+=
							'-'+leavingFlow[j]+'['+k+']';
						}
						code+=
						')*dt;';
					}
				}
			}
		}
		return code;
	},
	simulate: function(elements){
		var code, time, elseval;
		
		code = this.generateJS(elements);
		console.log(code);
		this.series = {};
		elseval = {};
		time;
		
		jQuery.globalEval(code);
		
		jQuery.globalEval('console.log(evo);');
		
		time = eval('t_serie');
		this.series['time'] = time;
		
		var name;
		
		for(var i in elements){
			name = this.elements[elements[i]].name+'_serie';
			elseval[elements[i]] = eval(name);
		}
		this.series['elseval'] = elseval;
		
		return this.series;
	},
	
	load: function(modelSAF, viewer, divs, controls){
		var response = $.get(modelSAF, modelLoaded);
		this.viewer = viewer;
		function modelLoaded(data, textStatus, jqXHR){
			if(textStatus == 'success'){
				var model = response.responseXML;
				
				$(divs.parameter).empty();
				$(divs.auxiliary).empty();
				$(divs.stock).empty();
				$(divs.flow).empty();
				$(divs.multiplier).empty();
				
				$(model).find('flujonivel').each(function(){
					$(this).children('parameter').each(function(){ 
						this.analyze($(this), 'parameter');
					});
					$(this).children('auxiliary').each(function(){ 
						this.analyze($(this), 'auxiliary');
					});
					$(this).children('stock').each(function(){ 
						this.analyze($(this), 'stock');
					});
					$(this).children('flow').each(function(){ 
						this.analyze($(this), 'flow');
					});
					$(this).children('multiplier').each(function(){ 
						this.analyze($(this), 'multiplier');
					});
				});
				
				$(divs.accordion).accordion({ header: "h2",  collapsible: true});
				$(divs.accordion+' .ui-accordion-content').css('height', '470px');
				$(divs.accordion+' .ui-accordion-content').css('overflow-y', 'scroll'); 
				
				$(controls.it).val(this.it);
				$(controls.ft).val(this.ft);
				$(controls.dt).val(this.dt); 
				
				$(controls.it).change(function(){
					this.it=$(controls.it).val();
					this.adapVisualizador();
					this.simulate(this.viewer);
				});
				$(controls.ft).change(function(){
					this.ft=$(controls.ft).val();
					this.adapVisualizador();
					this.simulate(this.viewer);
				});
				$(controls.dt).change(function(){
					this.dt=$(controls.dt).val();
					if(this.dt==0){
						this.dt=1;
					}
					this.adapVisualizador();
					this.simulate(this.viewer);
				});
				
				this.setElements();
				this.priority=this.setPriority();
				
				for(var i=0;i<this.elements.length;i++){
					if(this.elements[i].type=='parameter'){
						//$("#"+this.elements[i].id).spinner({step: 0.01});
						//$("#"+this.elements[i].id).addClass('ui-widget-content');
					}
					$("#"+this.elements[i].id+"_cb").unbind();
					$("#"+this.elements[i].id+"_cb").change(function(){
						this.simulate(this.viewer);
						console.log('change');
					});
					$("#"+this.elements[i].id+"_tx").unbind();
					$("#"+this.elements[i].id+"_tx").change(function(){
						this.changeDefinition($(this).attr('id'), $(this).val());
						this.simulate(this.viewer);
					});
				};
			};
		};
	},
	
	isStatic: function(element){
		var estAct = false;
		var estAnt;
		if(element.enteringRels){
			for(var i=0; i<element.enteringRels.length; i++){
				estAnt=estAct;
				estAct=false;
				for(var j in this.parameter){
					if(element.enteringRels[i]==this.parameter[j].id){
						if((i!=0) && (!estAnt)){
							return false;
						}
						estAct=true;
						break;
					}
				}
				for(var j in static_elements){
					if(element.enteringRels[i]==this.static_elements[j]){
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
	arrayConvert: function(text){
		var llave=0;   	//[ ]
		var paren=0;	//( )
		var corche=0;	//{ }
		var ini=0;
		var fin=0;
		var vector=[];
		for(var i=0; i<text.length; i++){
			switch(text[i]){
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
						vector.push(text.substring(ini+1,fin));
					}
				break;
			}
		}
		ini=fin;
		fin=text.length-1;
		vector.push(text.substring(ini+1,fin));
		return vector;
	},
	arrayAdapt: function(text){
		var j=0;
		var num;
		var val;
		/*var vCad=[];
		for(var i=0; i<text.length; i++){
			vCad.push(text[i]);
		}*/ 
		//falta definir función para numero con más de un digito
		
		for(var i=0; i<text.length; i++){
			if(text[i]=='['){
				for(j=i+1; j<text.length; j++){
					if(text[j]==']'){
						val=text.substring(i+1,j);
						console.log(val);
						if(isFinite(val)){
							num=parseInt(val);
							num--;
							text=text.substring(0,i+1)+num+text.substring(j,text.length);
						}
						i=j+1;
						j=text.length;
					}
					else if(text[j]=='['){
						i=j;
					}
				}
			}
		}
		return text;
	},
		
	changeDefinition: function(id, definition){
		for(var i=0; i<this.elements.length;i++){
			if(this.elements[i].id==id){
				this.elements[i].definition=definition;
				i=this.elements.length;
			}
		}
	},
	reset: function(){
		this.elements={};
	
		this.parameter={},  this.auxiliary={},  this.exogenous={},
		this.stock={},		  this.flow={},       this.delay={},		
		this.multiplier={}, this.fis={},        this.previous={},		
		this.submodel={},   this.clone={};
		
		this.static_elements={};
		this.priority, this.it=0, this.ft=100, this.dt=1;
		this.viewer = '';
		
		if(this.chart){
			this.chart.destroy();
		}
		this.chart = undefined;
	}
});