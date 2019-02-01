import React, { Component } from 'react';
import { array, func } from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  render() {
    const { shelfTitle, books } = this.props;
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map( book => (
              <Book 
                key={book.id}
                book={book}
                onUpdateShelf={this.props.onHandleUpdate}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  books: array,
  onHandleUpdate: func,
};

export default BookShelf;