import React, { Component } from 'react';
import './Todolist.css';

class ToDoListItem extends Component {

	state = {
		name: this.props.name,
		delete: false
	}

	remove = (event) => {
		this.setState({
			delete: true
		})
	}

	render() {
		if (this.state.delete) {
			return null
		} else {
			return (
				<div className="ToDoListItem">
					<div className='Time'>
						{this.props.time}
					</div>

					<div className='Activity'>
						{this.props.activity}
						<input onClick={this.remove} type="checkbox" />
					</div>
				</div>
			);
		}
	}
}

export default ToDoListItem;
