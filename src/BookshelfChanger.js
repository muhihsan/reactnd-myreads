import React, { Component } from 'react';
import * as Constants from './utils/Constants';

class BookshelfChanger extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onUpdateBookshelf(this.props.book, event.target.value);
  }

  render() {
    const { book } = this.props;
    const shelf = book.shelf ? book.shelf : Constants.NONE;

    return (
      <div className="book-shelf-changer">
        <select value={shelf} onChange={this.handleChange}>
          <option value={Constants.NONE} disabled>Move to...</option>
          <option value={Constants.CURRENTLY_READING}>Currently Reading</option>
          <option value={Constants.WANT_TO_READ}>Want to Read</option>
          <option value={Constants.READ}>Read</option>
          <option value={Constants.NONE}>None</option>
        </select>
      </div>
    );
  }
}

export default BookshelfChanger;