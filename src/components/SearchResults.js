import BookCard from "./BookCard";

const SearchResults = ({ books, loading, error }) => {
  if (error) {
    return <p className="feedback">{error}</p>;
  }
  if (loading) {
    return <p className="feedback">Loading ...</p>;
  }
  if (books.length === 0) {
    return <p className="feedback">No books found</p>;
  }

  return (
    <ul className="searchResults">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </ul>
  );
};

export default SearchResults;
