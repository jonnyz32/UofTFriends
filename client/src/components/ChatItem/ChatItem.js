import React, { Component } from 'react';
import './ChatItem.css';


class ChatItem extends Component {

	render() {

		return (
			<div className="ChatItem" onClick={async () => {
				console.log("chat item key is", this.props.id)
				await this.props.getMessages(this.props.id)
				this.props.toggleSearchMode("chat", this.props.id)
				
				}}>
				<p>{this.props.chatName.toUpperCase()}</p>
			</div>

		);
	}
}

export default ChatItem;