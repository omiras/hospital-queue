const { time } = require('console');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var rn = require('random-number');
// Generar número aleatorio
const gen = rn.generator({
    min: 0
    , max: 999
    , integer: true
});

// Base de datos de usuarios
let usernames = []
// Turno actual
let currentUserTurn;

// Tiempo de duración de cada consulta, en segundos
let timePerPerson = 20;

// importar el paquete de terceros socket.io, y nos quedamos únicamente con el objeto 'Server'
const { Server } = require("socket.io");
// Crear una nueva instancia del objeto Server y le pasamos como parámetro nuestro servidor NodeJS
const io = new Server(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});

// Socket.io va a 'escuchar' los eventos de tipo 'connection', que son unos eventos que se emiten cuando un cliente (desde el navegador Web) accede a nuestra app
io.on('connection', (socket) => {

    // la propiedad id es el identificador único de cliente que Socket.io ha otorgado al cliente que se ha conectado
    console.log("Nuevo ID de usuario conectado: ", socket.id);
    console.log("Total de usuarios conectados: ", usernames)


    socket.once('pedir-turno', () => {
        let ticket = gen()
        usernames.push({
            id: socket.id,
            ticket: ticket
        });
        socket.emit('enviar-turno', ticket);
    });

    socket.on('es-mi-turno', () => {
        if (socket.id == currentUserTurn.id) {
            socket.emit('usuario-atendido');
        }
    })

});


setInterval(nextTurn, timePerPerson * 1000);

function nextTurn() {


    console.log("Ahora le toca a: ", usernames[0])

    io.emit("actualizar-cola", usernames);
    currentUserTurn = usernames.shift();

}




server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
});