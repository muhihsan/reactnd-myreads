import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Books from './Books';

/** Class representing SearchBooksResults component.  */
class SearchBooksResults extends Component {
  /** Typechecking props passed into SearchBooksResults component. */
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired,
    currentSearchValue: PropTypes.string.isRequired
  }

  /** Render SearchBooksResults element. */
  render = () => {
    const { books, onUpdateBookshelf, currentSearchValue } = this.props;

    return (
      <div className="search-books-results">
        {books && books.length > 0 && (
          <Books books={books} onUpdateBookshelf={onUpdateBookshelf} />
        )}
        {currentSearchValue !== '' && books && books.length === 0 && (
          <div className="center">No books found with title or author <span className="highlight">{currentSearchValue}</span></div>
        )}
      </div>
    );
  }
}

/** Export SearchBooksResults component. */
export default SearchBooksResults;