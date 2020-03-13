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
        <p>ao5: {{ avg5 }}<span>--</span></p>
        <p>ao12: <span>--</span></p>
        <p>mo100: <span>--</span></p>
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
          <tr :key="i" v-for="(time, i) in times">
            <th>{{ times.length - i }}.</th>
            <td class="v-line"><div class="v-line-el"></div></td>
            <td>{{ timeFormatter(time.result) }}</td>
            <td>{{ times[i+4] === undefined ? '--' : 
              getAvg([time.result, times[i+1].result, times[i+2].result, times[i+3].result, times[i+4].result])
              }}
            </td>
            <td>{{ times[i+11] === undefined ? '--' : 
              getAvg([time.result, times[i+1].result, times[i+2].result, times[i+3].result, times[i+4].result, times[i+5].result, times[i+6].result, times[i+7].result, times[i+8].result, times[i+9].result, times[i+10].result, times[i+11].result])
              }}
            </td>
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
export default {
  name: 'Stats',
  props: ['timeFormatter', 'times'],
  data() {
    return {
      alist: [
        { result: 1234 },
        { result: 21234 },
        { result: 13234 },
        { result: 11234 },
        { result: 41234 },
        { result: 21234 },
        ],
      list: [

        ],
      
      avg5: [],
      avg12: [],
    }
  },
  methods: {
    // Count average
    getAvg(times) {
      const max = Math.max(...times),
            min = Math.min(...times),
            posMax = times.indexOf(max),
            temp = times.slice(0, posMax).concat(times.slice(posMax + 1)),
            posMin = temp.indexOf(min),
            avg = temp.slice(0, posMin).concat(temp.slice(posMin + 1)).reduce((a, b) => a + b, 0);
      
      if(times.length === 5) {
        return this.timeFormatter(avg / 3);
      } else if(times.length === 12) {
        return this.timeFormatter(avg / 10);
      }
    }
  },
  created() {
    const tl = this.alist;
    tl.forEach((el, i) => {
      const time = this.timeFormatter(el.result);
      const ao5 = i <= 3 ? '--' : 
        this.getAvg([el.result, tl[i-1].result, tl[i-2].result, tl[i-3].result, tl[i-4].result]);
      const ao12 = i <= 12 ? '--' : 'lol';
      console.log(el, i, time, ao5, ao12);

      this.list.push({
        time: this.timeFormatter(el.result),
        ao5: '--',
        ao12: '--'
      });
    });
    console.log(this.list);
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