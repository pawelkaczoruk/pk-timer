<template>
  <div class="modal">
    <div class="modal-content">
      <button class="close-btn" @click="close()"></button>
      
      <h2>Add time</h2>
      
      <div class="add-time">
        <form>
          <label>
            time:
            <input type="text" placeholder="min:sec.ms">
          </label>

          <label>
            comment:
            <textarea></textarea>
          </label>

          <label>
            scramble:
            <textarea></textarea>
          </label>
          
          <label>
            penalty (+2):
            <input type="checkbox"> 
          </label>
                   
          <label>
            dnf:
            <input type="checkbox">
          </label>
          
          <label>
            date:
            <input type="text" disabled>
          </label>

          <button class="add-btn" type="submit">add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Modal',
  computed: mapGetters(['getModal']),
  methods: {
    ...mapActions(['setModal']),

    close() {
      this.setModal('');
    }
  },
  watch: {
    getModal: (val) => {
      const modal = document.getElementsByClassName('modal')[0];

      if(val === 'add') modal.style.display = 'flex'; 
      else if(val === '') modal.style.display = 'none'; 
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
  min-height: 300px;
  background: white;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, .4);
  text-align: right;
  overflow-x: hidden;

  * {
    color: black;
    font-size: 1rem;
    color: var(--modal-text-color);
  }

  h2 {
    text-align: center;
    font-size: 1.2rem;
  }

  .add-time {
    width: 100%;
    padding: 1rem;
    text-align: left;
  }

  form > label {
    display: flex;
    align-items: center;
    margin-bottom: .5rem;
    
    input[type=text], textarea {
      flex: 1;
      padding: 0 .2rem;
    }

    input, textarea {
      margin-left: .5rem;
    }

    input {
      font-size: 1rem;
    }
  }
}

.close-btn {
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  outline: none;
  background: transparent;
  background-image: url('../assets/icons/cross.png');
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
  cursor: pointer;
}

.add-btn {
  display: block;
  margin: 0 auto;
  border: none;
  background: var(--purple);
  color: white;
  padding: .3rem 1rem;
  cursor: pointer;
  transition: background .2s linear;

  &:hover {
    background: var(--purple-hover);
  }
}

</style>