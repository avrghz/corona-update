<script>
  export let title = null;
  export let hasError = false;
</script>

<style>
  .card {
    padding: 1rem;
    border: 1px solid var(--grey);
    position: relative;
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

  .error-block {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #111;
    height: 100%;
    width: 100%;
    color: rgb(190, 6, 6);
    z-index: 99;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    font-size: 1.2rem;
  }
  svg {
    fill: rgb(190, 6, 6);
    width: 100px;
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
    {#if hasError}
      <div class="error-block">
        <div>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 32 32">
            <title>Error</title>
            <path
              d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16
              7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13
              13-13-5.82-13-13 5.82-13 13-13zM8 10c0-1.105 0.895-2 2-2s2 0.895 2
              2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2
              0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM22.691 20h2.027c0.289
              2.266-1.014 4.517-3.249 5.33-2.591
              0.943-5.466-0.397-6.409-2.988-0.566-1.555-2.291-2.359-3.845-1.793-1.424
              0.518-2.217 2.009-1.906 3.451h-2.027c-0.289-2.266 1.014-4.517
              3.249-5.33 2.591-0.943 5.466 0.397 6.409 2.988 0.566 1.555 2.291
              2.359 3.845 1.793 1.424-0.518 2.217-2.009 1.906-3.451z" />
          </svg>
        </div>
        Error Ocuured
      </div>
    {/if}
    <slot />
  </main>
</div>
