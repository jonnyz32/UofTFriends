import React, { Component } from 'react';
import './ViewReport.css';

export class ViewReport extends Component {

	render() {

		return (
			<div >

				<div className="ReportViewContainer">
					<p className="ReportViewParagraph">Reported: {this.props.report.name}</p>
					<p className="ReportViewParagraph">Type: {this.props.report.type}</p>
					<p className="ReportViewParagraph">Reason: {this.props.report.reason}</p>
					{this.props.report.reportedMessage ? <p className="ReportViewParagraph">Reported Message: {this.props.report.reportedMessage}</p> : null}
				</div>

				<span className="ReportViewButtonTray">
					<button className="ReportViewDismissButton" onClick={() => this.props.removeReport(this.props.report.name, this.props.report.type)}>Dismiss</button>
					<button className="ReportViewBanButton" onClick={() => this.props.removeReport(this.props.report.name, this.props.report.type)}>Ban</button>
				</span>
			</div>
		);
	}
}

export default ViewReport;