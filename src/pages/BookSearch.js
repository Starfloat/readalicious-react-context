import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useRef,
} from "react";

import SearchResults from "../components/SearchResults";
import BookSearchContext from "../store/book-search-context";

const BookSearch = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);

  const { searchText, setSearchText, searchResults, setSearchResults } =
    useContext(BookSearchContext);

  const getBooks = useCallback(
    async (search) => {
      const API_HOST = "https://www.googleapis.com/books/v1";
      const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

      try {
        setErrorMessage("");

        if (!search) {
          setSearchResults([]);
          return;
        }

        setLoading(true);

        const response = await fetch(
          `${API_HOST}/volumes?q=${search}&maxResults=15&key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("An HTTP error occurred.");
        }

        const data = await response.json();

        let transformed = [];
        if (data.items) {
          transformed = data.items.map((item) => {
            const volumeInfo = item.volumeInfo;
            const accessInfo = item.accessInfo;

            return {
              id: item.etag,
              title: volumeInfo.title,
              authors: volumeInfo.authors,
              publishedDate: volumeInfo.publishedDate,
              thumbnail: volumeInfo.imageLinks
                ? volumeInfo.imageLinks.thumbnail
                : null,
              categories: volumeInfo.categories,
              description: volumeInfo.description,
              readLink: accessInfo.webReaderLink,
              ratings: volumeInfo.averageRating,
            };
          });
        }

        setSearchResults(transformed);
      } catch (ex) {
        setErrorMessage("Something went wrong :(");
      }

      setLoading(false);
    },
    [setSearchResults]
  );

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (isMounted.current) {
      const timer = setTimeout(() => {
        getBooks(searchText);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      isMounted.current = true;
    }
  }, [searchText, getBooks]);

  return (
    <section className="bookSearch">
      <div className="container">
        <div className="control">
          <input
            type="search"
            placeholder="Search by title or author"
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </div>
        <SearchResults
          books={searchResults}
          loading={loading}
          erorr={errorMessage}
        />
      </div>
    </section>
  );
};

export default BookSearch;
