<script>
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
  }

  .skeleton-box-inner::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: "";
    transform: translateX(-100%);
    animation: shimmer 2s infinite;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.05) 20%,
      rgba(255, 255, 255, 0.125) 80%,
      rgba(255, 255, 255, 0)
    );
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
</style>

<div class="skeleton-box">
  {#if isLoading}
    <span class="skeleton-box-inner" style={createStyle()} />
  {/if}
  <slot />
</div>
