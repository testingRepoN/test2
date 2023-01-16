const { send } = require('process');

var app = require( 'express' )();
var http = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( http, {   cors: {
  origin:'*'}} );
//var ejs = require('ejs')
const PORT = 3000;

app.get( '/', function( req, res ) {
  res.render('Chat.ejs');
  });
  app.get( '/socket.io/socket.io.js', function( req, res ) {
    res.sendFile( '/socket.io/socket.io.js' );
    });

    http.listen( PORT, function() {
      console.log( 'listening on *:' + PORT );
      });
    io.on("connection", socket => {
  // either with send()
  console.log('data');
 // socket.send("Hello!");

  // or with emit() and custom event names
  socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on("msg", (data) => {
    console.log(data);
    socket.broadcast.emit('msg',data)
    socket.send(data)
  });
})
