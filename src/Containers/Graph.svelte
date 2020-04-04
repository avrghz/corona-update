<script>
  import Select from "svelte-select";
  import { flip } from "svelte/animate";
  import { fade, scale } from "svelte/transition";
  import Card from "../Components/Card.svelte";
  import Chart from "../Components/Chart.svelte";
  import Skeleton from "../Components/Skeleton.svelte";

  import countryStore from "../store/countries.js";
  import statusStore from "../store/status.js";
</script>

<Card>
  <Chart
    id="countByCuntry"
    seriesName="Count"
    xaxis={$statusStore.date}
    data={$statusStore.count} />
</Card>
