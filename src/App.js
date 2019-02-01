import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './SearchBooks';
import BookShelf from './BookShelf';
import { 
  Route, 
  Link
} from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    shelfs: [
      { 
        name: "Currently Reading",
        type: "currentlyReading",
      }, 
      { 
        name: "Want to Read",
        type: "wantToRead",
      }, 
      { 
        name: "Read",
        type: "read",
      }
    ],
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((res) => {
      this.setState(() => ({
        books: res
      }));
    });
  }

  handleUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf);
    const books = this.state.books;
    books[books.indexOf(book)].shelf = shelf;
    this.setState(() => ({
      "books": books
    })); //To re-render the UI 
  };

  render() {
    const { shelfs, books } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelfs.map( shelf => (
                  <BookShelf 
                    shelfTitle={shelf.name} 
                    books={books.filter( book => book.shelf === shelf.type )}
                    key={shelf.type}
                    onHandleUpdate={this.handleUpdate}
                  />
                ))}
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          </div>
        )}/>
        <Route exact path="/search" render={() => (
          <SearchBooks/>
        )}/>
      </div>
    );
  }
}

export default BooksApp;
