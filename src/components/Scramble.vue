<template>
  <div class="scramble" >
    <p>{{ scramble.join(' ') }}</p>
  </div>
</template>

<script>
export default {
  name: 'Scramble',
  props: ['scramble']
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