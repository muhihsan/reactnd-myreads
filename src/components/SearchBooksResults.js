import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Books from './Books';

/** Class representing SearchBooksResults component.  */
class SearchBooksResults extends Component {
  /** Typechecking props passed into SearchBooksResults component. */
  static propTypes = {
    books: PropTypes.array.isRequired,
    isSearchingBooks: PropTypes.bool.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired,
    currentSearchValue: PropTypes.string.isRequired,
    lastUpdatedBook: PropTypes.object
  }

  /** Render SearchBooksResults element. */
  render = () => {
    const { books, isSearchingBooks, onUpdateBookshelf, currentSearchValue, lastUpdatedBook } = this.props;
    const bookExists = books && books.length > 0;

    return (
      <div className="search-books-results">
        {bookExists && (
          <Books books={books} onUpdateBookshelf={onUpdateBookshelf} lastUpdatedBook={lastUpdatedBook} />
        )}
        {isSearchingBooks && !bookExists && (
          <div className="center">Searching books with title or author <span className="highlight">{currentSearchValue}</span></div>
        )}
        {!isSearchingBooks && currentSearchValue !== '' && !bookExists && (
          <div className="center">No books found with title or author <span className="highlight">{currentSearchValue}</span></div>
        )}
      </div>
    );
  }
}

/** Export SearchBooksResults component. */
export default SearchBooksResults;