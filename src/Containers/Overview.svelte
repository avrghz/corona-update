<script>
  import Card from "../Components/Card.svelte";
  import CountDisplay from "../Components/CountDisplay.svelte";
  import summaryStore from "../store/summary.js";
</script>

<style>
  .overview {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
</style>

<div class="overview">
  <Card title="Confirmed">
    <CountDisplay
      colors={['rgb(241, 114, 114)']}
      count={$summaryStore.newConfirmed}
      total={$summaryStore.totalConfirmed} />
  </Card>

  <Card title="Deaths">
    <CountDisplay
      colors={['rgb(241, 114, 114)']}
      count={$summaryStore.newDeaths}
      total={$summaryStore.totalDeaths} />
  </Card>

  <Card title="Recovered">
    <CountDisplay
      colors={['#8cd681']}
      count={$summaryStore.newRecovered}
      total={$summaryStore.totalRecovered} />
  </Card>
</div>
