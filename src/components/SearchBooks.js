import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as QueryString from 'query-string';
import * as BookGenerator from '../utils/BookGenerator';
import * as BooksAPI from '../utils/BooksAPI';
import SearchBooksBar from './SearchBooksBar';
import SearchBooksResults from './SearchBooksResults';

/** Class representing SearchBooks comopnent. */
class SearchBooks extends Component {
  /** Typechecking props passed into SearchBooks component. */
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    lastUpdatedBook: PropTypes.object
  }

  /** Initialize the state value. */
  state = {
    searchedBooks: [],
    currentSearchValue: '',
    typingTimeOut: 0,
    isSearchingBooks: false
  }

  /**
   * After BooksApp component has been mounted.
   * Do initial search.
   */
  componentDidMount = () => {
    this.searchBooks(this.state.currentSearchValue);
  }

  /**
   * Before BooksApp component will be mounted.
   * Set the current search value according to the query string.
   */
  componentWillMount = () => {
    const search = this.props.history.location.search;
    if (search) {
      const queryString = QueryString.parse(search);
      const searchValue = queryString.q ? queryString.q : '';
      this.setState({
        currentSearchValue: searchValue,
        isSearchingBooks: true
      });
    }
  }

  /**
   * Update search value query string.
   * Call search books.
   * @param {object} event - This event value.
   * @param {object} event.target - This target value.
   * @param {string} event.target.value - This value value.
   */
  handleTextChange = (event) => {
    const searchValue = event.target.value;
    this.setState({ currentSearchValue: searchValue });
    this.updateSearchQueryString(searchValue);
    this.searchBooks(searchValue);
  }

  /**
   * Set the current search results to empty books when the search value is empty.
   * Find books through BooksAPI if the current search value is not empty.
   * Set the current search results to the result of the BooksAPI call.
   * @param {object} searchValue - This searchValue value.
   */
  searchBooks = (searchValue) => {
    if (searchValue.trim() === '') {
      this.setBooks([])
    }
    else {
      this.setState({ isSearchingBooks: true });
      BooksAPI.search(searchValue, 20).then((result) => {
        this.setBooks((result && !result.error) ? result : []);
        this.setState({ isSearchingBooks: false });
      });
    }
  }

  /**
   * Update the current search book and value results.
   * @param {Object[]} searchedBooks - The searchBooks value.
   */
  setBooks = (searchedBooks) => {
    this.setState({
      searchedBooks: searchedBooks
    });
  }

  /** Update search value query string with the current value in the state */
  updateSearchQueryString = (searchValue) => {
    this.props.history.push({
      search: `?q=${searchValue}`
    });
  }

  /** Render SearchBooks element. */
  render = () => {
    const { searchedBooks, currentSearchValue, isSearchingBooks } = this.state;
    const { myBooks, onUpdateBookshelf, lastUpdatedBook } = this.props;

    const books = BookGenerator.getBooks(searchedBooks, myBooks);

    return (
      <div className="search-books">
        <SearchBooksBar searchValue={currentSearchValue} isSearchingBooks={isSearchingBooks} onTypingSearchValue={this.handleTextChange} />
        <SearchBooksResults currentSearchValue={currentSearchValue} isSearchingBooks={isSearchingBooks} books={books} onUpdateBookshelf={onUpdateBookshelf} lastUpdatedBook={lastUpdatedBook} />
      </div>
    );
  }
}

/** Export SearchBooks component. */
export default SearchBooks;