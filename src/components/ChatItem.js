import React, {Component} from 'react';


class ChatItem extends Component {

  openChat = (chatName) => { 
    {console.log("You've clicked on ", {chatName})}
  }



  render() {
   
    return (
    <p onClick={() => this.openChat(this.props.chatName)}>{this.props.chatName}</p>
    );
  }
}

export default ChatItem;