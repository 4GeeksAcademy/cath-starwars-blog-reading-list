export const initialStore = () => {
  return {
    people: [],
    peopleDetailed: [],
    vehicles: [],
    vehiclesDetailed: [],
    planets: [],
    planetsDetailed: [],
    favorites: [],
  };
};

export default function storeReducer(store, action = {}) {
  if (action.type === "toggle_favorite") {
    const fav = action.payload;

    const exists = store.favorites.some(
      (f) => f.uid === fav.uid && f.type === fav.type,
    );

    return {
      ...store,
      favorites: exists
        ? store.favorites.filter(
            (f) => !(f.uid === fav.uid && f.type === fav.type),
          )
        : [...store.favorites, fav],
    };
  }

  if (action.type == "set_people") {
    return { ...store, people: action.payload };
  }

  if (action.type == "set_planets") {
    return { ...store, planets: action.payload };
  }

  if (action.type == "set_vehicles") {
    return { ...store, vehicles: action.payload };
  }

  if (action.type === "set_people_detailed") {
    return { ...store, peopleDetailed: action.payload };
  }

  if (action.type === "set_vehicles_detailed") {
    return { ...store, vehiclesDetailed: action.payload };
  }

  if (action.type === "set_planets_detailed") {
    return { ...store, planetsDetailed: action.payload };
  }

  return store;
}
