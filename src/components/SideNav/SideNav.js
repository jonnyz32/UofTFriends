import React, {Component} from 'react';
import ChatItem from './../ChatItem/ChatItem';
import './SideNav.css';


class SideBar extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {chats: [{name: 'CSC309'},
  //                         {name: 'CSC311'},
  //                         {name: 'CSC300'},
  //                         {name: 'PHL245'},
  //                         {name: 'CSC343'}]};
  // }
  

  render() {
   
    return (
     
    <div className="chats">
       <h1 className="chatHeader">Chats</h1>
       {console.log("in sidenav ", this.props.searchMode)}
       
        {this.props.chats.map((chat) => <ChatItem toggleSearchMode={this.props.toggleSearchMode} searchMode={this.props.searchMode} chatName={chat.name} />)}
    </div>
     
    );
  }
}

export default SideBar;