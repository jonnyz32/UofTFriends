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

	// Event handlers

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

	handleOutsideClick = (event) => {
		const dropdown = document.getElementById("courseDropdown");
		if (event.target !== dropdown) {
			dropdown.innerHTML = ''
		}
	}

	handleCourseInput = (event) => {
		const courseId = event.target.value

		if (courseId.length > 0) {
			this.fetchCoursesBy(courseId)
				.then(courses => {
					this.displayCourses(courses)
				}).catch(error => {
					console.log(error)
				})
		} else {
			document.getElementById("courseDropdown").innerHTML = ''
		}
	}

	handleClickDropdownCourse = (event) => {
		this.setState({ newCourse: event.target.course.courseId })
		this.addCourse()
	}

	// Helper functions

	displayCourses = (courses) => {
		const div = document.getElementById("courseDropdown");
		div.innerHTML = ''

		if (courses.length === 0) {
			let a = document.createElement("a")
			a.appendChild(document.createTextNode("No courses found"))
			div.appendChild(a)
		}

		courses.forEach(course => {
			let a = document.createElement("a")
			a.course = course
			a.onmouseup = this.handleClickDropdownCourse
			a.appendChild(document.createTextNode(course.courseId))
			div.appendChild(a)
		})
	}

	attemptAddCourse = () => {
		const course = this.state.newCourse
		if (course === "") {
			alert("Please enter a course!")
			return
		}

		this.fetchCoursesBy(course)
			.then(courses => {
				if (courses.length < 1) {
					alert("Please enter a valid course")
				} else {
					this.addCourse()
				}
			}).catch(error => {
				console.log(error)
			})
	}

	addCourse = () => {
		if (this.state.currentUser.courses.length >= 6) {
			alert("You can't add more than 6 courses!")
			return
		} else if (this.state.currentUser.courses.includes(this.state.newCourse)) {
			alert("You can't add the same course twice!")
			return
		}

		this.state.currentUser.courses.push(this.state.newCourse)
		// Add to group (need to implement according to model)
		this.setState({ newCourse: "" })
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
		// this.setState({ onboardingComplete: true })
		// this.props.updateUser(currentUser)

		const newStudent = {
			username: this.state.currentUser.name,
			password: this.state.currentUser.password,
			name: this.state.currentUser.name,
			courses: this.state.currentUser.courses,
			program: this.state.currentUser.program,
			year: parseInt(this.state.currentUser.year),
			hobbies: this.state.currentUser.hobbies,
			todoList: [],
			bio: this.state.currentUser.bio,
			profilePic: this.state.currentUser.image,
			groups: this.state.currentUser.courses,
			seenOnboarding: true,
			seenTutorial: false,
		}

		fetch("/addStudent", {
			method: 'POST',
			body: JSON.stringify(newStudent),
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(res => {
			if (res.status == 200) {
				console.log("Saved student!")
				this.setState({ onboardingComplete: true })
				this.props.updateUser(currentUser)
			}
			else {
				alert("Could not save user!")
			}
		}).catch(error => {
			console.log(error)
		})
	}

	// API Calls

	fetchCoursesBy = (id) => {
		return fetch(`/Courses/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (res.status === 200) { return res.json() }
				else { alert("Error loading courses") }
			})
	}

	// HTML Render

	render() {
		if (this.state.onboardingComplete === true) {
			return <Redirect to={{ pathname: "/Home" }} />
		}

		return (
			<div id="onboardingRoot" onClick={this.handleOutsideClick}>
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
								<option value="1">first</option>
								<option value="2">second</option>
								<option value="3">third</option>
								<option value="4">fourth</option>
								<option value="5">fifth</option>
								<option value="6">sixth</option>
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
								<input type="text" name="newCourse" placeholder="Enter new course..." onChange={this.handleCourseInput} value={this.state.newCourse} autocomplete="off"></input>
								<div id="courseDropdown">
								</div>
							</form>
							<button className="onboardingAddCourseButton" onClick={this.attemptAddCourse}>Add</button>
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
