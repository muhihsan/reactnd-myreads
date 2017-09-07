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
    this.handleChange = this.handleChange.bind(this);
  }

  /** Typechecking props passed into SearchBooksBar component. */
  static propTypes = {
    onSearchBooks: PropTypes.func.isRequired
  }

  /** Initialize the state value. */
  state = {
    searchValue: '',
    typingTimeOut: 0
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
   * Set the current search results to empty books when the search value is empty.
   * Find books through BooksAPI if the current search value is not empty.
   * Set the current search results to the result of the BooksAPI call.
   */
  searchBooks = () => {
    if (this.state.searchValue.trim() === '') {
      this.props.onSearchBooks([])
    }
    else {
      BooksAPI.search(this.state.searchValue, 20).then((result) =>
        this.props.onSearchBooks((result && !result.error) ? result : [], this.state.searchValue)
      );
    }
  }

  /** Render SearchBooksBar element. */
  render() {
    const { searchValue } = this.state;

    return (
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" value={searchValue} onChange={this.handleTextChange} placeholder="Search by title or author" />
        </div>
      </div>
    );
  }
}

/** Export SearchBooksBar component. */
export default SearchBooksBar;