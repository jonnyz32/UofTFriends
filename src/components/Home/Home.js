import React, {Component} from 'react';
import Schedule from '../Schedule/Schedule';


class Home extends Component {

    // {this.props.scheduleItems.map((scheduleItem) => <scheduleItem activity={ScheduleItem.activity}
    //                                                                     time={ScheduleItem.time}
    //                                                                     />)}


  render() {
   
    return (
      <div className="home">
          <Schedule schedule={this.props.schedule}/>
      </div>
   
    );
  }
}

export default Home;