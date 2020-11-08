import React, {Component} from 'react';
import './Todolist.css';


class ToDoListItem extends Component {

  state={
    name: this.props.name,
    delete: false
  }


 remove = (event) => {
   this.props.removeToDo(this.state.name,this.props.activity);
   this.setState( {
     delete:true
   })
 }




  render() {
    if(this.state.delete){
      return null

    }

    else {


    return (
      <div className="ToDoListItem">

          <div class='Time'>
            {this.props.time}
          </div>

          <div class='Activity'>
            {this.props.activity}
            <input onClick={this.remove} type="checkbox" hello />
          </div>




      </div>

    );
  }
}


}

export default ToDoListItem;
