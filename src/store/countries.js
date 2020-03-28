import { writable } from "svelte/store";

const root = "https://api.covid19api.com";

const createStore = () => {
  const store = writable({
    countries: [],
    error: null,
    isLoading: false,
    selected: "netherlands"
  });

  return {
    subscribe: store.subscribe,
    fetch: async () => {
      try {
        store.update(s => ({ ...s, isLoading: true }));

        const data = await fetch(`${root}/countries`, {
          method: "GET"
        }).then(res => res.json());

        if (!data) {
          throw new Error("No records fetched");
        }

        store.update(s => ({
          ...s,
          countries: data.reduce(
            (acc, o) =>
              !!o.Country
                ? acc.concat({
                    label: o.Country,
                    value: o.Country.toLowerCase()
                  })
                : acc,
            []
          ),
          isLoading: false
        }));
      } catch (err) {
        store.update(s => ({
          ...s,
          error: err.message,
          isLoading: false
        }));
      }
    },
    setSelected: selected => store.update(s => ({ ...s, selected }))
  };
};

const store = createStore();

export default store;
