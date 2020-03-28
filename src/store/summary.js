import { writable } from "svelte/store";
import { format } from "date-fns";

const root = "https://api.covid19api.com";

const createStore = () => {
  const store = writable({
    newConfirmed: 0,
    totalConfirmed: 0,
    newDeaths: 0,
    totalDeaths: 0,
    newRecovered: 0,
    totalRecovered: 0,
    date: null,
    error: null,
    isLoading: false
  });

  return {
    subscribe: store.subscribe,
    fetch: async country => {
      try {
        store.update(s => ({ ...s, isLoading: true }));

        const response = await fetch(`${root}/summary`, {
          method: "GET"
        }).then(res => res.json());

        if (!response) {
          throw new Error("No details fetched");
        }

        store.update(s => {
          const {
            NewConfirmed: newConfirmed,
            TotalConfirmed: totalConfirmed,
            NewDeaths: newDeaths,
            TotalDeaths: totalDeaths,
            NewRecovered: newRecovered,
            TotalRecovered: totalRecovered
          } = response.Countries.find(r => r.Slug === country);

          return {
            ...s,
            isLoading: false,
            newConfirmed,
            totalConfirmed,
            newDeaths,
            totalDeaths,
            newRecovered,
            totalRecovered,
            date: format(new Date(response.Date), "dd-MM-yy")
          };
        });
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
