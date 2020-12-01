import React, { Component } from 'react';
import ChatStyle from './Chat.css'

class Chat extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: this.props.currentUser.name,
			message: "",
			texts: this.props.texts
		}
	}

	message = () => {
		const messageList = this.props.texts
		if (this.state.message != "") {
			const newMessage = { sender: this.state.name, text: this.state.message, iscurrentsender: true }

			messageList.push(newMessage)
			this.setState({
				texts: messageList,
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
		console.log("in chat", this.state.texts)
		return (
			<div className='messagesBox'>
				<Texts texts={this.props.texts} />
				<span className="messageInputTray">
					<input className="messageInput" name="message" value={this.state.message} onChange={this.handleInputChange} placeholder="message" type="text" />
					<button className="messageButton" onClick={this.message}> Send </button>
				</span>
			</div>
		)
	}
}

class Texts extends React.Component {

	render() {
		return (
			<div className="messages">
				{console.log("this.props.texts",this.props.texts)}
				{this.props.texts.map(text => {
					if (text.iscurrentsender) {
						return (
							<div key={text.sender}>
								<div className="currentUser sender">
									{text.sender}
								</div>
								<div className="currentUser text">
									{text.text}
								</div>
							</div>
						)
					}
					else {
						return (
							<div key={text.sender}>
								<div className="sender">
									{text.sender}
								</div>
								<div className="text">
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
