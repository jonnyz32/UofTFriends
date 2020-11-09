import React from 'react';
import ReportCard from './ReportCard';
import ViewReport from './ViewReport'
import './AdminPage.css';
import {Redirect} from 'react-router-dom';

export class AdminPage extends React.Component {

	state = {
		reportedGroups: [
			{
				name: "CSC309",
				type: "Group",
				reason: "Collectively excluding a student.",
			},
			{
				name: "MAT235",
				type: "Group",
				reason: "Whole lotta cheating",
			}],
		reportedUsers: [
			{
				name: "Jonathan Zak",
				type: "Student",
				reason: "Too cool for school",
				reportedMessage: "Yo school is actually for C H U M P S."
			},
			{
				name: "Phil Dunphy",
				type: "Student",
				reason: "Spamming self-promotions",
				reportedMessage: "I'm a realtor, buy a house."
			},
			{
				name: "Homer Simpson",
				type: "Student",
				reason: "Eating too many donuts",
				reportedMessage: "This is my 12th donut."
			},
			{
				name: "Adi Thakur",
				type: "Student",
				reason: "Spreading hate against JS",
				reportedMessage: "JS sucks."
			},
			{
				name: "Meirbek Zeinulla",
				type: "Student",
				reason: "Extremely rude.",
				reportedMessage: "Good evening, may I please have some more soup?"
			}],
		reportToShow: null,
		logout: false
	}

	viewReport = (reportName, reportType) => {

		const reportIndex = this.getIndexOf(reportName, reportType)
		let report = null

		if (reportType === "Group") {
			report = this.state.reportedGroups[reportIndex]
		} else {
			report = this.state.reportedStudents[reportIndex]
		}
		this.setState({ reportToShow: report })
	}

	getIndexOf = (reportName, reportType) => {

		let arrayToIterate

		if (reportType === "Group") {
			arrayToIterate = this.state.reportedGroups
		} else {
			arrayToIterate = this.state.reportedStudents
		}

		for (let i = 0; i < arrayToIterate.length; i++) {
			const element = arrayToIterate[i];
			if (element.name === reportName) {
				return i
			}
		}
		return null
	}

	removeReport = (reportName, reportType) => {

		const reportIndex = this.getIndexOf(reportName, reportType)
		console.log(reportName, reportType)
		console.log(reportIndex)
		let arrayToSplice

		if (reportType == "Group") {
			arrayToSplice = this.state.reportedGroups.slice()
			arrayToSplice.splice(reportIndex, 1)
			this.setState({ reportedGroups: arrayToSplice })
		} else {
			arrayToSplice = this.state.reportedStudents.slice()
			arrayToSplice.splice(reportIndex, 1)
			this.setState({ reportedStudents: arrayToSplice })
		}
		this.setState({ reportToShow: null})
	}

	logout = () => {
		this.setState({ logout: true})
	}

	render() {

		if(this.state.logout){
			return <Redirect to={{ pathname: "/SignUp" }}/>
		}

		return (

			<div className="adminRoot">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
				
				<nav className="adminNav">
					<p className="adminTitle">ADMIN</p> 
					<a onClick={this.logout}>Logout</a>
				</nav>

				<section className="adminSidebar">
					<aside className="reportedPanel">
						<p>Reported Groups</p>
						{this.state.reportedGroups.map((report) => <ReportCard name={report.name} reason={report.reason} type={report.type}
							reportedMessage={null} viewReport={this.viewReport} />)}
					</aside>
					<aside className="reportedPanel">
						<p>Reported Students</p>
						{this.state.reportedStudents.map((report) => <ReportCard name={report.name} reason={report.reason} type={report.type}
							reportedMessage={report.reportedMessage} viewReport={this.viewReport} />)}
					</aside>
				</section>

				<section className="actionsFragment">
					<p className="actionsFragmentHeader">Actions</p>
					{this.state.reportToShow ? <ViewReport report={this.state.reportToShow} removeReport={this.removeReport} /> : null}
				</section>
			</div>
		);
	}
}

export default AdminPage;