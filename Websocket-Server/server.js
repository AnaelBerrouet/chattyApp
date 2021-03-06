// server.js

const express = require('express');
const WebSocket = require('ws');

const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


// Create the WebSockets server
const wss = new WebSocket.Server({ server});

//Utility function for assinging colors to users
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//Colors to be randomly assigned to users
const colorSchemes = [
  ['#FFA3B1', '#B5E2FA', '#EDDEA4', '#F7A072'],
  ['#2C514C', '#122932', '#95818D', '#E3C0D3'],
  ['#1B065E', '#FF87AB', '#FCC8C2', '#F5ECCD'],
  ['#B88E8D', '#34435E', '#60E1E0', '#6369D1'],
  ['#0B5351', '#00A9A5', '#4E8098', '#90C2E7'],
  ['#30C5FF', '#5C946E', '#80C2AF', '#A0DDE6']
]
const colors = colorSchemes[getRandomInt(colorSchemes.length)];

//Create a message building function to ease the process of creating messages
function genMsg(type, username, content) {
  return {
    type: type,
    username: username,
    content: content,
    id: uuidv4()
  }
}

// Broadcast to all function.
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  //Update count of connected users for all clients
  let content = {users: wss.clients.size}
  let data = genMsg('serverNotification-userCount','server', content)
  wss.broadcast(JSON.stringify(data))

  //Send 'New User' Notification to all clients (except for new user)
  content = 'New anonymous user has joined the chat!'
  data = genMsg('incomingNotification','server', content)
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });

  //Assign color to single user that logged on
  content = {color: colors[getRandomInt(4)]};
  data = genMsg('serverNotification-assignColor', 'server', content)
  ws.send(JSON.stringify(data));


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')

    //build client count message to list users
    let content = {users: wss.clients.size}
    let data = genMsg('serverNotification-userCount', 'server', content)
    wss.broadcast(JSON.stringify(data))

  });

  ws.on('message', (data) => {
    let msg = JSON.parse(data)

    msg.id = uuidv4();

    switch(msg.type) {
      case 'postMessage':
        msg.type = 'incomingMessage'
        wss.broadcast(JSON.stringify(msg))
        break;
      case 'postNotification':
        msg.type = 'incomingNotification'
        wss.broadcast(JSON.stringify(msg))
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + msg.type);
    }
  })
});