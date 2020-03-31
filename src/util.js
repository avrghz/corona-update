import { format, subMonths } from "date-fns";

const BASE_URL = "https://api.covid19api.com";

export const fetchData = async (country, status) => {
  const response = await fetch(
    `${BASE_URL}/live/country/${country}/status/${status}/date/${subMonths(new Date(), 1).toISOString()}`,
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

  return Object.keys(formattedResponse).reduce(
    (acc, o) => ({
      ...acc,
      date: [...acc.date, o],
      count: [...acc.count, Object.values(formattedResponse[o]).reduce((c, i) => c + i, 0)]
    }),
    { date: [], count: [] }
  );
};
