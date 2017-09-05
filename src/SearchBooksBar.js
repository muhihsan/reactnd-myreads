import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';

class SearchBooksBar extends Component {
  constructor(props) {
    super (props);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    onSearchBooks: PropTypes.func.isRequired
  }

  state = {
    searchValue: '',
    typingTimeOut: 0
  }

  handleChange = (event) => {
    const self = this;

    if (self.state.typingTimeOut)
      clearTimeout(self.state.typingTimeOut);

    this.setState({
      searchValue: event.target.value,
      typingTimeOut: setTimeout(() => self.searchBooks(), 1500)
    });
  }

  searchBooks = () => {
    console.log('Start searching');
    if (this.state.searchValue === '') {
      this.props.onSearchBooks([])
    }
    else {
      BooksAPI.search(this.state.searchValue, 20).then((result) => {
        if (result && !result.error) {
          this.props.onSearchBooks(result);
        }
      });
    }
  }

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

export default SearchBooksBar;