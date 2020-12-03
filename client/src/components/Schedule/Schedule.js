import React, { Component } from 'react';
import ScheduleItem from './ScheduleItem';
import './Schedule.css';

class Schedule extends Component {

	constructor(props) {
		super(props)
		this.keyCount = 0
		this.time = -1
	}

	newKey = () => {
		this.keyCount += 1
		return this.keyCount;
	}

	nextTime = () => {
		this.time += 1
		return this.time;
	}

	resetTime = () => {
		this.time = -1;
	}


	render() {
		this.resetTime()
		let time = ['9-10am', '12-2pm', '4-6pm', '6-7pm', '7-7:30pm', '8-9pm']

		return (
			<div className="schedule">
				<div className="header"><h2>Schedule</h2></div>
				{console.log("in Schedule", this.props.schedule)}

				{this.props.schedule.map((scheduleItem) => <ScheduleItem key={this.newKey()} activity={scheduleItem}
					time={time[this.nextTime()]}
				/>)}

			</div>

		);
	}
}

export default Schedule;