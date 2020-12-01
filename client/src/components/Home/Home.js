import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css'

import SideBar from '../SideNav/SideNav';
import Students from '../Students/Students';
import Chat from '../Chat/Chat';
import Schedule from '../Schedule/Schedule';
import TodoList from '../Todolist/Todolist'
import SettingsPage from '../SettingsPage/SettingsPage'

import confusedMan from '../../images/Mobsquare.png'
import happySun from '../../images/happySun.png'
import sadMan from '../../images/sadFace.jpg'

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			viewFragment: "home",
			currentChat: null,
			currentUser: this.props.currentUser,
			searchQuery: "",
			newCourse: "",
			newBio: "",
			chats: this.props.currentUser.courses,
			users: [],
			usersMasterList: this.props.users,
			logout: false,
			time: "",
			activity: ""
		};
	}

	// Update this.state.users to match search query.
	filterUsers = (event) => {

		event.preventDefault()
		this.setState({
			viewFragment: "search",
			users: this.searchResults()
		})
	}

	// Returns all students that match search query.
	searchResults = () => {

		let queryMatches = []
		const { usersMasterList: usersMasterList, searchQuery } = this.state

		usersMasterList.forEach(user => {

			if ((user.name.toUpperCase().includes(searchQuery.toUpperCase()) ||
				this.contains(user.courses, searchQuery) ||
				this.contains(user.program, searchQuery) ||
				this.contains(user.hobbies, searchQuery) ||
				user.bio.includes(searchQuery)) &&
				user.name !== this.state.currentUser.name) {
				queryMatches.push(user)
			}
		})
		return queryMatches
	}

	// Helper to match searchQuery.
	contains = (list, keyword) => {

		const keywordUpper = keyword.toUpperCase()
		let match = false

		list.forEach(item => {
			const itemUpper = item.toUpperCase()
			if (itemUpper.includes(keywordUpper)) {
				match = true
			}
		})
		return match
	}

	// Update this.state.searchQuery every input event.
	onChange = (event) => {
		this.setState({ searchQuery: event.target.value.trim() })
	}

	addChat = (chatName) => {

		if (this.state.chats.includes(chatName.toUpperCase())) {
			return
		}
		this.addGroup(chatName.toUpperCase())
		const updatedChats = this.state.chats.slice();
		updatedChats.push(chatName.toUpperCase())
		this.setState({ chats: updatedChats })
	}

	addGroup = (newChat) => {
		let oldState = this.state;
		{ console.log("state", oldState) }
		this.setState(() => {
			let currentUser = Object.assign({}, oldState.currentUser)
			currentUser.groups[newChat] = [];
			return { currentUser };
		})
	}

	getMessages = (groupName) => {
		let data = {"groupId": groupName}
		let oldState = this.state;
		console.log("in get messages")
		fetch("/Home", {
			method: 'POST', 
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		  }).then(res => {
			if (res.status == 200){
				return res.json()
			}
			else{
				alert("could not get chat")
			}
		})
			.then(json => {
				console.log(typeof json, json)
				console.log(typeof json.body, json.body)
				console.log(typeof JSON.stringify(json), JSON.stringify(json))
				console.log(typeof JSON.stringify(json.body), JSON.stringify(json.body))
				console.log(typeof JSON.stringify(json[0].messages), JSON.stringify(json[0].messages))
				console.log(typeof json[0].messages, json[0].messages)


				this.setState(() => {
					let currentUser = Object.assign({}, oldState.currentUser)
					currentUser.groups[groupName] = json[0].messages
					return { currentUser };
				}
				)
			})
			.catch(error =>{
				console.log(error)
			})
	}
			

	// Adding/Removing courses functionality

	courseOnChange = (event) => {
		this.setState({ newCourse: event.target.value.trim().toUpperCase() })
	}

	addCourse = () => {

		if (this.state.currentUser.courses.length >= 6) {
			alert("You can't add more than 6 courses!")
			return
		} else if (this.state.chats.includes(this.state.newCourse)) {
			alert("You can't add the same course twice!")
			return
		} else if (this.state.newCourse == "") {
			alert("Please enter a course!")
			return
		}

		this.addGroup(this.state.newCourse.toUpperCase())

		let updatedUser = { ...this.state.currentUser }
		updatedUser.courses = this.state.currentUser.courses.slice()
		updatedUser.courses.push(this.state.newCourse)

		let newChats = this.state.chats.slice()
		newChats.push(this.state.newCourse)

		this.setState({ currentUser: updatedUser, chats: newChats, newCourse: "" })
	}

	removeCourse = (event) => {

		console.log("Removing Course")

		const courseToRemove = event.target.parentNode.firstChild.innerText
		console.log(courseToRemove)
		let coursesIndex = this.state.currentUser.courses.indexOf(courseToRemove)
		let chatIndex = this.state.chats.indexOf(courseToRemove)

		console.log("Indices:", coursesIndex, chatIndex)

		let updatedUser = { ...this.state.currentUser }
		updatedUser.courses = this.state.currentUser.courses.slice()
		updatedUser.courses.splice(coursesIndex, 1)

		let newChats = this.state.chats.slice()
		newChats.splice(chatIndex, 1)

		this.setState({ currentUser: updatedUser, chats: newChats })
	}

	bioOnChange = (event) => {
		this.setState({ newBio: event.target.value.trim() })
	}

	submitBio = () => {

		if (this.state.newBio == "") {
			return
		}

		let updatedUser = { ...this.state.currentUser }
		updatedUser.bio = this.state.newBio
		this.setState({ currentUser: updatedUser })
	}

	// Image selection handler.
	handleSelectionChange = (event) => {
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

		let updatedUser = { ...this.state.currentUser }
		updatedUser.image = profilePic

		this.setState({ currentUser: updatedUser })
	}

	toggleSearchMode = (newView, chatName) => {
		{ console.log("in toggle search mode") }
		this.setState({ currentChat: chatName, viewFragment: newView },
			() => { console.log("current chat", this.state.currentChat) })

	}

	logout = () => {
		this.setState({ logout: true })
	}

	// Todo functionality
	handleInputChange = (event) => {

		const target = event.target
		const value = target.value
		const name = target.name

		this.setState({ [name]: value })
	}

	addNewTodo = () => {
		if (this.state.activity === "" || this.state.time === "") {
			alert("Please enter an activity AND time!")
			return
		}

		const newTodo = { activity: this.state.activity, time: this.state.time }

		let updatedUser = { ...this.state.currentUser }
		updatedUser.toDoList = this.state.currentUser.toDoList.slice()
		updatedUser.toDoList.push(newTodo)

		this.setState({ currentUser: updatedUser });
		this.setState({ activity: "", time: "" })
	}

	removeToDo = (event) => {

		const toDoToRemove = event.target.parentNode.firstChild.innerText
		console.log("Removing todo: ", toDoToRemove)
		let toDoIndex = -1

		for (let index = 0; index < this.state.currentUser.toDoList.length; index++) {
			const element = this.state.currentUser.toDoList[index];
			if (element.activity === toDoToRemove) {
				toDoIndex = index
			}
		}

		let updatedUser = { ...this.state.currentUser }
		updatedUser.toDoList = this.state.currentUser.toDoList.slice()
		updatedUser.toDoList.splice(toDoIndex, 1)

		this.setState({ currentUser: updatedUser })
	}

	render() {

		let centerPage = null
		let rightPage = null

		if (this.state.logout) {
			return <Redirect to={{ pathname: "/" }} />
		} else if (this.state.viewFragment == "home") {
			{ console.log(this.state.currentUser.schedule) }
			centerPage = <Schedule schedule={this.state.currentUser.courses} />
			rightPage = <TodoList name={this.state.currentUser.name} toDoList={this.state.currentUser.toDoList} activity={this.state.activity} time={this.state.time}
				addNewTodo={this.addNewTodo} removeToDo={this.removeToDo} handleInputChange={this.handleInputChange} />
		} else if (this.state.viewFragment == "search") {
			centerPage = <Students addChat={this.addChat} users={this.state.users} />
			rightPage = null
		} else if (this.state.viewFragment == "settings") {
			centerPage = <SettingsPage currentUser={this.state.currentUser} chats={this.state.chats} courseOnChange={this.courseOnChange}
				addCourse={this.addCourse} removeCourse={this.removeCourse} newCourse={this.state.newCourse} bioOnChange={this.bioOnChange}
				submitBio={this.submitBio} handleSelectionChange={this.handleSelectionChange} />
			rightPage = null
		} else {
			let texts = this.state.currentUser.groups[this.state.currentChat]
			console.log("texts", texts)
			if (texts) {
				centerPage = <Chat currentUser={this.state.currentUser} texts={texts} />
				rightPage = null
			}
		}

		return (

			<div className="outerDiv">

				{/* Load icons for navbar */}
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

				{/* Navbar */}
				<nav id="nav">
					{/* Search Bar */}
					<form onChange={this.onChange} onSubmit={this.filterUsers}>
						<input type="text"></input>
						<input className="submitQuery" type="submit" value="Ok"></input>
					</form>

					{/* Navigation buttons */}
					<a onClick={this.logout}><i className="fa fa-fw fa-power-off"></i>Logout</a>
					<a onClick={() => this.toggleSearchMode("settings")}><i className="fa fa-fw fa-user"></i>{this.state.currentUser.name}</a>
					<a onClick={() => this.toggleSearchMode("home")}><i className="fa fa-fw fa-home"></i>Home</a>
				</nav>

				<aside id="sidebarContainer">
					<SideBar getMessages={this.getMessages} toggleSearchMode={this.toggleSearchMode} chats={this.state.chats} currentUser={this.props.currentUser}/>
				</aside>

				<section id="fragmentContainer">
					{console.log("rerendering...")}
					{centerPage}
					{rightPage}
				</section>

			</div>
		);
	}
}

export default Home;
