<template>
  <div class="select-panel">
    <label for="cube">scramble:
      <select id="cube">
        <option :key="index" v-for="(scramble, index) in scrambles" :value="scramble">{{ scramble }}</option>
      </select>
    </label>

    <label for="session">session:
      <select id="session">
        <option :key="index" v-for="(session, index) in sessions" value="index">{{ session }}</option>
      </select>
    </label>

    <label for="mode">mode:
      <select id="mode">
        <option :key="index" v-for="(mode, index) in modes" :value="mode">{{ mode }}</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: 'SelectPanel',
  data() {
    return {
      scrambles: ['2x2', '3x3', '4x4', '5x5', '6x6', '7x7', '3x3oh', 'pyraminx', 'megaminx', 'skweb', 'square1', 'clock', '3x3bld', '4x4bld', '5x5bld'],
      sessions: ['1', 'test2', 'practice'],
      modes: ['normal', 'mo3', 'ao5']
    } 
  }
}
</script>

<style lang="scss" scoped>

.select-panel {
  height: 3em;
  width: 100%;
  background: var(--denim-blue);
  display: flex;
  justify-content: space-around;
  align-items: center;

  label, select {
    font-size: 1.5rem;
  }

  select {
    background: rgba(71, 71, 71, 0.287);
    border: none;
    border-radius: .4rem;
    opacity: .5;
    margin-left: .2em;
    padding: 0 .3em;
    cursor: pointer;

    option {
      background: var(--denim-blue);
    }
  }

}

</style>