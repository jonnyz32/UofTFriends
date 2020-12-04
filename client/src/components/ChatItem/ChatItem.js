import React, { Component } from 'react';
import './ChatItem.css';


class ChatItem extends Component {

	
		// 	{
		// 	type: "GET",
		// 	url: "/Home",
		// 	data: { 
		// 		groupId: groupName
		// 	},
		// 	success: function(res) {
		// 		this.props.currentUser.groups[groupName] = res.body
		// 	},
		// 	error: function(result) {
		// 		alert('error');
		// 	}
		// });
	// }
	
	render() {

		return (
			<div className="ChatItem" onClick={async () => {
				// await this.props.getMessages(this.props.chatName.toUpperCase())
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