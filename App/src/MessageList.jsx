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

    const messages = this.props.messages.map( msg => (<Message key={msg.id} message={msg}/>));

    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}

export default MessageList;