<script>
  import { onMount, afterUpdate } from "svelte";
  import Chart from "chart.js";
  import ApexCharts from "apexcharts";

  export let id;
  export let seriesName;
  export let xaxis;
  export let data;
  export let colors = ["#00BAEC"];

  let chart;

  let options = {
    chart: {
      type: "area",
      toolbar: {
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false
        }
      }
    },
    colors,
    series: [
      {
        name: seriesName,
        data: []
      }
    ],
    xaxis: {
      categories: []
    }
  };

  onMount(async () => {
    chart = new ApexCharts(document.querySelector(`#${id}`), options);
    chart.render();
  });

  afterUpdate(() => {
    updateChart(xaxis, data, seriesName);
  });

  function updateChart(categories, chatData, name) {
    if (chart) {
      chart.updateOptions({
        series: [
          {
            data: chatData
          }
        ],
        xaxis: {
          categories
        }
      });
    }
  }
</script>

<div {id} />
