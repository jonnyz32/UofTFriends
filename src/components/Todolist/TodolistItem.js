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
      <tr className="ToDoListItem">

          <td class='Time'>
            {this.props.time}
          </td>

          <td class='Activity'>
            {this.props.activity}
            <input onClick={this.remove} type="checkbox" hello />
          </td>




      </tr>

    );
  }
}


}

export default ToDoListItem;
