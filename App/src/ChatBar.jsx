import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);

    // this._onChangeUsername = this._onChangeUsername.bind(this)
    this._onChangeMsg = this._onChangeMsg.bind(this)
    this._onKeyDownMsg = this._onKeyDownMsg.bind(this)
    this._onKeyDownUsername = this._onKeyDownUsername.bind(this)
  }

  render() {
    return (
      <footer className="chatbar">

        <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyDown={this._onKeyDownUsername}/>

        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.props.content} onChange={this._onChangeMsg} onKeyDown={this._onKeyDownMsg}/>
      </footer>
    );
  }

  // _onChangeUsername(evt) {
  //   const username = evt.target.value;
  //   this.props.tx.setUser({username});

  // }

  _onChangeMsg(evt) {
    const content = evt.target.value;
    this.props.tx.setChatbarContent({content});

  }

  //send message to web server upon pressing enter
  _onKeyDownMsg(evt) {
    if(evt.keyCode == 13 && this.props.content !== '') {

      const username = this.props.username
      const content = evt.target.value
      const type = 'postMessage'

      this.props.tx.sendMsg({type, username, content})
      // evt.target.value = ''
      this.props.tx.setChatbarContent({chatbarContent: ''})
    }

  }

  //send username change notification upon pressing enter
  _onKeyDownUsername(evt) {
    if(evt.keyCode == 13) {

      //modify component and app internal state for current user and username properties

      this.props.tx.setUser({username: evt.target.value})

      //Set message package contents
      const username = this.props.username
      const content = `${this.props.username} has changed their name to ${evt.target.value}.`
      const type = 'postNotification'

      //send notification to server to be broadcast to all clients
      this.props.tx.sendMsg({type, username, content})
    }

  }

}


export default ChatBar;