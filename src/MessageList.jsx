import React, {Component} from 'react';
import Message from './Message.jsx'

//<main class="messages">
//  <div class="message">
    // <span class="message-username">Anonymous1</span>
    // <span class="message-content">I won't be impressed with technology until I can download food.</span>
  // </div>
  // <div class="message system">
    // Anonymous1 changed their name to nomnom.
  // </div>
// </main>

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        <Message type="incomingMessage" username="anael" content="Whoopie"/>
      </main>
    );
  }
}

export default MessageList;