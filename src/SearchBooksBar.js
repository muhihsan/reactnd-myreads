import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';

/** Class representing SearchBooksBar component. */
class SearchBooksBar extends Component {
  /**
   *
   * @param {object} props - This props value.
   * @param {*} props.onSearchBooks - This onSearchBooks value.
   */
  constructor(props) {
    super (props);
    this.handleChange = this.handleChange.bind(this);
  }

  /**  */
  static propTypes = {
    onSearchBooks: PropTypes.func.isRequired
  }

  /**  */
  state = {
    searchValue: '',
    typingTimeOut: 0
  }

  /**
   * @param {object} event - This event value.
   * @param {object} event.target - This target value.
   * @param {string} event.target.value - This value vale.
   */
  handleChange = (event) => {
    if (this.state.typingTimeOut)
      clearTimeout(this.state.typingTimeOut);

    this.setState({
      searchValue: event.target.value,
      typingTimeOut: setTimeout(() => this.searchBooks(), 1500)
    });
  }

  /**  */
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

  /**  */
  render() {
    const { searchValue } = this.state;

    return (
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" value={searchValue} onChange={this.handleChange} placeholder="Search by title or author" />
        </div>
      </div>
    );
  }
}

/**  */
export default SearchBooksBar;