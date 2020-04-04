<script>
  import Card from "../Components/Card.svelte";
  import Chart from "../Components/Chart.svelte";
  import confirmedStore from "../store/confirmed.js";
</script>

<Card hasError={!$confirmedStore.isLoading && $confirmedStore.error}>
  <Chart
    id="confirmedCases"
    seriesName="Count"
    isLoading={$confirmedStore.isLoading}
    xaxis={$confirmedStore.date}
    data={$confirmedStore.count}
    colors={['#ffd079']} />
</Card>
