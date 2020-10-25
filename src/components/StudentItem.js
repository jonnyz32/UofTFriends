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
            <img className="Avatar" src={require('../images/Mobsquare.png')}></img>
            <p><strong>{this.props.name}</strong></p>
            <p>courses: {this.props.courses}</p>
            <p>program: {this.props.program}</p>
            <p>hobbies:  {this.props.hobbies}</p>
            <p>bio: {this.props.bio}</p>

        </div>
    
    );
  }
}

export default StudentItem;