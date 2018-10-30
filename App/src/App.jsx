import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

//</head>
//<body>
//<nav class="navbar">
//  <a href="/" class="navbar-brand">Chatty</a>
//</nav>

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }

    this._sendMsg = this._sendMsg.bind(this)

  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser} sendMsg={this._sendMsg} />
      </div>
    );
  }

  _sendMsg({username, content}) {
    const currentUser = {name: username}
    const newMsg = {id: this._randomId(), username, content}
    const messages = [...this.state.messages, newMsg]
    this.setState({
      currentUser,
      messages
    });
  }

  _randomId() {
    return Math.floor(Math.random() * Math.floor(1000))
  }

}
export default App;