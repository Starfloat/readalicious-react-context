import { useState, Fragment } from "react";
import CoverImage from "./CoverImage";
import Modal from "./UI/Modal";
import BookDetail from "./BookDetail";

const BookCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const published = book.publishedDate
    ? new Date(book.publishedDate).getFullYear()
    : "";

  const toggleModalHandler = () => {
    setShowModal((prevShowModal) => {
      return !prevShowModal;
    });
  };

  const modal = (
    <Modal onClose={toggleModalHandler}>
      <BookDetail book={book} />
    </Modal>
  );

  return (
    <Fragment>
      {showModal && modal}
      <div className="bookCover" onClick={toggleModalHandler}>
        <CoverImage thumbnail={book.thumbnail} title={book.title} />
        <div className="bookDescription">
          <h5 className="truncate">{book.title}</h5>
          <p className="truncate">
            {book.authors ? book.authors[0] : "unknown"}&nbsp;
          </p>
          <p className="truncate">{published && <em>{published}</em>}&nbsp;</p>
        </div>
      </div>
    </Fragment>
  );
};

export default BookCard;
