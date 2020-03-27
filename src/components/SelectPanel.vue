<template>
  <div class="select-panel">
    <label for="cube">scramble:
      <select id="cube" v-model="selectCube" @change="addAvg()">
        <option 
        :key="index" 
        v-for="(cube, index) in cubes" 
        :value="cube.value" 
        :disabled="cube.disabled">{{ cube.label }}</option>
      </select>
    </label>

    <label for="mode">mode:
      <select id="mode">
        <option 
        :key="index" 
        v-for="(mode, index) in modes" 
        :value="mode"
        :disabled="mode.disabled">{{ mode.label }}</option>
      </select>
    </label>
  </div>
</template>

<script>
import { getAvgMixin } from '../mixins/getAvgMixin'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SelectPanel',
  mixins: [getAvgMixin],
  data() {
    return {
      cubes: [
        {
          value: 'cube2x2',
          label: '2x2',
          disabled: false
        },
        {
          value: 'cube3x3',
          label: '3x3',
          disabled: false
        },
        {
          value: 'cube4x4',
          label: '4x4',
          disabled: true
        },
        {
          value: 'cube5x5',
          label: '5x5',
          disabled: true
        },
        {
          value: 'cube6x6',
          label: '6x6',
          disabled: true
        },
        {
          value: 'cube7x7',
          label: '7x7',
          disabled: true
        },
        {
          value: 'cube3x3oh',
          label: '3x3 oh',
          disabled: true
        },
        {
          value: 'cube3x3feet',
          label: '3x3 feet',
          disabled: true
        },
        {
          value: 'cube3x3bld',
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
          value: 'cube4x4bld',
          label: '4x4 bld',
          disabled: true
        },
        {
          value: 'cube5x5bld',
          label: '5x5 bld',
          disabled: true
        },
      ],
      modes: [
        {
          label: 'normal',
          disabled: false
        },
        { 
          label: 'mo3',
          disabled: true
        },
        {
          label: 'ao5',
          disabled: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getSelectedCube',
      'getCubeCopy'
    ]),
    selectCube: {
      get() { return this.getSelectedCube },
      set(value) { this.setSelectedCube(value) } 
    }
  },
  methods: {
    ...mapActions([
      'setSelectedCube',
      'addAvgToCubeCopy'
    ]),
    
    addAvg() {
      const list = this.getCubeCopy.list;
    
      for(let index=0; index<list.length; index++) {
        const ob = {
          index,
          ao5: index+5 > list.length ? undefined : Math.floor(this.getAvg(list, index, index+5)),
          ao12: index+12 > list.length ? undefined : Math.floor(this.getAvg(list, index, index+12)),
          mo100: index+100 > list.length ? undefined : Math.floor(this.getAvg(list, index, index+100, 'mean'))
        }
        
        this.addAvgToCubeCopy(ob);        
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.select-panel {
  height: 100%;
  width: 100%;
  background: var(--denim-blue);
  justify-content: space-around;
  align-items: center;
  display: none;
  
  @media screen and (min-width: 1024px) and (min-height: 500px) and (orientation: landscape),
         screen and (min-width: 1024px) and (orientation: portrait) {
    display: flex;
  }

  label, select {
    font-size: 1.5rem;
  }

  select {
    background: rgba(0, 0, 0, .45);
    border: none;
    border-radius: .4rem;
    opacity: .5;
    margin-left: .2em;
    padding: 0 .3em;
    cursor: pointer;
    transition: background .2s linear;

    option {
      background: var(--denim-blue);
    }

    &:hover {
      background: rgba(255, 255, 255, .15);
    }
  }

}

</style>