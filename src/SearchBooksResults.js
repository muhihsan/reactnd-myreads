import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Books from './Books';

class SearchBooksResults extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

  render() {
    const { books, onUpdateBookshelf } = this.props;

    return (
      <div className="search-books-results">
        <Books books={books} onUpdateBookshelf={onUpdateBookshelf} />
      </div>
    );
  }
}

export default SearchBooksResults;