import React from 'react';

import Course from './Course';
import './SettingsPage.css';
import logo from '../../images/Mobsquare.png'

export class SettingsPage extends React.Component {

	render() {

		return (
			<div className="SettingsRoot">

				<div className="SettingsHeaderContainer">
					<img className="SettingsAvatar" src={logo}></img>
					<p className="SettingsName"> {this.props.currentUser.name} </p>
				</div>

				<div className="SettingsBodyContainer">

					<div className="SettingsScheduleContainer">
						Schedule and shit.
					</div>

					<div className="SettingsStudentInfo">

						<form className="SettingsCoursesContainer">
							{this.props.currentUser.courses.map((course) => (<Course course={course} removeCourse={this.props.removeCourse} />))}
						</form>

						<div className="SettingsAddCourseContainer">
							<form className="SettingsAddCourseForm" onChange={this.props.courseOnChange}>
								<input placeholder="Enter new course..." value={this.props.newCourse}></input>
							</form>
							<button className="SettingsAddCourseButton" onClick={this.props.addCourse}>Add</button>
						</div>

						<form className="SettingsBioContainer" onChange={this.props.bioOnChange}>
							<textarea className="SettingsBio">{this.props.currentUser.bio}</textarea>
						</form>

						<button className="SettingsSubmitBio" onClick={this.props.submitBio}>Update Bio</button>
					</div>

				</div>
			</div>
		);
	}
}

export default SettingsPage;