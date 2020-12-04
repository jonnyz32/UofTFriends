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
		if (this.state.currentUser.courses.length >= 6) {
			alert("You can't add more than 6 courses!")
			return
		} else if (this.state.currentUser.courses.includes(this.state.newCourse)) {
			alert("You can't add the same course twice!")
			return
		} else if (this.state.newCourse == "") {
			alert("Please enter a course!")
			return
		}

		this.state.currentUser.courses.push(this.state.newCourse)
		console.log("in add course")
		this.addChat(this.state.newCourse)
		this.setState({ newCourse: "" })
	}

	addChat = (newCourse) =>  {
		console.log("in add chat")
		this.getGroupId(newCourse)
	
	}

	getGroupId = (course) => {
		let oldState = this.state;
		let data = {"course": course}
		fetch("/PostRegistration", {
			method: 'POST', 
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		  }).then(res => {
			if (res.status == 200){
				console.log("status 200")
				return res.json()
			}
			else{
				alert("could not get groupid")
			}
			}).then(groupId => {
				this.setState(() => {
					let currentUser = Object.assign({}, oldState.currentUser)
					console.log("groupId", groupId)
					currentUser.groups[groupId._id] = {"name":"","messages":[]};
					return { currentUser };
				}
				)
			})
			
			.catch(error =>{
				console.log(error)
			})
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
		currentUser.program = [this.state.program]
		currentUser.year = this.state.year
		currentUser.bio = this.state.bio
		currentUser.hobbies = [this.state.hobbies]
		currentUser.image = this.state.image
		currentUser.seenOnboarding = true

		console.log(currentUser)
		this.setState({ onboardingComplete: true })
		this.props.updateUser(currentUser)
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
						<label> YOU </label>
						<select className="profilePictureSelect" onChange={this.handleImageSelect}>
							<option value="confusedMan">Confused Man</option>
							<option value="happySun">Happy Sun</option>
							<option value="sadMan">Sad Man</option>
						</select>
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
								<input type="text" name="newCourse" placeholder="Enter new course..." value={this.state.newCourse}></input>
							</form>
							<button className="onboardingAddCourseButton" onClick={this.addCourse}>Add</button>
						</div>

						<br />
						<br />

						<div>
							<label>My hobbies are </label>
							<input type="text" name="courses" placeholder="type in your hobbies" onChange={this.handleHobbiesInput} />
						</div>

					</div>

					<br />

					<label id="bioTitle">Say something about yourself!</label>
					<textarea className="onboardingBio" placeholder="type in your bio" onChange={this.handleBioInput} />

					<div>
						<button class="endOnboardingButton" onClick={this.completeOnboarding}>Continue</button>
					</div>
				</div>
			</div>
		)
	}
}

export default PostRegistration