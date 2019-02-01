import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';

class SearchBooksBar extends Component {
  state = {
    query: "",
  };

  handleChange = event => {
    let value = event.target.value;
    this.setState(() => ({
      query: value,
    }));
    this.props.onSearchQuery(value);
  };

  render() {
    return(
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}

SearchBooksBar.propTypes = {
  onSearchQuery: func,
};

export default SearchBooksBar;