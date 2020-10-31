import React, {Component} from 'react';
import ChatStyle from './postregistration.css'

class PostRegistration extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name=target.name
  }

  selectMajor = (event) => {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  render() {
      return (
        <div className="backgroundContainer"> 
          <div className="profileContainer">
            <input name="textBox" value={this.state.name} onChange={this.handleInputChange} placeholder="Date of Birth" type="text" /> <br></br>
            <button className="profileButton" onClick={this.message}> Change Profile Picture</button> <br></br>
          </div>

          <h1> Before you begin using the website and making new friends, tell us a little bit about yourself! </h1>
          <img className="profilePicture" src={require('../../images/Mobsquare.png')}></img>

          <div className="descContainer">
            <div className= 'infoContainer'>
              I'm a <input name="textBox" value={this.state.message} onChange={this.handleInputChange} placeholder="Major" type="text" /> major, in my <input name="textBox" value={this.state.name} onChange={this.handleInputChange} placeholder="Year" type="text" /> year
            </div>

            <div className= 'coursesContainer'>
              This semester, I will take <input name="textBox" value={this.state.message} onChange={this.handleInputChange} placeholder="Courses" type="text" /> 
              <button className="uploadScheduleButton" onClick={this.message}> or upload Calendar File </button>
            </div>

            <div className= 'bioContainer'>
              My interests are <input name="textBox" value={this.state.message} onChange={this.handleInputChange} placeholder="Interests" type="text" />
            </div>
          </div>

          <button className="saveButton" onClick={this.message}> Continue </button>
        </div>
      )
    }
}

export default PostRegistration
