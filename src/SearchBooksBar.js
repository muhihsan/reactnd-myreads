import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';

/** Class representing SearchBooksBar component. */
class SearchBooksBar extends Component {
  /**
   * Initialize a SearchBooksBar component.
   * @param {object} props - This props value.
   * @param {*} props.onSearchBooks - This onSearchBooks value.
   */
  constructor(props) {
    super (props);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  /** Typechecking props passed into SearchBooksBar component. */
  static propTypes = {
    onSearchBooks: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  /** Initialize the state value. */
  state = {
    searchValue: '',
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
      this.props.onSearchBooks([])
    }
    else {
      this.setState({ isSearchingBooks: true });
      BooksAPI.search(this.state.searchValue, 20).then((result) => {
        this.props.onSearchBooks((result && !result.error) ? result : [], this.state.searchValue);
        this.setState({ isSearchingBooks: false });
      });
    }
  }

  /** Update search value query string with the current value in the state */
  updateSearchQueryString = () => {
    this.props.history.push({
      search: `?q=${this.state.searchValue}`
    });
  }

  /** Render SearchBooksBar element. */
  render() {
    const { searchValue, isSearchingBooks } = this.state;

    return (
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" value={searchValue} onChange={this.handleTextChange} placeholder="Search by title or author" />
        </div>
        {isSearchingBooks && (
          <div className="loading-search loading"></div>
        )}
      </div>
    );
  }
}

/** Export SearchBooksBar component. */
export default SearchBooksBar;