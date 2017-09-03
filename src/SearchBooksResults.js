import React, { Component } from 'react';

class SearchBooksResults extends Component {
  render() {
    const { books } = this.props;

    return (
      <div className="search-books-results">
        <ol className="books-grid">
        </ol>
      </div>
    );
  }
}

export default SearchBooksResults;