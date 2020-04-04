import { format, subMonths } from "date-fns";
import axios from "./axios";

export const fetchCountries = async () => {
  const { data: response } = await axios.get("/countries");

  if (!response) {
    throw new Error("No records fetched");
  }

  return response.reduce(
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
};

export const fetchCount = async (country, status) => {
  const { data: response } = await axios.get(
    `/live/country/${country}/status/${status}/date/${subMonths(new Date(), 1).toISOString()}`
  );

  if (!response) {
    throw new Error("No details fetched");
  }

  const formattedResponse = response.reduce((acc, o) => {
    const formattedDate = format(new Date(o.Date), "dd-MM-yy");
    return { ...acc, ...{ [formattedDate]: { ...acc[formattedDate], ...{ [o.Province]: o.Cases } } } };
  }, {});

  return Object.keys(formattedResponse).reduce(
    (acc, o) => ({
      ...acc,
      date: [...acc.date, o],
      count: [...acc.count, Object.values(formattedResponse[o]).reduce((c, i) => c + i, 0)]
    }),
    { date: [], count: [] }
  );
};
