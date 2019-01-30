import React from 'react';
// import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './SearchBooks';
import BookShelf from './BookShelf';
import { 
  Route, 
  Link
} from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    shelfs: ["Currently Reading", "Want to Read", "Read"],
    showSearchPage: false
  }

  render() {
    const { shelfs } = this.state;
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
                  <BookShelf shelfTitle={ shelf }/>
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
