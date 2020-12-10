import React, { Component } from 'react';
import ChatStyle from './Chat.css'

class Chat extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: this.props.currentUser.name,
			message: "",
		}
	}



	message = async () => {
		const messageList = this.props.texts
		if (this.state.message != "") {
			await this.props.addMessages(this.props.currentChat, this.state.name, this.props.userID,this.state.message)
			const newMessage = { sender: this.state.name, text: this.state.message, iscurrentsender: true }
			messageList.push(newMessage)
			this.setState({
				message: ""
			});
		}
	}

	handleInputChange = (event) => {
		const target = event.target
		const value = target.value
		const name = target.name

		this.setState({

			[name]: value
		}

		)
	}


	render() {
		console.log("in chat props text", this.props.currentUser.groups[this.props.currentChat].messages)
		return (
			<div className='messagesBox'>
				<Texts filterUsers={this.props.filterUsers} searchQuery={this.props.searchQuery} clickHandlerChat={this.props.clickHandlerChat} texts={this.props.currentUser.groups[this.props.currentChat].messages} currentUser={this.props.currentUser} />
				<span className="messageInputTray">
					<input className="messageInput" name="message" value={this.state.message} onChange={this.handleInputChange} placeholder="Enter a message..." type="text" />
					<button className="messageButton" onClick={this.message}> Send </button>
				</span>
			</div>
		)
	}
}

class Texts extends React.Component {

	render() {

		console.log("this.props.texts", this.props.currentUser.name)
		console.log("this.props.texts",this.props.texts)
		return (
			<div className="messages">
				{this.props.texts.map(text => {
					if (text.sender == this.props.currentUser.name) {
						return (
							<div key={text.sender} className="userMsgContainer">
								<div className="msgSender">
									{text.sender}
								</div>
								<div className="msgText">
									{text.text}
								</div>
							</div>
						)
					}
					else {
						console.log(text.senderID)
						return (
							<div key={text.sender} className="msgContainer">
							<div onClick={async ()=>{
								// this.props.searchQuery = text.sender
								// this.props.filterUsers()
								this.props.clickHandlerChat()

							}} className="msgSenderPic">
								hello
							</div>
								<div className="msgSender">
									{text.sender}
								</div>
								<div className="msgText">
									{text.text}
								</div>
							</div>
						)
					}
				})}
			</div>
		)
	}
}

export default Chat
