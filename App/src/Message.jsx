import React, {Component} from 'react';

//  <div class="message">
//    <span class="message-username">Anonymous1</span>
//    <span class="message-content">I won't be impressed with technology until I can download food.</span>
//  </div>

function Message({message}) {
  return (
    <div className="message">
      <span className="message-username">{message.username}</span>
      <span className="message-content">{message.content}</span>
    </div>
  );
}

export default Message;