import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as QueryString from 'query-string';
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
   * After BooksApp component has been mounted.
   * Do initial search.
   */
  componentDidMount = () => {
    this.initialSearch();
  }

  /**
   * Get search value from query string.
   * Search for books if the correct query string is found.
   * Set the searchValue state.
   */
  initialSearch = () => {
    const search = this.props.history.location.search;
    if (search) {
      const queryString = QueryString.parse(search);
      const searchValue = queryString.q? queryString.q : '';
      this.searchBooks(searchValue);
      this.setState({ searchValue: searchValue });
    }
  }

  /**
   * Change the current search value state.
   * Search the book only when after certain timeout period.
   * @param {object} event - This event value.
   * @param {object} event.target - This target value.
   * @param {string} event.target.value - This value value.
   */
  handleTextChange = (event) => {
    if (this.state.typingTimeOut)
      clearTimeout(this.state.typingTimeOut);

    const value = event.target.value;
    this.setState({
      searchValue: value,
      typingTimeOut: setTimeout(() => this.updateQueryStringThenSearchBooks(value), 1500)
    });
  }

  /**
   * Set the current search results to empty books when the search value is empty.
   * Find books through BooksAPI if the current search value is not empty.
   * Set the current search results to the result of the BooksAPI call.
   * @param {object} searchValue - This searchValue value.
   */
  searchBooks = (searchValue) => {
    if (searchValue.trim() === '') {
      this.setBooksAndCurrentSearchValue([])
    }
    else {
      this.setState({ isSearchingBooks: true });
      BooksAPI.search(searchValue, 20).then((result) => {
        this.setBooksAndCurrentSearchValue((result && !result.error) ? result : [], searchValue);
        this.setState({ isSearchingBooks: false });
      });
    }
  }

  /**
   * Update search value query string.
   * Call search books.
   */
  updateQueryStringThenSearchBooks = (searchValue) => {
    this.updateSearchQueryString();
    this.searchBooks(searchValue);
  }

  /**
   * Update the current search book and value results.
   * @param {Object[]} searchedBooks - The searchBooks value.
   * @param {string} currentSearchValue - The currentSearchValue value.
   */
  setBooksAndCurrentSearchValue = (searchedBooks, currentSearchValue = '') => {
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