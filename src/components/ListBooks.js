import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListBookContent from './ListBookContent';

/** Class representing ListBooks component. */
class ListBooks extends Component {
  /** Typechecking props passed into ListBooks component. */
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

  /** Render ListBooks element. */
  render = () => {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <ListBookContent {...(this.props)} />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

/** Export ListBooks component. */
export default ListBooks;