console.log('Bienvenido a PIG');
// Variables
let dado;
const numeroJugadores = parseInt(prompt('Ingresar la cantidad de Jugadores (Número): '));
const puntosFinal = parseInt(prompt('Ingrese la cantidad de puntos que quiere definir como meta (Número): '));

class jugador{
    constructor(nombre){
        this.nombre = nombre;
        this.puntos = 0;
        this.seguirJugada = true;
        this.salir = false;
    }
};

// Creamos array de jugadores
const jugadores = [];
for (let i = 0; i < numeroJugadores; i++) {
    jugadores.push(new jugador(prompt(`Nombre Jugador ${i+1}: `)));
    
};

// Funciones
function arrojarDado(){
    const maxValue = 6;
    const minValue = 1;
    return Math.floor(Math.random() * ((maxValue - minValue + 1)) + minValue);
};

function allTrue(jugadores){
    for (let i = 0; i < jugadores.length; i++) {
        jugadores[i].seguirJugada = true;  
    };  
};

function jugada(jugador,puntosInicio){
    let dado;
    let decision;
    while(jugador.seguirJugada == true || jugador.puntos <= puntosFinal){
        dado = arrojarDado();
        console.log(`El valor obtenido en tu tirada es: ${dado}`);
        if(dado>1){
            jugador.puntos += dado;
            if(jugador.puntos < puntosFinal){
                decision = prompt('¿Seguir tirando dados? si o no (salir): ')
                if(decision == 'no'){
                    jugador.seguirJugada = false;
                    break;
                }
            }else{
                console.log(`El jugador ${jugador.nombre} ganó`);
                break;
            }
        }else{
            jugador.seguirJugada = false;
            jugador.puntos = puntosInicio;
            break;
        }
        if(decision == 'salir'){
            jugador.salir = true;
            break;
        }
    }
    console.log(`Los puntos del jugador ${jugador.nombre} son: ${jugador.puntos}`);
    return jugador;
};

// JUEGO
let = finalDelJuego = false;
let i = 0;
while(finalDelJuego == false){
    if (i >= jugadores.length) {
        i = 0;
    }

    if (jugadores[i].seguirJugada == true){
        console.log(`Es el turno del jugador ${jugadores[i].nombre}`);
        jugadores[i] = jugada(jugadores[i], jugadores[i].puntos);
        allTrue(jugadores);
        if(jugadores[i].puntos >= puntosFinal){
            finalDelJuego = true;
            break;
        }
        if(jugadores[i].salir == true){
            console.log('Saliendo del juego...');
            break;
        }
        i++;
    }else{
       console.log(`Es el turno del jugador ${jugadores[i].nombre}`);
       jugadores[i] = jugada(jugadores[i], jugadores[i].puntos);
       allTrue(jugadores);
       if(jugadores[i].puntos >= puntosFinal){
            finalDelJuego = true;
            break;
        }
        if(jugadores[i].salir == true){
            console.log('Saliendo del juego...');
            break;
        }
       i++;
    }
}

// Tabla de puntajes
let tablaPuntaje = jugadores;


tablaPuntaje.sort(function (a, b) {
    if (a.puntos < b.puntos) {
      return 1;
    }
    if (a.puntos > b.puntos) {
      return -1;
    }
    // a.puntos = b.puntos
    return 0;
  });

console.log(tablaPuntaje);

let tablaDOM = document.querySelector('#contenedor_tabla');
tablaDOM.innerHTML = null;

for (const jugador of jugadores){
    let lista = document.createElement('li');
    lista.innerHTML = `Jugador: ${jugador.nombre} Puntos: ${jugador.puntos}`;
    lista.className = 'tablaPuntuacion';
    tablaDOM.appendChild(lista);
};