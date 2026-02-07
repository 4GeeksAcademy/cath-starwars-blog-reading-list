import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function FavoritesDropdown({ favorites }) {
  const { store, actions } = useGlobalReducer();
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Favorites ({favorites.length})
      </button>

      <ul className="dropdown-menu dropdown-menu-end">
        {favorites.length === 0 ? (
          <li>
            <span className="dropdown-item-text">No favorites yet</span>
          </li>
        ) : (
          favorites.map((fav) => (
            <li
              key={`${fav.type}-${fav.id}`}
              className="dropdown-item d-flex justify-content-between align-items-center"
            >
              <Link
                className="text-decoration-none text-dark flex-grow-1"
                to={`/${fav.type}/${fav.uid}`}
              >
                {fav.name}
              </Link>

              <button
                className="btn btn-sm btn-link text-danger p-0 ms-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  actions.toggleFavorite(fav, fav.type);
                }}
                aria-label="Remove from favorites"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
