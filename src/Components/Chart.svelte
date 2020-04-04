<script>
  import { onMount, afterUpdate } from "svelte";
  import Chart from "chart.js";
  import ApexCharts from "apexcharts";
  import Skeleton from "./Skeleton.svelte";

  export let id;
  export let seriesName;
  export let xaxis;
  export let data;
  export let colors = ["#00BAEC"];
  export let isLoading = false;

  let chart;

  let options = {
    chart: {
      type: "area",
      toolbar: {
        tools: {
          download: false,
          selection: false,
          zoom: false,
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
      categories: [],
      labels: {
        rotateAlways: true,
        offsetY: 10
      }
    },
    width: "100%",
    responsive: [
      {
        breakpoint: 540,
        options: {}
      }
    ]
  };

  $: {
    updateChart(xaxis, data, seriesName);
  }

  afterUpdate(() => {
    setTimeout(() => {
      if (!chart) {
        chart = new ApexCharts(document.querySelector(`#${id}`), options);
        chart.render();
      }
    });
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

<Skeleton {isLoading}>
  <div {id} />
</Skeleton>
