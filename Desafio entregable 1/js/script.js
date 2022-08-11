console.log('Bienvenido a PIG');

// VARIABLES
let tirar = document.querySelector('#iniciaJuego');
let instrucciones = document.querySelector('#instrucciones');
let dadoImagen = document.querySelector('#dado_imagen');
let nombreJugador = document.querySelector('#nombre_form');
let agregarJugador = document.querySelector('#agregar_jugador');
let tablaJugadores = document.querySelector('#tabla_jugadores');
// Creamos array de jugadores
const jugadores = [];

// DEFINICIÓN DE LA CLASE JUGADOR
class jugador{
    constructor(nombre){
        this.nombre = nombre;
        this.puntos = 0;
        this.seguirJugada = true;
        this.salir = false;
    }
};

// FUNCIONES
function arrojarDado(){
    const maxValue = 6;
    const minValue = 1;
    let valorDado = Math.floor(Math.random() * ((maxValue - minValue + 1)) + minValue);
    dadoImagen.src = `/img/dice_${valorDado}.jpg`;
    return valorDado;
};

function allTrue(jugadores){
    for (let i = 0; i < jugadores.length; i++) {
        jugadores[i].seguirJugada = true;  
    };  
};

function local_storage(clave, valor){
    localStorage.setItem(clave, valor);
}

function agregarJugadores(){
    jugadores.push(new jugador(nombreJugador.value));
    let listaJugadores = document.createElement('li');
    listaJugadores.innerHTML = nombreJugador.value;
    tablaJugadores.appendChild(listaJugadores);
    tablaJugadores.className = 'tablaPuntuacion2'
    listaJugadores.className = 'tablaPuntuacion';
    nombreJugador.value = '';
}

function jugar(jugador){
    this.preventDefault;

}

function pasarTurno(jugador){
    this.preventDefault;
}

function terminarJuego(jugador){
    this.preventDefault;
}

// EVENTOS
// Evento para mostrar instrucciones de juego
instrucciones.addEventListener('click', () => {
    alert('Se decide que jugador debe empezar. El jugador empieza tira los dados. Si saca 2, 3, 4, 5, 6 acumula puntos y puede decidir si sigue jugando o pasa su turno. Si saca un 1, no gana puntuación e inmediatamente pasa el dado al siguiente jugador, perdiendo todos los puntos acumulados en ese turno. GANA EL JUGADOR QUE ALCANZA 50 PUNTOS')
})

// Evento para agregar jugador
agregarJugador.addEventListener('click', agregarJugadores);

// Inicio Juego
tirar.addEventListener('click',function(e){
    e.preventDefault;

    // Guardo jugadores en local Storage
    local_storage('nombreJugadores', JSON.stringify(jugadores));
    // Puntuación a alcanzar
    const puntosFinal = 50;

    // JUEGO
    function jugada(jugador,puntosInicio){
        let dado;
        let decision;
        while(jugador.seguirJugada == true || jugador.puntos <= puntosFinal){
            dado = arrojarDado();
            console.log(`El valor obtenido en tu tirada es: ${dado}`);
            if(dado>1){
                jugador.puntos += dado;
                if(jugador.puntos < puntosFinal){
                    decision = prompt(`Jugador ${jugador.nombre} ¿Seguir tirando dados? si o no (salir): `)
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
    let h2_tablaDOM = document.createElement('h2');
    h2_tablaDOM.innerHTML = 'Tabla de posiciones';
    tablaDOM.appendChild(h2_tablaDOM);

    for (const jugador of jugadores){
        let lista = document.createElement('li');
        lista.innerHTML = `Jugador: ${jugador.nombre} Puntos: ${jugador.puntos}`;
        lista.className = 'tablaPuntuacion';
        tablaDOM.appendChild(lista);
    };
})





