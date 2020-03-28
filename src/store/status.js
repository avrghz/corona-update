import { writable } from "svelte/store";
import { format } from "date-fns";

const root = "https://api.covid19api.com";

const statusList = [
  { label: "Confirmed", value: "Confirmed" },
  { label: "Deaths", value: "Deaths" },
  { label: "Recovered", value: "Recovered" }
];

const createStore = () => {
  const store = writable({
    date: [],
    count: [],
    statusList,
    selected: statusList[0].value,
    error: null,
    isLoading: false
  });

  return {
    subscribe: store.subscribe,
    setSelected: selected => store.update(s => ({ ...s, selected })),
    fetchPerDayStatus: async (country, status = statusList[0].value) => {
      try {
        store.update(s => ({ ...s, isLoading: true }));

        const response = await fetch(`${root}/total/country/${country}/status/${status}`, {
          method: "GET"
        }).then(res => res.json());

        if (!response) {
          throw new Error("No details fetched");
        }

        store.update(s => ({
          ...s,
          isLoading: false,
          ...response.reduce(
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
