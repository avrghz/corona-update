import { writable } from "svelte/store";

export const statusList = [
  { label: "Confirmed", value: "Confirmed" },
  { label: "Deaths", value: "Deaths" },
  { label: "Recovered", value: "Recovered" }
];

const createStore = () => {
  const store = writable({
    statusList,
    selected: statusList[0].value
  });

  return {
    subscribe: store.subscribe,
    setSelected: selected => store.update(s => ({ ...s, selected }))
  };
};

const store = createStore();

export default store;
