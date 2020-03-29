<script>
  export let count;
  export let total;
  export let colors = ["var(--grey)", "var(--grey)"];
</script>

<style>
  .count-display {
    display: flex;
    justify-content: center;
    font-size: 1.75rem;
    font-weight: bold;
    color: var(--grey);
    align-items: center;
    line-height: 1;
  }

  .split {
    font-size: 2.5rem;
    padding: 0 0.75rem;
  }

  @media (min-width: 992px) {
    .count-display {
      font-size: 3rem;
    }
    .split {
      font-size: 4rem;
    }
  }
</style>

<div class="count-display">
  <div style={colors[0] ? `color: ${colors[0]}` : ''}>{count}</div>
  <div class="split">/</div>
  <div style={colors[1] ? `color: ${colors[1]}` : ''}>{total}</div>
</div>
