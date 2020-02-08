<template>
  <div class="menu">
    <button class="settings"></button>
    <button class="sign-in">sign in</button>
    <button class="contact">contact</button>
  </div>
</template>

<script>
export default {
  name: 'MenuBar'
}
</script>

<style lang="scss" scoped>

.menu {
  height: 3rem;
  width: 100%;

  button {
    height: 100%;
    font-size: 1.5em;
    border: none;
    vertical-align: top;
    cursor: pointer;
  }

  .settings {
    width: 3rem;
    background: var(--navy-blue);
    background-image: url('../assets/icons/settings.png');
    background-position: center;
    background-size: 62.5% 62.5%;
    background-repeat: no-repeat;
  }

  .sign-in {
    padding: 0 .9em;
    background: var(--purple);
  }

  .contact {
    padding: 0 .9em;
    background: var(--strawberry);
  }
}

</style>