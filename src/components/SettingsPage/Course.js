import React from 'react';
import './Course.css';

export class Course extends React.Component {

    render() {

        return (
            <div className="CourseCard">
                <input className="CourseCardName" value={this.props.course}></input>
                <button className="removeCourseCard" onClick={this.props.removeCourse}></button>
            </div>
            
        );  
    }
  }
  
export default Course
