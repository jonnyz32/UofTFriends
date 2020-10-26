import React, {Component} from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SideBar from './components/SideBar';
import Students from './components/Students';
import Signup from './signup-page';
import './App.css';
import SearchBar from './components/SearchBar';

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
          <Route exact path='/SearchBar' render={() =>
                          (<SearchBar/>)}/>
        </Switch>
      </BrowserRouter>

      </div>
    );
  }
}
export default App;
