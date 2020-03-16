<template>
  <div class="select-panel">
    <label for="cube">scramble:
      <select id="cube" v-model="selectCube">
        <option 
        :key="index" 
        v-for="(cube, index) in cubes" 
        :value="cube.value" 
        :disabled="cube.disabled">{{ cube.label }}</option>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SelectPanel',
  data() {
    return {
      cubes: [
        {
          value: 'c2',
          label: '2x2',
          disabled: false
        },
        {
          value: 'c3',
          label: '3x3',
          disabled: false
        },
        {
          value: 'c4',
          label: '4x4',
          disabled: true
        },
        {
          value: '5x5',
          label: '5x5',
          disabled: true
        },
        {
          value: '6x6',
          label: '6x6',
          disabled: true
        },
        {
          value: '7x7',
          label: '7x7',
          disabled: true
        },
        {
          value: '3x3oh',
          label: '3x3 oh',
          disabled: true
        },
        {
          value: '3x3feet',
          label: '3x3 feet',
          disabled: true
        },
        {
          value: '3x3bld',
          label: '3x3 bld',
          disabled: true
        },
        {
          value: 'pyraminx',
          label: 'pyraminx',
          disabled: true
        },
        {
          value: 'mexaminx',
          label: 'mexaminx',
          disabled: true
        },
        {
          value: 'skweb',
          label: 'skweb',
          disabled: true
        },
        {
          value: 'square1',
          label: 'square1',
          disabled: true
        },
        {
          value: 'clock',
          label: 'clock',
          disabled: true
        },
        {
          value: '4x4bld',
          label: '4x4 bld',
          disabled: true
        },
        {
          value: '5x5bld',
          label: '5x5 bld',
          disabled: true
        },
      ],
      sessions: ['1', 'test2', 'practice'],
      modes: ['normal', 'mo3', 'ao5']
    }
  },
  computed: {
    ...mapGetters(['getSelectedCube']),
    selectCube: {
      get() { return this.getSelectedCube },
      set(value) { this.setSelectedCube(value) } 
    }
  },
  methods: {
    ...mapActions(['setSelectedCube'])
  }
}
</script>

<style lang="scss" scoped>

.select-panel {
  height: 100%;
  width: 100%;
  background: var(--denim-blue);
  display: flex;
  justify-content: space-around;
  align-items: center;

  label, select {
    font-size: 1.5rem;
  }

  select {
    background: rgba(0, 0, 0, 0.45);
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