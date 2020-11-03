import React, {Component} from 'react';
import StudentItem from '../StudentItem/StudentItem';
import './../StudentItem/StudentItem.css';


class Students extends Component {

// props student name, avatar, courses, program, hobbies, bio

// constructor(props) {
//     super(props);
//     this.state = {
// }  


  render() {
   
    return (
        <div className="Students">
          {/* {console.log(this.props)} */}

          
          
            {this.props.students && this.props.students.map((student) => <StudentItem addChat={this.props.addChat}
                                                              name={student.name} 
                                                              courses={student.courses} 
                                                              program={student.program} 
                                                              hobbies={student.hobbies} 
                                                              bio={student.bio}/>)}


           

        </div>
        
    
    );
  }
}

export default Students;