<template>
  <div id="app">
    <Logo class="logo" />
    <SelectPanel class="select-panel" />
    <MenuBar class="menu-bar" />
    <Stats class="stats" />
    <Scramble class="scramble" :scramble="scramble" />
    <Display class="display" />
    <Cube class="cube" />
    <Graph class="graph" />
    <Extra class="extra" />
    <Compete class="compete" />
  </div>
</template>

<script>
import Logo from './components/Logo'
import SelectPanel from './components/SelectPanel'
import MenuBar from './components/MenuBar'
import Stats from './components/Stats'
import Scramble from './components/Scramble'
import Display from './components/Display'
import Cube from './components/Cube'
import Graph from './components/Graph'
import Extra from './components/Extra'
import Compete from './components/Compete'


export default {
  name: 'App',
  components: {
    Logo,
    SelectPanel,
    MenuBar,
    Stats,
    Scramble,
    Display,
    Cube,
    Graph,
    Extra,
    Compete
  },
  data() {
    return {
      scramble: []
    }
  },
  methods: {
    generateScramble(cube) {
      let scramble;

      switch(cube) {
        case '2x2': 
        case '3x3': scramble = this.generateScrambleNxN(cube); break;
      }

      this.scramble = scramble;
    },

    // function to generate NxNxN scrambles - atm only for 2x2 and 3x3 cubes
    generateScrambleNxN(cube) {
      let scramble = [],
          randSuffix,
          suffix,
          letter,
          randLetter,
          prev1Letter,
          prev2Letter,
          randGroup,
          prevGroup,
          length;

      switch(cube) {
        case '2x2': length = Math.floor(9 + Math.random() * 3); break;
        case '3x3': length = Math.floor(19 + Math.random() * 6); break;
      }

      for(let i=0; i<length; i++) {
        randSuffix = Math.floor(Math.random() * 3);

        // generate letter
        do {
          randLetter = Math.floor(Math.random() * 2);
          randGroup = Math.floor(Math.random() * 3);

          switch(randGroup) {
            case 0: letter = randLetter === 0 ? 'U' : 'D'; break;
            case 1: letter = randLetter === 0 ? 'F' : 'B'; break;
            case 2: letter = randLetter === 0 ? 'R' : 'L'; break;
          }

        } while(letter === prev1Letter || (letter === prev2Letter && randGroup === prevGroup));

        // determine suffix
        suffix = randSuffix === 0 ? '' : randSuffix === 1 ? '2' : '\'';

        // save previous and second previous letter
        if(i>1) prev2Letter = prev1Letter;
        prev1Letter = letter;
        prevGroup = randGroup;

        // apply new letter with suffix
        scramble.push(`${letter}${suffix}`)
      }
      
      return scramble;
    }
  },
  created() {
    this.generateScramble('3x3');
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');
@import url('./assets/styles/variables.scss');
@import url('./assets/styles/reset.scss');




#app { 
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template: 3em 2fr 6fr 1.5fr 3.5fr 7em / 250px 2fr 1fr 290px;
  grid-template-areas: "logo selectPanel selectPanel menuBar"
                       "stats scramble scramble scramble"
                       "stats displayTime cube cube"
                       "stats graph cube cube"
                       "stats graph extra extra"
                       "compete graph extra extra";
}

.logo {
  grid-area: logo;
}

.select-panel {
  grid-area: selectPanel;
}

.menu-bar {
  grid-area: menuBar;
}

.stats {
  grid-area: stats;
}

.scramble {
  grid-area: scramble;
}

.display {
  grid-area: displayTime;
}

.cube {
  grid-area: cube;
}

.graph {
  grid-area: graph;
}

.extra {
  grid-area: extra;
}

.compete {
  grid-area: compete;
}

</style>
