// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"; // Import the reducer and the initial state.

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext();
let homeDataPromise = null;

// Define a provider component that encapsulates the store and warps it in a context provider to
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
  // Initialize reducer with the initial state.
  const [store, dispatch] = useReducer(storeReducer, initialStore());
  const url = "https://www.swapi.tech/api/";

  const getDetails = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.result.properties; // swapi.tech shape
  };

  const mapWithConcurrency = async (items, limit, mapper) => {
    const results = [];
    for (let i = 0; i < items.length; i += limit) {
      const chunk = items.slice(i, i + limit);
      const chunkResults = await Promise.all(chunk.map(mapper));
      results.push(...chunkResults);
    }
    return results;
  };

  const actions = {
    loadHomeData: async () => {
      if (homeDataPromise) return homeDataPromise;

      const [peopleRes, vehiclesRes, planetsRes] = await Promise.all([
        fetch(`${url}people?page=1&limit=10`),
        fetch(`${url}vehicles?page=1&limit=10`),
        fetch(`${url}planets?page=1&limit=10`),
      ]);

      const [peopleData, vehiclesData, planetsData] = await Promise.all([
        peopleRes.json(),
        vehiclesRes.json(),
        planetsRes.json(),
      ]);

      const peopleList = peopleData.results;
      const vehiclesList = vehiclesData.results;
      const planetsList = planetsData.results;

      dispatch({ type: "set_people", payload: peopleList });
      dispatch({ type: "set_vehicles", payload: vehiclesList });
      dispatch({ type: "set_planets", payload: planetsList });

      const peopleDetailed = await mapWithConcurrency(
        peopleList,
        1,
        async (p) => ({ ...p, ...(await getDetails(p.url)) }),
        200,
      );
      dispatch({ type: "set_people_detailed", payload: peopleDetailed });

      const planetsDetailed = await mapWithConcurrency(
        planetsList,
        1,
        async (pl) => ({ ...pl, ...(await getDetails(pl.url)) }),
        200,
      );
      dispatch({ type: "set_planets_detailed", payload: planetsDetailed });

      const vehiclesDetailed = await mapWithConcurrency(
        vehiclesList,
        1,
        async (v) => ({ ...v, ...(await getDetails(v.url)) }),
        200,
      );

      dispatch({ type: "set_people_detailed", payload: peopleDetailed });
      dispatch({ type: "set_vehicles_detailed", payload: vehiclesDetailed });
      dispatch({ type: "set_planets_detailed", payload: planetsDetailed });
    },

    toggleFavorite: (item, type) => {
      dispatch({
        type: "toggle_favorite",
        payload: {
          uid: item.uid,
          type,
          name: item.name,
          url: item.url,
        },
      });
    },
  };

  // Provide the store and dispatch method to all child components.
  return (
    <StoreContext.Provider value={{ store, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
  return useContext(StoreContext);
}
