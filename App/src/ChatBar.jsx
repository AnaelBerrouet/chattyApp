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
    this._onKeyDownMsg = this._onKeyDownMsg.bind(this)
    this._onKeyDownUsername = this._onKeyDownUsername.bind(this)
  }

  render() {
    return (
      <footer className="chatbar">

        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.state.username} onChange={this._onChangeUsername} onKeyDown={this._onKeyDownUsername}/>

        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this._onChangeMsg} onKeyDown={this._onKeyDownMsg}/>
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

  _onKeyDownMsg(evt) {
    if(evt.keyCode == 13) {

      const username = this.state.username
      const content = this.state.content

      this.props.sendMsg({username, content})
      evt.target.value = ''
      this.setState({content: null})
    }

  }

  _onKeyDownUsername(evt) {
    if(evt.keyCode == 13) {
      const username = this.state.username

      this.props.setUser({username})
      this.setState({username: username})
    }

  }

}


export default ChatBar;