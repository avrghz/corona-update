<script>
  import { tweened } from "svelte/motion";

  export let count;
  export let total;
  export let colors = ["var(--grey)", "var(--grey)"];

  let tweenedTotal = tweened(0, {
    interpolate: (a, b) => t => parseInt(b * t),
    duration: 1000
  });

  let tweenedCount = tweened(0, {
    interpolate: (a, b) => t => parseInt(b * t),
    duration: 1000
  });

  $: {
    tweenedTotal.set(total);
  }

  $: {
    tweenedCount.set(count);
  }
</script>

<style>
  .count-display {
    display: grid;
    grid-template-columns: 1fr 50px 1fr;
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
    justify-self: center;
  }

  .first-col {
    justify-self: flex-end;
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
  <div class="first-col" style={colors[0] ? `color: ${colors[0]}` : ''}>
    {$tweenedCount}
  </div>
  <div class="split">/</div>
  <div class="second-col" style={colors[1] ? `color: ${colors[1]}` : ''}>
    {$tweenedTotal}
  </div>
</div>
