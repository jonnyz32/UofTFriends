import React from 'react';
import "./SignupPage.css"
import { Redirect } from 'react-router-dom'

const signedInState = {
	NONE: 0,
	STUDENT: 1,
	ADMIN: 2
}

class Signup extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			name: "",
			password: "",
			users: this.props.users,
			currentUser: "",
			signedIn: signedInState.NONE
		}
	}

	signIn = (event) => {
		const verificationUser = {
			name: this.state.name,
			password: this.state.password
		}

		if (verificationUser.name === "admin" && verificationUser.password === "admin") {
			this.setState({
				signedIn: signedInState.ADMIN
			})
			return
		}

		for (var i = 0; i < this.props.users.length; i++) {
			if (JSON.stringify(this.props.users[i].name) === JSON.stringify(verificationUser.name) &&
				(JSON.stringify(this.props.users[i].password) === JSON.stringify(verificationUser.password))) {
				this.setState({
					currentUser: this.props.users[i],
					signedIn: signedInState.STUDENT
				})
				return
			}
		}
		alert("Wrong password or username")
	}

	handleInputChange = (event) => {
		const target = event.target
		const value = target.value
		const name = target.name

		this.setState({
			[name]: value
		})
	}

	addUser = () => {

		if (this.state.name === "" || this.state.password === "") {
			alert("Username and password must not empty")
			return
		} else if (this.state.name === "admin") {
			alert("You can't register as an admin!")
			return
		}

		for (var i = 0; i < this.props.users.length; i++) {
			if (JSON.stringify(this.props.users[i].name) === JSON.stringify(this.state.name)) {
				alert("Username is already taken!")
				return
			}
		}

		const userList = this.props.users
		const newUser = {
			name: this.state.name,
			password: this.state.password,
			seenOnboarding: false,
			courses: [],
			groups: {},
			schedule: [],
			toDoList: [],
			image: ""
		}

		console.log(newUser)
		userList.push(newUser)

		console.log(userList)
		this.setState({
			users: userList
		})

		this.signIn()
	}

	render() {
		if (this.state.signedIn === signedInState.STUDENT) {
			this.props.toggleSignIn(this.state.currentUser, this.state.signedIn)
			if (this.state.currentUser.seenOnboarding === true) {
				return <Redirect to={{ pathname: "/Home" }} />
			} else {
				return <Redirect to={{ pathname: "/PostRegistration" }} />
			}
		} else if (this.state.signedIn === signedInState.ADMIN) {
			return <Redirect to={{ pathname: "/Admin" }} />
		}

		return (
			<div className="signUpRoot">
				<h1 className="signUpHeader"> Welcome! </h1>
				<input type="text" value={this.state.name} onChange={this.handleInputChange} className="signUpInput" name="name" placeholder="Username" />
				<input type="password" value={this.state.password} onChange={this.handleInputChange} className="signUpInput" name="password" placeholder="Password" />

				<button className="signUpButton" onClick={this.addUser}> Sign Up </button>
				<button className="signUpButton" onClick={this.signIn}> Sign In </button>
			</div>
		)
	}
}

export default Signup
