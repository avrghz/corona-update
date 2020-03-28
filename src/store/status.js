import { writable } from "svelte/store";
import { format } from "date-fns";

const root = "https://api.covid19api.com";

const createStore = () => {
  const store = writable({
    status: {
      date: [],
      count: [],
      newConfirmed: 0,
      totalConfirmed: 0,
      newDeaths: 0,
      totalDeaths: 0,
      newRecovered: 0,
      totalRecovered: 0
    },
    error: null,
    isLoading: false
  });

  return {
    subscribe: store.subscribe,
    fetchPerDayConfirmedStatus: async country => {
      try {
        store.update(s => ({ ...s, isLoading: true }));

        const response = await fetch(`${root}/total/country/${country}/status/confirmed`, {
          method: "GET"
        }).then(res => res.json());

        if (!response) {
          throw new Error("No details fetched");
        }

        store.update(s => ({
          ...s,
          isLoading: false,
          status: response.reduce(
            (acc, r) => ({
              ...acc,
              date: [...acc.date, format(new Date(r.Date), "dd-MM-yy")],
              count: [...acc.count, r.Cases]
            }),
            { date: [], count: [] }
          )
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
