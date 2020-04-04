import { writable } from "svelte/store";
import { fetchCount } from "./service/api";

const initialState = {
  date: [],
  count: [],
  error: null,
  isLoading: false
};

const createStore = () => {
  const store = writable(initialState);

  return {
    subscribe: store.subscribe,
    fetchData: async country => {
      try {
        store.update(s => ({ ...s, ...initialState, isLoading: true }));

        const data = await fetchCount(country, "Recovered");

        store.update(s => ({
          ...s,
          isLoading: false,
          ...data
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
