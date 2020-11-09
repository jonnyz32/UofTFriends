import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Course from '../SettingsPage/Course';
import ProfilePicture from '../ProfilePicture/profilePicture';

import PostRegistrationStyle from './postregistration.css'
import confusedMan from '../../images/Mobsquare.png'
import happySun from '../../images/happySun.png'
import sadMan from '../../images/sadFace.jpg'

class PostRegistration extends Component {

	state = {
		currentUser: this.props.currentUser,
		image: confusedMan,
		newCourse: "",
		program: "",
		year: "",
		hobbies: "",
		bio: "",
		onboardingComplete: false
	}

	handleProgramSelect = (event) => {
		const program = event.target.value
		this.setState({ program: program })
	}

	handleYearSelect = (event) => {
		const year = event.target.value
		this.setState({ year: year })
	}

	handleImageSelect = (event) => {
		const pic = event.target.value
		let profilePic = confusedMan

		switch (pic) {
			case "confusedMan":
				break;
			case "happySun":
				profilePic = happySun
				break;
			case "sadMan":
				profilePic = sadMan
				break;
			default:
				profilePic = sadMan
		}

		this.setState({ image: profilePic })
	}

	handleHobbiesInput = (event) => {
		const hobbies = event.target.value
		console.log(hobbies)
		this.setState({
			hobbies: hobbies
		})
	}

	handleBioInput = (event) => {
		const bio = event.target.value
		console.log(bio)
		this.setState({
			bio: bio
		})
	}

	addCourse = () => {
		if (this.state.newCourse == "") {
			return
		}

		this.state.currentUser.courses.push(this.state.newCourse)
		this.addChat(this.state.newCourse)
		this.setState({ newCourse: "" })
	}

	addChat = (newCourse) => {
		let oldState = this.state;
		{console.log("state", oldState)}
		this.setState(() => {
			let currentUser = Object.assign({}, oldState.currentUser)
			currentUser.groups[newCourse] = [];
			return {currentUser};
		}
		)
		// [
		// 	{
		// 		sender: "Michael",
		// 		text: "Hey have you started the csc300 hw?",
		// 		iscurrentsender: false
		// 	},
		// 	{
		// 		sender: "Jonathan",
		// 		text: "Nope been too busy with 309 :(",
		// 		iscurrentsender: false
		// 	}
		// ]
	}

	removeCourse = (event) => {
		const courseToRemove = event.target.parentNode.firstChild.value
		let coursesIndex = this.state.currentUser.courses.indexOf(courseToRemove)

		this.state.currentUser.courses.splice(coursesIndex, 1)
		this.setState({ newCourse: "" })
	}

	courseOnChange = (event) => {
		this.setState({ newCourse: event.target.value.trim().toUpperCase() })
	}

	completeOnboarding = () => {
		let currentUser = this.state.currentUser
		currentUser.program = this.state.program
		currentUser.year = this.state.year
		currentUser.bio = this.state.bio
		currentUser.hobbies = this.state.hobbies
		currentUser.image = this.state.image

		console.log(currentUser)
		this.setState({ onboardingComplete: true })
	}

	render() {
		if (this.state.onboardingComplete == 1) {
			return <Redirect to={{ pathname: "/Home" }} />
		}

		return (
			<div id="onboardingRoot">
				<div className="onboardingContainer">
					<h1>Hi {this.state.currentUser.name}!</h1>
					<h1>Before you begin using the website and making new friends, tell us a little bit about yourself!</h1>

					<div className="onboardingPictureContainer">
						<ProfilePicture imageSrc={this.state.image} />
						<select className="profilePictureSelect" onChange={this.handleImageSelect}>
							<option value="confusedMan">Confused Man</option>
							<option value="happySun">Happy Sun</option>
							<option value="sadMan">Sad Man</option>
						</select>
						<label> YOU </label>
					</div>

					<br />

					<div className="profileInfoContainer">
						<div>
							<label>I am in </label>

							<select name="program" onChange={this.handleProgramSelect}>
								<option value disabled selected>select your program</option>
								<option value="Agricultural Sciences">Agricultural Sciences</option>
								<option value="Arts and Humanities">Arts and Humanities</option>
								<option value="Biology">Biology</option>
								<option value="Chemistry">Chemistry</option>
								<option value="Computer Science">Computer Science</option>
								<option value="Engineering">Engineering</option>
								<option value="Physics">Physics</option>
							</select>,

							<label> in my </label>

							<select name="year" onChange={this.handleYearSelect}>
								<option value disabled selected>select your year</option>
								<option value="first">first</option>
								<option value="second">second</option>
								<option value="third">third</option>
								<option value="fourth">fourth</option>
								<option value="fifth">fifth</option>
								<option value="sixth">sixth</option>
							</select>

							<label> year.</label>
						</div>

						<br />

						<label>This semester, I will take:</label>

						<form className="onboardingCoursesContainer">
							<label>Courses:</label>
							{this.state.currentUser.courses.map((course) => (<Course course={course} removeCourse={this.removeCourse} />))}
						</form>

						<div className="onboardingAddCourseContainer">
							<form className="onboardingAddCourseForm" onChange={this.courseOnChange}>
								<input type="text" name="newCourse" placeholder="Enter new course..."></input>
							</form>
							<button className="onboardingAddCourseButton" onClick={this.addCourse}>Add</button>
						</div>

						<br />
						<br />

						<div>
							<label>My hobbies are </label>
							<input type="text" name="courses" placeholder="Type in your hobbies" onChange={this.handleHobbiesInput} />
						</div>

					</div>

					<br />

					<label id="bioTitle">Say something about yourself!</label>
					<textarea className="onboardingBio" onChange={this.handleBioInput} />

					<div>
						<button class="endOnboardingButton" onClick={this.completeOnboarding}>Continue</button>
					</div>
				</div>
			</div>
		)
	}
}

export default PostRegistration
