import React, {Component} from 'react';
import './SearchBar.css'


class SearchBar extends Component {
    
    render() {
   
    return (
        <div className="SearchBar">
            <input className="filterBar" type="text" placeholder="Filter..."></input>
            <button>submit</button>
            

        </div>
    
    );
  }
}

export default SearchBar;