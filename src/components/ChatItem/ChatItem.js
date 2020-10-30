import React, {Component} from 'react';
import './ChatItem.css';


class ChatItem extends Component {

  // openChat = (chatName) => { 
  //   {console.log("in openChat")}
  //   if (this.props.SearchMode){
  //     this.props.toggleSearchMode();
  //   }
  // }



  render() {
   
    return (
      <div className="chatItem">
        {console.log("in ChatItem ", this.props.searchMode)}
         <p onClick={() => this.props.toggleSearchMode(this.props.searchMode)}>{this.props.chatName}</p>
      </div>
   
    );
  }
}

export default ChatItem;