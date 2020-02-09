<template>
  <div id="app">
    <SelectPanel />
    <MenuBar />
    <Scramble />
    <Display />
    <Cube />
    <Graph />
    <Extra />
    <Stats />
    <Compete />
  </div>
</template>

<script>
import MenuBar from './components/MenuBar'
import Scramble from './components/Scramble'
import Cube from './components/Cube'
import Display from './components/Display'
import Graph from './components/Graph'
import Extra from './components/Extra'
import SelectPanel from './components/SelectPanel'
import Compete from './components/Compete'
import Stats from './components/Stats'

export default {
  name: 'App',
  components: {
    MenuBar,
    Scramble,
    Cube,
    Display,
    Graph,
    Extra,
    SelectPanel,
    Compete,
    Stats
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');
@import url('./assets/styles/variables.scss');
@import url('./assets/styles/reset.scss');



</style>
