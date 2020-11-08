import React, {Component} from 'react';
import './StudentItem.css';


class StudentItem extends Component {

  render() {
   
    return (
        <div className="Student">
            <img className="Avatar" src={require('../../images/Mobsquare.png')} alt="profilePic"></img>
            <div className="StudentInfo">
              <span><h3>{this.props.name}</h3></span>
              <p>
                Courses: {this.props.courses.join(", ")} <br></br>
                Program: {this.props.program.join(", ")} <br></br>
                Hobbies: {this.props.hobbies.join(", ")} <br></br>
                Bio: {this.props.bio} <br></br>
              </p>
            </div>
            <button onClick={() => this.props.addChat(this.props.name)}>Chat</button>
        </div>
    
    );
  }
}

export default StudentItem;