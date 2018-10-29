import React, {Component} from 'react';

//  <div class="message">
//    <span class="message-username">Anonymous1</span>
//    <span class="message-content">I won't be impressed with technology until I can download food.</span>
//  </div>

function Message({username, content}) {
    return (
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>
    );
}

export default Message;