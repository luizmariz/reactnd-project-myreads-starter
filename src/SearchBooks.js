import React from 'react';
import { array, func } from 'prop-types';
import SearchBooksBar from './SearchBooksBar';
import SearchBooksContent from './SearchBooksContent';

const SearchBooks = props => {
  return(
    <div className="search-books">
      <SearchBooksBar onSearchQuery={props.onHandleSearch}/>
      <SearchBooksContent books={props.searchBooks} onUpdate={props.onHandleUpdate}/>
    </div>
  );
};

SearchBooks.propTypes = {
  searchBooks: array,
  onHandleSearch: func,
};

export default SearchBooks;