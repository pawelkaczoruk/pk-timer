<template>
  <div class="stats">
    <div class="overall">
      <h3>total sloves: {{ getCubeCopy.list.length }}</h3>
      <h3>mean: {{ getCubeCopy.list.length === 0 ? '--' : timeFormatter(getAvg(getCubeCopy.list, 0, getCubeCopy.list.length, 'mean')) }}</h3>
    </div>

    <div class="bests">
      <h3>bests</h3>
      <div class="bests-wrap">
        <p>single: {{ !getCubeCopy.bests.single ? '--' : timeFormatter(getCubeCopy.bests.single) }}</p>
        <p>ao5: {{ !getCubeCopy.bests.ao5 ? '--' : timeFormatter(getCubeCopy.bests.ao5) }}</p>
        <p>ao12: {{ !getCubeCopy.bests.ao12 ? '--' : timeFormatter(getCubeCopy.bests.ao12) }}</p>
        <p>mo100: {{ !getCubeCopy.bests.mo100 ? '--' : timeFormatter(getCubeCopy.bests.mo100) }}</p>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <td class="number"></td>
            <td class="v-line"><div class="v-line-el top"></div></td>
            <th class="time">time</th>
            <th class="ao5">ao5</th>
            <th class="ao12">ao12</th>
          </tr>
        </thead>

        <tr class="line">
          <td><div class="line-el left"></div></td>
          <td><div class="line-el"></div></td>
          <td><div class="line-el"></div></td>
          <td><div class="line-el"></div></td>
          <td><div class="line-el right"></div></td>
        </tr>

        <tbody>
          <tr :key="i" v-for="(time, i) in getCubeCopy.list">
            <th>{{ getCubeCopy.list.length - i }}.</th>
            <td class="v-line"><div class="v-line-el"></div></td>
            <td>{{ timeFormatter(time.result) }}</td>
            <td>{{ time.ao5 === undefined ? '--' : timeFormatter(time.ao5) }}</td>
            <td>{{ time.ao12 === undefined ? '--' : timeFormatter(time.ao12) }}</td>
          </tr>

          <tr class="end-line">
            <th>0</th>
            <td class="v-line"><div class="v-line-el bottom"></div></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>

    <button @click="setModal('add')"></button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { timeFormatterMixin } from '../mixins/timeFormatterMixin'
import { getAvgMixin } from '../mixins/getAvgMixin'

export default {
  name: 'Stats',
  mixins: [timeFormatterMixin, getAvgMixin],
  computed: mapGetters(['getCubeCopy']),
  methods: mapActions(['addAvgToCubeCopy', 'setModal']),
  created() {
    const list = this.getCubeCopy.list;
    
    for(let index=0; index<list.length; index++) {
      const ob = {
        index,
        ao5: index+5 > list.length ? undefined : Math.floor(this.getAvg(list, index, index+5)),
        ao12: index+12 > list.length ? undefined : Math.floor(this.getAvg(list, index, index+12)),
        mo100: index+100 > list.length ? undefined : Math.floor(this.getAvg(list, index, index+100, 'mean'))
      }
      
      this.addAvgToCubeCopy(ob);
    }
  }
}
</script>

<style lang="scss" scoped>

.stats {
  height: 100%;
  width: 100%;
  padding: 1em 0 1em 0;
  background: var(--space-blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  user-select: none;

  @media screen and (min-width: 1024px) and (min-height: 500px) and (orientation: landscape),
         screen and (min-width: 1024px) and (orientation: portrait) {
    background: var(--grey);
    user-select: initial;
  }

  h3 {
    font-size: 1.1em;
  }
  
  .overall {
    text-align: center;
  }

  .bests {
    margin-top: 1em;
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

  button {
    display: none;

    @media screen and (min-width: 1024px) and (min-height: 500px) and (orientation: landscape),
          screen and (min-width: 1024px) and (orientation: portrait) {
      display: inline-block;
      width: 3em;
      height: 3em;
      border: none;
      border-radius: 1.5em 1.5em 0 1.5em;
      background: rgba(0, 0, 0, .5);
      background-image: url('../assets/icons/add.png');
      background-position: center;
      background-size: 50%;
      background-repeat: no-repeat;
      cursor: pointer;
      position: absolute;
      bottom: 0;
      right: 0;
      transition: background-color .2s linear;
      outline: none;

      &:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
  }

  .table-container {
    display: none;
    margin-top: 1em;
    height: calc(100% - 13.5em);

    @media screen and (min-width: 1024px) and (min-height: 500px) and (orientation: landscape),
           screen and (min-width: 1024px) and (orientation: portrait) {
      display: block;
    }

    table {
      border-collapse: collapse;
      display: block;
      max-height: 100%;
      overflow-y: scroll;
      -ms-overflow-style: none; // hide scrollbar on IE and Edge

      &::-webkit-scrollbar { // hide scrollbar on Chrome, Safari and Opera
        display: none;
      }

      .number {
        min-width: 2em;
      }

      .time, .ao5, .ao12 {
        min-width: 4em;
      }

      td {
        font-size: .75em;
        text-align: center;
      }

      tbody {
        th {
          font-size: .875em;
        }
      }
    }

    // horizontal line
    .line {
      height: 4px;

      .line-el {
        background: var(--text-color);
        height: 4px;
        width: 100%;

        &.left {
          border-radius: 2px 0 0 2px;
        }

        &.right {
          border-radius: 0 2px 2px 0;
        }
      }
    }

    // vertical line
    .v-line {
      position: relative;
      width: 4px;
      height: 100%;

      .v-line-el {
        position: absolute;
        top: 0;
        background: var(--text-color);
        width: 4px;
        height: 100%;

        &.top {
          border-radius: 2px 2px 0 0;
        }

        &.bottom {
          border-radius: 0 0 2px 2px;
        }
      }
    }

    .end-line {
      th {
        font-size: .4em;
        color: transparent;
        user-select: none;
      }
    }
  }
}

</style>