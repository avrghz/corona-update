<script>
  import { onMount, onDestroy } from "svelte";
  import Select from "svelte-select";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import Chart from "./Components/Chart.svelte";
  import { fetchCountries, fetchTotalCountPerDay } from "./data.js";

  let showChart = false;
  let countries = [];
  let chartData = {
    labels: [],
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
    } catch (e) {
      console.log("error: onCountryChange", e);
    }
  };
</script>

<style>
  .container {
    max-width: 800px;
    margin: auto;
    box-sizing: border-box;
    padding: 15px;
  }

  .chart-holder {
    margin-top: 20px;
  }
</style>

<div class="container">
  <Select
    items={countries}
    placeholder="Search for country"
    on:select={onCountryChange} />

  {#if chartData.labels.length && chartData.data.length}
    <div class="chart-holder" transition:fade>
      <Chart title="Count" {...chartData} />
    </div>
  {/if}
</div>
