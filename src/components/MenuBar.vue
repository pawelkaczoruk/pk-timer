<template>
  <div class="menu">
    <button class="settings" disabled></button>
    <button class="sign-in" disabled>sign in</button>
    <button class="contact" disabled>contact</button>
  </div>
</template>

<script>
export default {
  name: 'MenuBar'
}
</script>

<style lang="scss" scoped>

.menu {
  height: 100%;
  width: 100%;

  button {
    height: 100%;
    font-size: 1.5em;
    border: none;
    vertical-align: top;
    cursor: not-allowed;
    transition: background-color .2s linear;
    user-select: none;
    outline: none;
  }

  --btn-size: 3.25rem; 

  @media screen and (min-width: 370px) {
    --btn-size: 3.875rem;
  }

  @media screen and (min-width: 1024px) and (min-height: 500px) and (orientation: landscape),
        screen and (min-width: 1024px) and (orientation: portrait) {
    --btn-size: 3rem;
  }

  .settings {
    width: var(--btn-size);
    height: var(--btn-size);
    background: var(--navy-blue);
    background-image: url('../assets/icons/settings.png');
    background-position: center;
    background-size: 62.5% 62.5%;
    background-repeat: no-repeat;

    &:hover {
      background-color: var(--navy-blue-hover);
    }
  }

  .sign-in {
    width: calc((100% - var(--btn-size)) / 2);
    background: var(--purple);

    &:hover {
      background-color: var(--purple-hover);
    }
  }

  .contact {
    width: calc((100% - var(--btn-size)) / 2);
    background: var(--strawberry);

    &:hover {
      background-color: var(--strawberry-hover);
    }
  }
}

</style>