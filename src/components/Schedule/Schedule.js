import React, {Component} from 'react';
import ScheduleItem from './ScheduleItem';
import './Schedule.css';


class Schedule extends Component {



  render() {
   
    return (
      <div className="schedule">
          <div className="header">This is header</div>
          {this.props.schedule.map((scheduleItem) => <ScheduleItem activity={scheduleItem.activity}
                                                                        time={scheduleItem.time}
                                                                        />)}
        
      </div>
   
    );
  }
}

export default Schedule;