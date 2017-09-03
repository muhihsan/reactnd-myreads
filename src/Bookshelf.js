import React, { Component } from 'react';
import BookshelfBooks from './BookshelfBooks';

class Bookshelf extends Component {
  render() {
    const { title } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <BookshelfBooks />
      </div>
    );
  }
}

export default Bookshelf;