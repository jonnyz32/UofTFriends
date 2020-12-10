import React, { Component } from 'react';
import ProfilePicture from '../ProfilePicture/profilePicture';
import './StudentItem.css';


class StudentItem extends Component {

	render() {

		return (
			<div className="Student">
				<ProfilePicture imageSrc={this.props.user.image} alt="profilePic" />
				<div className="StudentInfo">
					<span><h3>{this.props.user.name}</h3></span>
					<p>
						Courses: {this.props.user.courses.join(", ")} <br></br>
						Program: {this.props.user.program.join(", ")} <br></br>
						Year: {this.props.user.year} <br></br>
						Hobbies: {this.props.user.hobbies.join(", ")} <br></br>
						Bio: {this.props.user.bio} <br></br>
					</p>
				</div>
				<button onClick={() => this.props.addChat(this.props.user._id, this.props.user.name)}>Chat</button>
			</div>

		);
	}
}

export default StudentItem;
