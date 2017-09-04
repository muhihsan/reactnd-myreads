import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Constants from './utils/Constants';

class BookshelfChanger extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    isChangingShelf: false
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

  componentWillReceiveProps = (nextProps) => {
    debugger;
    this.setState({ isChangingShelf: nextProps.book.shelf && (nextProps.book.shelf !== this.props.book.shelf) });
  }

  handleChange = (event) => {
    this.setState({ isChangingShelf: true });
    this.props.onUpdateBookshelf(this.props.book, event.target.value);
  }

  render = () => {
    const { isChangingShelf } = this.state;
    const { book } = this.props;
    const shelf = book.shelf ? book.shelf : Constants.NONE;

    return (
      <div className={`book-shelf-changer ${isChangingShelf ? 'loading' : 'changer'}`}>
        {!isChangingShelf && (
          <select value={shelf} onChange={this.handleChange}>
            <option disabled>Move to...</option>
            <option value={Constants.CURRENTLY_READING}>Currently Reading</option>
            <option value={Constants.WANT_TO_READ}>Want to Read</option>
            <option value={Constants.READ}>Read</option>
            <option value={Constants.NONE}>None</option>
          </select>
        )}
      </div>
    );
  }
}

export default BookshelfChanger;