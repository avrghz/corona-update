<script>
  export let title = null;
</script>

<style>
  .card {
    padding: 1.5rem 1.25rem 1rem 1.25rem;
    border: 1px solid rgb(136, 135, 135);
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.2rem;
    margin: 0;
    line-height: 1;
    margin-bottom: 0.75rem;
    color: rgb(136, 135, 135);
    text-transform: uppercase;
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
