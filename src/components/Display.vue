<template>
  <div class="display">
    <h2>0.00</h2>
    <div class="stats">
      <p>ao5: <span>0.00</span></p>
      <p>ao12: <span>0.00</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Display'
}
</script>

<style lang="scss" scoped>

.display {
  width: 35vw;
  height: 12em;
  background: var(--yale-blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;

  h2 {
    font-size: 4.5em;
    padding-top: .5rem;
  }

  .stats {
    font-size: 1.05rem;
  }
}

</style>