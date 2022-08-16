console.log('Bienvenido a PIG');

// VARIABLES
let iniciar_juego = false;
let iniciarJuego = document.querySelector('#iniciaJuego');
let instrucciones = document.querySelector('#instrucciones');
let tirarDado = document.querySelector('#tirarDado');
let pasar_juego = document.querySelector('#pasarJuego');
let terminar_juego = document.querySelector('#terminarJuego');
let dadoImagen = document.querySelector('#dado_imagen');
let nombreJugador = document.querySelector('#nombre_form');
let agregarJugador = document.querySelector('#agregar_jugador');
let tablaJugadores = document.querySelector('#tabla_jugadores');
let tablaPuntos = document.querySelector('#tabla_puntos');
let dado = 6; // almacena el valor de cada tirada
let decision; // almacena la decisión de continuar jugando o no
let tablaDOM = document.querySelector('#contenedor_tabla');
let h2_tablaDOM = document.createElement('h2');
let index = 0;
let puntosInicio = [];
const puntosFinal = 50; // Puntuación a alcanzar
const jugadores = []; // Creamos array de jugadores
let tabla_Puntaje = []; // Tabla de puntajes
let tablaInicioJuego = document.querySelector('#inicio_juego');
let repetir_pj = document.querySelector('#repetir_jugador');

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
    let listaPuntos = document.createElement('li');
    listaPuntos.innerHTML = `${nombreJugador.value} ${jugadores[index].puntos} puntos`;
    tablaPuntos.appendChild(listaPuntos);
    tablaPuntos.className = 'tablaPuntuacion2'
    listaPuntos.className = 'tablaPuntuacion';
    nombreJugador.value = '';
}

function repetirJugadores(nombreJugador){
    jugadores.push(new jugador(nombreJugador));
    let listaJugadores = document.createElement('li');
    listaJugadores.innerHTML = nombreJugador;
    tablaJugadores.appendChild(listaJugadores);
    tablaJugadores.className = 'tablaPuntuacion2'
    listaJugadores.className = 'tablaPuntuacion';
    let listaPuntos = document.createElement('li');
    listaPuntos.innerHTML = `${nombreJugador} ${jugadores[index].puntos} puntos`;
    tablaPuntos.appendChild(listaPuntos);
    tablaPuntos.className = 'tablaPuntuacion2'
    listaPuntos.className = 'tablaPuntuacion';
}

function imprimirTabla(){
    tablaDOM.innerHTML = null;
    h2_tablaDOM.innerHTML = 'Tabla de posiciones';
    tablaDOM.appendChild(h2_tablaDOM);

    tabla_Puntaje.sort(function (a, b) {
        if (a.puntos < b.puntos) {
        return 1;
        }
        if (a.puntos > b.puntos) {
        return -1;
        }
        // a.puntos = b.puntos
        return 0;
    });
    for (const elemento of tabla_Puntaje){
        let lista = document.createElement('li');
        lista.innerHTML = `Jugador: ${elemento.nombre} Puntos: ${elemento.puntos}`;
        lista.className = 'tablaPuntuacion';
        tablaDOM.appendChild(lista);
    };
}

function agregarPuntaje(index){
    tablaPuntos.children[index+1].textContent = `${jugadores[index].nombre} ${jugadores[index].puntos} puntos`;
}

// EVENTOS
// Evento para mostrar instrucciones de juego
instrucciones.addEventListener('click', () => {
    // alert('Se decide que jugador debe empezar. El jugador empieza tira los dados. Si saca 2, 3, 4, 5, 6 acumula puntos y puede decidir si sigue jugando o pasa su turno. Si saca un 1, no gana puntuación e inmediatamente pasa el dado al siguiente jugador, perdiendo todos los puntos acumulados en ese turno. GANA EL JUGADOR QUE ALCANZA 50 PUNTOS')
    Swal.fire({
        title: 'Instrucciones',
        text: 'Se decide que jugador debe empezar. El jugador empieza tira los dados. Si saca 2, 3, 4, 5, 6 acumula puntos y puede decidir si sigue jugando o pasa su turno. Si saca un 1, no gana puntuación e inmediatamente pasa el dado al siguiente jugador, perdiendo todos los puntos acumulados en ese turno. GANA EL JUGADOR QUE ALCANZA 50 PUNTOS',
        icon: 'info',
        // confirmButtonText: ''
    })
})

