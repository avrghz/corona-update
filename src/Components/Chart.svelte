<script>
  import { onMount, afterUpdate } from "svelte";
  import Chart from "chart.js";

  export let labels;
  export let title;
  export let data;

  let chart;

  onMount(async () => {
    renderChart(labels, data);
  });

  afterUpdate(() => {
    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = data;
      chart.update();
    }
  });

  function renderChart(l, d) {
    const ctx = document.getElementById("myChart").getContext("2d");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: l,
        datasets: [
          {
            label: title,
            backgroundColor: "rgba(229,28,36, .25)",
            borderColor: "rgba(229,28,36, 1)",
            data: d
          }
        ]
      },
      options: {}
    });
  }
</script>

<canvas id="myChart" />
