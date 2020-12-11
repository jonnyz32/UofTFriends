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
			chats: [],
			users: [],
			usersMasterList: this.props.users,
			logout: false,
			time: "",
			activity: ""
		};
	}

	componentDidMount() {
		this.fetchGroups()
	}


	fetchGroups = () => {

		const id = this.state.currentUser._id
		console.log("id:", id)
		const data = {
			"id": id
		}

		fetch("/fetchGroups", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => {
			if (res.status === 200) {
				return res.json()
			}
			else {
				alert("could not get groups")
			}
		})
			.then(json => {
				this.state.currentUser.groups = {}
				json.forEach(keyValue => {
					this.state.currentUser.groups[keyValue[0]] = { "name": "", "messages": [] }
					if (keyValue[1].includes(",")) {
						const names = keyValue[1].split(",")

						if (names[0] === this.state.currentUser.name) {
							this.state.currentUser.groups[keyValue[0]].name = names[1]
						}
						else {
							this.state.currentUser.groups[keyValue[0]].name = names[0]
						}

					}
					else {
						this.state.currentUser.groups[keyValue[0]].name = keyValue[1]
					}
				})
				this.setState({ groups: this.state.currentUser.groups })
			})
			.catch(error => {
				console.log(error)
			})

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

	clickHandlerChat = () => {
		console.log("in clickhandler")
		let data = { "senderID": '5fced87818f58b18449d15d9' }
		console.log("in clickHandlerChat")
		fetch("/fetchParticularUser", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => {
			if (res.status == 200) {
				return res.json()
			}
			else {
				alert("could not find user")
			}
		})
			.then(json => {
				console.log("json is " + json)
				this.setState({
					viewFragment: "search",
					users: [json]
				})
			})

			.catch(error => {
				console.log(error)
			})

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

	checkGroupAdded = async (otherUserId, currentUserId) => {
		console.log("in check group added")
		let data = {
			"otherUserId": otherUserId,
			"currentUserId": currentUserId
		}

		const result = await fetch("/checkGroupAdded", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => {
			if (res.status == 200) {
				return res.json()
			}
			else {
				alert("something is wrong")
			}
		})
			.then(json => {
				console.log("json", json)
				if (json.contains) {
					return true
				}
				else {
					return false
				}


			})
			.catch(error => {
				console.log(error)
			})
		console.log("result", result)

		return result


	}

	addChat = async (otherUserId, otherUserName) => {
		const currentUserId = this.state.currentUser._id
		const currentUserName = this.state.currentUser.name
		console.log("in add chat")

		const groupAdded = await this.checkGroupAdded(otherUserId, currentUserId)
		console.log("groupAdded", groupAdded)
		if (groupAdded) {
			return
		}

		let oldState = this.state;
		let data = {
			"otherUserId": otherUserId,
			"otherUserName": otherUserName,
			"currentUserId": currentUserId,
			"currentUserName": currentUserName
		}

		fetch("/addChat", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => {
			if (res.status == 200) {
				return res.json()
			}
			else {
				alert("could not get chat")
			}
		})
			.then(json => {
				console.log("groupId:", json)
				this.addGroup(json._id, otherUserId)
				this.addGroup(json._id, currentUserId)

				this.fetchGroups()
				return this.state.currentUser.groups;
			})
			.catch(error => {
				console.log(error)
			})
	}

	addGroup = (groupId, userId) => {
		const data = {
			"groupId": groupId,
			"userId": userId
		}

		fetch("/addGroup", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => {
			if (res.status == 200) {
				return res.json()
			}
			else {
				alert("could not add group")
			}
		})
			.then(json => {
				this.fetchGroups()
				return this.state.currentUser.groups;
			})
			.catch(error => {
				console.log(error)
			})
	}



	addMessages = (currentChat, sender, senderID, message) => {
		let data = { "groupId": currentChat, "sender": sender, "senderID": senderID, "message": message }
		console.log("in add messages")
		fetch("/Chat", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => {
			if (res.status == 200) {
				return res.json()
			}
			else {
				alert("could not add chat")
			}
		})
			.then(json => {

				console.log("added to chats:" + json)
			})
			.catch(error => {
				console.log(error)
			})
	}


	getMessages = (groupId) => {
		let data = { "groupId": groupId }
		let oldState = this.state;
		fetch("/Messages", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => {
			if (res.status == 200) {
				return res.json()
			}
			else {
				alert("could not get chat")
			}
		})
			.then(json => {

				console.log(typeof json, json)
				console.log(typeof json.body, json.body)
				console.log(typeof JSON.stringify(json), JSON.stringify(json))
				console.log(typeof JSON.stringify(json.body), JSON.stringify(json.body))


				this.setState(() => {
					let currentUser = Object.assign({}, oldState.currentUser)
					currentUser.groups[groupId].messages = json.messages
					return { currentUser };
				}
				)
			})
			.catch(error => {
				console.log(error)
			})
	}

	getMessagesChat = (groupId) => {
		let data = { "groupId": groupId }
		fetch("/Messages", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => {
			if (res.status == 200) {
				return res.json()
			}
			else {
				alert("could not get chat")
			}
		})
			.then(json => {
				return json.messages
			})
			.catch(error => {
				console.log(error)
			})
	}

	getGroupId = (course, userId) => {
		let oldState = this.state;
		let data = { "userId": userId, "course": course }
		let result = fetch("/PostRegistration", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => {
			if (res.status == 200) {
				console.log("status 200")
				return res.json()
			}
			else {
				alert("could not get groupid")
				throw "could not get groupid"
			}
		}).then(groupId => {
			this.setState(() => {
				let currentUser = Object.assign({}, oldState.currentUser)
				console.log("groupId", groupId)
				currentUser.groups[groupId._id] = { "name": "", "messages": [] };
				return { currentUser };
			}
			)
		}).then(currentUser => {
			this.fetchGroups()
			return "success"
		})

			.catch(error => {
				console.log(error)
				return "error"
			})
		return result
	}


	// Adding/Removing courses functionality

	courseOnChange = (event) => {
		this.setState({ newCourse: event.target.value.trim().toUpperCase() })
	}

	addCourse = async () => {

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

		let newCourse = this.state.newCourse
		const result = await this.getGroupId(newCourse, this.state.currentUser._id)
		console.log("result", result)
		if (result !== "success") {
			console.log("result", result)
			console.log("Was not success")
			return
		}

		console.log("Was success")


		let updatedUser = { ...this.state.currentUser }
		updatedUser.courses = this.state.currentUser.courses.slice()
		updatedUser.courses.push(this.state.newCourse)

		let newChats = this.state.chats.slice()
		newChats.push(this.state.newCourse)

		this.setState({ currentUser: updatedUser, chats: newChats, newCourse: "" })

	}

	removeCourse = async (event) => {



		const courseToRemove = event.target.parentNode.firstChild.innerText
		console.log("Removing Course", courseToRemove)

		let courseId = ""
		const groupKeys = Object.keys(this.state.currentUser.groups)
		groupKeys.forEach(groupKey => {
			if (this.state.currentUser.groups[groupKey].name === courseToRemove) {
				courseId = groupKey
			}
		})



		let coursesIndex = this.state.currentUser.courses.indexOf(courseToRemove)
		let chatIndex = this.state.chats.indexOf(courseToRemove)

		console.log("Indices:", coursesIndex, chatIndex)

		let updatedUser = { ...this.state.currentUser }
		updatedUser.courses = this.state.currentUser.courses.slice()
		updatedUser.courses.splice(coursesIndex, 1)

		let newChats = this.state.chats.slice()
		newChats.splice(chatIndex, 1)
		this.setState({ currentUser: updatedUser, chats: newChats })




		const data = { userId: this.state.currentUser._id, courseId: courseId }
		await fetch("/RemoveCourse", {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => {
			if (res.status == 200) {
				console.log("status 200")
				this.fetchGroups()
				return res.json()
			}
			else {
				alert("could not delete group")
			}
		})
			.catch(error => {
				console.log(error)
			})

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

	toggleSearchMode = (newView, chatId) => {
		{ console.log("in toggle search mode") }
		this.render()
		this.setState({ currentChat: chatId, viewFragment: newView },
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

	handleOutsideClick = (event) => {
		const dropdown = document.getElementById("settingsCourseDropdown");
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
			document.getElementById("settingsCourseDropdown").innerHTML = ''
		}
	}

	handleClickDropdownCourse = (event) => {
		this.setState({ newCourse: event.target.course.courseId })
		this.addCourse()
	}

	displayCourses = (courses) => {
		const div = document.getElementById("settingsCourseDropdown");
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
			{ console.log("from chat:" + JSON.stringify(this.state.users)) }
			centerPage = <Students addChat={this.addChat} users={this.state.users} />
			rightPage = null
		} else if (this.state.viewFragment == "settings") {
			centerPage = <SettingsPage currentUser={this.state.currentUser} chats={this.state.chats} courseOnChange={this.courseOnChange}
				addCourse={this.addCourse} removeCourse={this.removeCourse} newCourse={this.state.newCourse} bioOnChange={this.bioOnChange}
				submitBio={this.submitBio} handleSelectionChange={this.handleSelectionChange}
				handleOutsideClick={this.handleOutsideClick} handleCourseInput={this.handleCourseInput} />
			rightPage = null
		} else {
			let texts = this.state.currentUser.groups[this.state.currentChat].messages
			console.log("texts in home", texts)
			if (texts) {
				centerPage = <Chat filterUsers={this.filterUsers} searchQuery={this.state.searchQuery} clickHandlerChat={this.clickHandlerChat} userID={this.state.userId} getMessagesChat={this.getMessagesChat} addMessages={this.addMessages} currentChat={this.state.currentChat} currentUser={this.state.currentUser} texts={texts} />
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
						<input type="text" placeholder="Search for other students....."></input>
						<input className="submitQuery" type="submit" value="Ok"></input>
					</form>

					{/* Navigation buttons */}
					<a onClick={this.logout}><i className="fa fa-fw fa-power-off"></i>Logout</a>
					<a onClick={() => this.toggleSearchMode("settings")}><i className="fa fa-fw fa-user"></i>{this.state.currentUser.name}</a>
					<a onClick={() => this.toggleSearchMode("home")}><i className="fa fa-fw fa-home"></i>Home</a>
				</nav>

				<aside id="sidebarContainer">
					{Array.isArray(this.state.currentUser.groups) ? console.log("groups not fetched yet") : <SideBar getMessages={this.getMessages} toggleSearchMode={this.toggleSearchMode} chats={this.state.currentUser.groups} currentUser={this.props.currentUser} />}

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
