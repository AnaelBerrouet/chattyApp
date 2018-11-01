import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import Navbar from './Navbar.jsx'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      chatbarContent: '',
      users: new Set(),
      color: 'black'
    }

    this._sendMsg = this._sendMsg.bind(this)
    this._setUser = this._setUser.bind(this)
    this._setChatbarContent = this._setChatbarContent.bind(this)

    this.tx = {
      sendMsg : this._sendMsg,
      setUser : this._setUser,
      setChatbarContent: this._setChatbarContent,
    }

  }

  componentDidMount() {
    //create websocket connected to socket server
    this.socket = new WebSocket('ws://localhost:3001');

    //handle complete connection
    this.socket.onopen = () => {
      console.log('Connected to server')
    }

    //handle messages from the server (messages or notifications)
    this.socket.onmessage = (evt) => {
      console.log('Incoming Message...',evt.data)
      const newMsg = JSON.parse(evt.data)
      const messages = [...this.state.messages, newMsg]
      this.setState({messages});

      if(newMsg.type === 'serverNotification-userCount') {
        const {users} = newMsg.content
        this.setState({users})
      }

      if(newMsg.type === 'serverNotification-assignColor') {
        const {color} = newMsg.content
        this.setState({color})

      }
    }

  }

  render() {
    return (
      <div>
      <Navbar numUsers={this.state.users}/>
      <MessageList messages={this.state.messages} tx={this.tx} />
      <ChatBar username={this.state.currentUser.name} content={this.state.chatbarContent} tx={this.tx}/>
      </div>
    );

  }

  _sendMsg({type, username, content}) {
    const newMsg = {type, username, content, color: this.state.color}
    this.socket.send(JSON.stringify(newMsg));

  }

  _setUser({username}) {
    const currentUser = {name: username};
    this.setState({currentUser})
  }

  _setChatbarContent({chatbarContent}) {
    this.setState({chatbarContent})
  }

}
export default App;
