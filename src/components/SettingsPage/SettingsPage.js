import React from 'react';

import Course from './Course';
import './SettingsPage.css';
import logo from '../../images/Mobsquare.png'

export class SettingsPage extends React.Component {


	state = {
		currentUser: this.props.currentUser,
		chats: this.props.chats,
		newCourse: "",
		updatedBio: ""
	}

	courseOnChange = (event) => {
		// this.newCourse = event.target.value.trim()
		this.setState({ newCourse: event.target.value.trim().toUpperCase() })
	}

	addCourse = () => {

		if (this.state.chats.includes(this.state.newCourse) || (this.state.newCourse == "") || 
				(this.state.currentUser.courses.length >= 6)) {
			return
		}

		let updatedUser = this.state.currentUser
		updatedUser.courses.push(this.state.newCourse)

		let newChats = this.state.chats
		newChats.push(this.state.newCourse)

		this.setState({ currentUser: updatedUser, chats: newChats, newCourse: "" })
	}

	removeCourse = (event) => {

		const courseToRemove = event.target.parentNode.firstChild.value
		let coursesIndex = this.state.currentUser.courses.indexOf(courseToRemove)
		let chatIndex = this.state.chats.indexOf(courseToRemove)

		let updatedUser = this.state.currentUser
		updatedUser.courses.splice(coursesIndex, 1)

		let newChats = this.state.chats.splice()
		newChats.splice(chatIndex, 1)

		this.setState({ currentUser: updatedUser, chats: newChats })
	}

	bioOnChange = (event) => {
		this.setState({ updatedBio: event.target.value.trim()})
	}

	submitBio = () => {

		if (this.state.updatedBio == "") {
			return
		}

		let updatedUser = this.state.currentUser
		updatedUser.bio = this.state.updatedBio
		this.setState({currentUser: updatedUser})
	}

	render() {

		return (
			<div className="SettingsRoot">

				<div className="SettingsHeaderContainer">
					<img className="SettingsAvatar" src={logo}></img>
					<p className="SettingsName"> {this.state.currentUser.name} </p>
				</div>

				<div className="SettingsBodyContainer">

					<div className="SettingsScheduleContainer">
						Schedule and shit.
					</div>

					<div className="SettingsStudentInfo">

						<form className="SettingsCoursesContainer">
							{this.state.currentUser.courses.map((course) => (<Course course={course} removeCourse={this.removeCourse} />))}
						</form>

						<div className="SettingsAddCourseContainer">
							<form className="SettingsAddCourseForm" onChange={this.courseOnChange}>
								<input placeholder="Enter new course..." value={this.state.newCourse}></input>
							</form>
							<button className="SettingsAddCourseButton" onClick={this.addCourse}>Add</button>
						</div>

						<form className="SettingsBioContainer" onChange={this.bioOnChange}>
							<textarea className="SettingsBio">{this.state.currentUser.bio}</textarea>
						</form>

						<button className="SettingsSubmitBio" onClick={this.submitBio}>Update Bio</button>
					</div>

				</div>
			</div>
		);
	}
}

export default SettingsPage;