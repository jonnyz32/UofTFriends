import React from 'react';
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
		if (this.state.message !== "") {
			await this.props.addMessages(this.props.currentChat, this.state.name, this.props.userID, this.state.message)
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
		})
	}

	render() {
		return (
			<div className='messagesBox'>
				<Texts filterUsers={this.props.filterUsers} searchQuery={this.props.searchQuery} clickHandlerChat={this.props.clickHandlerChat} texts={this.props.currentUser.groups[this.props.currentChat].messages} currentUser={this.props.currentUser} currentChat={this.props.currentChat} />
				<span className="messageInputTray">
					<input className="messageInput" name="message" value={this.state.message} onChange={this.handleInputChange} placeholder="Enter a message..." type="text" />
					<button className="messageButton" onClick={this.message}> Send </button>
				</span>
			</div>
		)
	}
}

class Texts extends React.Component {

	reportMsg = (event) => {

		const msgString = event.target.parentNode.children[2].innerHTML
		let senderID, senderName, msgID = null

		this.props.texts.forEach(msgObject => {
			if (msgObject.text === msgString) {
				senderID = msgObject.senderID
				msgID = msgObject._id
				senderName = msgObject.sender
				return
			}
		});
		console.log(`Message ${msgString} sent by ${senderID} was reported!`)
		if (!senderID || !msgID) return

		// Write report to DB
		const report = {
			msgID: msgID,
			msgBody: msgString,
			senderID: senderID,
			senderName: senderName,
			groupID: this.props.currentChat
		}
		fetch("/reports", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(report),
		}).then(res => {
			if (res.status == 200) {
				alert("Message reported!")
			}
		}).catch(error => {
			console.log(error)
		})
	}

	render() {
		return (
			<div className="messages">
				{this.props.texts.map(text => {
					if (text.sender === this.props.currentUser.name) {
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
								<div onClick={async () => {
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
								<button className="reportButton" onClick={this.reportMsg}> Report </button>
							</div>
						)
					}
				})}
			</div>
		)
	}
}

export default Chat
