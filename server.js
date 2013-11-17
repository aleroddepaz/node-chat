var http = require('http');
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);
var server = http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});
var io = require('socket.io').listen(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {
	layout : false
});
app.configure(function() {
	app.use(express.static(__dirname + '/public'));
});
app.get('/', function(req, res) {
	res.render('home.jade');
});

io.sockets.on('connection', function(socket) {
	socket.on('setNick', function(nick) {
		socket.set('nick', nick);
	});
	socket.on('sendMessage', function(message) {
		socket.get('nick', function(error, nick) {
			var data = {
				'message' : message,
				'nick' : nick
			};
			socket.broadcast.emit('message', data);
			console.log("user " + nick + " send this: " + message);
		});
	});
});
