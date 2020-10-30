import React from 'react';

import Course from './Course';
import './SettingsPage.css';
import logo from '../../images/Mobsquare.png'

export class SettingsPage extends React.Component {

  render() {

    return (
        <div className="Background"> 

          <div className="SettingsHeader">

            <img className="Avatar" src={logo}></img>
            <div className="SettingsTitle">
              <p className="Name"> {this.props.student.name} </p>
            </div>
            
          </div>

          <form className="CourseList">

            {this.props.student.courses.map((course) => (<Course course={course} />))}
            <input className="Bio" type="text" value={this.props.student.bio}></input>
            <br></br>
            <button className="Submit">Save!</button>
        
          </form>
        </div>
    );
  }
}

export default SettingsPage;