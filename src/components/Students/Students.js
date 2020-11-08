import React, {Component} from 'react';
import StudentItem from '../StudentItem/StudentItem';
import './../StudentItem/StudentItem.css';


class Students extends Component {

  constructor(props){
    super(props)
    this.keyCount = 0
  }

  newKey = () => {
    this.keyCount += 1
    return this.keyCount;
  }


  render() {
   
    return (
        <div className="Students">
            {this.props.students && this.props.students.map((student) => <StudentItem key={this.newKey()} addChat={this.props.addChat}
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