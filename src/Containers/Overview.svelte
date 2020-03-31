<script>
  import Card from "../Components/Card.svelte";
  import CountDisplay from "../Components/CountDisplay.svelte";

  import summaryStore from "../store/summary.js";
</script>

<style>
  .legend {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 0.9rem;
    color: var(--grey);
    margin-bottom: 1rem;
  }

  .d-lg {
    display: none;
  }

  @media (min-width: 992px) {
    .legend {
      margin-bottom: 0;
      display: none;
    }

    .d-lg {
      display: flex;
    }
  }
</style>

<div class="legend">New Cases / Total Cases</div>

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

<div class="legend d-lg">New Cases / Total Cases</div>
