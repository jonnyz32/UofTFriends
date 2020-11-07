import React, {Component} from 'react';
import './ChatItem.css';


class ChatItem extends Component {

  render() {
   
    return (
      <div className="ChatItem">
         <p onClick={() => this.props.toggleSearchMode(this.props.searchMode)}>{this.props.chatName.toUpperCase()}</p>
      </div>
   
    );
  }
}

export default ChatItem;