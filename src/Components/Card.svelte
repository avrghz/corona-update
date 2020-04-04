<script>
  export let title = null;
</script>

<style>
  .card {
    padding: 1rem;
    border: 1px solid var(--grey);
  }

  .card + .card {
    margin-top: 1rem;
  }

  h3 {
    font-size: 1rem;
    margin: 0;
    line-height: 1;
    margin-bottom: 0.75rem;
    color: var(--grey);
    text-transform: capitalize;
  }

  @media (min-width: 992px) {
    h3 {
      font-size: 1.2rem;
    }
  }
</style>

<div class="card">
  {#if title}
    <h3>{title}</h3>
  {/if}
  <main>
    <slot />
  </main>
</div>
