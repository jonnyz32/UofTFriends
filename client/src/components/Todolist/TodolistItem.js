import React, { Component } from 'react';
import './Todolist.css';

class ToDoListItem extends Component {

	render() {

		return (
			<div className="ToDoListItem">

				<div className='Time'>
					{this.props.time}
				</div>

				<div className='Activity'>
					<p>{this.props.activity}</p>
					<input onClick={this.props.removeToDo} type="checkbox" checked={false} />
				</div>
			</div>
		);
	}
}

export default ToDoListItem;
