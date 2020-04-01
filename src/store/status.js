import { writable } from "svelte/store";
import { format, subMonths } from "date-fns";

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
    fetchData: async (country, status = statusList[0].value) => {
      try {
        store.update(s => ({ ...s, isLoading: true }));

        const response = await fetch(
          `${root}/live/country/${country}/status/${status}/date/${subMonths(new Date(), 1).toISOString()}`,
          {
            method: "GET"
          }
        ).then(res => res.json());

        if (!response) {
          throw new Error("No details fetched");
        }

        const formattedResponse = response.reduce((acc, o) => {
          const formattedDate = format(new Date(o.Date), "dd-MM-yy");
          return { ...acc, ...{ [formattedDate]: { ...acc[formattedDate], ...{ [o.Province]: o.Cases } } } };
        }, {});

        const graphData = Object.keys(formattedResponse).reduce(
          (acc, o) => ({
            ...acc,
            date: [...acc.date, o],
            count: [...acc.count, Object.values(formattedResponse[o]).reduce((c, i) => c + i, 0)]
          }),
          { date: [], count: [] }
        );

        store.update(s => ({
          ...s,
          isLoading: false,
          ...graphData
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
