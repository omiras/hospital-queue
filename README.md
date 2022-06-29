# Turnos en el SOC

[Chuleta Socket.io](https://socket.io/docs/v4/emit-cheatsheet/)

## Requisito 1 - Pedir Turno y generar número de turno aleatório

### cliente.html
1. El usuario debe poder hacer clic en el botón "Pedir Turno"
2. Al hacer clic en "Pedit Turno", enviaremos un socket event de nombre 'pedir-turno'
3. Tras pedir turno, habría que deshabilitar el botón de "Pedir Turno"

### server.js
1. El servidor debe poder escuchar el evento 'pedir-turno' de cualquier cliente
2. El servidor debe generar un número de ticket aleatorio. Podéis utilizar este paquete de terceros: https://www.npmjs.com/package/random-number
3. En el array usernames, buscar el usuario cuyo id==socket.id; y asociarle el número de ticket. A esta nueva propiedad le podemos llamar **ticket**
4. Debemos informar al cliente de su número de ticket. Lo podemos hacer emitiendo un evento, solo al cliente mediante **socket.emit**. Podemos llamar al evento 'enviar-numero-turno'

### cliente.html
1. El cliente debe recibir el evento 'enviar-numero-turno'; y ponerlo en la parte apropiada del DOM
