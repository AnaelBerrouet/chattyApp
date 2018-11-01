import React, {Component} from 'react';
import Message from './Message.jsx'
import Notification from './Notification.jsx'


class MessageList extends Component {

  render() {

    const messages = this.props.messages.map( msg => {
      let message = null;
      switch(msg.type) {
        case 'incomingMessage':
          message = (<Message key={msg.id} message={msg}/>)
          break;
        case 'incomingNotification':
          message = (<Notification key={msg.id} message={msg}/>)
          break;
      }
      return message
    });

    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}

export default MessageList;