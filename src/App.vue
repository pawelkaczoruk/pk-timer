<template>
  <div id="app">
    <MenuBar />
  </div>
</template>

<script>
import MenuBar from './components/MenuBar'

export default {
  name: 'App',
  components: {
    MenuBar
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');
@import url('./assets/styles/variables.scss');
@import url('./assets/styles/reset.scss');


MenuBar {
  width: 50vw;
  height: 72px;
}

</style>
