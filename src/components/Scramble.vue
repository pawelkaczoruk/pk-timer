<template>
  <div class="scramble">
    <p>U' D R L2 D L' B R2 U2 B F' R U2 B L U' F' L' F2 B' R F D R</p>
  </div>
</template>

<script>
export default {
  name: 'Scramble'
}
</script>

<style lang="scss" scoped>

.scramble {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--space-blue);
  
  p {
    text-align: center;
    font-size: 1.5em;
    letter-spacing: .1em;
  }
  
}

</style>