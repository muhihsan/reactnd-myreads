import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Books from './Books';

/** Class representing BookshelfBooks component. */
class BookshelfBooks extends Component {

  /**  */
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

  /**  */
  render = () => {
    return (
      <div className="bookshelf-books">
        <Books {...(this.props)} />
      </div>
    );
  }
}

/**  */
export default BookshelfBooks;