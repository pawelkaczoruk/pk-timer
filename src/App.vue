<template>
  <div id="app">
    <MenuBar />
    <Scramble />
  </div>
</template>

<script>
import MenuBar from './components/MenuBar'
import Scramble from './components/Scramble'

export default {
  name: 'App',
  components: {
    MenuBar,
    Scramble
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');
@import url('./assets/styles/variables.scss');
@import url('./assets/styles/reset.scss');



</style>
