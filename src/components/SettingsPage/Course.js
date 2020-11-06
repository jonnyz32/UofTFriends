import React from 'react';
import './Course.css';

export class Course extends React.Component {

    render() {
        return (
            <div>
                <input className="Course" value={this.props.course}></input>
            </div>
            
        );  
    }
  }
  
export default Course
