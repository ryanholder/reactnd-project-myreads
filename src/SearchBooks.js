import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

const MAX_RESULTS = 10;

class SearchBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      books: [],
      error: '',
    };
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  checkBookInList = (book) => {
    const bookInList = this.props.myBooks.filter(myBook => myBook.id === book.id)[0];
    if (bookInList === undefined) {
      return 'none';
    }
    return bookInList.shelf;
  }

  clearQuery = () => {
    this.setState({ query: '' });
  }

  searchQuery = (query) => {
    this.setState({ query });
    if (query) {
      this.booksSearch(query);
    } else {
      this.setState({ books: [] });
    }
  }

  booksSearch = debounce((query) => {
    BooksAPI.search(query, MAX_RESULTS).then((books) => {
      if (Array.isArray(books)) {
        this.setState(state => ({
          books,
          error: '',
        }));
      } else {
        switch (books.error) {
          case 'empty query':
            this.setState(state => ({
              books: [],
              error: 'Your search query has returned 0 results',
            }));
            break;
          default:
            this.setState(state => ({
              books: [],
              error: books.error,
            }));
        }
      }
    });
  }, 200)

  render() {
    const { query, books, error } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              ref={(input) => { this.searchInput = input; }}
              onChange={event => this.searchQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {error !== '' && (
            <div className="search-books-error">
              <span>{error}</span>
            </div>
          )}
          <ol className="books-grid">
            {books.map(book => (
              <Book
                key={book.id}
                id={book.id}
                thumbnail={book.imageLinks.thumbnail}
                shelf={this.checkBookInList(book)}
                title={book.title}
                authors={book.authors}
                onBookShelfChange={this.props.onBookShelfChange}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  myBooks: PropTypes.array,
  onBookShelfChange: PropTypes.func,
};

export default SearchBooks;
