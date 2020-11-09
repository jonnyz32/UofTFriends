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
				password: 'password',
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
				groups: {
					CSC300: [
						{
							sender: "Michael",
							text: "Hey have you started the csc300 hw?",
							iscurrentsender: false
						},
						{
							sender: "Jonathan",
							text: "Nope been too busy with 309 :(",
							iscurrentsender: false
						}
					],
					CSC309: [
						{
							sender: "Aziz",
							text: "What did you guys get on the proposal?",
							iscurrentsender: false
						},
						{
							sender: "Jonathan",
							text: "3/3!",
							iscurrentsender: false
						}
					],
					CSC311: [
						{
							sender: "Adi",
							text: "This course make me want to cry",
							iscurrentsender: false
						},
						{
							sender: "Jonathan",
							text: "Me toooooo",
							iscurrentsender: false
						}
					],
					CSC343: [
						{
							sender: "Meirbek",
							text: "What about reading week??",
							iscurrentsender: false
						},
						{
							sender: "Jonathan",
							text: "We don't get one :'(",
							iscurrentsender: false
						}
					],
					PHL245: [
						{
							sender: "Aziz",
							text: "I love this class",
							iscurrentsender: false
						},
						{
							sender: "Jonathan",
							text: "yep, easy A",
							iscurrentsender: false
						}
					]
				}

			},
			{
				name: 'Shadman Aziz',
				password: 'password',
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
				password: 'password',
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
				password: 'password',
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
				password: 'password',
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
				password: 'password',
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
				password: 'password',
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
				password: 'password',
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

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Switch>
						<Route exact path='/Signup' render={() =>
							(<Signup toggleSignIn={this.toggleSignIn} users={this.state.users} />)} />
						<Route exact path='/Settings' render={() =>
							(<SettingsPage user={this.currentUser} />)} />
						<Route exact path='/Chat' render={() =>
							(<Chat currentUser={this.state.currentUser} />)} />
						<Route exact path='/Home' render={() =>
							(<Home currentUser={this.state.currentUser} users={this.state.users} />)} />
						<Route exact path='/PostRegistration' render={() =>
							(<PostRegistration currentUser={this.state.currentUser} />)} />
					</Switch>
				</BrowserRouter>
			</div>
		)
	}
}

export default App;
