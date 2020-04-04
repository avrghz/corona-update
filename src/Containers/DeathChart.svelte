<script>
  import Card from "../Components/Card.svelte";
  import Chart from "../Components/Chart.svelte";
  import deathsStore from "../store/deaths.js";
</script>

<Card>
  <Chart
    id="deathCases"
    seriesName="Count"
    isLoading={$deathsStore.isLoading}
    xaxis={$deathsStore.date}
    data={$deathsStore.count}
    colors={['rgb(241, 114, 114)']} />
</Card>
