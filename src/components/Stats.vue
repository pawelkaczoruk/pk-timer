<template>
  <div class="stats">
    <div class="overall">
      <h3>total sloves: <span>--</span></h3>
      <h3>mean: <span>--</span></h3>
    </div>

    <div class="bests">
      <h3>bests</h3>
      <div class="bests-wrap">
        <p>single: <span>--</span></p>
        <p>ao5: <span>--</span></p>
        <p>ao12: <span>--</span></p>
        <p>mo100: <span>--</span></p>
      </div>
    </div>

    <div class="table">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Stats'
}
</script>

<style lang="scss" scoped>

.stats {
  height: 100%;
  width: 100%;
  background: var(--grey);
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 1.1em;
  }
  
  .overall {
    text-align: center;
  }

  .bests {
    min-width: 150px;
    border-left: 2px solid var(--text-color);
    border-bottom: 2px solid var(--text-color);
    display: grid;
    grid-template: 1.6em auto / auto 1.6em;
    grid-template-areas: 
                        "title fold"
                        "bests bests";

    &:before {
      display: block;
      content: '';
      grid-area: fold;
      border-bottom: 2px solid var(--text-color);
      border-left: 2px solid var(--text-color);
      background: linear-gradient(45deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4), 50%, transparent 50%, transparent 100%);
    }

    .bests-wrap {
      grid-area: bests;
      padding: .2em .4em .4em .4em;
      border-right: 2px solid var(--text-color);
      background: rgba(0, 0, 0, 0.4);
    }

    h3 {
      text-align: center;
      grid-area: title;
      padding-top: .4em;
      border-top: 2px solid var(--text-color);
      background: rgba(0, 0, 0, 0.4);
    }

  }
}

</style>