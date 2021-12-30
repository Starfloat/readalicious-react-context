import SearchResults from "../components/SearchResults";
import FavoritesContext from "../store/favorites-context";
import { useContext } from "react";

const Favorites = () => {
  const { getFavorites } = useContext(FavoritesContext);

  return (
    <section className="favoritesSection">
      <div className="container">
        <h2>My Favorites</h2>
        <SearchResults books={getFavorites()} />
      </div>
    </section>
  );
};

export default Favorites;
