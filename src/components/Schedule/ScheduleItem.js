import React, {Component} from 'react';
import './Schedule.css';


class ScheduleItem extends Component {



  render() {
   
    return (
      <div className="scheduleItem">

          <div className='Time'>
            <p>{this.props.time}</p>
          </div>

          <div className='Activity'>
            <h2>{this.props.activity}</h2>
          </div>
         
         
          
        
      </div>
   
    );
  }
}

export default ScheduleItem;