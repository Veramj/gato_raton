var lienzo = document.getElementById('lienzo'); // mando a llamar a mi etiqueta canvas 
var ctx = lienzo.getContext("2d");

function app() {
    const gato = 
    {
        estados: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        ancho: lienzo.width = '500',
        alto: lienzo.height = '500',
        jugadorActual: 1, // 1 para azul, 2 para rojo
        colores: ["green", "yellow"], // Colores de los jugadores
        regilla: function () {
            lienzo.style.backgroundColor = "#9996";

            ctx.fillStyle = "black";
            ctx.fillRect(200, 100, 3, 300);

            ctx.fillStyle = "black";
            ctx.fillRect(300, 100, 3, 300);

            ctx.fillStyle = "black";
            ctx.fillRect(100, 200, 300, 3);

            ctx.fillStyle = "black";
            ctx.fillRect(100, 300, 300, 3);
        },
        esenario: function () {

        },
        seleccionar: function (event) {
            // Definir el tamaño de celda y el desplazamiento
            var cellSize = 100;
            var offsetX = 100;
            var offsetY = 100;
        
            var x = event.offsetX;
            var y = event.offsetY;
        
            // Calcular la fila y la columna basadas en la posición del clic
            var fila = Math.floor((y - offsetY) / cellSize) + 1;
            var columna = Math.floor((x - offsetX) / cellSize) + 1;
        
            console.log(`x=${x} y=${y} posición ${fila * 3 - 2 + columna}`);
        
            if (this.estados[fila-1][columna-1] == 0) {
                // Actualizar el estado solo si la celda está vacía
                this.estados[fila-1][columna-1] = 1;
        
                // Pintar la celda con las coordenadas ajustadas
                ctx.fillStyle = "blue"; // Cambia el color según tu necesidad
                ctx.fillRect(columna * cellSize - cellSize + offsetX + 5, fila * cellSize - cellSize + offsetY + 5, 90, 90);

                // Pintar la celda con las coordenadas ajustadas y el color del jugador actual
                ctx.fillStyle = this.colores[this.jugadorActual - 1];
                ctx.fillRect(columna * cellSize - cellSize + offsetX + 5, fila * cellSize - cellSize + offsetY + 5, 90, 90);

                // Cambiar al siguiente jugador
                this.jugadorActual = this.jugadorActual === 1 ? 2 : 1;
            }
        },        
        activarEstado: function(event){
            return 1;
        },
        analizarJugador: function() {
            return this.jugadorActual;
        },
        play: function () {
            this.regilla();
            this.esenario();
            this.seleccionar();
            
        }
    }

    lienzo.addEventListener('mousedown', function (event) {
        gato.seleccionar(event);
    });

    // lienzo.addEventListener('mousedown', function (event) {
    //     app().activarEstado(event);
    // });

    lienzo.addEventListener("contextmenu", function(e){
        e.preventDefault(); // evita que aparezca el menu constextual
    })

    gato.play();
}

window.onload = function () {
    app();
}


// app().activarEstado();