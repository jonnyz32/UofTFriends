import React, {Component} from 'react';
import SideBar from './components/SideBar';
import Students from './components/Students';
import './App.css';
import SearchBar from './components/SearchBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SideBar />
        <SearchBar />
        <Students />
        
      </div>
    );
  }
}
export default App;

