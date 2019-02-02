import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './SearchBooks';
import BookShelf from './BookShelf';
import { 
  Route, 
  Link
} from 'react-router-dom';

const shelfs = [
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
];

class BooksApp extends Component {
  state = {
    books: [],
    searchBooks: [],
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState(() => ({ books }));
  }

  handleUpdate = ( book, shelf ) => {
    BooksAPI.update(book, shelf);

    book.shelf = shelf;

    this.setState((prev) => ({
      "books": prev.books.filter( b => b.id !== book.id).concat(book)
    })); 
  };

  handleSearch = async query => {
    const books = await BooksAPI.search(query.trim()) //It's important to trim the query so it will search the right string

    this.setState(() => ({
      searchBooks: Array.isArray(books) ? this.setBooksShelf(books) : []
    }))
  };

  setBooksShelf = books => {
    const booksInShelfs = this.state.books;

    return books.map( book => {
      booksInShelfs.forEach( b => book.shelf = b.id === book.id ? b.shelf : "none");
      return book;
    }); //A very simple way to check if the book is already in a shelf and set it to the right shelf
  };

  render() {
    const { books, searchBooks } = this.state;
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
                  <button 
                    onClick={() => {
                      this.setState(() => ({
                        searchBooks: [],
                      }))}
                    }
                  >
                    Add a book
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}/>
        <Route exact path="/search" render={({ history }) => (
          <SearchBooks 
            searchBooks={searchBooks}
            onHandleSearch={this.handleSearch}
            onHandleUpdate={( book, shelf ) => {
              this.handleUpdate(book, shelf)
              history.push("/")
            }}
          />
        )}/>
      </div>
    );
  }
}

export default BooksApp;
