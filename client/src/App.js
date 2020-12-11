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
	}

	componentDidMount() {
		fetch("/fetchUsers", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(res => {
			if (res.status === 200) {
				return res.json()
			}
			else {
				alert("could not get users")
			}
		})
			.then(json => {

				this.setState({ users: json })
			})
			.catch(error => {
				console.log(error)
			})
	}


	toggleSignIn = (currentUser, signedIn) => {
		if (signedIn) {
			this.setState({ currentUser: currentUser })
		}
	}

	updateUser = (updatedUser) => {
		this.setState({ currentUser: updatedUser })

		let users = this.state.users
		for (var i = 0; i < this.state.users.length; i++) {
			if (JSON.stringify(this.state.users[i].name) === JSON.stringify(updatedUser.name)) {
				users[i] = updatedUser
				this.setState({ users: users })
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
