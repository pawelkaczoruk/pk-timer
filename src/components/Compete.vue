<template>
  <div class="compete">
    <p>compete with friend</p>
    <form>
      <label for="id">ID:</label>
      <input id="id" type="text" disabled>
      <button disabled>go</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Compete'
}
</script>

<style lang="scss" scoped>

.compete {
  width: 100%;
  height: 100%;
  background: var(--aegan-blue);
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  display:none;
  user-select: none;

  @media screen and (min-width: 1024px) and (min-height: 500px) and (orientation: landscape),
         screen and (min-width: 1024px) and (orientation: portrait) {
    display:flex;
  }

  p {
    font-size: 1.25em;
  }

  label {
    font-size: 1.1rem;
  }

  input {
    height: 1.75rem;
    width: 6rem;
    background: rgba(0, 0, 0, .3);
    border: none;
    border-radius: 4px;
    padding: 0 1rem;
    font-size: 1.1rem;
    margin: 0 .75rem;
    transition: background .2s linear;

    &:hover {
      cursor: not-allowed;
      background: rgba(0, 0, 0, .5);
    }
  }

  button {
    height: 1.75rem;
    width: 2.5rem;
    background: rgba(255, 255, 255, .2);
    font-size: 1.1rem;
    border: none;
    border-radius: .4rem;
    cursor: pointer;
    transition: background .2s linear;
    &:hover {
      cursor: not-allowed;
      background:rgba(255, 255, 255, .1);
    }
  }
}

</style>