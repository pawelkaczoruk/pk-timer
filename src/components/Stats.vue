<template>
  <div class="stats">
    <div class="overall">
      <h3>total sloves: {{ stats.list.length }}</h3>
      <h3>mean: {{ stats.list.length === 0 ? '--' : timeFormatter(getAvg(stats.list, 0, stats.list.length, 'mean')) }}</h3>
    </div>

    <div class="bests">
      <h3>bests</h3>
      <div class="bests-wrap">
        <p>single: {{ stats.bests.single === undefined ? '--' : timeFormatter(stats.bests.single) }}</p>
        <p>ao5: {{ stats.bests.ao5 === undefined ? '--' : timeFormatter(stats.bests.ao5) }}</p>
        <p>ao12: {{ stats.bests.ao12 === undefined ? '--' : timeFormatter(stats.bests.ao12) }}</p>
        <p>mo100: {{ stats.bests.mo100 === undefined ? '--' : timeFormatter(stats.bests.mo100) }}</p>
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
          <tr :key="i" v-for="(time, i) in stats.list">
            <th>{{ stats.list.length - i }}.</th>
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

    <button></button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { timeFormatterMixin } from '../mixins/timeFormatterMixin'
import { getAvgMixin } from '../mixins/getAvgMixin'

export default {
  name: 'Stats',
  mixins: [timeFormatterMixin, getAvgMixin],
  data() {
    return {
      stats: {}
    }
  },
  computed: mapGetters([
      'c3data',
      'getCube'
  ]),
  created() {
    switch(this.getCube) {
      case 'c2': break;
      case 'c3': this.stats = JSON.parse(JSON.stringify(this.c3data)); break;
    }
  }
}
</script>

<style lang="scss" scoped>

.stats {
  height: 100%;
  width: 100%;
  padding: 1em 0 1em 0;
  background: var(--grey);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

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
    width: 3em;
    height: 3em;
    border: none;
    border-radius: 1.5em 1.5em 0 1.5em;
    background: rgba(0, 0, 0, 0.5);
    background-image: url('../assets/icons/add.png');
    background-position: center;
    background-size: 50%;
    background-repeat: no-repeat;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .table-container {
    margin-top: 1em;
    height: calc(100% - 13.5em);

    table {
      border-collapse: collapse;
      display: block;
      max-height: 100%;
      overflow-y: scroll;

      // hide scrollbar on IE and Edge
      -ms-overflow-style: none;

      // hide scrollbar on Chrome, Safari and Opera
      &::-webkit-scrollbar {
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