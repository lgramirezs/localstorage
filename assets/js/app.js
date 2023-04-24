//Variables

const listaTweets = document.getElementById('lista-tweets');




//eventListeners

eventListeners();

function eventListeners() {

	//se ejecuta cuando presione agregar tweet
	document.getElementById('formulario').addEventListener('submit', agregarTweet);

	//se ejecuta cuando presione borrar tweet
	listaTweets.addEventListener('click', borrarTweet );

	//se ejecuta una vez la página es recargada 
	document.addEventListener('DOMContentLoaded', imprimirTweets );

	
}





//Funciones
//esta función lee el tweet
function agregarTweet(e){
	e.preventDefault();
	//leer el tweet
	let tweet = document.getElementById('tweet').value;
	//validar que el fromulario no este vacio
	if(tweet === ''){
		alert('Debes agregar un tweet')
	}else{
		//llamado a función para registrar tweet
		registrarTweet(tweet);
	}
}

//esta funcion registra el tweet y lo muestra
function registrarTweet(tweet){
	//crear la sección para el tweet
	let row = document.createElement('li');
	row.textContent = tweet;
	row.classList = 'tweet';
	//crear el botón para eliminar 
	let boton = document.createElement('a');
	boton.textContent = 'Borrar';
	boton.classList = 'button u-full-width borrar-tweet';
	//agregar el tweet 
	listaTweets.appendChild(row);
	//agregar el botón
	row.appendChild(boton);
	document.getElementById('formulario').reset();
	//agregar al local storage
	agregarTweetLocalStorage(tweet);
}


//funcion para eliminar tweet
function borrarTweet(e){
	e.preventDefault();
	//delegations para ubicar la clase borrar-tweet 
	if(e.target.classList.contains('borrar-tweet')){
		e.target.parentElement.remove();
	}
	tweet = e.target.parentElement.textContent; 
	borrarTweetLocalStorage(tweet);
}


function agregarTweetLocalStorage(tweet){
	let tweets;
	tweets = obtenerTweetLocalStorage();
	tweets.push(tweet);
	localStorage.setItem('tweets', JSON.stringify(tweets));
}

//verificar si hay tweets en el local storage
function obtenerTweetLocalStorage(){
	let tweetsLS;
	if(localStorage.getItem('tweets') === null ){
		tweetsLS = [];
	}else{
		tweetsLS = JSON.parse(localStorage.getItem('tweets'));
	}
	return tweetsLS
}


function imprimirTweets(){
	let tweets;
	tweets = obtenerTweetLocalStorage();
	tweets.forEach( function(element) {
		
	    let row = document.createElement('li');
		row.textContent = element;
		row.classList = 'tweet';
		//crear el botón para eliminar 
		let boton = document.createElement('a');
		boton.textContent = 'Borrar';
		boton.classList = 'button u-full-width borrar-tweet';
		//agregar el tweet 
		listaTweets.appendChild(row);
		//agregar el botón
		row.appendChild(boton);
	
	});
}

//borrar tweets de localstorage
function borrarTweetLocalStorage(tweet){
	let tweets,tweetBorrar;
	//simplificar el tweet
	tweetBorrar= tweet.substring(0, tweet.length - 6);
	
	tweets = obtenerTweetLocalStorage();

	tweets.forEach( function(element, index) {
		if(element === tweetBorrar){
			tweets.splice(index,1)
		}
	});
	localStorage.setItem('tweets', JSON.stringify(tweets));
	
}

