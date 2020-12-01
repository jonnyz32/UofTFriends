import React from 'react';

export class ProfilePicture extends React.Component {
	render() {
		return (
			<div className="profilePictureContainer">
				<img className="profilePicture" src={this.props.imageSrc} alt="profilePicture" />
			</div>
		);
	}
}

export default ProfilePicture
