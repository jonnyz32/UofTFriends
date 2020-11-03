import React, {Component} from 'react';
import "./SignupPage.css"
import { Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import { Link } from "react-router-dom";





class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password:"",
      email:"",
      users : this.props.users,
      currentUser:"",
      signedIn:false

    };

  }


  SignIn = (event) => {
    const verificationUser = {username: this.state.username, password: this.state.password, email: this.state.email}
    for (var i=0; i<this.state.users.length; i++) {
     if (JSON.stringify(this.state.users[i].name) === JSON.stringify(verificationUser.username) ) {
             alert("EQUALS");

             this.setState({
               currentUser:this.state.users[i],
               signedIn:1
             }


             )




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

      if(this.state.signedIn==1){
        this.props.toggleSignIn(this.state.currentUser,this.state.signedIn)
        return <Redirect to={{ pathname: "/SearchBar" }}/>
      }
      return(<div className="div">


        <h1 className="header"> Sign Up to Friends-at-UofT </h1>
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

//<Link to={'/SearchBar'}> <button>Go to search bar</button></Link>

export default Signup
