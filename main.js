var p2 = false
var canvas = document.querySelector ("#canvas");
canvas.width= 600
canvas.height = 500
var ctx = canvas.getContext('2d');

var spriteWidth = 2016; 
var spriteHeight = 902; 

var rows = 1; 
var cols = 4; 


var width = spriteWidth/cols; 

var height = spriteHeight/rows; 

var curFrame = 0; 

var frameCount = 4; 

var x=0;
var y=0; 

var srcX=0; 
var srcY=0; 

var character = new Image(); 
			
character.src = "wachin.png";

function updateFrame(){
	

	curFrame = ++curFrame % frameCount; 

	srcX = curFrame * width; 

	//ctx.clearRect(x,y,width,height);
}

function draw(){
	
	updateFrame();
	
	ctx.drawImage(character,srcX,srcY,width,height,x,y,width,height);
}

var wachin= {
	hp:100,
	x:50,
	y: (canvas.height /2 ) -20,
	width:80,
	height:80,
	image: new Image()
}
var malo={
	hp:100,
	x:200,
	y: (canvas.height /2 ) -200,
	width:150,
	height:350,
	image:new Image(),
}
var textoRespuesta={
	titulo:"",
	subtitulo:"",
}
var juego={
	estado:"jugando"
}
var preguntas =[]
data[0].data.forEach(e=>preguntas.push(e.question.split(",")))
var respuestas=[]
data[0].data.forEach (e=>respuestas.push(e.answers.split(",")))


var rc;
function loadMedia (){
	fondo= new Image();
	fondo.src="fond.jpg";

	wachin.image.src= "wachin.png";
	malo.image.src="opa.png"
	document.getElementById("canvasDiv").style="display:inline";
	fondo.onload= function(){
		var intervalo = window.setInterval(frameloop,1000/55);}
	}
	function dibujarFondo (){
		ctx.drawImage (fondo,0,0);
		ctx.fillStyle="red";
		ctx.font = "bold 2vh sans-serif";
		ctx.fillText("Player 1 HP: " +wachin.hp,50,40);
		ctx.fillText("Player 2 HP: " +malo.hp,200,40);

	}
	function dibujarWachin (pj){
		ctx.save();
		ctx = canvas.getContext('2d');
		ctx.drawImage(pj.image, 
			pj.x, 
			pj.y,
			pj.width, pj.height)
		ctx.restore();
	}
	function pinia(){
	//animacionPiña
	wachin.width=300
	setTimeout(function (){
		wachin.width=150
	},1000)
}
function patada(){
	//animacionPatada
	wachin.height=500
	setTimeout(function (){
		wachin.height=150
	},1000)
}
function espada(){
	//animacionEspada
	wachin.image.src="opa.png"
	setTimeout(function (){
		wachin.image.src="wachin.png"
	},1000)
}
function cabeza(){
	//animacionCabeza
	wachin.x=200
	setTimeout(function (){
		wachin.x=50
	},1000)
}
function actualizar(){
	var respuesta = $("input[type=radio]:checked").val()
	if (respuesta==1){
		pinia();
		malo.hp-=10

	}
	else if (respuesta==2){
		patada();
		malo.hp-=10
	}
	else if (respuesta==3){
		espada();
		malo.hp-=10
	}
	else if (respuesta==4){
		cabeza();
		malo.hp-=10
	}
	document.querySelector("input[type=radio]:checked").checked = false
	if (malo.hp<=0) {
		juego.estado="ganaste";
	}
	else if (wachin.hp==0){
		juego.estado="perdiste"	
	}
}
function jugando(){
	if (juego.estado=="ganaste"){
		textoRespuesta.titulo="Derrotaste a tu estupidez, bien ahi flaco"
		textoRespuesta.subtitulo="Pulsa R para reiniciar"
		document.getElementById("texto").innerHTML = "<p id='titulo'>"+textoRespuesta.titulo+"</p>"
		document.getElementById("texto").innerHTML += "<p id='subtitulo'>"+textoRespuesta.subtitulo+"</p>"
		document.getElementById("canvas").style.display = "none"
		document.getElementById("res").style.display = "none"
	}
	else if (juego.estado=="perdiste"){
		textoRespuesta.titulo="Bueno.. al parecer tus papas son primos man"
		textoRespuesta.subtitulo="Pulsa R para reiniciar"
		ctx.fillStyle="white";
		ctx.font="Bold 40pt Arial"
		document.getElementById("texto").innerHTML(textoRespuesta.titulo)
		ctx.font="14pt Arial";
		document.getElementById("texto").innerHTML(textoRespuesta.subtitulo)			
		document.getElementById("canvasDiv").style="display:none"
		document.getElementById("res").style.display = "none"
	}
}
function dibujarHp(){

}
function frameloop(){
	dibujarFondo();
	draw()
	dibujarWachin(wachin);
	dibujarWachin(malo);
	// actualizar();
	jugando()
}

jugar();


function jugar(){
	var indice_aleatorio = Math.floor(Math.random()*preguntas.length);
	var respuestas_posibles = respuestas[indice_aleatorio];

	var posiciones = [0,1,2,3];
	var respuestas_ordenadas= [];

	var ya=false;
	for (i in respuestas_posibles){
		var posicion_aleatoria = Math.floor(Math.random()*posiciones.length);
		if (posicion_aleatoria==0 && ya==false){
			rc=i;
			ya=true;
		}
		respuestas_ordenadas[i]=respuestas_posibles[posiciones[posicion_aleatoria]];
		posiciones.splice(posicion_aleatoria,1);
	}
	var txt_respuestas=""
	for (i in respuestas_ordenadas)
	{
		txt_respuestas+="<input type='radio' name='res' value='"+i+"' id='r"+i+"'><label for='r"+i+"'>"+respuestas_ordenadas[i]+"</label><br>";
	}
	document.getElementById("res").innerHTML=txt_respuestas;
	document.getElementById("pregunta").innerHTML = preguntas[indice_aleatorio];
}
function comprobar(){
	var respuesta = $("input[type=radio]:checked").val();
	if(respuesta==rc){
		if (respuesta==0){
			pinia();
			malo.hp-=10

		}
		else if (respuesta==1){
			patada();
			malo.hp-=10
		}
		else if (respuesta==2){
			espada();
			malo.hp-=10
		}
		else if (respuesta==3){
			cabeza();
			malo.hp-=10
		}
	}
	else{
		wachin.hp-=10
		
	}
	document.querySelector("input[type=radio]:checked").checked = false
	if (malo.hp<=0) {
		juego.estado="ganaste";
	}
	else if (wachin.hp==0){
		juego.estado="perdiste"	
	}
	jugar();
}

loadMedia();