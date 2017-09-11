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
    };
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
    if (query) {
      BooksAPI.search(query, MAX_RESULTS).then((books) => {
        this.setState(state => ({
          books: Array.from(books),
        }));
      });
    } else {
      this.setState({ books: [] });
    }
  }, 250)

  render() {
    const { query, books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.searchQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
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
                  <div className="book-authors">{book.authors}</div>
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
