console.log('Bienvenido a PIG - Por el momento es un juego para 2 personas');
// Variables
let dado;
const numeroJugadores = 2;
const puntosFinal = parseInt(prompt('Ingrese la cantidad de puntos que quiere definir como meta (Número): '));

class jugador{
    constructor(nombre){
        this.nombre = nombre;
        this.puntos = 0;
        this.inicio = 0;
        this.seguirJugada = true;
        this.salir = false;
    }
};

let jugador1 = new jugador(prompt('Nombre Jugador 1: '));
let jugador2 = new jugador(prompt('Nombre Jugador 2: '));

// Funciones
function arrojarDado(){
    const maxValue = 6;
    const minValue = 1;
    return Math.floor(Math.random() * ((maxValue - minValue + 1)) + minValue);
};

function primeroEnJugar(jugador){
    jugador.inicio = arrojarDado();
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

// Determinar que jugador es primero. 
// Esto se podría hacer de manera automátizada haciendo un array de objetos jugadores y recorriendolo
// Por el momento se realizará de manera manual
console.log('Se determinará de manera aleatoria que jugador empieza tirando los dados');
primeroEnJugar(jugador1);
primeroEnJugar(jugador2);

if (jugador1.inicio>jugador2.inicio){
    while(jugador1.puntos <= puntosFinal || jugador2.puntos <= puntosFinal ){
        if (jugador1.seguirJugada == true){
            console.log(`Es el turno del jugador ${jugador1.nombre}`);
            jugador1 = jugada(jugador1, jugador1.puntos);
            jugador2.seguirJugada = true;
        }else{
           console.log(`Es el turno del jugador ${jugador2.nombre}`);
           jugador2 = jugada(jugador2, jugador2.puntos);
           jugador1.seguirJugada = true;
        }
        if(jugador1.puntos >= puntosFinal){
            break;
        }else if(jugador2.puntos >= puntosFinal){
            break;
        }
        if(jugador1.salir == true || jugador2.salir ==true){
            console.log('Saliendo del juego...');
            break;
        }
    }
}else{
    while(jugador1.puntos <= puntosFinal || jugador2.puntos <= puntosFinal ){
        if (jugador2.seguirJugada == true){
            console.log(`Es el turno del jugador ${jugador2.nombre}`);
            jugador2 = jugada(jugador2, jugador2.puntos);
            jugador1.seguirJugada = true;
        }else{
            console.log(`Es el turno del jugador ${jugador1.nombre}`);
            jugador1 = jugada(jugador1, jugador1.puntos);
            jugador2.seguirJugada = true;
        }
        if(jugador1.puntos >= puntosFinal){
            break;
        }else if(jugador2.puntos >= puntosFinal){
            break;
        }
        if(jugador1.salir == true || jugador2.salir ==true){
            console.log('Saliendo del juego...');
            break;
        }
    }
};

