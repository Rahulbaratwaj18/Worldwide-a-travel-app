import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

const CitiesContext = createContext();

const initalState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "cities/currentCity":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/createCity":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleteCity":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "error":
      return { ...state, error: action.payload };

    default:
      throw new Error("Action type unknown");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initalState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("http://localhost:3000/cities");
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (e) {
        console.error(e.message);
        dispatch({ type: "error", payload: "Error loading cities" });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`http://localhost:3000/cities/${id}`);
        const data = await res.json();

        dispatch({ type: "cities/currentCity", payload: data });
      } catch (e) {
        console.error(e.message);
        dispatch({ type: "error", payload: "Error loading currentCity" });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:3000/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/JSON",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/createCity", payload: data });
    } catch (e) {
      console.error(e.message);
      dispatch({ type: "error", payload: "Error Adding a new city" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`http://localhost:3000/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleteCity", payload: id });
    } catch (e) {
      console.error(e.message);
      dispatch({ type: "error", payload: "Error deleting a city" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("UseCities used outside provider function");
  return context;
}

export { CitiesProvider, useCities };
