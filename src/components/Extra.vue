<template>
  <div class="extra">

  </div>
</template>

<script>
export default {
  name: 'Extra'
}
</script>

<style lang="scss" scoped>

.extra {
  width: 100%;
  height: 100%;
  display: none;

  @media screen and (min-width: 768px) and (min-height: 500px) and (orientation: landscape),
         screen and (min-width: 1024px) and (orientation: portrait) {
    display:flex;
  }
}

</style>