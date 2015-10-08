// index.js for chat app!

// express server
var express = require("express");
var app = express();

// serve files in the public folder 
var path = require("path");
var publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// start server and socket.io connection
var port = process.env.PORT || 8080; // for deploying to heroku
var server = app.listen(port);
var io = require("socket.io")(server);

var allUsers = [];
var chatHistory = [];
io.on("connection", function(socket) {

	// New connection setup
	var nickname = "";
	console.log("New user has connected!");
	socket.emit("server chat history", chatHistory);

	socket.on("client register user", function(name) {
		nickname = name;
		// Update user list and notify clients
		allUsers.push(name);
		io.emit("server user list", allUsers);
		// Add connect message to history and send it to clientss
		var message = name + " has connected!";
		var now = Date.now();
		chatHistory.push({name: "SERVER", time: now, msg: message})
		io.emit("server new chat message", "SERVER", now, message);
	});

	socket.on("client new chat message", function(name, time, msg) {
		console.log("%s has set a new message recieved: %s.", name, msg);
		chatHistory.push({name: name, time: time, msg: msg});
		socket.broadcast.emit("server new chat message", name, time, msg);
	});

	socket.on("disconnect", function() {
		console.log("a user has left!");
		// Remove the user from the user list and update the remaining clients
		var index = allUsers.indexOf(nickname);
		allUsers.splice(index, 1);
		io.emit("server user list", allUsers);
		// Send a disconnect message to the clients
		var message = nickname + " has disconnected.";
		var now = Date.now();
		chatHistory.push({name: "SERVER", time: now, msg: message})
		io.emit("server new chat message", "SERVER", now, message);
	});
});

