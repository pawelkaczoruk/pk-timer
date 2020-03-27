<template>
  <div class="modal">
    <div class="modal-content">
      <button class="close" @click="close()"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    close() {
      
    }
  }
}
</script>

<style lang="scss" scoped>

.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .4);
}

.modal-content {
  width: 300px;
  height: 300px;
  text-align: right;
  background: white;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, .4);

  button {
    width: 1.5rem;
    height: 1.5rem;
    color: black;
    border: none;
    outline: none;
    background: transparent;
    background-image: url('../assets/icons/cross.png');
    background-position: center;
    background-size: 50%;
    background-repeat: no-repeat;
    cursor: pointer;
  }
}

</style>