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
      "content2"
      "content1";
    grid-gap: 1rem 1.5rem;
  }

  .in-header {
    grid-area: header;
  }

  .in-content-1 {
    grid-area: content1;
    align-items: stretch;
  }

  .in-content-2 {
    grid-area: content2;
  }

  .summary-holder {
    word-break: break-word;
  }

  .select-box {
    display: grid;
  }

  @media (min-width: 540px) {
    .select-box {
      grid-template-columns: 3fr 1fr;
    }
  }

  @media (min-width: 992px) {
    .container {
      grid-template-areas:
        "header . "
        "content1 content2";
      grid-template-columns: 2.5fr 1.5fr;
    }

    .select-box {
      grid-template-columns: 1.5fr 1fr;
    }
  }
</style>

<div class="container">
  <div class="select-box in-header">
    <CountryList />
  </div>
  <div class="in-content-1">
    <ConfirmedChart />
    <DeathChart />
    <RecoveredChart />
  </div>
  <div class="summary-holder in-content-2">
    <Overview />
  </div>
</div>
