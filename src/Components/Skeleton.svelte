<script>
  import { fade } from "svelte/transition";

  export let isLoading;
  export let height = null;
  export let width = null;
  export let top = 0;
  export let start = "left";

  const createStyle = () => {
    let style = `${start}: 0; top: ${top};`;

    if (height) {
      style = style + `height: ${height};`;
    }
    if (width) {
      style = style + `width: ${width};`;
    }

    return style;
  };
</script>

<style>
  .skeleton-box {
    position: relative;
  }

  .skeleton-box-inner {
    height: 100%;
    display: block;
    position: absolute;
    overflow: hidden;
    background-color: #111;
    border: 1px solid #111;
    width: 100%;
    z-index: 999;
    border: 1px solid rgb(34, 33, 33);
  }

  .skeleton-box-inner::after,
  .skeleton-box-inner::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: "";
  }

  .skeleton-box-inner::after {
    transform: translateX(-100%);
    animation: shimmer 1s infinite;
    background-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.2) 20%,
      rgba(0, 0, 0, 0.3) 60%,
      rgba(39, 39, 39, 0.2) 80%,
      rgba(39, 39, 39, 0.3)
    );
  }

  .skeleton-box-inner::before {
    animation: blink 0.5s infinite;
    background-color: rgba(39, 39, 39, 0.5);
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes blink {
    0% {
      opacity: 0.5;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0.5;
    }
  }
</style>

<div class="skeleton-box">
  {#if isLoading}
    <span transition={fade} class="skeleton-box-inner" style={createStyle()} />
  {/if}
  <slot />
</div>
