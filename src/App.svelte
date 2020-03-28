<script>
  import { onMount, onDestroy } from "svelte";
  import Select from "svelte-select";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import Chart from "./Components/Chart.svelte";
  import {
    fetchCountries,
    fetchTotalCountPerDay,
    fetchSummary
  } from "./service.js";

  let countries = [];
  let chartData = {
    xaxis: [],
    data: []
  };

  onMount(async () => {
    try {
      countries = await fetchCountries();
    } catch (e) {
      console.log("error: OnMount", e);
    }
  });

  const onCountryChange = async ({ detail: option }) => {
    try {
      chartData = await fetchTotalCountPerDay(option.value);
      await fetchSummary(option.value);
    } catch (e) {
      console.log("error: onCountryChange", e);
    }
  };
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

<div class="container">
  <div class="select-box in-header">
    <Select
      items={countries}
      placeholder="Search for country"
      on:select={onCountryChange} />
  </div>

  <div class="chart-holder in-content-1" transition:fade>
    {#if chartData.xaxis.length && chartData.data.length}
      <h3>Confirmed cases</h3>
      <Chart id="countByCuntry" seriesName="Count" {...chartData} />
    {:else}
      <p>No records found</p>
    {/if}
  </div>
</div>
