import React, {Component} from 'react';
import ToDoListItem from './TodolistItem';
import './Todolist.css';


class ToDoList extends Component {

   state = {
     time: "",
     todolist: this.props.todolist,
     activity:""

   }

   handleInputChange = (event) => {
     const target = event.target
     const value = target.value
     const name=target.name

     this.setState({

       [name]:value
     }

     )
   }

   addNewTodo = () => {
     const newTodoList = this.state.todolist
     const newTodo = {activity: this.state.activity, time: this.state.time}
     newTodoList.push(newTodo)
     this.setState ({
       todolist : this.props.todolist
     });

     console.log(this.state.toDoList)

   }



  render() {

    return (
      <div className="Todolist">
      <h2> To do list </h2>
      <table>

     {this.props.todolist.map((toDoListItem) => <ToDoListItem removeToDo={this.props.removeToDo} name={this.props.name} activity={toDoListItem.activity}
                                                                   time={toDoListItem.time}
                                                                   />)}
      </table>
      <input name="activity"  type='text' value= {this.state.activity} onChange={this.handleInputChange} placeholder='new task'/>
      <input name="time"  type='text' value= {this.state.time} onChange={this.handleInputChange} placeholder='time for new task'/>
      <button className="button" onClick={this.addNewTodo}> add new ToDo </button>
      </div>

    );
  }
}

export default ToDoList;