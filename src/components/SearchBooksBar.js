import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Class representing SearchBooksBar component. */
class SearchBooksBar extends Component {
  /** Typechecking props passed into SearchBooksBar component. */
  static propTypes = {
    searchValue: PropTypes.string.isRequired,
    isSearchingBooks: PropTypes.bool.isRequired,
    onTypingSearchValue: PropTypes.func.isRequired
  }

  /** Render SearchBooksBar element. */
  render() {
    const { searchValue, isSearchingBooks, onTypingSearchValue } = this.props;

    return (
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" value={searchValue} onChange={onTypingSearchValue} placeholder="Search by title or author" />
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