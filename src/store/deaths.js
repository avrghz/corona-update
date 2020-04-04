import { writable } from "svelte/store";
import { fetchCount } from "./service/api";

const createStore = () => {
  const store = writable({
    date: [],
    count: [],
    error: null,
    isLoading: false
  });

  return {
    subscribe: store.subscribe,
    setSelected: selected => store.update(s => ({ ...s, selected })),
    fetchData: async country => {
      try {
        store.update(s => ({ ...s, isLoading: true }));

        const data = await fetchCount(country, "Deaths");

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
