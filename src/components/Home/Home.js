import React, { Component } from 'react';
import './Home.css'
import SideBar from '../SideNav/SideNav';
import Students from '../Students/Students';
import Chat from '../Chat/Chat';
import Schedule from '../Schedule/Schedule';
import TodoList from '../Todolist/Todolist'
import SettingsPage from  '../SettingsPage/SettingsPage'

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
                image: confusedMan,
                // chats: this.props.currentUser.courses,
                chats: ['CSC300', 'CSC309', 'CSC311', 'CSC343', 'PHL245'],
                students: [],
                studentsMasterList: this.props.students
            };
    }

    // Update this.state.students to match search query.
    filterStudents = (event) => {

        event.preventDefault()
        this.setState({
            searchMode: true,
            students: this.searchResults()
        })
    }

    // Returns all students that match search query.
    searchResults = () => {

        let queryMatches = []
        const { studentsMasterList, searchQuery } = this.state

        studentsMasterList.forEach(student => {

            if (student.name.includes(searchQuery)          ||
                this.contains(student.courses, searchQuery) ||
                this.contains(student.program, searchQuery) ||
                this.contains(student.hobbies, searchQuery) ||
                student.bio.includes(searchQuery)) {
                queryMatches.push(student)
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

        const updatedChats = this.state.chats;
        updatedChats.push(chatName.toUpperCase())
        this.setState({ chats: updatedChats })
    }

    // Adding/Removing courses functionality

	courseOnChange = (event) => {
		this.setState({ newCourse: event.target.value.trim().toUpperCase() })
	}

    addCourse = () => {

		if (this.state.chats.includes(this.state.newCourse) || (this.state.newCourse == "") || 
				(this.state.currentUser.courses.length >= 6)) {
			return
		}

        let updatedUser = {...this.state.currentUser}
        updatedUser.courses = this.state.currentUser.courses.slice()
		updatedUser.courses.push(this.state.newCourse)

		let newChats = this.state.chats.slice()
		newChats.push(this.state.newCourse)

		this.setState({ currentUser: updatedUser, chats: newChats, newCourse: "" })
	}

	removeCourse = (event) => {

        console.log("Removing Course")

		const courseToRemove = event.target.parentNode.firstChild.value
		let coursesIndex = this.state.currentUser.courses.indexOf(courseToRemove)
		let chatIndex = this.state.chats.indexOf(courseToRemove)

		let updatedUser = {...this.state.currentUser}
        updatedUser.courses = this.state.currentUser.courses.slice()
		updatedUser.courses.splice(coursesIndex, 1)

		let newChats = this.state.chats.slice()
		newChats.splice(chatIndex, 1)

		this.setState({ currentUser: updatedUser, chats: newChats })
    }

    bioOnChange = (event) => {
		this.setState({ newBio: event.target.value.trim()})
	}
    
    submitBio = () => {

		if (this.state.newBio == "") {
			return
		}

		let updatedUser = {...this.state.currentUser}
		updatedUser.bio = this.state.newBio
		this.setState({currentUser: updatedUser})
    }
    
    // Image selection handler.
    handleSelectionChange = (event) => {
        const pic = event.target.value
        let profilePic = confusedMan
        switch(pic) {
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
        this.setState({image: profilePic})
      }
    
    toggleSearchMode = (newView, chatName) => {
        this.setState({ viewFragment: newView, currentChat: chatName })
     
    }

    // changeChat = (currentChat, newChat) => {
    //     const messageList = this.state.currentUser.groups[this.state.currentChat]
        
       
    
    //     messageList.push(newChat)
        
    //     this.setState ({currentUser.groups[currentChat] : messageList})
      
    //   }
      
    


    render() {

        let centerPage = null
        let rightPage = null
        if (this.state.viewFragment == "home") {
            { console.log(this.state.currentUser.schedule) }
            centerPage = <Schedule schedule={this.state.currentUser.schedule} />
            rightPage = <TodoList name={this.props.name} removeToDo={this.props.removeToDo} todoList={this.props.toDoList} />
        }
        else if (this.state.viewFragment == "search") {
            centerPage = <Students addChat={this.addChat} students={this.state.students} />
            rightPage = null
        } else if (this.state.viewFragment == "settings") {
            centerPage = <SettingsPage currentUser={this.state.currentUser} chats={this.state.chats} image={this.state.image}
                            courseOnChange={this.courseOnChange} addCourse={this.addCourse} removeCourse={this.removeCourse} newCourse={this.state.newCourse}
                            bioOnChange={this.bioOnChange} submitBio={this.submitBio} handleSelectionChange={this.handleSelectionChange}/>
            rightPage = null
        }
        else {
            console.log("in else")
            // console.log(this.state.currentUser.groups)
            // console.log(this.state.currentChat)
            // console.log(this.state.currentUser.groups[this.state.currentChat])
            // console.log(this.state.currentUser.groups.csc300)
            let texts=this.state.currentUser.groups[this.state.currentChat]
            console.log("texts", texts)
         
            centerPage = <Chat currentUser={this.state.currentUser} texts={texts}/>
            rightPage = null
        }

        return (

            <div className="outerDiv">

                {/* Load icons for navbar */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

                {/* Navbar */}
                <nav id="nav">
                    {/* Search Bar */}
                    <form onChange={this.onChange} onClick={() => this.toggleSearchMode("search")} onSubmit={this.filterStudents}>
                        <input type="text"></input>
                        <input className="submitQuery" type="submit" value="Ok"></input>
                    </form>       

                    {/* Navigation buttons */}
                    <a href="#" onClick={() => this.toggleSearchMode("settings")}><i className="fa fa-fw fa-user"></i>{this.state.currentUser.name}</a>
                    <a href="#" onClick={() => this.toggleSearchMode("home")}><i className="fa fa-fw fa-home"></i>Home</a>
                </nav>

                <aside id="sidebarContainer">
                    <SideBar toggleSearchMode={this.toggleSearchMode} chats={this.state.chats} />
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
