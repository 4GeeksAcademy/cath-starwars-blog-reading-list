import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ItemCard from "../components/ItemCard.jsx";
import { useEffect, useRef } from "react";

export const Home = () => {
  const { store, actions } = useGlobalReducer();
  const didLoad = useRef(false);

  useEffect(() => {
    if (didLoad.current) return;
    didLoad.current = true;

    actions.loadHomeData();
  }, [actions]);

  return (
    <div className="container">
      <h1>Characters</h1>
      <div className="d-flex flex-row flex-nowrap overflow-auto gap-3">
        {store.peopleDetailed.map((person) => (
          <ItemCard key={person.url} item={person} type="people" />
        ))}
      </div>

      <h1>Planets</h1>
      <div className="d-flex flex-row flex-nowrap overflow-auto gap-3">
        {store.planetsDetailed.map((planet) => (
          <ItemCard key={planet.url} item={planet} type="planets" />
        ))}
      </div>

      <h1>Vehicles</h1>
      <div className="d-flex flex-row flex-nowrap overflow-auto gap-3">
        {store.vehiclesDetailed.map((vehicle) => (
          <ItemCard key={vehicle.url} item={vehicle} type="vehicles" />
        ))}
      </div>
    </div>
  );
};
