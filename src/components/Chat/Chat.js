import React, {Component} from 'react';
import ChatStyle from './Chat.css'

class Chat extends React.Component {

  constructor() {
    super()
    this.state = {
       name : this.props.currentUser.name,
       message : "",
       texts: [
           {
             sender: "Aziz",
             text: "Hello UofT student"
           },
           {
             sender: "Jonathan",
             text: "Hi back"
           }
         ]
    }
  }

  message = () => {
    const messageList = this.state.texts
    const newMessage = {sender: this.state.name, text: this.state.message}
    messageList.push(newMessage)
    this.setState ({
      texts : messageList
    });
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
            <input  name="message" value={this.state.message} onChange={this.handleInputChange} placeholder="message" type="text" />
            <button className="button" onClick={this.message}> send chat </button>

         </div>
        )
      }
    }

    class Texts extends React.Component {
          render() {
            return (
              <div>
                {/* <SearchBar searchMode={false}/> */}
              <ul className="messages">
                {this.props.texts.map(text => {
                  return (
                   <li key={text.sender}>
                     <div className="sender">
                       {text.sender}
                     </div>
                     <div className="text">
                       {text.text}
                     </div>
                   </li>
                 )
               })}
             </ul>
              </div>

            )
          }
        }

    export default Chat
