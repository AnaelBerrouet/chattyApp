import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

//</head>
//<body>
//<nav class="navbar">
//  <a href="/" class="navbar-brand">Chatty</a>
//</nav>

class App extends Component {
  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList />
      <ChatBar />
      </div>
    );
  }
}
export default App;
