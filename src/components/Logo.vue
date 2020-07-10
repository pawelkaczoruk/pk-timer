<template>
  <div class="logo">
    <picture>
      <img src="../assets/icons/logo40x40.png" alt="logo">
    </picture>
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
}

</style>