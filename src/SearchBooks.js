import React, { Component } from 'react';
import SearchBooksBar from './SearchBooksBar';
import SearchBooksContent from './SearchBooksContent';

class SearchBooks extends Component {
    render() {
        return(
          <div className="search-books">
            <SearchBooksBar/>
            <SearchBooksContent/>
          </div>
        );
    }
}

export default SearchBooks;