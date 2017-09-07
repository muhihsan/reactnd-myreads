import * as Constants from '../utils/Constants';

export const getBooks = (searchedBooks, myBooks) => (
  searchedBooks.map((book) => {
    const myBook = myBooks.find((myBook) => myBook.id === book.id);
    return {
      id: book.id,
      title: book.title,
      authors: book.authors,
      imageLinks: book.imageLinks,
      shelf: myBook ? myBook.shelf : Constants.NONE
    };
  })
);