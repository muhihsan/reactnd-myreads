import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import '../App.css';

/** Class representing a BooksApp component. */
class BooksApp extends React.Component {
  /**
   * Initialize a BooksApp component.
   * @param {object} props - The props value.
   */
  constructor(props) {
    super(props);
    this.updateBookshelf = this.updateBookshelf.bind(this);
  }

  /** Initialize the state value. */
  state = {
    books: [],
    lastUpdatedBook: null
  }

  /**
   * After BooksApp component has been mounted.
   * Get all books.
   */
  componentDidMount = () => {
    this.getAllBooks();
  }

  /**
   * Get all books then set the state value after certain timeout.
   * The timeout is used to show update has completed before the book shifted to the new bookshelf.
   */
  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      setTimeout(() => {
        this.setState({ books: books });
      }, 1000);
    });
  }

  /**
   * Update a book shelf then update the last updated book and get all books.
   * @param {object} book - The book value.
   * @param {string} shelf -  The shelf value.
   */
  updateBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState({ lastUpdatedBook: book });
      this.getAllBooks();
    });
  }

  /** Render BooksApp element. */
  render = () => {
    const { books, lastUpdatedBook } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() =>
          <ListBooks {...(this.state)} onUpdateBookshelf={this.updateBookshelf} lastUpdatedBook={lastUpdatedBook} />
        } />
        <Route path="/search" render={(props) =>
          <SearchBooks myBooks={books} history={props.history} onUpdateBookshelf={this.updateBookshelf} lastUpdatedBook={lastUpdatedBook} />
        } />
      </div>
    );
  }
}

/** Export BooksApp component. */
export default BooksApp;