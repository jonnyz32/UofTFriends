import React from 'react';
import './Course.css';
import deleteIcon from "../../images/delete.png"

export class Course extends React.Component {

    render() {

        return (
            <div className="CourseCard">
                <input className="CourseCardName" value={this.props.course}></input>
                <button className="removeCourseCard" onClick={this.props.removeCourse}>X</button>
            </div>
            
        );  
    }
  }
  
export default Course
