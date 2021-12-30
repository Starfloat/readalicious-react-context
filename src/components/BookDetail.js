import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import CoverImage from "./CoverImage";

const BookDetail = ({ book }) => {
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  const toggleFavorite = () => {
    !isFavorite(book) ? addFavorite(book) : removeFavorite(book);
  };

  const authors = book.authors ? book.authors.join(", ") : "unknown author";

  const published = book.publishedDate
    ? "(" + new Date(book.publishedDate).getFullYear() + ")"
    : "";

  const ratingClass =
    book.ratings >= 3 ? "fas fa-thumbs-up" : "fas fa-thumbs-down";

  return (
    <article className="bookDetail">
      <div className="bookIntro">
        <CoverImage thumbnail={book.thumbnail} title={book.title} />
        <div>
          <h3 className="bookTitle">{book.title}</h3>
          <p className="bookAuthors">
            by {authors} {published}
          </p>
          <ul className="bookCategories">
            {book.categories && book.categories.map((cat) => <li>{cat}</li>)}
          </ul>
          <p className="bookRating">
            <i className={`${ratingClass}`}></i>
            overall
          </p>
        </div>
      </div>
      <div className="bookOverview">
        <h4>Book Overview</h4>
        <p>{book.description}</p>
      </div>
      <div className="bookActions">
        {book.readLink && (
          <a href={book.readLink} target="_blank" rel="noreferrer">
            Read
          </a>
        )}
        {isFavorite(book) && (
          <button onClick={toggleFavorite}>
            Remove <i className="fas fa-heart favIcon"></i>
          </button>
        )}
        {!isFavorite(book) && (
          <button onClick={toggleFavorite}>
            Add <i className="fas fa-heart unfavIcon"></i>
          </button>
        )}
      </div>
    </article>
  );
};

export default BookDetail;
