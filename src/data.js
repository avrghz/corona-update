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
  const res = await fetch(`${root}/total/dayone/country/${country}/status/confirmed`, {
    method: "GET"
  }).then(res => res.json());

  const labels = [];
  const data = [];
  if (res && res.length) {
    let count;

    for (let i = 0; i < res.length; i++) {
      count = res[i].Cases;
      labels.push(format(new Date(res[i].Date), "MM/dd/yyyy"));
      for (let j = i + 1; j < res.length; j++) {
        if (!sameDay(res[j].Date, res[i].Date)) {
          break;
        }
        i += 1;
        count += res[j].Cases;
      }
      data.push(count);
    }
  }

  return { labels, data };
};
