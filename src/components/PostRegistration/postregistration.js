import React, {Component} from 'react';

import Course from '../SettingsPage/Course';

import PostRegistrationStyle from './postregistration.css'
import confusedMan from '../../images/Mobsquare.png'
import happySun from '../../images/happySun.png'
import sadMan from '../../images/sadFace.jpg'

class PostRegistration extends Component {

  state = {
    courses: [],
    newCourse: "",
    image: confusedMan
  }

  handleSelectionChange = (event) => {
    const pic = event.target.value
    let profilePic = confusedMan
    switch(pic) {
      case "confusedMan":
        break;
      case "happySun":
        profilePic = happySun
        break;
      case "sadMan":
        profilePic = sadMan
        break;
      default:
        profilePic = sadMan
    }
    this.setState({image: profilePic})
  }

  addCourse = () => {
      if (this.state.newCourse == "") {
        return
      }
      this.state.courses.push(this.state.newCourse)
      this.setState({newCourse: ""})
	}

	removeCourse = (event) => {
      const courseToRemove = event.target.parentNode.firstChild.value
      let coursesIndex = this.state.courses.indexOf(courseToRemove)

      this.state.courses.splice(coursesIndex, 1)
      this.setState({newCourse: ""})
  }
  
  courseOnChange = (event) => {
		this.setState({newCourse: event.target.value.trim().toUpperCase()})
	}

  render() {
      return (
        <div id="onboardingRoot">
          <div className="onboardingContainer">
            <h1>Before you begin using the website and making new friends, tell us a little bit about yourself!</h1>
            <div className="profilePictureContainer">
              <img className="onboardingProfilePicture" value="confusedMan" src={this.state.image} alt="profilePicture" />
              <select className="profilePictureSelect" onChange={this.handleSelectionChange}>
                <option value="confusedMan">Confused Man</option>
                <option value="happySun">Happy Sun</option>
                <option value="sadMan">Sad Man</option>
              </select>
              <label> YOU </label>
            </div>

            <div className="profileInfoContainer">
              <br/>
              <div>
                <label>I am in </label>
                <select name="degree">
                  <option value disabled selected>select your degree</option>
                  <option value="Agricultural Sciences">Agricultural Sciences</option>
                  <option value="Arts and Humanities">Arts and Humanities</option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Physics">Physics</option>
                </select>,
                <label> in my </label>
                <select name="year">
                  <option value disabled selected>select your year</option>
                  <option value="first">first</option>
                  <option value="second">second</option>
                  <option value="third">third</option>
                  <option value="fourth">fourth</option>
                  <option value="fifth">fifth</option>
                  <option value="sixth">sixth</option>
                </select>
                <label> year.</label>
              </div>
              <br/>

              <label>This semester, I will take:</label>

              <form className="onboardingCoursesContainer">
                <label>Courses:</label>
                {this.state.courses.map((course) => (<Course course={course} removeCourse={this.removeCourse} />))}
              </form>

              <div className="onboardingAddCourseContainer">
                <form className="onboardingAddCourseForm" onChange={this.courseOnChange}>
                  <input type="text" name="newCourse" placeholder="Enter new course..."></input>
                </form>
                <button className="onboardingAddCourseButton"  onClick={this.addCourse}>Add</button>
              </div>

              <br/>
              <br/>
              <div>
                <label>My hobbies are </label>
                <input type="text" name="courses" placeholder="Type in your interests" />
              </div>
            </div>

            <br/>
            <label id="bioTitle">Say something about yourself!</label>
						<textarea className="onboardingBio"></textarea>

            <div>
              <button class="endOnboardingButton">Continue</button>
            </div>
          </div>
        </div>
      )
    }
}

export default PostRegistration
