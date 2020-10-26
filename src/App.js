import React, {Component} from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SideBar from './SideBar';
import Signup from './signup-page';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <Switch> 
          <Route exact path='/Signup' render={() =>
                          (<Signup/>)}/>
          <Route exact path='/SideBar' render={() =>
                          (<SideBar/>)}/>
        </Switch>
      </BrowserRouter>




      </div>
    );
  }
}
export default App;
