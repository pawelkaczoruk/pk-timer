<template>
  <div id="app">
    <Logo class="logo" />
    <SelectPanel class="select-panel" />
    <MenuBar class="menu-bar" />
    <Stats class="stats" />
    <Scramble class="scramble" />
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
