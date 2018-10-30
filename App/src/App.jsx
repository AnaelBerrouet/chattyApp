import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }

    this._sendMsg = this._sendMsg.bind(this)
    this._setUser = this._setUser.bind(this)

  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = () => {
      console.log('Connected to server')
    }

    this.socket.onmessage = (evt) => {
      const newMsg = JSON.parse(evt.data)
      const messages = [...this.state.messages, newMsg]
      this.setState({
        messages,
      });
    }

  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser} sendMsg={this._sendMsg} setUser={this._setUser}/>
      </div>
    );

  }

  _sendMsg({username, content}) {
    const newMsg = {username, content}
    let socketMsg = {type: 'message', msg: newMsg}
    this.socket.send(JSON.stringify(socketMsg));

  }

  _setUser({username}) {
    const currentUser = {name: username};
    this.setState({currentUser})
  }

  _randomId() {
    return Math.floor(Math.random() * Math.floor(1000))

  }

}
export default App;
