import React, {Component} from 'react';
import './ChatItem.css';


class ChatItem extends Component {

  openChat = (chatName) => { 
    {console.log("You've clicked on ", {chatName})}
  }



  render() {
   
    return (
      <div className="chatItem">
         <p onClick={() => this.openChat(this.props.chatName)}>{this.props.chatName}</p>
      </div>
   
    );
  }
}

export default ChatItem;