import { format } from "date-fns";

const root = "https://api.covid19api.com";

function sameDay(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

export const fetchCountries = async () => {
  const data = await fetch(`${root}/countries`, {
    method: "GET"
  }).then(res => res.json());

  return data.reduce((acc, o) => {
    const country = o.Country;
    return !!country
      ? acc.concat({
          label: country,
          value: country.toLowerCase()
        })
      : acc;
  }, []);
};

export const fetchTotalCountPerDay = async country => {
  const res = await fetch(`${root}/total/country/${country}/status/confirmed`, {
    method: "GET"
  }).then(res => res.json());

  const xaxis = [];
  const data = [];

  if (res && res.length) {
    res.forEach(o => {
      xaxis.push(format(new Date(o.Date), "dd-MM-yy"));
      data.push(o.Cases);
    });
  }

  return { xaxis, data };
};

export const fetchSummary = async country => {
  const res = await fetch(`${root}/summary`, {
    method: "GET"
  }).then(res => res.json());

  let records = null;
  let lastUpdated = null;
  if (res && res.length) {
    lastUpdated = format(new Date(res.Date), "dd-MM-yy");
    records = res.Countries.find(el => el.Slug === country);
  }

  return {
    lastUpdated,
    records
  };
};
