import { useContext } from "react";
import { Link } from "react-router-dom";
import FavoritesContext from "../store/favorites-context";

const Navigation = () => {
  const { getFavorites } = useContext(FavoritesContext);

  return (
    <nav className="appNav">
      <div className="logo">
        <i className="fas fa-book-open fa-3x"></i>
        <h1>read.a.licious</h1>
      </div>
      <ul className="navbar">
        <li>
          <Link to="/">Search</Link>
        </li>
        <li>
          <Link to="/favorites">
            Favorites{" "}
            <span className="countBadge">{getFavorites().length}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
