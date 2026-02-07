import { Link } from "react-router-dom";
import FavoritesDropdown from "./FavoriteDropdown";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
  const { store } = useGlobalReducer();
  const favorites = store.favorites;

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <div className="container">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Star_wars2.svg"
              alt="Star Wars"
              height="50"
            />
          </div>
        </Link>
        <div className="ml-auto">
          <FavoritesDropdown favorites={favorites} />
        </div>
      </div>
    </nav>
  );
};
