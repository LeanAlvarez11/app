var p2 = false
var canvas = document.querySelector ("#canvas");
var ctx = canvas.getContext('2d');

var wachin= {
	hp:100,
	x:50,
	y: (canvas.height /2 ) -20,
	width:150,
	height:150,
	image:new Image(),
}
var malo={
	hp:100,
	x:400,
	y: (canvas.height /2 ) -20,
	width:150,
	height:150,
	image:new Image(),
}
var textoRespuesta={
	titulo:"",
	subtitulo:"",
}
var juego={
	estado:"jugando"
}
function loadMedia (){
	fondo= new Image();
	fondo.src="fondo.jfif";
	wachin.image.src= "pp.jpg";
	malo.image.src="opa.png"
	document.getElementById("canvasDiv").style="display:inline";
	fondo.onload= function(){
	var intervalo = window.setInterval(frameloop,1000/55);}
}
function dibujarFondo (){
	ctx.drawImage (fondo,0,0);
		ctx.fillStyle="red";
	ctx.font = "bold 22px sans-serif";
	ctx.fillText("Player 1 HP: " +wachin.hp,50,100);
	ctx.fillText("Player 2 HP: " +malo.hp,400,100);

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
	wachin.image.src="pp.jpg"
	},1000)
}
function cabeza(){
	//animacionCabeza
	wachin.x=400
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
	dibujarWachin(wachin);
	dibujarWachin(malo);
	actualizar();
	jugando()
}

loadMedia();