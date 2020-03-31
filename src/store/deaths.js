import { writable } from "svelte/store";
import { fetchData } from "../util";

const createStore = () => {
  const store = writable({
    date: [],
    count: [],
    error: null,
    isLoading: false
  });

  return {
    subscribe: store.subscribe,
    fetchData: async country => {
      try {
        store.update(s => ({ ...s, isLoading: true }));

        const data = await fetchData(country, "deaths");

        store.update(s => ({
          ...s,
          isLoading: false,
          ...data
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
