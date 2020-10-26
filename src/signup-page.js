import React, {Component} from 'react';
import "./signup-page.css"


class Signup extends Component {
    render() {
      return(<div class="div">

      <form action="/" method="post">
        <h1> Sign Up to Friends-at-UofT </h1>
        <input type="text" class="input" name="username" placeholder="User Name"/>
        <input type="text" class="input" name="password" placeholder="Password"/>
        <input type="text" class="input" name="email" placeholder="UofT Email"/>
        <button class="button"> Sign Up </button>
        </form>
        <a class="FAQ"> Frequently Asked Questions</a>
        <a href="mailto:97sdmn@gmail.com" class="Contact"> Contact us</a>
        </div>);
    }
}

export default Signup
