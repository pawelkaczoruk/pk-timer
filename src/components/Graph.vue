<template>
  <div class="graph">

  </div>
</template>

<script>
export default {
  name: 'Graph'
}
</script>

<style lang="scss" scoped>

.graph {
  height: 100%;
  width: 100%;
  background: var(--sapphire-blue);
  display: none;

  @media screen and (min-width: 768px) and (min-height: 500px) and (orientation: landscape),
         screen and (min-width: 1024px) and (orientation: portrait) {
    display:flex;
    
  }
}

</style>