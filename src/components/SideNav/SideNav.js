import React, {Component} from 'react';
import ChatItem from './../ChatItem/ChatItem';
import './SideNav.css';


class SideBar extends Component {

  render() {
   
    return (

      <div className="Chats">
        <h1 className="ChatHeader">Groups</h1>       
          {this.props.chats.map((chat) => <ChatItem toggleSearchMode={this.props.toggleSearchMode} chatName={chat} />)}
      </div>
    );
  }
}

export default SideBar;