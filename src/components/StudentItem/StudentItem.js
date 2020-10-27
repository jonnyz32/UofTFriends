import React, {Component} from 'react';
import './StudentItem.css';


class StudentItem extends Component {

// props student name, avatar, courses, program, hobbies, bio

// constructor(props) {
//     super(props);
//     this.props = {name: 'Jonathan Zak',
//                   courses: 'CSC300, CSC309, CSC311, CSC343, PHL245',
//                   program: 'Computer Science Specialist',
//                   hobbies: 'Rock climbing',
//                   bio: 'Third year cs student. Looking to meet some new people!'}
//   }


  render() {
   
    return (
        <div className="Student">
            <img className="Avatar" src={require('../../images/Mobsquare.png')}></img>
            <button onClick={() => this.props.addChat(this.props.name)}>Chat</button>
            <p><strong>{this.props.name}</strong></p>
            <p>courses: {this.props.courses.join(", ")}</p>
            <p>program: {this.props.program.join(", ")}</p>
            <p>hobbies:  {this.props.hobbies.join(", ")}</p>
            <p>bio: {this.props.bio}</p>
            

        </div>
    
    );
  }
}

export default StudentItem;