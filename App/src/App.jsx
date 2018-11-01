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
    //Scroll to bottom of screen
    this._scrollToBottom();

    //create websocket connected to socket server
    this.socket = new WebSocket('ws://localhost:3001');
    // this.socket = new WebSoket('ws://172.46.0.100:3001');

    //handle complete connection
    this.socket.onopen = () => {
      console.log('Connected to server')
    }

    //handle messages from the server (messages or notifications)
    this.socket.onmessage = (evt) => {

      //Ever message gets saved to the chat history (including server notification messages)
      console.log('Incoming Message...',evt.data)
      const newMsg = JSON.parse(evt.data)
      const messages = [...this.state.messages, newMsg]
      this.setState({messages});

      //Manage client app based on server notifications
      switch(newMsg.type) {
        case 'serverNotification-userCount':
          const {users} = newMsg.content
          this.setState({users})
          break;
        case 'serverNotification-assignColor':
          const {color} = newMsg.content
          this.setState({color})
          break;
        default:
          break;
      }

    }

    window.addEventListener('beforeunload', () => {
      this._sendMsg({
        type: 'postNotification',
        username: this.state.currentUser.name,
        content: this.state.currentUser.name + ' has disconnected.'
      })
    });

  }

  componentDidUpdate() {
    //Scroll to bottom of screen
    this._scrollToBottom();
  }

  render() {
    return (
      <div>
      <Navbar numUsers={this.state.users}/>
      <MessageList className='message-list' messages={this.state.messages} tx={this.tx} />
      <div ref={(bottomAnchor) => { this.messagesEnd = bottomAnchor; }}></div>
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

  _scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

}
export default App;
