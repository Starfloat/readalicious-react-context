import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react/cjs/react.development";

const FavoritesContext = createContext({
  getFavorites: () => {},
  addFavorite: (book) => {},
  removeFavorite: (book) => {},
  isFavorite: (book) => {},
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (book) => {
    axios
      .post(
        "https://readalicious-react-context-default-rtdb.firebaseio.com/favorites.json",
        {
          book: book,
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setFavorites((prevFavorites) => {
            return prevFavorites.concat({ id: response.data.name, book: book });
          });
        }
      });
  };

  const removeFavorite = (book) => {
    const favorite = favorites.find((favorite) => favorite.book === book);
    console.log(favorite.book.id);
    axios
      .delete(
        `https://readalicious-react-context-default-rtdb.firebaseio.com/favorites/${favorite.id}.json`
      )
      .then(() => {
        setFavorites((prevFavorites) => {
          return prevFavorites.filter(
            (currentFav) => currentFav.id !== favorite.id
          );
        });
      });
  };

  const isFavorite = (book) => {
    const checkFavorites = favorites.map((item) => item.book.id);
    if (checkFavorites.includes(book.id)) {
      return true;
    } else {
      return false;
    }
  };

  const getFavorites = () => {
    const favoriteBooks = favorites.map((item) => item.book);
    return favoriteBooks;
  };

  useEffect(() => {
    axios
      .get(
        "https://readalicious-react-context-default-rtdb.firebaseio.com/favorites.json"
      )
      .then((response) => {
        const data = response.data;
        if (data) {
          const bookObjects = Object.keys(data).map((key) => {
            return {
              id: key,
              book: data[key].book,
            };
          });
          console.log(bookObjects);
          setFavorites(bookObjects);
        } else {
          setFavorites([]);
        }
      });
  }, []);

  /**
   * Object to return to context consumers. This is their interface to interact with this context.
   */
  const context = {
    getFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
