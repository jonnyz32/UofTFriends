import React, { Component } from 'react';
import './ViewReport.css';

export class ViewReport extends Component {

	render() {

		return (
			<div className="actionsFragment">

				<div className="ReportViewContainer">
					<p className="ReportViewParagraph">Student: {this.props.report.name}</p>
					<p className="ReportViewParagraph">Reported Message: {this.props.report.msg}</p>
					<p className="ReportViewParagraph">Group ID: {this.props.report.groupID}</p>
				</div>

				<span className="ReportViewButtonTray">
					<button className="ReportViewDismissButton" onClick={() => this.props.removeReport(this.props.report.name, "DISMISS")}>Dismiss</button>
					<button className="ReportViewBanButton" onClick={() => this.props.removeReport(this.props.report.name, "REMOVE")}>Remove Message</button>
				</span>
			</div>
		);
	}
}

export default ViewReport;