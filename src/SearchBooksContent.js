import React from 'react';
import { array } from 'prop-types';
import Book from './Book';

const SearchBooksContent = props => {
  return(
    <div className="search-books-results">
      <ol className="books-grid">
        {props.books.map( book => (
          <Book
            key={book.id}
            book={book}
            onUpdateShelf={props.onUpdate}
          />
        ))}
      </ol>
    </div>
  );
};

SearchBooksContent.propTypes = {
  books: array,
};

export default SearchBooksContent;