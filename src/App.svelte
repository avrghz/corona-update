<script>
  import { onMount } from "svelte";
  import Select from "svelte-select";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import Chart from "./Components/Chart.svelte";

  import countryStore from "./store/countries.js";
  import statusStore from "./store/status.js";
  import summaryStore from "./store/summary.js";

  onMount(async () => {
    countryStore.fetch();

    if ($countryStore.selected) {
      statusStore.fetchPerDayStatus(
        $countryStore.selected,
        $statusStore.selected
      );
      summaryStore.fetch($countryStore.selected);
    }
  });

  const onCountryChange = async ({ detail: option }) => {
    countryStore.setSelected(option.value);
    statusStore.fetchPerDayStatus(option.value, $statusStore.selected);
  };

  const onStatusChange = async ({ detail: option }) => {
    statusStore.setSelected(option.value);
    statusStore.fetchPerDayStatus($countryStore.selected, option.value);
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

  .in-header {
    grid-area: header;
  }

  .in-content-1 {
    grid-area: content1;
  }

  .in-content-2 {
    grid-area: content2;
  }

  .chart-holder {
    margin-top: 20px;
  }

  .summary-holder {
    word-break: break-word;
  }

  /* table */

  table {
    border-collapse: collapse;
  }

  .table {
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
  }

  .table td,
  .table th {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
    text-align: left;
  }

  .table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
  }
</style>

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
    {#if $statusStore.count.length && $statusStore.date.length}
      <Select
        items={$statusStore.statusList}
        isClearable={false}
        isSearchable={false}
        selectedValue={$statusStore.selected}
        on:select={onStatusChange} />

      <Chart
        id="countByCuntry"
        seriesName="Count"
        xaxis={$statusStore.date}
        data={$statusStore.count} />
    {:else if $countryStore.selected}
      <p>No records found</p>
    {:else}
      <p>Select a country</p>
    {/if}
  </div>

  <div class="summary-holder in-content-2">
    <table class="table">
      <thead>
        <tr>
          <th />
          <th>New</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Confirmed</th>
          <td>{$summaryStore.newConfirmed}</td>
          <td>{$summaryStore.totalConfirmed}</td>
        </tr>
        <tr>
          <th>Deaths</th>
          <td>{$summaryStore.newDeaths}</td>
          <td>{$summaryStore.totalDeaths}</td>
        </tr>
        <tr>
          <th>Recovered</th>
          <td>{$summaryStore.newRecovered}</td>
          <td>{$summaryStore.totalRecovered}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
