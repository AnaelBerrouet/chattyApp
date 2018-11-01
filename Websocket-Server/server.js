// server.js

const express = require('express');
const SocketServer = require('ws').Server;

const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


// Create the WebSockets server
const wss = new SocketServer({ server });

//Utility function for assinging colors to users
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//Colors to be randomly assigned to users
const colors = ['#ed5940', '#41e53b', '#4286f4', '#cc35dd']

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');


  //build client count message to list users
  const msgNewUser = {
    type: 'serverNotification-userCount',
    username: 'server',
    content: {
      users: wss.clients.size,
    },
    id: uuidv4()
  };
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(msgNewUser))
  });

  //build client count message to list users
  const msgAssignColor = {
    type: 'serverNotification-assignColor',
    username: 'server',
    content: {
      color: colors[getRandomInt(4)]
    },
    id: uuidv4()
  };
  ws.send(JSON.stringify(msgAssignColor));


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    //build client count message to list users
    const msgLostUser = {
      type: 'serverNotification-userCount',
      username: 'server',
      content: {
        users: wss.clients.size,
      },
      id: uuidv4()
    };
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(msgLostUser))
    });
  });

  ws.on('message', (data) => {
    let msg = JSON.parse(data)

    msg.id = uuidv4();

    switch(msg.type) {
      case 'postMessage':
        // console.log('postMessage')
        msg.type = 'incomingMessage'
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(msg))
        });
        break;
      case 'postNotification':
        // console.log('postMessage')
        msg.type = 'incomingNotification'
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(msg))
        });
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + msg.type);
    }
  })
});