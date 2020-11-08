import React, {Component} from 'react';
import ChatStyle from './Chat.css'

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       name : this.props.currentUser.name,
       message : "",
       texts: [
           {
             sender: "Aziz",
             text: "Hello UofT student",
             iscurrentsender: false
           },
           {
             sender: "Jonathan",
             text: "Hi back",
             iscurrentsender: false
           }
         ]
    }
  }

  message = () => {
    const messageList = this.state.texts
    if(this.state.message !=""){
    const newMessage = {sender: this.state.name, text: this.state.message, iscurrentsender:true}

    messageList.push(newMessage)
    this.setState ({
      texts : messageList
    });
  }
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name=target.name

    this.setState({

      [name]:value
    }

    )
  }



      render() {
        return (
          <div className= 'messagesBox'>

            <Texts  texts={this.state.texts}/>
            <input className="messageInput"  name="message" value={this.state.message} onChange={this.handleInputChange} placeholder="message" type="text" />
            <button className="messageButton" onClick={this.message}> send chat </button>

         </div>
        )
      }
    }

    class Texts extends React.Component {
          render() {
            return (
              <div>
                {/* <SearchBar searchMode={false}/> */}
              <div className="messages">
                {this.props.texts.map(text => {
                  if(text.iscurrentsender) {
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
                 )}
               })}
             </div>
              </div>

            )
          }
        }

    export default Chat
