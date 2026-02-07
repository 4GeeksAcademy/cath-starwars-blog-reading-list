import { Link } from "react-router-dom";

export default function FavoritesDropdown({ favorites }) {
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
            <li key={`${fav.type}-${fav.id}`}>
              <Link className="dropdown-item" to={`/${fav.type}/${fav.id}`}>
                {fav.name}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
