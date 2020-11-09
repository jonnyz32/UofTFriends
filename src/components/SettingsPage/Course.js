import React from 'react';
import './Course.css';

export class Course extends React.Component {

	render() {
		return (
			<div className="CourseCard">
				<p className="CourseCardName">{this.props.course}</p>
				<button className="removeCourseCard" onClick={this.props.removeCourse}></button>
			</div>

		);
	}
}

export default Course
