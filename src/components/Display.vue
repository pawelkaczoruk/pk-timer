<template>
  <div class="display">
    <h2 :style="{ color: getTimerColor }">{{ timeFormatter(getTimeValue) }}</h2>
    <div class="stats">
      <p>ao5: <span>0.00</span></p>
      <p>ao12: <span>0.00</span></p>
    </div>
  </div>
</template>

<script>
import { timeFormatterMixin } from '../mixins/timeFormatterMixin'
import { mapGetters } from 'vuex'

export default {
  name: 'Display',
  mixins: [timeFormatterMixin],
  computed: mapGetters([
    'getTimerColor',
    'getTimeValue'
  ])
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