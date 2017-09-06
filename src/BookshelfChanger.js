import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Constants from './utils/Constants';

/** Class representing BookshelfChanger component. */
class BookshelfChanger extends Component {
  /**
   *
   * @param {object} props - The props value.
   * @param {object} props.book - The book value.
   * @param {*} props.onUpdateBookshelf - The onUpdateBookshelf function.
   */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  /**  */
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

  /**  */
  state = {
    isUpdatingShelf: false,
    isUpdateCompleted: false
  }

  /**
   *
   * @param {object} nextProps - The nextProps value.
   * @param {object} nextProps.book - The book value.
   * @param {*} nextProps.onUpdateBookshelf - The onUpdateBookshelf function.
   */
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.book.shelf && (nextProps.book.shelf !== this.props.book.shelf)) {
      this.setState({ isUpdateCompleted: true });
      setTimeout(() => {
        this.setState({
          isUpdatingShelf: false,
          isUpdateCompleted: false
        });
      }, 1000);
    }
  }

  /**  */
  componentWillUnmount = () => {
    this.setState({ isUpdateCompleted: true });
  }

  /**
   *
   * @param {object} event - The event value.
   * @param {object} event.target - The target value.
   * @param {string} event.target.value - The value value.
  */
  handleChange = (event) => {
    this.setState({ isUpdatingShelf: true });
    this.props.onUpdateBookshelf(this.props.book, event.target.value);
  }

  /**  */
  render = () => {
    const { isUpdatingShelf, isUpdateCompleted } = this.state;
    const { book } = this.props;
    const shelf = book.shelf ? book.shelf : Constants.NONE;

    return (
      <div className={`book-shelf-changer ${(!isUpdatingShelf && !isUpdateCompleted) ? 'changer' : (isUpdatingShelf && !isUpdateCompleted) ? 'loading' : 'done' }`}>
        {!isUpdatingShelf && !isUpdateCompleted && (
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

/**  */
export default BookshelfChanger;