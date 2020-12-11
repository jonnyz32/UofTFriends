import React, { Component } from 'react';
import ToDoListItem from './TodolistItem';
import './Todolist.css';

class ToDoList extends Component {

	render() {

		return (
			<div className="Todolist">
				<h2> To-Do List </h2>
				<div>
					{
						this.props.toDoList ?
							this.props.toDoList.map((toDoListItem) => <ToDoListItem name={this.props.name} activity={toDoListItem.activity} time={toDoListItem.time} removeToDo={this.props.removeToDo} />) : null
					}
				</div>
				<div className="TodolistNewTaskTray">
					<input name="activity" type='text' value={this.props.activity} onChange={this.props.handleInputChange} placeholder='New task...' />
					<input name="time" type='text' value={this.props.time} onChange={this.props.handleInputChange} placeholder='Time for new task...' />
				</div>

				<button className="TodolistButton" onClick={this.props.addNewTodo}> Add </button>
			</div>

		);
	}
}

export default ToDoList;
