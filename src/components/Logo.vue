<template>
  <div class="logo">
    <picture>
      <source media="(min-width: 370px) and (max-width: 1023px)" srcset="../assets/icons/logo48x48.png">
      <img src="../assets/icons/logo40x40.png" alt="logo">
    </picture>
    <p>pkTimer</p>
  </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss" scoped>

.logo {
  display: flex;
  width: 100%;
  height: 100%;
  background: var(--denim-blue);
  justify-content: center;
  align-items: center;
  
  p {
    display: none;

    @media screen and (min-width: 1024px) and (min-height: 500px) and (orientation: landscape),
          screen and (min-width: 1024px) and (orientation: portrait) {
      display: block;
      font-size: 1.5rem;
      margin-left: .3rem;
    }
  }
}

</style>