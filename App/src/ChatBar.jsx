import React, {Component} from 'react';

//  <footer class="chatbar">
//    <input class="chatbar-username" placeholder="Your Name (Optional)" />
//    <input class="chatbar-message" placeholder="Type a message and hit ENTER" />
//  </footer>

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      username: this.props.currentUser.name
    }

    this._onChangeUsername = this._onChangeUsername.bind(this)
    this._onChangeMsg = this._onChangeMsg.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)
  }

  render() {
    return (
      <footer className="chatbar">

        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.state.username} onChange={this._onChangeUsername}/>

        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this._onChangeMsg} onKeyDown={this._onKeyDown}/>
      </footer>
    );
  }

  _onChangeUsername(evt) {
    const username = evt.target.value;
    this.setState({username});
  }

  _onChangeMsg(evt) {
    const content = evt.target.value;
    this.setState({content});
  }

  _onKeyDown(evt) {
    if(evt.keyCode == 13) {

      const username = this.state.username
      const content = this.state.content

      this.props.sendMsg({username, content})
      evt.target.value = ''
      this.setState({content: null})
    }
  }

}


export default ChatBar;