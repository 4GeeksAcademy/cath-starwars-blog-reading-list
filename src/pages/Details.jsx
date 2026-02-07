import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function Details() {
  const { type, id } = useParams();
  const { store } = useGlobalReducer();

  const collectionMap = {
    people: store.peopleDetailed,
    planets: store.planetsDetailed,
    vehicles: store.vehiclesDetailed,
  };

  console.log(type);
  console.log(id);

  console.log(store.peopleDetailed);

  const item = collectionMap[type]?.find((el) => el.uid === id);

  console.log(item);

  if (!item) {
    return (
      <div className="container py-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row g-4 align-items-start">
        <div className="col-md-5">
          <img
            src="https://placehold.co/800x600"
            className="img-fluid"
            alt={item.name}
          />
        </div>

        <div className="col-md-7 text-center">
          <h1>{item.name}</h1>
          <p className="text-muted">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
            quibusdam doloremque, provident tenetur dolorum et nulla reiciendis
            minima, exercitationem pariatur maiores atque. Reiciendis fuga nemo
            officiis incidunt quae corporis, illum dignissimos? Nam neque qui,
            esse, vitae dolores a blanditiis tempora voluptatum porro ea ad
            commodi eveniet! Dicta aspernatur animi nihil ratione quaerat
            veniam, quas quod perspiciatis eius molestias nulla repellendus
            ducimus, quibusdam ad. Veniam voluptas quas fuga esse eum nemo
            eveniet consequuntur architecto harum perspiciatis assumenda nostrum
            in doloremque non nulla, quaerat veritatis excepturi facere. Unde
            dolore alias corporis et velit quod nesciunt, praesentium nam
            labore, voluptatum nobis consectetur obcaecati.
          </p>
        </div>
      </div>

      <hr className="my-4" />

      {/* People */}
      {type === "people" && (
        <div className="row text-danger text-center gy-4">
          <div className="col">
            <small className="fw-bold">Name</small>
            <div>{item.name}</div>
          </div>

          <div className="col">
            <small className="fw-bold">Gender</small>
            <div>{item.gender}</div>
          </div>

          <div className="col">
            <small className="fw-bold">Birth Year</small>
            <div>{item.birth_year}</div>
          </div>

          <div className="col">
            <small className="fw-bold">Height</small>
            <div>{item.height} cm</div>
          </div>

          <div className="col">
            <small className="fw-bold">Mass</small>
            <div>{item.mass} kg</div>
          </div>

          <div className="col">
            <small className="fw-bold">Eye Color</small>
            <div>{item.eye_color}</div>
          </div>
        </div>
      )}

      {/* Planets */}
      {type === "planets" && (
        <div className="row text-danger text-center">
          <div className="col">
            Climate
            <br />
            {item.climate}
          </div>
          <div className="col">
            Terrain
            <br />
            {item.terrain}
          </div>
          <div className="col">
            Population
            <br />
            {item.population}
          </div>
          <div className="col">
            Orbital
            <br />
            {item.orbital_period}
          </div>
          <div className="col">
            Rotation
            <br />
            {item.rotation_period}
          </div>
          <div className="col">
            Diameter
            <br />
            {item.diameter}
          </div>
        </div>
      )}
    </div>
  );
}
