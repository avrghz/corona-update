<script>
  export let count;
  export let total;
  export let colors = ["rgb(179, 176, 176)", "rgb(179, 176, 176)"];
</script>

<style>
  .count-display {
    display: flex;
    justify-content: center;
    font-size: 3rem;
    font-weight: bold;
    color: rgb(179, 176, 176);
    align-items: center;
    line-height: 1;
  }

  .split {
    font-size: 4rem;
    padding: 0 0.75rem;
  }
</style>

<div class="count-display">
  <div style={colors[0] ? `color: ${colors[0]}` : ''}>{count}</div>
  <div class="split">/</div>
  <div style={colors[1] ? `color: ${colors[1]}` : ''}>{total}</div>
</div>
