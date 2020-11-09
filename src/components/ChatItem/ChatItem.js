import React, {Component} from 'react';
import './ChatItem.css';


class ChatItem extends Component {

  render() {
   
    return (
      <div className="ChatItem" onClick={() => this.props.toggleSearchMode("chat", this.props.chatName.toUpperCase())}>
         <p>{this.props.chatName.toUpperCase()}</p>
      </div>
   
    );
  }
}

export default ChatItem;