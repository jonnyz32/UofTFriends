import React from 'react';
import ProfilePicture from '../ProfilePicture/profilePicture';

import Course from './Course';
import './SettingsPage.css';

export class SettingsPage extends React.Component {

	render() {

		return (
			<div className="SettingsRoot" onClick={this.props.handleOutsideClick}>

				<div className="SettingsHeaderContainer">
					<p className="SettingsName"> {this.props.currentUser.name} </p>
				</div>

				<div className="SettingsBodyContainer">

					<div className="SettingsScheduleContainer">
						<div className="SettingsPictureContainer">
							<ProfilePicture imageSrc={this.props.currentUser.image} alt="profilePicture" />
							<select className="SettingsPictureSelect" onChange={this.props.handleSelectionChange}>
								<option value="" selected disabled>Select Image</option>
								<option value="confusedMan">Confused Man</option>
								<option value="happySun">Happy Sun</option>
								<option value="sadMan">Sad Man</option>
							</select>
						</div>
					</div>

					<div className="SettingsStudentInfo">

						<p className="SettingsCoursesContainer">
							{this.props.currentUser.courses.map((course) => (<Course course={course} removeCourse={this.props.removeCourse} />))}
						</p>

						<div className="SettingsAddCourseContainer">
							<form className="SettingsAddCourseForm" onChange={this.props.courseOnChange}>
								<input placeholder="Enter new course..." onChange={this.props.handleCourseInput} value={this.props.newCourse} autocomplete="off"/>
								<div id="settingsCourseDropdown"/>
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