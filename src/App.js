import React, {Component} from 'react';
import SideBar from './components/SideBar';
import Students from './components/Students';
import './App.css';
import SearchBar from './components/SearchBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
        {/* <SideBar /> */}
 
        
      </div>
    );
  }
}
export default App;

