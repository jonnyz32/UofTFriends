import React, {Component} from 'react';
import ScheduleItem from './ScheduleItem';
import './Schedule.css';


class Schedule extends Component {

  constructor(props){
    super(props)
    this.keyCount = 0
  }

  newKey = () => {
    this.keyCount += 1
    return this.keyCount;
  }


  render() {
   
    return (
      <div className="schedule">
          <div className="header"><h2>Schedule</h2></div>
          {console.log("in Schedule",this.props.schedule)}
          {this.props.schedule.map((scheduleItem) => <ScheduleItem key={this.newKey()} activity={scheduleItem.activity}
                                                                        time={scheduleItem.time}
                                                                        />)}
        
      </div>
   
    );
  }
}

export default Schedule;