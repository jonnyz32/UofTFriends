import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Signup from './components/SignupPage/SignupPage';
import './App.css';
import Home from './components/Home/Home';
import SettingsPage from './components/SettingsPage/SettingsPage';
import Chat from './components/Chat/Chat';
import PostRegistration from './components/PostRegistration/postregistration';
import AdminPage from './components/Admin/AdminPage';

import confusedMan from './images/Mobsquare.png'
import happySun from './images/happySun.png'
import sadMan from './images/sadFace.jpg'

class App extends Component {
	state = {
		currentUser: {},
		users: [
			{
				name: 'user',
				password: 'user',
				groups: {},
				courses: ['CSC300', 'CSC309', 'CSC311', 'CSC343', 'PHL245'],
				program: ['Computer Science Specialist'],
				year: "third",
				hobbies: ['Rock climbing'],
				toDoList: [{
					activity: 'leg day',
					time: '4-5pm'
				},
				{
					activity: 'CSC309 group meeting',
					time: '8-9pm'
				}
				],
				bio: 'Third year cs student. Looking to meet some new people!',
				image: confusedMan,
				seenOnboarding: true,
				// groups: {"5fc69ba84c82db94b79c764c":{"name":"","messages":[]},
				// 		 "5fc6be2f43d80c268cb62d3b":{"name":"","messages":[]},
				// 		 "5fc6bf4d43d80c268cb62d3d":{"name":"","messages":[]},
				// 		 "5fc6bf9443d80c268cb62d3e":{"name":"","messages":[]}
					// CSC300: [
					// 	// {
					// 	// 	sender: "Michael",
					// 	// 	text: "Hey have you started the csc300 hw?",
					// 	// 	iscurrentsender: false
					// 	// },
					// 	// {
					// 	// 	sender: "Jonathan",
					// 	// 	text: "Nope been too busy with 309 :(",
					// 	// 	iscurrentsender: false
					// 	// }
					// ],
					// CSC309: [
					// 	// {
					// 	// 	sender: "Aziz",
					// 	// 	text: "What did you guys get on the proposal?",
					// 	// 	iscurrentsender: false
					// 	// },
					// 	// {
					// 	// 	sender: "Jonathan",
					// 	// 	text: "3/3!",
					// 	// 	iscurrentsender: false
					// 	// }
					// ],
					// CSC311: [
					// 	// {
					// 	// 	sender: "Adi",
					// 	// 	text: "This course make me want to cry",
					// 	// 	iscurrentsender: false
					// 	// },
					// 	// {
					// 	// 	sender: "Jonathan",
					// 	// 	text: "Me toooooo",
					// 	// 	iscurrentsender: false
					// 	// }
					// ],
					// CSC343: [
					// 	// {
					// 	// 	sender: "Meirbek",
					// 	// 	text: "What about reading week??",
					// 	// 	iscurrentsender: false
					// 	// },
					// 	// {
					// 	// 	sender: "Jonathan",
					// 	// 	text: "We don't get one :'(",
					// 	// 	iscurrentsender: false
					// 	// }
					// ],
					// PHL245: [
					// 	// {
					// 	// 	sender: "Aziz",
					// 	// 	text: "I love this class",
					// 	// 	iscurrentsender: false
					// 	// },
					// 	// {
					// 	// 	sender: "Jonathan",
					// 	// 	text: "yep, easy A",
					// 	// 	iscurrentsender: false
					// 	// }
					// ]
				},

			
			{
				name: 'Shadman Aziz',
				password: 'user',
				courses: ['Apm236', 'CSC309', 'Egy201', 'CSC343', 'CSC311'],
				program: ['Computer Science Major', 'Religion minor'],
				year: "third",
				hobbies: ['Looking sexy'],
				bio: 'Leveling up in Fifa',
				image: sadMan,
				seenOnboarding: true
			},

			{
				name: 'Meirbek Zeinulla',
				password: 'user',
				courses: ['CSC458', 'CSC309', 'MAT235', 'CSC343', 'CSC263'],
				program: ['Computer Science Major', 'Religion minor'],
				year: "first",
				hobbies: ['Looking sexy'],
				bio: 'Leveling up in Fifa',
				image: sadMan,
				seenOnboarding: true
			},

			{
				name: 'Adi Thakur',
				password: 'user',
				courses: ['Apm236', 'CSC309', 'Rel101', 'CSC343', 'Ast304'],
				program: ['Computer Science Major', 'Religion minor'],
				year: "third",
				hobbies: ['Looking sexy'],
				bio: 'Leveling up in Fifa',
				image: sadMan,
				seenOnboarding: true
			},

			{
				name: 'Cathy Aziz',
				password: 'user',
				courses: ['CSC108', 'Rel101', 'Mat235', 'MAT137', 'BIO101'],
				program: ['Computer Science Major', 'Religion minor'],
				year: "fourth",
				hobbies: ['Looking sexy'],
				bio: 'Leveling up in Fifa',
				image: confusedMan,
				seenOnboarding: true
			},

			{
				name: 'Jake Peralta',
				password: 'user',
				courses: ['psy101', 'phl200', 'phl245', 'csc400', 'pey100'],
				program: ['Computer Science Major', 'Religion minor'],
				year: "fifth",
				hobbies: ['Looking sexy'],
				bio: 'Leveling up in Fifa',
				image: sadMan,
				seenOnboarding: true
			},

			{
				name: 'amy santiago',
				password: 'user',
				courses: ['cog201', 'psy101', 'Egy201', 'CSC343', 'CSC311'],
				program: ['Computer Science Major', 'Religion minor'],
				year: "fourth",
				hobbies: ['Looking sexy'],
				bio: 'Leveling up in Fifa',
				image: sadMan,
				seenOnboarding: true
			},

			{
				name: 'Phil dunphy',
				password: 'user',
				courses: ['Apm236', 'Rel101', 'MAT157', 'MAT247', 'CSC311'],
				program: ['Computer Science Major', 'Religion minor'],
				year: "fourth",
				hobbies: ['Looking sexy'],
				bio: 'Leveling up in Fifa',
				image: happySun,
				seenOnboarding: true
			}
			]
	}

	toggleSignIn = (currentUser, signedIn) => {
		if (signedIn) {
			{ this.setState({ currentUser: currentUser }) }
		}
	}

	updateUser = (updatedUser) => {
		this.state.currentUser = updatedUser
		for (var i = 0; i < this.state.users.length; i++) {
			if (JSON.stringify(this.state.users[i].name) === JSON.stringify(updatedUser.name)) {
				this.state.users[i] = updatedUser
				return
			}
		}
	}


	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Switch>
						<Route exact path='/' render={() =>
							(<Signup toggleSignIn={this.toggleSignIn} users={this.state.users} />)} />
						<Route exact path='/Settings' render={() =>
							(<SettingsPage user={this.currentUser} />)} />
						<Route exact path='/Chat' render={() =>
							(<Chat currentUser={this.state.currentUser} />)} />
						<Route exact path='/Home' render={() =>
							(<Home currentUser={this.state.currentUser} users={this.state.users} />)} />
						<Route exact path='/PostRegistration' render={() =>
							(<PostRegistration currentUser={this.state.currentUser} updateUser={this.updateUser} />)} />
						<Route exact path='/Admin' render={() =>
							(<AdminPage />)} />
					</Switch>
				</BrowserRouter>
			</div>
		)
	}
}

export default App;
