import { writable } from "svelte/store";
import { fetchCountries } from "./service/api";

const createStore = () => {
  const store = writable({
    countries: [],
    error: null,
    isLoading: false,
    selected: null
  });

  return {
    subscribe: store.subscribe,
    setSelected: selected => store.update(s => ({ ...s, selected })),
    fetch: async () => {
      try {
        store.update(s => ({ ...s, isLoading: true }));

        const countries = await fetchCountries();

        store.update(s => ({
          ...s,
          countries,
          selected: countries.find(el => el.id === "netherlands"),
          isLoading: false
        }));
      } catch (err) {
        store.update(s => ({
          ...s,
          error: err.message,
          isLoading: false
        }));
      }
    }
  };
};

const store = createStore();

export default store;
