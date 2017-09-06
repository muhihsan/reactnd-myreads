import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Constants from './utils/Constants';
import SearchBooksBar from './SearchBooksBar';
import SearchBooksResults from './SearchBooksResults';

/** Class representing SearchBooks comopnent. */
class SearchBooks extends Component {

  /**  */
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

  /**  */
  state = {
    searchedBooks: [],
    currentSearchValue: ''
  }

  /**
   *
   * @param {*} searchedBooks - The searchBooks value.
   * @param {*} currentSearchValue - The currentSearchValue value.
   */
  setBooksAndSearchValue = (searchedBooks, currentSearchValue = '') => {
    this.setState({
      searchedBooks: searchedBooks,
      currentSearchValue: currentSearchValue
    });
  }

  /**  */
  render = () => {
    const { currentSearchValue, searchedBooks } = this.state;
    const { myBooks, onUpdateBookshelf } = this.props;

    const books = searchedBooks.map((book) => {
      const myBook = myBooks.find((myBook) => myBook.id === book.id);
      return {
        id: book.id,
        title: book.title,
        authors: book.authors,
        imageLinks: book.imageLinks,
        shelf: myBook ? myBook.shelf : Constants.NONE
      }
    });

    return (
      <div className="search-books">
        <SearchBooksBar onSearchBooks={this.setBooksAndSearchValue} />
        <SearchBooksResults currentSearchValue={currentSearchValue} books={books} onUpdateBookshelf={onUpdateBookshelf} />
      </div>
    );
  }
}

/**  */
export default SearchBooks;