// Evento para agregar jugador
agregarJugador.addEventListener('click', agregarJugadores);

// Evento para pasar el turno
pasar_juego.addEventListener('click', ()=>{
    console.log('click en pasar turno')
    if (iniciar_juego == true){
        jugadores[index].seguirJugada = false;
        // alert(`Cambio de turno, el jugador ${jugadores[index].nombre} pasó el turno`);
        Toastify({
            text: `Cambio de turno, el jugador ${jugadores[index].nombre} pasó el turno`,
            duration: 2000,
            gravity: 'bottom',
            position: 'right'
        }).showToast();
        puntosInicio[index] = jugadores[index].puntos;
        index++;
        if(index >= jugadores.length){
            index = 0;
        }
        allTrue(jugadores);
    } 
});

// Evento para terminar juego
terminar_juego.addEventListener('click', (e)=>{
    e.preventDefault;
    console.log('click en salir');
    iniciar_juego = false;
    imprimirTabla();
});

// Evento para iniciar juego
iniciarJuego.addEventListener('click', (e)=>{
    e.preventDefault;
    console.log('click en iniciar');
    local_storage('nombreJugadores', JSON.stringify(jugadores));
    iniciar_juego = true;
    for(i = 0; i < jugadores.length; i++){
        puntosInicio[i] = jugadores[i].puntos;
    }
    tablaInicioJuego.className = 'visible';
});

// Evento tirar dado
tirarDado.addEventListener('click', function jugada(){
    console.log('Tirar dado');
    tabla_Puntaje = jugadores;
    if(iniciar_juego == true && index < jugadores.length){
        console.log('Iniciar juego');
        dado = arrojarDado();
        console.log(`Valor de la tirada: ${dado}`);
        if (dado != 1 && jugadores[index].puntos < puntosFinal && jugadores[index].seguirJugada == true){
            jugadores[index].puntos += dado;
            agregarPuntaje(index);
            console.log(`Jugador ${jugadores[index].nombre} tiene ${jugadores[index].puntos} puntos`);
        }else if (dado == 1){
            jugadores[index].puntos = puntosInicio[index];
            agregarPuntaje(index);
            index++;
            if(index >= jugadores.length){
                index = 0;
            }
            // alert(`Cambio de turno, obtuviste un 1`);
            Toastify({
                text: `Cambio de turno, obtuviste un 1`,
                duration: 2000,
                gravity: 'bottom',
                position: 'right'
            }).showToast();
        }
        if(index < jugadores.length && jugadores[index].puntos >= puntosFinal){
            puntosInicio[index] = jugadores[index].puntos;
            imprimirTabla();
        } 
    }
});

// Evento repetir Personajes
let repetir_personaje = [];
let repetir_switch = false;
repetir_pj.addEventListener('click', (e) => {
    e.preventDefault();

    // Extraer de localStorage
    repetir_personaje = JSON.parse(localStorage.getItem("nombreJugadores")) || null;
    repetir_personaje ? repetir_switch = true : repetir_switch = false ; 
    if (repetir_switch) {
        repetir_personaje.forEach(element => {
            repetirJugadores(element.nombre);
        });
        for(i = 0; i < jugadores.length; i++){
            puntosInicio[i] = jugadores[i].puntos;
        }
        iniciar_juego = true;
        tablaInicioJuego.className = 'visible';
    }else{
        // alert('no hay pj en base de datos');
        Swal.fire({
            title: 'Warning',
            text: 'No hay jugadores guardados en la base de datos',
            icon: 'error',
            // confirmButtonText: ''
        })
    }
} )

