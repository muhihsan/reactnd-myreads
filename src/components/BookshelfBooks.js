import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Books from './Books';

/** Class representing BookshelfBooks component. */
class BookshelfBooks extends Component {
  /** Typechecking props passed into BookshelfBooks component. */
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired,
    lastUpdatedBook: PropTypes.object
  }

  /** Render BookshelfBooks element. */
  render = () => {
    return (
      <div className="bookshelf-books">
        <Books {...(this.props)} />
      </div>
    );
  }
}

/** Export BookshelfBooks component. */
export default BookshelfBooks;