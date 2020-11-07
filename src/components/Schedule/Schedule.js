import React, {Component} from 'react';
import ScheduleItem from './ScheduleItem';
import './Schedule.css';


class Schedule extends Component {



  render() {
   
    return (
      <div className="schedule">
          <div className="header"><h2>Schedule</h2></div>
          {console.log("in Schedule",this.props.schedule)}
          {this.props.schedule.map((scheduleItem) => <ScheduleItem activity={scheduleItem.activity}
                                                                        time={scheduleItem.time}
                                                                        />)}
        
      </div>
   
    );
  }
}

export default Schedule;