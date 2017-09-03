import React, { Component } from 'react';
import Books from './Books';

class SearchBooksResults extends Component {
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