# Chatty-App
=====================

A minimal and light weight single room chat server built with ReactJS. Features real-time multi-user chat and image url linking.
Built from the Lighthouse Labs [react boiler plate](github.com/lighthouse-labs/react-simple-boilerplate.git)

### Screenshots
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

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
open http://localhost:3000
```

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
