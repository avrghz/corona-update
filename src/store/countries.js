import { writable } from "svelte/store";
import { fetchCountries } from "./service/api";

const initialState = {
  countries: [],
  error: null,
  isLoading: true,
  selected: null
};

const createStore = () => {
  const store = writable(initialState);

  return {
    subscribe: store.subscribe,
    setSelected: selected => store.update(s => ({ ...s, selected })),
    fetch: async () => {
      try {
        store.update(s => ({ ...s, ...initialState, isLoading: true }));

        const countries = await fetchCountries();

        store.update(s => ({
          ...s,
          countries,
          selected: countries.find(el => el.id === "netherlands"),
          isLoading: false,
          error: null
        }));
      } catch (err) {
        store.update(s => ({
          ...s,
          ...initialState,
          error: err.message,
          isLoading: false
        }));
      }
    }
  };
};

const store = createStore();

export default store;
