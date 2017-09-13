import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
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

    console.log(props.myBooks);
  }

  componentDidMount() {
    this.searchInput.focus();
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
              <li key={book.id} className="book-grid-item">
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`,
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{Array.isArray(book.authors) ? book.authors[0] : book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  myBooks: PropTypes.array,
};

SearchBooks.defaultProps = {
  myBooks: [],
};

export default SearchBooks;
