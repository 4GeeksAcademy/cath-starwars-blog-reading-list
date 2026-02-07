import { Link } from "react-router-dom";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const getIdFromUrl = (url) => {
  return url.split("/").filter(Boolean).pop();
};

const fields_by_type = {
  people: [
    { label: "Gender", key: "gender" },
    { label: "Hair color", key: "hair_color" },
    { label: "Eye color", key: "eye_color" },
  ],
  planets: [
    { label: "Population", key: "population" },
    { label: "Terrain", key: "terrain" },
  ],
  vehicles: [
    { label: "Model", key: "model" },
    { label: "Manufacturer", key: "manufacturer" },
    { label: "Crew", key: "crew" },
  ],
};

export default function ItemCard({ item, type }) {
  const { store, actions } = useGlobalReducer();
  const id = getIdFromUrl(item.url);
  const fields = fields_by_type[type] || [];
  const [hovered, setHovered] = useState(false);

  const liked = store.favorites.some(
    (f) => f.uid === item.uid && f.type === type,
  );

  return (
    <div className="card flex-shrink-0" style={{ width: "18rem" }}>
      <img
        src="https://placehold.co/600x400"
        className="card-img-top"
        alt={item.name}
      />

      <div className="card-body">
        <h5 className="card-title text-truncate">{item.name}</h5>

        <ul className="list-group list-group-flush mb-2">
          {fields.map(({ label, key }) => (
            <li key={key} className="list-group-item px-0">
              <small className="text-muted">{label}:</small>{" "}
              <span>{item[key] ?? "—"}</span>
            </li>
          ))}
        </ul>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <Link to={`/${type}/${id}`} className="btn btn-primary btn-sm">
            Learn more!
          </Link>

          <button
            className="btn btn-warning btn-sm d-flex align-items-center justify-content-center p-0"
            style={{ width: 36, height: 36 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => actions.toggleFavorite(item, type)}
          >
            <span
              className="position-relative"
              style={{ width: 20, height: 20 }}
            >
              <i
                className="fa-regular fa-heart text-white position-absolute top-50 start-50"
                style={{
                  transform: "translate(-50%, -50%)",
                  opacity: liked || hovered ? 0 : 1,
                  transition: "opacity 140ms ease",
                }}
              />

              <i
                className="fa-solid fa-heart text-white position-absolute top-50 start-50"
                style={{
                  transform: "translate(-50%, -50%) scale(1.1)",
                  opacity: liked || hovered ? 1 : 0,
                  transition: "opacity 140ms ease, transform 140ms ease",
                }}
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
