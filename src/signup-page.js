import React, {Component} from 'react';
import "./signup-page.css"





class Signup extends Component {

  state = {
    username: "",
    password:"",
    email:"",
    users : [{username:"",password:""}]

  }

  handleInputChange = (event) => {
    const target = event.target
    const value = event.value
    const name=target.name

    this.setState({

      [name]:value
    }

    )
  }

  addStudent = () => {
    const userList = this.state.users
    const newUser = {username: this.state.username, password: this.state.password, email: this.state.email}
    userList.push(newUser)
    this.setState ({
      users : userList
    })
  }

    render() {
      return(<div class="div">


        <h1> Sign Up to Friends-at-UofT </h1>
        <input type="text" value= {this.state.username} onChange="this.handleInputChange" class="input" name="username" placeholder="User Name"/>
        <input type="text" value= {this.state.password} onChange="this.handleInputChange" class="input" name="password" placeholder="Password"/>
        <input type="text" value= {this.state.email} onChange="this.handleInputChange" class="input" name="email" placeholder="UofT Email"/>

        <button class="button" onClick={this.addUser}> Sign Up </button>

        <a class="FAQ"> Frequently Asked Questions</a>
        <a href="mailto:97sdmn@gmail.com" class="Contact"> Contact us</a>
        </div>);
    }
}

export default Signup
