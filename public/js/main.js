// main.js for chat app

// thanks to Tamas Piros and Michael Mukhin
// http://socket.io/get-started/chat/
// http://www.tamas.io/simple-chat-application-using-node-js-and-socket-io/
// http://psitsmike.com/2011/09/node-js-and-socket-io-chat-tutorial/

// Moment.js for formatting dates
// http://momentjs.com/


// create new instance of global io() object
var socket = io();


// get template for new messages
var msgWrap = document.getElementById("msg-wrap");
var msgTemplate = msgWrap.querySelector(".msg-template");
msgWrap.removeChild(msgTemplate);

// prompt user for input
var nickname = prompt("What is your name?");

// get form elements from DOM
var chatForm = document.getElementById("msg-form");
var chatInput = chatForm.elements["new-msg"];
chatInput.focus();

// when form is submitted, validate the entry, add it to the DOM,
// and emit the "send chat" event
chatForm.onsubmit = function(e) {
	e.preventDefault();
	if (chatInput.value === "") return false;

	var now = Date.now();
	socket.emit("client new chat message", nickname, now, chatInput.value);
	printMessage(nickname, now, chatInput.value, false);
	chatInput.value = "";

	return false;
};


socket.on("connect", function() {
	console.log("You have successfully connected!  Welcome!");
	socket.emit("client register user", nickname);
});

socket.on("server new chat message", function(name, time, msg) {
	console.log("Another user sent a message!");
	printMessage(name, time, msg, false);
});

socket.on("server chat history", function(chatHistory) {
	for (var i = 0; i < chatHistory.length; i++) {
		var name = chatHistory[i].name;
		var time = chatHistory[i].time;
		var msg = chatHistory[i].msg;
		printMessage(name, time, msg, true);
	}
});

// get users wrap from DOM
var userList = document.querySelector(".user-list");

socket.on("server user list", function(allUsers) {
	userList.innerHTML = "";
	for (var i = 0; i < allUsers.length; i += 1) {
		var newItem = document.createElement("li");
		newItem.textContent = allUsers[i];
		userList.appendChild(newItem);
	}
});


// function for printing messages to the chat
function printMessage(name, time, msg, dim){
	var clone = msgTemplate.cloneNode(true);
	clone.querySelector(".username").textContent = name;
	clone.querySelector(".time").textContent = moment(time).format("h:mm:ss a");
	clone.querySelector(".msg").textContent = msg;

	if (dim) clone.style.opacity = "0.4"; // dim used for chat history

	msgWrap.appendChild(clone);
	clone.scrollIntoView(false); // scroll to bottom of page
}