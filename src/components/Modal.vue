<template>
  <div class="modal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal()"></button>
      
      <h2 v-if="getModal === 'add'">Add time</h2>
      <h2 v-if="getModal === 'edit'">Edit time</h2>
      <h2 v-if="getModal === 'ao5' || getModal === 'ao12'">Times</h2>
      
      <div v-if="getModal === 'add'" class="modal-wrapper">
        <form @submit="submitAdd()" >
          <label>
            time:
            <input 
            v-model="result" 
            type="text" 
            placeholder="min:sec.ms"
            ref="result" 
            required>
          </label>

          <p v-if="showAlert">use proper format (e.g. 12:01.33 or 52.31)</p>

          <label>
            comment:
            <textarea v-model="comment" rows="2"></textarea>
          </label>
          
          <label>
            penalty (+2):
            <input v-model="penalty" type="checkbox"> 
          </label>
                   
          <label>
            dnf:
            <input v-model="dnf" type="checkbox">
          </label>

          <label>
            scramble:
            <textarea v-model="scramble" disabled rows="2"></textarea>
          </label>

          <label>
            date:
            <textarea v-model="date" disabled rows="1"></textarea>
          </label>

          <button class="add-btn" type="submit">add</button>
        </form>
      </div>

      <div v-if="getModal === 'edit'" class="modal-wrapper">
        <form @submit="submitEdit()" >
          <label>
            time:
            <input 
            type="text"
            disabled
            :value="result">
          </label>

          <label>
            comment:
            <textarea v-model="comment" rows="2"></textarea>
          </label>
          
          <label>
            penalty (+2):
            <input v-model="penalty" type="checkbox"> 
          </label>
                   
          <label>
            dnf:
            <input v-model="dnf" type="checkbox">
          </label>

          <label>
            scramble:
            <textarea v-model="scramble" disabled rows="2"></textarea>
          </label>

          <label>
            date:
            <textarea v-model="date" disabled rows="1"></textarea>
          </label>

          <button class="add-btn" type="submit">save</button>
        </form>
      </div>
      
      <div v-if="getModal === 'ao5' || getModal === 'ao12'" class="modal-wrapper">
        
        <div class="stats-list">
          <h3>{{ getModal }}: {{ timeFormatter(times.avg) }}</h3>

          <p :key="i" v-for="(item, i) in times.list">
            <span class="list-index">{{ i+1 }}.</span>
            {{ i === times.worstIndex || i === times.bestIndex ? '(' : '' }}
            {{ !item.dnf ? timeFormatter(item.result) : '' }}
            {{ item.dnf ? 'dnf' : item.penalty ? '+' : '' }}
            {{ i === times.worstIndex || i === times.bestIndex ? ')' : '' }}
            <span class="list-scramble">{{ item.scramble.join(' ') }}</span>
          </p>

        </div>

      </div>


    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { getAvgMixin } from '../mixins/getAvgMixin'
import { timeFormatterMixin } from '../mixins/timeFormatterMixin'

export default {
  name: 'Modal',
  mixins: [getAvgMixin, timeFormatterMixin],
  computed: mapGetters([
    'getModal',
    'getSelectedCube', 
    'getScramble', 
    'getCubeCopy',
    'getTimeIndex'
  ]),
  data() {
    return {
      result: '',
      dnf: false,
      penalty: false,
      scramble: '',
      comment: '',
      date: new Date(),
      showAlert: false,
      times: {
        list: [],
        avg: undefined,
        bestIndex: undefined,
        worstIndex: undefined
      }
    }
  },
  methods: {
    ...mapActions([
      'setModal',
      'setTimeIndex',
      'addTime',
      'updateTime'
    ]),

    // close modal
    closeModal() {
      this.setModal('');
    },

    // submit form
    submitAdd() {
      event.preventDefault();

      if(!this.validTime(this.result)) {
        this.result = '';
        this.showAlert = true;
      } else {
        const timeInMillis = this.timeFormatter(this.result);
        const data = {
          cube: this.getSelectedCube,
          result: timeInMillis,
          scramble: this.getScramble,
          ao5: this.getCubeCopy.list.length < 4 ? undefined : Math.floor(this.getAvg([{result: timeInMillis}, ...this.getCubeCopy.list], 0, 5)),
          ao12: this.getCubeCopy.list.length < 11 ? undefined : Math.floor(this.getAvg([{result: timeInMillis}, ...this.getCubeCopy.list], 0, 12)),
          mo100: this.getCubeCopy.list.length < 99 ? undefined : Math.floor(this.getAvg([{result: timeInMillis}, ...this.getCubeCopy.list], 0, 100)),
          dnf: this.dnf,
          penalty: this.penalty,
          comment: this.comment,
          date: this.date
        }
        
        // add time in store
        this.addTime(data);
        this.closeModal();

        // generate new scramble
        this.$emit('refresh-scramble');
      }
    },

    submitEdit() {
      event.preventDefault();
      const ob = this.getCubeCopy.list[this.getTimeIndex];
      let time;
      
      if(!ob.penalty && this.penalty) {
        time = ob.result + 2000;
      } else if(ob.penalty && !this.penalty) {
        time = ob.result - 2000;
      } else {
        time = ob.result;
      }

      const data = {
        index: this.getTimeIndex,
        cube: this.getSelectedCube,
        result: time,
        dnf: this.dnf,
        penalty: this.penalty,
        comment: this.comment
      }

      this.updateTime(data);
      this.setTimeIndex(undefined);
      this.closeModal();

    },

    // validate time input format
    validTime(time) {
      const regex = /^([0-9]{1,}:)?([0-5]?[0-9]\.)([0-9]{1,3})$/;
      return regex.test(time);
    }
  },
  created() {
    const type = this.getModal,
          ob = this.getCubeCopy.list[this.getTimeIndex];

    if(type === 'add') {
      this.scramble = this.getScramble.join(' ');
    } else if(type === 'edit') {
      this.scramble = ob.scramble.join(' ');
      this.result = this.timeFormatter(ob.result);
      this.dnf = ob.dnf;
      this.penalty = ob.penalty;
      this.comment = ob.comment;
      this.date = ob.date;

    } else if(type === 'ao5' || type === 'ao12') {
      const index = Number(type.indexOf('o')) + 1,
            length = Number(type.slice(index)),
            ti = this.getTimeIndex,
            timesList = [];

      for(let i = ti; i<ti+length; i++) {
        this.times.list.push(this.getCubeCopy.list[i]);
        timesList.push(this.getCubeCopy.list[i].result);
      }
      
      const posMax = timesList.indexOf(Math.max(...timesList)),
            posMin = timesList.indexOf(Math.min(...timesList));

      this.times.avg = ob[type];
      this.times.bestIndex = posMin;
      this.times.worstIndex = posMax;
    }
  },
  mounted() {
    // autofocus time result input
    if(this.getModal === 'add') this.$refs.result.focus();
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

  .modal-wrapper {
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

  form p {
    color: var(--strawberry);
    font-size: .85rem;
    margin-bottom: .5rem;
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

.stats-list {
  background: rgba(0, 0, 0, 0.2);
  padding: .3rem .5rem;
  max-height: 80vh;
  overflow-x: hidden;
  
  h3 {
    text-align: center;
    margin-bottom: .3rem;
  }

  p {
    margin-bottom: .3rem;
  }

  p, .list-index {
    font-size: .8rem;
    color: var(--purple);
  }

  .list-index {
    margin-right: .2rem;
    color: black;
  }

  .list-scramble {
    display: block;
    font-size: .7rem;
  }

}

</style>