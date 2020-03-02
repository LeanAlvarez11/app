var p2 = false
var canvas = document.querySelector ("#canvas");
canvas.width= 600
canvas.height = 500
var ctx = canvas.getContext('2d');
var aux = {}
var wachin= {
	hp:100,
	rows: 1, 
	cols:4, 
	spriteWidth : 900, 
	spriteHeight : 350,
	width: 900/4,
	height: 350/1, 
	curFrame : 0,
	frameCount : 4, 
	x:50,
	y: (canvas.height /2 ) -150,
	srcX:0,
	srcY:0, 
	image: new Image(), 
}

var malo= {
	hp:100,
	rows: 1, 
	cols:10, 
	spriteWidth : 3130, 
	spriteHeight : 350,
	width: 3130/10, 
	height: 350/1, 
	curFrame : 0,
	frameCount : 10, 
	x:300,
	y: (canvas.height /2 ) -150,
	srcX:0,
	srcY:0, 
	image: new Image(), 
}
var golpeEnemigo = {
	hp:0,
	rows: 1, 
	cols: 5, 
	spriteWidth : 1565, 
	spriteHeight : 350,
	width: 1565/5, 
	height: 350/1, 
	curFrame : 0,
	frameCount : 5, 
	x:300,
	y: (canvas.height /2 ) -150,
	srcX:0,
	srcY:0, 
	image: new Image(), 
}
var score=0;
var timer=10;
var intervalo;
function timerr(){
intervalo=setInterval(function(){
	document.getElementById("timer").innerHTML =timer;
	timer--;
},1000)
}

document.getElementById("texto").style="display:none"
document.getElementById("preg").style="display:none"
document.getElementById("canvasDiv").style="display:none"
function updateFrame(perso){
	perso.curFrame = ++perso.curFrame % perso.frameCount; 
	perso.srcX = perso.curFrame * perso.width; 
	//ctx.clearRect(x,y,width,height);
}
// function updateFrameEnemi(){
// 	curFrameEnemi = ++curFrameEnemi % frameCountEnemi; 
// 	srcXEnemi = curFrameEnemi * widthEnemi;
// 	//ctx.clearRect(x,y,width,height);
// }

