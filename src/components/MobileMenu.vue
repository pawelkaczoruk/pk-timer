<template>
  <div class="mobile-menu">
    <div class="left-side">
      <button class="times-list"></button>
      <button class="compete-online"></button>
    </div>
    
    <button @click="setModal('add')" class="add-time"></button>

    <div class="right-side">
      <button class="change-element"></button>
      <button class="select-cube"></button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MobileMenu',
  methods: mapActions(['setModal'])
}
</script>

<style lang="scss" scoped>

.mobile-menu {
  width: 100%;
  height: 100%; 
  display: flex;
  justify-content: space-between;
  background: var(--space-blue);

  @media screen and (min-width: 1024px) and (min-height: 500px) and (orientation: landscape),
         screen and (min-width: 1024px) and (orientation: portrait) {
    display: none;
  }

  button {
    height: 3.25rem;
    width: 3.25rem;
    border: none;
    outline: none;
    background: var(--navy-blue);
    cursor: pointer;

    @media screen and (min-width: 370px) {
      height: 3.875rem;
      width: 3.875rem;
    }
  }

  .times-list {
    margin-right: 1px;
    background-image: url('../assets/icons/times-list.png');
    background-position: center;
    background-repeat: no-repeat;
  }

  .compete-online {
    border-top-right-radius: 50%;
    background-image: url('../assets/icons/compete.png');
    background-position: center;
    background-repeat: no-repeat;
  }

  .add-time {
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    background: var(--yale-blue);
    background-image: url('../assets/icons/add-time.png');
    background-position: center;
    background-repeat: no-repeat;
  }

  .change-element {
    border-top-left-radius: 50%;
    background-image: url('../assets/icons/display.png');
    background-position: center;
    background-repeat: no-repeat;
  }

  .select-cube {
    margin-left: 1px;
    background-image: url('../assets/icons/select-cube.png');
    background-position: center;
    background-repeat: no-repeat;
  }
}

</style>