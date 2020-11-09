import React, {Component} from 'react';
import './ReportCard.css';

export class ReportCard extends Component {


  render() {


    return (
        <div className="ReportCardContainer">
            <button onClick={() => this.props.viewReport(this.props.name, this.props.type)}>{this.props.name}</button>
        </div>
    );  
  }
}

export default ReportCard;