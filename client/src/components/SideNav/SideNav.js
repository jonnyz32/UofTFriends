import React, { Component } from 'react';
import ChatItem from '../ChatItem/ChatItem';
import './SideNav.css';

class SideBar extends Component {

	constructor(props) {
		super(props)
		this.keyCount = 0
	}

	newKey = () => {
		this.keyCount += 1
		return this.keyCount;
	}

	render() {
		console.log("chats:", this.props.chats)
		let groupKeys = Object.keys(this.props.chats)
		console.log("group keys:", groupKeys)


		return (

			<div className="Chats">
				<h1 className="ChatHeader">Chats</h1>


				{groupKeys.map((groupKey) => <ChatItem key={groupKey} id={groupKey} getMessages={this.props.getMessages} currentUser={this.props.currentUser}
					toggleSearchMode={this.props.toggleSearchMode} chatName={this.props.chats[groupKey].name} />)}
			</div>
		);
	}
}

export default SideBar;