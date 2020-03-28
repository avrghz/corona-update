<script>
  import { onMount, onDestroy } from "svelte";
  import Select from "svelte-select";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import Chart from "./Components/Chart.svelte";

  import countryStore from "./store/countries.js";
  import statusStore from "./store/status.js";

  let unSubcribeCountries;

  onMount(async () => {
    countryStore.fetch();

    unSubcribeCountries = countryStore.subscribe(async store => {
      if (store.selected) {
        statusStore.fetchPerDayConfirmedStatus(store.selected);
      }
    });
  });

  const onCountryChange = async ({ detail: option }) =>
    countryStore.setSelected(option.value);

  onDestroy(() => {
    if (unSubcribeCountries) {
      unSubcribeCountries();
    }
  });
</script>

<style>
  .container {
    display: grid;
    grid-template-areas:
      "header . "
      "content1 content2";
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }

  .chart-holder {
    margin-top: 20px;
  }

  .in-header {
    grid-area: header;
  }

  .in-content-1 {
    grid-area: content1;
  }
</style>

<!-- <div>{JSON.stringify($statusStore)}</div> -->

<div class="container">
  <div class="select-box in-header">
    {#if $countryStore.isLoading}
      <div>Loading...</div>
    {:else}
      <Select
        items={$countryStore.countries}
        placeholder="Search for country"
        on:select={onCountryChange} />
    {/if}

  </div>

  <div class="chart-holder in-content-1" transition:fade>
    {#if $statusStore.status.count.length && $statusStore.status.date.length}
      <h3>Confirmed cases</h3>
      <Chart
        id="countByCuntry"
        seriesName="Count"
        xaxis={$statusStore.status.date}
        data={$statusStore.status.count} />
    {:else if $countryStore.selected}
      <p>No records found</p>
    {:else}
      <p>Select a country</p>
    {/if}
  </div>
</div>
