import React, { Component } from 'react';
import { func, object } from 'prop-types';

class Book extends Component {

  handleChange = event => {
    this.props.onUpdateShelf(this.props.book, event.target.value);
  };

  render() {
    const { book } = this.props;
    return(
      <li>   
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={this.handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  book: object,
  onUpdateShelf: func,
};
export default Book;