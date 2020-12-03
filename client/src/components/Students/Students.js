import React, { Component } from 'react';
import StudentItem from '../StudentItem/StudentItem';
import '../StudentItem/StudentItem.css';

class Students extends Component {

	constructor(props) {
		super(props)
		this.keyCount = 0
	}

	newKey = () => {
		this.keyCount += 1
		return this.keyCount;
	}

	render() {

		return (
			<div className="Students">
				{this.props.users && this.props.users.map((user) => <StudentItem key={this.newKey()} addChat={this.props.addChat}
					user={user} />)}

			</div>
		);
	}
}

export default Students;