import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import './App.css';

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.updateBookShelf = this.updateBookShelf.bind(this);
    this.state = {
      myBooks: [],
    };
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({ myBooks: books });
    });
  }

  updateBookShelf(bookId, oldShelfId, newShelfId) {
    console.log(bookId);
    console.log(newShelfId);

    BooksAPI.update({ id: bookId }, newShelfId).then((books) => {
      console.log(books);
      this.getAllBooks();
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              myBooks={this.state.myBooks}
              onBookShelfChange={this.updateBookShelf}
            />
          )}
        />

        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks
              myBooks={this.state.myBooks}
              onBookShelfChange={this.updateBookShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
