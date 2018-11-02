# Chatty-App
=====================

A minimal and light weight single room chat server built with ReactJS. Features real-time multi-user chat and image url linking.
Built from the Lighthouse Labs [react boiler plate](github.com/lighthouse-labs/react-simple-boilerplate.git)

### Screenshots
![chat Screen](https://github.com/AnaelBerrouet/chattyApp/blob/master/App/build/Screen%20Shot%202018-11-01%20at%207.58.28%20PM.png)

![chat Screen with gif](https://github.com/AnaelBerrouet/chattyApp/blob/master/App/build/Screen%20Shot%202018-11-01%20at%207.49.57%20PM.png)

### Usage

Clone the app and install dependencies
```
git clone git@github.com:AnaelBerrouet/chattyApp.git
````
Install the dependencies for the server-side app and start the server.
```
cd chattyApp/Websocket-Server
npm install
npm start
```
Websocket server will be running on http://localhost:3001

Install the dependencies for the client-side app and start the server.
```
cd chattyApp/App
npm install
npm start
open http://localhost:3000
```

### Dependencies

##### Client-side App
* react
* webpack
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* babel
* babel-core
* [babel-loader](https://github.com/babel/babel-loader)
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* css-loader
* eslint
* eslint-plugin-react
* node-sass
* sockjs-client
* style-loader

##### Server-side App
* express
* uuid
* ws
