import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Constants from './utils/Constants';
import * as BooksAPI from './utils/BooksAPI';
import SearchBooksBar from './SearchBooksBar';
import SearchBooksResults from './SearchBooksResults';

/** Class representing SearchBooks comopnent. */
class SearchBooks extends Component {
  /** Typechecking props passed into SearchBooks component. */
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  /** Initialize the state value. */
  state = {
    searchedBooks: [],
    searchValue: '',
    currentSearchValue: '',
    typingTimeOut: 0,
    isSearchingBooks: false
  }

  /**
   * Change the current search value state.
   * Search the book only when after certain timeout period.
   * @param {object} event - This event value.
   * @param {object} event.target - This target value.
   * @param {string} event.target.value - This value vale.
   */
  handleTextChange = (event) => {
    if (this.state.typingTimeOut)
      clearTimeout(this.state.typingTimeOut);

    this.setState({
      searchValue: event.target.value,
      typingTimeOut: setTimeout(() => this.searchBooks(), 1500)
    });
  }

  /**
   * Update search value query string.
   * Set the current search results to empty books when the search value is empty.
   * Find books through BooksAPI if the current search value is not empty.
   * Set the current search results to the result of the BooksAPI call.
   */
  searchBooks = () => {
    this.updateSearchQueryString();

    if (this.state.searchValue.trim() === '') {
      this.setBooksAndSearchValue([])
    }
    else {
      this.setState({ isSearchingBooks: true });
      BooksAPI.search(this.state.searchValue, 20).then((result) => {
        this.setBooksAndSearchValue((result && !result.error) ? result : [], this.state.searchValue);
        this.setState({ isSearchingBooks: false });
      });
    }
  }

  /**
   * Update the current search book and value results.
   * @param {Object[]} searchedBooks - The searchBooks value.
   * @param {string} currentSearchValue - The currentSearchValue value.
   */
  setBooksAndSearchValue = (searchedBooks, currentSearchValue = '') => {
    this.setState({
      searchedBooks: searchedBooks,
      currentSearchValue: currentSearchValue
    });
  }

  /** Update search value query string with the current value in the state */
  updateSearchQueryString = () => {
    this.props.history.push({
      search: `?q=${this.state.searchValue}`
    });
  }

  /** Render SearchBooks element. */
  render = () => {
    const { searchedBooks, searchValue, currentSearchValue, isSearchingBooks } = this.state;
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
        <SearchBooksBar searchValue={searchValue} isSearchingBooks={isSearchingBooks} onTypingSearchValue={this.handleTextChange} />
        <SearchBooksResults currentSearchValue={currentSearchValue} books={books} onUpdateBookshelf={onUpdateBookshelf} />
      </div>
    );
  }
}

/** Export SearchBooks component. */
export default SearchBooks;