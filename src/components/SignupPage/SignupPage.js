import React, { Component } from 'react';
import "./SignupPage.css"
import { Route, Switch, BrowserRouter, Redirect, Link } from 'react-router-dom'

const signedInState = {
	NONE: 0,
	STUDENT: 1,
	ADMIN: 2
}

class Signup extends Component {

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

		for (var i = 0; i < this.state.users.length; i++) {
			if (JSON.stringify(this.state.users[i].name) === JSON.stringify(verificationUser.name) &&
				(JSON.stringify(this.state.users[i].password) === JSON.stringify(verificationUser.password))) {
				this.setState({
					currentUser: this.state.users[i],
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

		for (var i = 0; i < this.state.users.length; i++) {
			if (JSON.stringify(this.state.users[i].name) === JSON.stringify(this.state.name)) {
				alert("Username is already taken!")
				return
			}
		}

		const userList = this.state.users
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
		if (this.state.signedIn == signedInState.STUDENT) {
			this.props.toggleSignIn(this.state.currentUser, this.state.signedIn)
			if (this.state.currentUser.seenOnboarding == 1) {
				return <Redirect to={{ pathname: "/Home" }} />
			} else {
				return <Redirect to={{ pathname: "/PostRegistration" }} />
			}
		} else if (this.state.signedIn == signedInState.ADMIN) {
			return <Redirect to={{ pathname: "/Admin" }} />
		}

		return (<div className="div">

			<h1 className="header"> Sign Up to Friends-at-UofT </h1>
			<input type="text" value={this.state.name} onChange={this.handleInputChange} className="input" name="name" placeholder="Username" />
			<input type="password" value={this.state.password} onChange={this.handleInputChange} className="input" name="password" placeholder="Password" />

			<button className="button" onClick={this.addUser}> Sign Up </button>
			<button className="button" onClick={this.signIn}> Sign In </button>

			<a href="mailto:97sdmn@gmail.com" className="Contact"> Contact us</a>
		</div>)
	}
}

export default Signup
