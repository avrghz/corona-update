<script>
  import { onMount } from "svelte";
  import Select from "svelte-select";
  import { flip } from "svelte/animate";
  import { fade, scale } from "svelte/transition";
  import Card from "../Components/Card.svelte";
  import Chart from "../Components/Chart.svelte";
  import Skeleton from "../Components/Skeleton.svelte";

  import countryStore from "../store/countries.js";
  import statusStore from "../store/status.js";
  import casesStore from "../store/cases.js";

  const onStatusChange = async ({ detail: option }) => {
    casesStore.setSelected(option.value);
    statusStore.fetchData($countryStore.selected.id, option.value);
  };
</script>

<style>
  .chart-switcher {
    display: grid;
    margin-bottom: 0.75rem;
  }

  .chart-switcher {
    --height: 40px;
    --border: 0;
  }

  @media (min-width: 540px) {
    .chart-switcher {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 992px) {
    .chart-switcher {
      grid-template-columns: 1fr 4fr;
    }
  }
</style>

<Card>
  <div class="select-box-theme chart-switcher" transition:fade>
    <Skeleton isLoading={$statusStore.isLoading}>
      <Select
        items={$casesStore.statusList}
        isClearable={false}
        isSearchable={false}
        selectedValue={$casesStore.selected}
        on:select={onStatusChange} />
    </Skeleton>
  </div>
  <div class="chart-holder">
    {#if $statusStore.isLoading}
      <Skeleton
        isLoading={$statusStore.isLoading}
        height="30px"
        top="10px"
        width="50%"
        start="right" />
    {/if}

    <Skeleton isLoading={$statusStore.isLoading}>
      <Chart
        id="countByCuntry"
        seriesName="Count"
        xaxis={$statusStore.date}
        data={$statusStore.count} />
    </Skeleton>
  </div>

</Card>
