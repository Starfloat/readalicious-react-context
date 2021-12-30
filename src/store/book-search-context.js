import { createContext, useState } from "react";

const BookSearchContext = createContext({
  searchText: "",
  setSearchText: (search) => {},
  searchResults: [],
  setSearchResults: (results) => {},
});

export const BookSearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const values = {
    searchText,
    setSearchText,
    searchResults,
    setSearchResults,
  };

  return (
    <BookSearchContext.Provider value={values}>
      {children}
    </BookSearchContext.Provider>
  );
};

export default BookSearchContext;
