/**
 * Universal Simulcating
 */

const express = require('express');
const app = express();
const axios = require('axios');
const url = require('url');

let template = {'<>':'li','html':'${display_name} ${thumbnail_url}'};

async function makeTwitchRequest() {
 
	const config = {
		method: "get",
		url: "<twitch-url>",
		headers: { "client-id": "<twitch-client-id>", "Authorization": "<twitch-authorization-token>"}
	}

	try {
    	let res = await axios(config);

		 console.log("DATA: " + JSON.stringify(res.data));
		 return res;
	} catch(error) {
		console.error(error);
	}
}

// var spawn = require('child_process').spawn;
var fs = require('fs');

const server = require('http').createServer({	
},app);

const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', (req, res) => {

    res.send('Hello World!');

});

app.get('/twitch', (req, res) => {
	console.log("Waiting");

	makeTwitchRequest().then(
		function(res) {
			console.log("RESPONSE: " + JSON.stringify(res.data));
		}
	), function(error) {
		console.log("RESPONSE:" + error);
	}

	
});

io.on('connection', (socket) => {
	socket.on('chat message', (msg) => {
		io.emit("chat message", msg);
	  });
});


server.listen(8080, function(){
	console.log('https and websocket listening on *:8080');
 });