import React, {Component} from 'react';
import ChatItem from './../ChatItem/ChatItem';
import './SideNav.css';


class SideBar extends Component {

  constructor(props){
    super(props)
    this.keyCount = 0
  }

  newKey = () => {
    this.keyCount += 1
    return this.keyCount;
  }

  render() {
   
    return (

      <div className="Chats">
        <h1 className="ChatHeader">Groups</h1>   
               
          {this.props.chats.map((chat) => <ChatItem key={this.newKey()} toggleSearchMode={this.props.toggleSearchMode} chatName={chat} />)}
      </div>
    );
  }
}

export default SideBar;