function draw(perso){
	updateFrame(perso);
	ctx.drawImage(perso.image,perso.srcX,perso.srcY,perso.width,perso.height,perso.x,perso.y,perso.width,perso.height);
}
// function drawEnemi(){
// 	updateFrameEnemi();
// 	ctx.drawImage(enemi,srcXEnemi,scrYEnemi,widthEnemi,heightEnemi,xEnemi,yEnemi,widthEnemi,heightEnemi);
// }
var racha=0;
var textoRespuesta={
	titulo:"",
	subtitulo:"",
}
var juego={
	estado:"jugando"
}
var respuestas = []
var preguntas = []
async function loadQuestions(valueRadio){
	document.getElementById("botones").style="display:none";
	let database
	loadMedia();
	switch(valueRadio){
		case "HTML":
			await firebase.database().ref('HTMLQuestion/').once('value')
		    .then(function(snapshot){
		        database = snapshot.val()
		        database.forEach(e=> preguntas.push(e.question))
		        database.forEach(e=> respuestas.push(e.answers.split(",")))
		    })
		  	break;
		case "CSS":
			await firebase.database().ref('CSSQuestion/').once('value')
		    .then(function(snapshot){
		        database = snapshot.val()
		        database.forEach(e=> preguntas.push(e.question))
		        database.forEach(e=> respuestas.push(e.answers.split(",")))
		    })
		  	break;
		case "JS":
			await firebase.database().ref('JSQuestion/').once('value')
		    .then(function(snapshot){
		        database = snapshot.val()
		        database.forEach(e=> preguntas.push(e.question))
		        database.forEach(e=> respuestas.push(e.answers.split(",")))
		    })
		  	break;
		default:
			console.log("Nunca debiste llegar aqui, ahora tomare tu alma")
	}
	jugar(yaUsado);
}
var rc;
function loadMedia (){
	fondo= new Image();
	fondo.src="fond.jpg";
	wachin.image.src = "theBoy3.png";
	malo.image.src = "spi.png";
	golpeEnemigo.image.src = "ataqueEnemigo.png"
	document.getElementById("preg").style="display:inline";
	document.getElementById("canvasDiv").style="display:inline"
	fondo.onload= function(){
		var intervalo = window.setInterval(frameloop,1000/3);}
	}
	function dibujarFondo (){
		ctx.drawImage (fondo,0,0,600,500);
		ctx.fillStyle="red";
		ctx.font = "bold 2vh sans-serif";
		ctx.fillText("Score: "+ score,300,100);
		ctx.fillText("WACHIN HP: " +wachin.hp,100,40);
		ctx.fillText("OPA HP: " +malo.hp,420,40);
	}
	function pinia(){
	//animacionPiña
	wachin.width=300
	setTimeout(function (){
		wachin.width=900/4
	},1000)
}
function patada(){
	//animacionPatada
	wachin.y=500
	setTimeout(function (){
		wachin.y=(canvas.height /2 ) -150
	},1000)
}
function espada(){
	wachin.image.src="ataqueEnemigo.png";
		setTimeout(function (){
		wachin.image.src="theBoy3.png";
	},1000)
}
function cabeza(){
	//animacionCabeza
	wachin.x=400
	setTimeout(function (){
		wachin.x=50
	},1000)
}
function enemii(){
	golpeEnemigo.hp=malo.hp
	aux=malo
	malo=golpeEnemigo
	setTimeout(function(){
	malo=aux
	},1500)
	wachin.hp-=10
}
function jugando(){
	if (timer<=0){
		comprobar()		
		jugar();
	}
	if (juego.estado=="ganaste"){
		document.getElementById("texto").style="display:inline"
		textoRespuesta.titulo="Derrotaste a tu estupidez, bien ahi flaco"
		textoRespuesta.subtitulo="Pulsa R para reiniciar"
		document.getElementById("texto").innerHTML = "<p id='titulo'>"+textoRespuesta.titulo+"</p>"
		document.getElementById("texto").innerHTML += "<p id='subtitulo'>"+textoRespuesta.subtitulo+"</p>"
		document.getElementById("container").classList.remove("d-flex")
		document.getElementById("container").classList.add("d-none")
		document.getElementById("timer").style="display:none"	
	} 
	else if (juego.estado=="perdiste"){
		document.getElementById("texto").style="display:inline"
		textoRespuesta.titulo="Bueno.. al parecer tus papas son primos man"
		textoRespuesta.subtitulo="Pulsa R para reiniciar"
		document.getElementById("texto").innerHTML = "<p id='titulo'>"+textoRespuesta.titulo+"</p>"
		document.getElementById("texto").innerHTML += "<p id='subtitulo'>"+textoRespuesta.subtitulo+"</p>"			
		document.getElementById("container").classList.remove("d-flex")
		document.getElementById("container").classList.add("d-none")	
		document.getElementById("timer").style="display:none"	
	}
}
function dibujarHp(){

}
function frameloop(){
	dibujarFondo();
	draw(wachin);
	draw(malo)
	// drawEnemi();
	jugando()
}

var yaUsado=[];
//jugar(yaUsado);

function jugar(asd){
	timer=10;
	clearInterval(intervalo)
	timerr()
	document.getElementById("res").style="display:inline"
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
		txt_respuestas+="<p id='l"+i+"' for='r"+i+"' onclick='comprobar("+i+")'>"+respuestas_ordenadas[i]+" </p>";
	}

	if (asd.indexOf(preguntas[indice_aleatorio])==-1){
	document.getElementById("pregunta").innerHTML = preguntas[indice_aleatorio];
	asd.push(preguntas[indice_aleatorio])
	document.getElementById("res").innerHTML=txt_respuestas;	
	}
	else{
		jugar(yaUsado)
	}
}
function comprobar(respuesta){
	if(respuesta==rc && timer>0){
		score+=10*(timer+racha);
		racha++
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
		racha=0;
		if (score>=20){
			score-=20;
		}
		else{
			score=0;
		}
		enemii();
	}
	if (malo.hp<=0) {
		juego.estado="ganaste";
	}
	else if (wachin.hp<=0){
		juego.estado="perdiste";
	}
	document.getElementById("res").style="display:none"
	setTimeout(function (){
	jugar(yaUsado);

},1500)
}
document.getElementById("texto").style="display:none"
document.getElementById("preg").style="display:none"
document.getElementById("canvasDiv").style="display:none"

// loadMedia();