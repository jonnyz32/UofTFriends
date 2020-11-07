import React, {Component} from 'react';
import StudentItem from '../StudentItem/StudentItem';
import './../StudentItem/StudentItem.css';


class Students extends Component {

  render() {
   
    return (
        <div className="Students">
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