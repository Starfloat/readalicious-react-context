import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import BookSearch from "./pages/BookSearch";
import Favorites from "./pages/Favorites";
import { BookSearchProvider } from "./store/book-search-context";
import { FavoritesProvider } from "./store/favorites-context";

function App() {
  return (
    <FavoritesProvider>
      <BookSearchProvider>
        <Header />
        <Switch>
          <Route exact path="/">
            <BookSearch />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
        </Switch>
      </BookSearchProvider>
    </FavoritesProvider>
  );
}

export default App;
