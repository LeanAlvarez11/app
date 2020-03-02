var p2 = false
var canvas = document.querySelector ("#canvas");
canvas.width= 600
canvas.height = 500
var ctx = canvas.getContext('2d');
var aux = {};
var auxw = {};
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
var ataqueEspada= {
	hp:100,
	rows: 1, 
	cols:5, 
	spriteWidth : 2834, 
	spriteHeight : 380,
	width: 2834/5,
	height: 380/1, 
	curFrame : 0,
	frameCount : 5, 
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
	spriteWidth : 1878, 
	spriteHeight : 350,
	width: 1878/6, 
	height: 350/1, 
	curFrame : 0,
	frameCount : 6, 
	x:300,
	y: (canvas.height /2 ) -150,
	srcX:0,
	srcY:0, 
	image: new Image(), 
}
var danioEnemigo = {
	hp:0,
	rows: 1, 
	cols: 6, 
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
var corazones=[];
var corazonesEnemigos=[];
var corazon;
var corazonEnemigo;
var juego="iniciando";
var sonidoEspada;
var sonidoInterferencia;
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
	corazon=new Image();
	corazon.src="logo.png";
	corazonEnemigo= new Image();
	corazonEnemigo.src="logo.png"
	fondo.src="fond.jpg";
	wachin.image.src = "theBoy3.png";
	malo.image.src = "spi.png";
	golpeEnemigo.image.src = "ataqueEnemigo.png";
	danioEnemigo.image.src = "danioEnemigo.png";
	ataqueEspada.image.src = "espadazo.png";
	sonidoEspada = document.createElement("audio")
	sonidoInterferencia = document.createElement("audio")
	sonidoEspada.setAttribute("src","sounds/sword.mp3")
	sonidoInterferencia.setAttribute("src","sounds/interference.mp3")
	document.getElementById("preg").style="display:inline";
	document.getElementById("canvasDiv").style="display:inline"
	fondo.onload= function(){
		var intervalo = window.setInterval(frameloop,1000/5);}
	}
	function dibujarFondo (){
		ctx.drawImage (fondo,0,0,600,500);
		ctx.fillStyle="red";
		ctx.font = "bold 2vh sans-serif";
		ctx.fillText("Score: "+ score,300,100);
		ctx.fillText("WACHIN HP: " +wachin.hp,100,40);
		ctx.fillText("OPA HP: " +malo.hp,420,40);
	}
	function actualizaCorazones(){
		if (juego=="iniciando"){
			for ()
		}
	}
	function dibujarCorazones(){
		let x=10;
		let y=40;
		let width=25;
		let height=25;
		for (i=0;i<10;i++){
			let enemigo = corazones[i]; 
			ctx.save();
			ctx.drawImage(corazon,x,y,width,height);
			x += 25;
		}
	}
	function dibujarCorazonesEnemigos(){
		let x=330;
		let y=40;
		let width=25;
		let height=25;
		for (i=0;i<10;i++){
			let enemigo = corazonesEnemigos[i]; 
			ctx.save();
			ctx.drawImage(corazonEnemigo,x,y,width,height);
			x += 25;
		}
	}
function pinia(){
	sonidoEspada.play()
	ataqueEspada.hp=wachin.hp
	auxw=wachin
	wachin=ataqueEspada
	setTimeout(function(){
		wachin=auxw
	},1000)
}
function patada(){
	sonidoEspada.play()
	ataqueEspada.hp=wachin.hp
	auxw=wachin
	wachin=ataqueEspada
	setTimeout(function(){
		wachin=auxw
	},1000)
}
function espada(){
	sonidoEspada.play()
	ataqueEspada.hp=wachin.hp
	auxw=wachin
	wachin=ataqueEspada
	setTimeout(function(){
		wachin=auxw
	},1000)
}
function cabeza(){
	sonidoEspada.play()
	ataqueEspada.hp=wachin.hp
	auxw=wachin
	wachin=ataqueEspada
	setTimeout(function(){
		wachin=auxw
	},1000)
}
function danioEnemigoo(){
	sonidoInterferencia.play()
	malo.hp-=10
	danioEnemigo.hp=malo.hp
	aux=malo
	malo=danioEnemigo
	setTimeout(function(){
	sonidoInterferencia.pause()
	malo=aux
	},1500)
}
function enemii(){
	racha=0;
	if (score>=20){
		score-=20;
	}
	else{
		score=0;
	}
	golpeEnemigo.hp=malo.hp
	aux=malo
	malo=golpeEnemigo
	setTimeout(function(){
	malo=aux
	},1500)
	wachin.hp-=10
}
 function jugando(){
	if (timer<0){
		document.getElementById("res").style.display ="none"
		timer = 10
		enemii()
		 setTimeout(function(){
			jugar(yaUsado)
		}, 1000)
		
		
	}
	if (juego.estado=="ganaste"){
		document.getElementById("texto").style="display:inline"
		textoRespuesta.titulo="Derrotaste a tu estupidez, bien ahi flaco"
		textoRespuesta.subtitulo="Tu Score final es: "+score+""
		document.getElementById("texto").innerHTML = "<p id='titulo'>"+textoRespuesta.titulo+"</p>"
		document.getElementById("texto").innerHTML += "<p id='subtitulo'>"+textoRespuesta.subtitulo+"</p>"
		document.getElementById("container").classList.remove("d-flex")
		document.getElementById("container").classList.add("d-none")
		document.getElementById("timer").style="display:none"	
	} 
	else if (juego.estado=="perdiste"){
		document.getElementById("texto").style="display:inline"
		textoRespuesta.titulo="Bueno.. al parecer tus papas son primos man"
		textoRespuesta.subtitulo="Tu Score final es: "+score+""
		document.getElementById("texto").innerHTML = "<p id='titulo'>"+textoRespuesta.titulo+"</p>"
		document.getElementById("texto").innerHTML += "<p id='subtitulo'>"+textoRespuesta.subtitulo+"</p>"			
		document.getElementById("container").classList.remove("d-flex")
		document.getElementById("container").classList.add("d-none")	
		document.getElementById("timer").style="display:none"	
	}
}
function frameloop(){
	dibujarFondo();
	dibujarCorazones()
	dibujarCorazonesEnemigos()
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
	if (timer>0){
	if(respuesta==rc){
		score+=10*(timer+racha);
		racha++
		if (respuesta==0){
			pinia();
			danioEnemigoo();

		}
		else if (respuesta==1){
			patada();
			danioEnemigoo();
		}
		else if (respuesta==2){
			espada();
			danioEnemigoo();

		}
		else if (respuesta==3){
			cabeza();
			danioEnemigoo();
		}
	}
	else {
		enemii();
	}
	}
	if (malo.hp<=0) {
		juego.estado="ganaste";
	}
	else if (wachin.hp<=0){
		juego.estado="perdiste";
	}
	document.getElementById("res").style.display ="none"
	setTimeout(function (){
		jugar(yaUsado);
	},1500)
}
document.getElementById("texto").style="display:none"
document.getElementById("preg").style="display:none"
document.getElementById("canvasDiv").style="display:none"

// loadMedia();