<template>
  <div class="scramble" >
    <p>{{ getScramble.join(' ') }}</p>
    <button @click="$emit('refresh-scramble')"></button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Scramble',
  computed: mapGetters(['getScramble'])
}
</script>

<style lang="scss" scoped>

.scramble {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--space-blue);
  position: relative;
  
  p {
    text-align: center;
    font-size: 1.5em;
    letter-spacing: .1em;
    user-select: none;

    @media screen and (min-width: 1024px) and (min-height: 500px) and (orientation: landscape),
      screen and (min-width: 1024px) and (orientation: portrait) {
      user-select: initial;
    }
  }
  
  button {
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    border: none;
    border-radius: 1.5rem 0 1.5rem 1.5rem;
    background: rgba(0, 0, 0, .5);
    background-image: url('../assets/icons/reload.png');
    background-position: center;
    background-size: 50%;
    background-repeat: no-repeat;
    transition: background-color .2s linear;
    outline: none;

    &:hover {
      background-color:rgba(255, 255, 255, .1);
    }
  }
}

</style>