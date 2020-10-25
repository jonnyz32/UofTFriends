import React, {Component} from 'react';
import ChatItem from './ChatItem';
import './SideBar.css';


class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {chats: [{name: 'Chats'},
                          {name: 'CSC309'},
                          {name: 'CSC311'},
                          {name: 'CSC300'},
                          {name: 'PHL245'},
                          {name: 'CSC343'}]};
  }
  

  render() {
   
    return (
     <div className="chats">
        {this.state.chats.map((chat) => <ChatItem chatName={chat.name} />)}
     </div>
    );
  }
}

export default SideBar;