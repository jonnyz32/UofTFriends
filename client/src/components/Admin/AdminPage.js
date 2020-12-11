import React from 'react';
import ReportCard from './ReportCard';
import ViewReport from './ViewReport'
import './AdminPage.css';
import { Redirect } from 'react-router-dom';

export class AdminPage extends React.Component {

	state = {
		reports: [],
		reportToShow: null,
		logout: false
	}

	// Fetching all reports.
	componentDidMount() {
		fetch("/reports", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(res => {
			if (res.status == 200) {
				return res.json()
			} else {
				alert("Couldn't get reports!")
			}
		}).then(json => {
			console.log("Reports:", json)
			this.createReportObjects(json)
		}).catch(error => {
			console.log(error)
		})
	}

	// Constructing the report objects needed for Admin's logic.
	createReportObjects = (dbReports) => {
		const newReports = []
		dbReports.forEach(rep => {
			newReports.push({
				name: rep.senderName,
				msgID: rep.msgID,
				msg: rep.msgBody,
				senderID: rep.senderID,
				groupID: rep.groupID,
				reportID: rep._id
			})
		})
		this.setState({ reports: newReports })
		console.log("Constructed reports", this.state.reports)
	}

	// onClick callback for reported student buttons; loads appripirate view in the actions section.
	viewReport = (reportedStudent) => {
		const report = this.state.reports.find(rep => rep.reportID === reportedStudent.reportID)
		this.setState({ reportToShow: report })
	}

	// Remove the selected report locally and from the DB.
	removeReport = (reportedStudent, action) => {
		let reportIndex
		let i = 0
		this.state.reports.forEach(rep => {
			if (rep.name === reportedStudent) {
				reportIndex = i
				return
			}
			i++
		});
		const reportID = this.state.reports[reportIndex].reportID
		// Remove report on DB.
		fetch(`/reports/${reportID}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(res => {
			if (res.status == 200) {
				// Delete the report locally.
				const newReports = [...this.state.reports]
				const removedReport = newReports.splice(reportIndex, 1)[0]
				this.setState({ reports: newReports })
				this.setState({ reportToShow: null })
				// Report has been removed; remove actual message.
				if (action === "REMOVE") {
					this.removeMessage(removedReport.groupID, removedReport.msgID)
				}
			} else {
				alert("Couldn't delete report!")
			}
		}).catch(error => {
			console.log(error)
		})
	}

	// Remove the reported message from the DB.
	removeMessage(groupID, msgID) {
		fetch(`/messages/${groupID}/${msgID}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(res => {
			if (res.status !== 200) {
				alert("Couldn't delete message!")
			}
		}).catch(error => {
			console.log(error)
		})
	}

	logout = () => {
		this.setState({ logout: true })
	}

	render() {

		if (this.state.logout) {
			return <Redirect to={{ pathname: "/" }} />
		}
		return (
			<div className="adminRoot">
				{/* ICONS */}
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

				{/* Navbar */}
				<nav className="adminNav">
					<p className="adminTitle">ADMIN</p>
					<a onClick={this.logout}><i className="fa fa-fw fa-power-off"></i>Logout</a>
				</nav>
				{/* Sidebar; buttons for reported students. */}
				<section className="adminSidebar">
					<aside className="reportedPanel">
						<p>Reported Students</p>
						{this.state.reports.map((report) => <ReportCard report={report} viewReport={this.viewReport} />)}
					</aside>
				</section>
				{/* Actions: Report or dismiss reports. */}
				<section className="actionsFragmentContainer">
					<p className="actionsFragmentHeader">Actions</p>
					{this.state.reportToShow ? <ViewReport report={this.state.reportToShow} removeReport={this.removeReport} /> : null}
				</section>
			</div>
		);
	}
}

export default AdminPage;