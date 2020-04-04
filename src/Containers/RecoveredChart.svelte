<script>
  import Card from "../Components/Card.svelte";
  import Chart from "../Components/Chart.svelte";
  import recoveredStore from "../store/recovered.js";
</script>

<Card hasError={!$recoveredStore.isLoading && $recoveredStore.error}>
  <Chart
    id="recoveredCases"
    seriesName="Count"
    isLoading={$recoveredStore.isLoading}
    xaxis={$recoveredStore.date}
    data={$recoveredStore.count}
    colors={['#8cd681']} />
</Card>
