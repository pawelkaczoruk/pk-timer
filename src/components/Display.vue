<template>
  <div class="display">
    <h2 :style="{ color: ready }">{{ timeFormatter(time) }}</h2>
    <div class="stats">
      <p>ao5: <span>0.00</span></p>
      <p>ao12: <span>0.00</span></p>
    </div>
  </div>
</template>

<script>
import { timeFormatterMixin } from '../mixins/timeFormatterMixin'

export default {
  name: 'Display',
  mixins: [timeFormatterMixin],
  props: ['time', 'ready']
}
</script>

<style lang="scss" scoped>

.display {
  width: 100%;
  height: 100%;
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