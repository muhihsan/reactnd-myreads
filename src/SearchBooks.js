import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './utils/BooksAPI';
import SearchBooksResults from './SearchBooksResults';

class SearchBooks extends Component {
  constructor(props) {
    super (props);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

  state = {
    books: [],
    searchValue: ''
  }

  handleChange = (event) => {
    this.setState({ searchValue: event.target.value }, this.searchBooks);
  }

  searchBooks = () => {
    if (this.state.searchValue === '') {
      this.setState({ books: [] });
    }
    else {
      BooksAPI.search(this.state.searchValue, 20).then((result) => {
        if (result && !result.error) {
          this.setState({ books: result });
        }
      });
    }
  }

  render = () => {
    const { books, searchValue } = this.state;
    const { myBooks, onUpdateBookshelf } = this.props;

    myBooks.forEach((myBook) => {
      var book = books.find((book) => book.id === myBook.id);
      if (book) {
        book.shelf = myBook.shelf;
      }
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className='close-search'
            to='/'
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" value={searchValue} onChange={this.handleChange} placeholder="Search by title or author" />
          </div>
        </div>
        <SearchBooksResults books={books} onUpdateBookshelf={onUpdateBookshelf} />
      </div>
    );
  }
}

export default SearchBooks;