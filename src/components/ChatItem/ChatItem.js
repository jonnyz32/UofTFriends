import React, {Component} from 'react';
import './ChatItem.css';


class ChatItem extends Component {

  render() {
   
    return (
      <div className="ChatItem">
         <p onClick={() => this.props.toggleSearchMode("chat", this.props.chatName)}>{this.props.chatName.toUpperCase()}</p>
      </div>
   
    );
  }
}

export default ChatItem;