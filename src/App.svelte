<script>
  import { onMount } from "svelte";
  import ConfirmedChart from "./Containers/ConfirmedChart.svelte";
  import DeathChart from "./Containers/DeathChart.svelte";
  import RecoveredChart from "./Containers/RecoveredChart.svelte";
  import CountryList from "./Containers/CountryList.svelte";
  import Overview from "./Containers/Overview.svelte";

  import countryStore from "./store/countries.js";

  onMount(() => {
    countryStore.fetch();
  });
</script>

<style>
  .container {
    display: grid;
    grid-template-areas:
      "header"
      "summary"
      "recoveredChart"
      "confirmedChart"
      "deathChart";
    grid-gap: 1rem 1.5rem;
  }

  @media (min-width: 540px) {
    .container {
      grid-template-areas:
        ". header header . "
        ". summary summary ."
        "recoveredChart recoveredChart recoveredChart recoveredChart"
        "confirmedChart confirmedChart confirmedChart confirmedChart"
        "deathChart deathChart deathChart deathChart";

      grid-template-columns: 0.5fr 5fr 0.5fr;
    }
  }

  @media (min-width: 992px) {
    .container {
      grid-template-areas:
        ". header header . "
        "confirmedChart confirmedChart summary summary"
        "recoveredChart recoveredChart deathChart deathChart";

      grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
    }
  }

  .select-box {
    grid-area: header;
  }

  .chart-confirmed {
    grid-area: confirmedChart;
  }

  .chart-deaths {
    grid-area: deathChart;
  }

  .chart-recovered {
    grid-area: recoveredChart;
  }

  .summary {
    grid-area: summary;
  }
</style>

<div class="container">
  <div class="select-box">
    <CountryList />
  </div>
  <div class="summary">
    <Overview />
  </div>
  <div class="chart-confirmed">
    <ConfirmedChart />
  </div>
  <div class="chart-deaths">
    <DeathChart />
  </div>
  <div class="chart-recovered">
    <RecoveredChart />
  </div>
</div>
