<template>
  <div class="compete">
    <p>compete with friend</p>
    <form>
      <label for="id">ID:</label>
      <input id="id" type="text">
      <button>go</button>
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
  width: 30vw;
  height: 6em;
  background: var(--aegan-blue);
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  p {
    font-size: 1.25em;
  }

  label {
    font-size: 1.1rem;
  }

  input {
    height: 1.75rem;
    width: 6rem;
    background: rgba(0, 0, 0, 0.3);
    border: none;
    border-radius: 4px;
    padding: 0 1rem;
    font-size: 1.1rem;
    margin: 0 .75rem;
  }

  button {
    height: 1.75rem;
    width: 2.5rem;
    background: rgba(255, 255, 255, 0.2);
    font-size: 1.1rem;
    border: none;
    border-radius: .4rem;
  }
}

</style>