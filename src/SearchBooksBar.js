import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import { debounce } from 'lodash';

class SearchBooksBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };

    this.searchQueryDebounced = debounce(this.searchQuery, 250 );
  }
  
  handleChange = event => {
    const value = event.target.value;

    this.setState(() => ({
      query: value,
    })); 

    this.searchQueryDebounced(value);
  }; //In this way, the user input value stay sync but the API request is right debounced

  searchQuery = query => {
    this.props.onSearchQuery(query);
  };

  render() {
    return(
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input 
            type="text" 
            placeholder="Search by title or author" 
            value={this.state.query} 
            onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}

SearchBooksBar.propTypes = {
  onSearchQuery: func,
};

export default SearchBooksBar;