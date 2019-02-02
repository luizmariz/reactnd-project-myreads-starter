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

  componentDidMount() {
    BooksAPI.getAll().then((res) => {
      this.setState(() => ({
        books: res,
      }));
    });
  }

  handleUpdate = ( book, shelf ) => {
    BooksAPI.update(book, shelf);

    let books = this.state.books;
    let found = false;

    for ( let i = 0; i < books.length; i++) {
      if (books[i].title === book.title) {
        found = true;
        books[i].shelf = shelf;
        break;
      }
    } //If the book already exists in the array, we just need to update the book's shelf

    if (!found) {
      book.shelf = shelf;
      books.push(book);
    }//If no, we just need to add the book to the array in the correct shelf 

    this.setState(() => ({
      "books": books,
    })); //To re-render the UI 
  };

  handleSearch = query => {

    BooksAPI.search(query.trim()).then((res) => { //It's important to trim the query so it will search the right string
      console.log(query);
      let books = Array.isArray(res) ? res.map( book => ({ ...book, shelf: "none"})) : [];
      for (let i = 0; i < books.length; i++) {
        for (let j = 0; j < this.state.books.length; j++) {
          if (books[i].title === this.state.books[j].title) {
            books[i].shelf = this.state.books[j].shelf;
          } 
        }
      } //A very simple way to check if the book is already in a shelf and set it to the right shelf

      this.setState(() => ({
        searchBooks: books,
      }))

    });
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
