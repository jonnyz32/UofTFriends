import React, {Component} from 'react';
import Schedule from '../Schedule/Schedule';
import ToDoList from '../Todolist/Todolist';

class Home extends Component {

    // {this.props.scheduleItems.map((scheduleItem) => <scheduleItem activity={ScheduleItem.activity}
    //                                                                     time={ScheduleItem.time}
    //                                                                     />)}


  render() {
    console.log(this.props.toDoList)

    return (
      <div className="home">
          <Schedule schedule={this.props.schedule}/>
          <ToDoList name={this.props.name} removeToDo={this.props.removeToDo} todolist={this.props.toDoList}/>
      </div>

    );
  }
}

export default Home;
