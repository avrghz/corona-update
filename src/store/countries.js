import { writable } from "svelte/store";

const root = "https://api.covid19api.com";

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

        const data = await fetch(`${root}/countries`, {
          method: "GET"
        }).then(res => res.json());

        if (!data) {
          throw new Error("No records fetched");
        }

        const countries = data.reduce(
          (acc, o) =>
            !!o.Country
              ? acc.concat({
                  label: o.Country,
                  value: o.Country,
                  id: o.Slug
                })
              : acc,
          []
        );

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
