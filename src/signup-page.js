import React, {Component} from 'react';
import "./signup-page.css"
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import Home from './components/Home/Home';





class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password:"",
      email:"",
      users : this.props.users

    };

  }


  SignIn = (event) => {
    const verificationUser = {username: this.state.username, password: this.state.password, email: this.state.email}
    for (var i=0; i<this.state.users.length; i++) {
     if (JSON.stringify(this.state.users[i].name) === JSON.stringify(verificationUser.username) ) {
             alert("EQUALS");
      }
}
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
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
    });

    console.log(newUser.username)

  }

    render() {
      return(<div className="div">


        <h1> Sign Up to Friends-at-UofT </h1>
        <input type="text" value= {this.state.username} onChange={this.handleInputChange} className="input" name="username" placeholder="User Name"/>
        <input type="text" value= {this.state.password} onChange={this.handleInputChange} className="input" name="password" placeholder="Password"/>
        <input type="text" value= {this.state.email} onChange={this.handleInputChange} className="input" name="email" placeholder="UofT Email"/>


        <button className="button" onClick={this.addUser}> Sign Up </button>
        <button className="button" onClick={this.SignIn}> Sign In </button>


        <a className="FAQ"> Frequently Asked Questions</a>
        <a href="mailto:97sdmn@gmail.com" className="Contact"> Contact us</a>
        </div>);
    }
}

//<Link to={'/Home'}> <button>Go to search bar</button></Link>

export default Signup
