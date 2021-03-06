import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Constants from '../utils/Constants';

/** Class representing BookshelfChanger component. */
class BookshelfChanger extends Component {
  /**
   * Initialize a BookshelfChanger component.
   * @param {object} props - The props value.
   * @param {object} props.book - The book value.
   * @param {*} props.onUpdateBookshelf - The onUpdateBookshelf function.
   */
  constructor(props) {
    super(props);
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  /** Typechecking props passed into BookshelfChanger component. */
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired,
    isUpdateCompleted: PropTypes.bool.isRequired
  }

  /** Initialize the state value. */
  state = {
    isUpdatingShelf: false,
    isUpdateCompleted: false
  }

  /**
   * Before BookshelfChanger component receive new props.
   * Set isUpdateCompleted to true once a bookshelf update is completed.
   * Set isUpdatingShelf and isUpdateCompleted once this component receive a new book object that has different shelf.
   * @param {object} nextProps - The nextProps value.
   * @param {object} nextProps.book - The book value.
   * @param {*} nextProps.onUpdateBookshelf - The onUpdateBookshelf function.
   */
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isUpdateCompleted) {
      this.setState({ isUpdateCompleted: true });
    }

    if (nextProps.book.shelf && (nextProps.book.shelf !== this.props.book.shelf)) {
      this.setState({
        isUpdatingShelf: false,
        isUpdateCompleted: false
      });
    }
  }

  /**
   * Tell this component that bookshelf has changed.
   * Run all necessary process when bookshelf is updated.
   * @param {object} event - The event value.
   * @param {object} event.target - The target value.
   * @param {string} event.target.value - The value value.
  */
  handleShelfChange = (event) => {
    this.setState({ isUpdatingShelf: true });
    this.props.onUpdateBookshelf(this.props.book, event.target.value);
  }

  /** Render BookshelfChanger element. */
  render = () => {
    const { isUpdatingShelf, isUpdateCompleted } = this.state;
    const { book } = this.props;
    const shelf = book.shelf ? book.shelf : Constants.NONE;

    return (
      <div className={`book-shelf-changer ${(!isUpdatingShelf && !isUpdateCompleted) ? 'changer' : (isUpdatingShelf && !isUpdateCompleted) ? 'loading' : 'done' }`}>
        {!isUpdatingShelf && !isUpdateCompleted && (
          <select value={shelf} onChange={this.handleShelfChange}>
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

/** Export BookshelfChanger component. */
export default BookshelfChanger;