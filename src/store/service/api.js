import { format, subMonths, isAfter } from "date-fns";
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
            id: o.Slug,
          })
        : acc,
    []
  );
};

export const fetchCount = async (country, status) => {
  const { data: response } = await axios.get(
    `https://api.covid19api.com/country/${country.toLowerCase()}/status/${status.toLowerCase()}`
  );

  if (!response || response.length === 0) {
    throw new Error("No details fetched");
  }

  const fromDate = subMonths(new Date(), 1);

  const formattedResponse = response.reduce((acc, o) => {
    const date = new Date(o.Date);

    if (isAfter(fromDate, date)) {
      return acc;
    }

    const formattedDate = format(date, "dd-MM-yy");

    return { ...acc, ...{ [formattedDate]: { ...acc[formattedDate], ...{ [o.Province]: o.Cases } } } };
  }, {});

  return Object.keys(formattedResponse).reduce(
    (acc, o) => ({
      ...acc,
      date: [...acc.date, o],
      count: [...acc.count, Object.values(formattedResponse[o]).reduce((c, i) => c + i, 0)],
    }),
    { date: [], count: [] }
  );
};
