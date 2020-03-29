<script>
  import { onMount } from "svelte";
  import Select from "svelte-select";
  import { flip } from "svelte/animate";
  import { fade, scale } from "svelte/transition";
  import Chart from "./Components/Chart.svelte";
  import Card from "./Components/Card.svelte";
  import CountDisplay from "./Components/CountDisplay.svelte";

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
    summaryStore.fetch(option.value);
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
    grid-template-columns: 2.5fr 1.5fr;
    grid-gap: 1rem 1.5rem;
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

  .summary-holder {
    word-break: break-word;
  }

  .chart-holder {
    min-height: 150px;
  }

  .select-box {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
  }

  .chart-switcher {
    display: grid;
    grid-template-columns: 1fr 4fr;
    margin-bottom: 0.75rem;
  }

  .legend {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 0.9rem;
    color: var(--grey);
  }

  .select-box-theme {
    position: relative;
    --borderRadius: 0;
    --placeholderColor: rgba(179, 176, 176, 0.35);
    --background: transparent;
    --inputColor: var(--grey);
    --border: 1px solid var(--grey);
    --listBackground: black;
    --listBorderRadius: 0;
    --itemIsActiveBG: rgb(0, 186, 230);
    --itemHoverBG: rgb(22, 69, 82);
    --listShadow: 0 0 1px 1px var(--grey);
    --itemFirstBorderRadius: 0;
  }

  .country-switcher {
    --inputFontSize: 2rem;
    --height: 60px;
  }

  .chart-switcher {
    --height: 40px;
    --border: 0;
  }
</style>

<div class="container">
  <div class="select-box in-header">
    <div class="select-box-theme country-switcher">
      <!-- {#if $countryStore.isLoading}
        <span class="skeleton-box" />
      {/if} -->
      <Select
        items={$countryStore.countries}
        placeholder="Search Country here"
        on:select={onCountryChange}
        selectedValue={$countryStore.selected} />
    </div>

  </div>

  <div class="in-content-1">
    <Card>
      <div class="chart-holder">
        {#if $statusStore.count.length && $statusStore.date.length}
          <div class="select-box-theme chart-switcher" transition:fade>
            <Select
              items={$statusStore.statusList}
              isClearable={false}
              isSearchable={false}
              selectedValue={$statusStore.selected}
              on:select={onStatusChange} />
          </div>

          <div>
            <Chart
              id="countByCuntry"
              seriesName="Count"
              xaxis={$statusStore.date}
              data={$statusStore.count} />
          </div>
        {:else if $countryStore.selected}
          <p>No records found</p>
        {:else}
          <p>Select a country</p>
        {/if}
      </div>

    </Card>
  </div>

  <div class="summary-holder in-content-2">
    <Card title="Confirmed Cases">
      <CountDisplay
        colors={['rgb(241, 114, 114)']}
        count={$summaryStore.newConfirmed}
        total={$summaryStore.totalConfirmed} />
    </Card>

    <Card title="Death Cases">
      <CountDisplay
        colors={['rgb(241, 114, 114)']}
        count={$summaryStore.newDeaths}
        total={$summaryStore.totalDeaths} />
    </Card>

    <Card title="Recovered Cases">
      <CountDisplay
        colors={['#8cd681']}
        count={$summaryStore.newRecovered}
        total={$summaryStore.totalRecovered} />
    </Card>

    <div class="legend">New Cases / Total Cases</div>
  </div>
</div>
