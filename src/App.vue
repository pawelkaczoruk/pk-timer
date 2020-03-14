<template>
  <div id="app">
    <Logo class="logo" />
    <SelectPanel class="select-panel" :selectedCube="selectedCube" @update-cube="updateCube"/>
    <MenuBar class="menu-bar" />
    <Stats class="stats" :times="timer.times" />
    <Scramble class="scramble" :scramble="scramble" @refresh-scramble="generateScramble(selectedCube)" />
    <Display class="display" :time="timer.time" :ready="timer.ready" />
    <Cube class="cube" :scramble="scramble" :selectedCube="selectedCube"/>
    <Graph class="graph" />
    <Extra class="extra" />
    <Compete class="compete" />
  </div>
</template>

<script>
import Logo from './components/Logo'
import SelectPanel from './components/SelectPanel'
import MenuBar from './components/MenuBar'
import Stats from './components/Stats'
import Scramble from './components/Scramble'
import Display from './components/Display'
import Cube from './components/Cube'
import Graph from './components/Graph'
import Extra from './components/Extra'
import Compete from './components/Compete'


export default {
  name: 'App',
  components: {
    Logo,
    SelectPanel,
    MenuBar,
    Stats,
    Scramble,
    Display,
    Cube,
    Graph,
    Extra,
    Compete
  },
  data() {
    return {
      selectedCube: '3x3',
      scramble: [],
      timer: {
        keydownFirstDate: undefined,
        keydownCurrentDate: undefined,
        firstTimeKeydown: true,
        isTimerRunning: false,
        timerJustStopped: true,
        timing: undefined,
        time: 0,
        times: [],
        wasTimeAdded: false,
        ready: 'white'
      }
    }
  },
  methods: {
    updateCube(cube) {
      this.selectedCube = cube;
      this.generateScramble(cube)
    },

    generateScramble(cube) {
      let scramble;

      switch(cube) {
        case '2x2': 
        case '3x3': scramble = this.generateScrambleNxN(cube); break;
      }

      this.scramble = scramble;
    },

    // function to generate NxNxN scrambles - atm only for 2x2 and 3x3 cubes
    generateScrambleNxN(cube) {
      let scramble = [],
          randSuffix,
          suffix,
          letter,
          randLetter,
          prev1Letter,
          prev2Letter,
          randGroup,
          prevGroup,
          length;

      switch(cube) {
        case '2x2': length = Math.floor(9 + Math.random() * 3); break;
        case '3x3': length = Math.floor(19 + Math.random() * 6); break;
      }

      for(let i=0; i<length; i++) {
        randSuffix = Math.floor(Math.random() * 3);

        // generate letter
        do {
          randLetter = Math.floor(Math.random() * 2);
          randGroup = Math.floor(Math.random() * 3);

          switch(randGroup) {
            case 0: letter = randLetter === 0 ? 'U' : 'D'; break;
            case 1: letter = randLetter === 0 ? 'F' : 'B'; break;
            case 2: letter = randLetter === 0 ? 'R' : 'L'; break;
          }

        } while(letter === prev1Letter || (letter === prev2Letter && randGroup === prevGroup));

        // determine suffix
        suffix = randSuffix === 0 ? '' : randSuffix === 1 ? '2' : '\'';

        // save previous and second previous letter
        if(i>1) prev2Letter = prev1Letter;
        prev1Letter = letter;
        prevGroup = randGroup;

        // apply new letter with suffix
        scramble.push(`${letter}${suffix}`)
      }
      
      return scramble;
    },

    timeFormatter(millis) {
      let min, s, ms,
          minFormat, sFormat, msFormat;

      min = Math.floor(millis/60/1000);
      s = Math.floor((millis - min*60*1000)/1000);
      ms = Math.floor((millis % 1000)/10);
      
      minFormat = min < 1 ? '' : `${min}:`;
      sFormat = (min > 0 && s < 10) ? `0${s}.` : `${s}.`;
      msFormat = ms < 10 ? `0${ms}` : `${ms}`;
      
      return minFormat + sFormat + msFormat;
    },

    //          TIMER

    // start timer
    count() {
      const ob = this.timer,
            startTime = Date.now();
      let currentTime = Date.now(),
          timerVal = currentTime - startTime;
      
      ob.timing = setInterval(() => {
        currentTime = Date.now();
        timerVal = currentTime - startTime;
        ob.time = timerVal;
      }, 10);
    }

  },
  created() {
    this.generateScramble(this.selectedCube);



    //          TIMER

    document.addEventListener('keydown', e => {
      

      if(e.code == 'Space') {
        const ob = this.timer;

        // stop timer
        if(ob.isTimerRunning) {
          clearInterval(ob.timing);

          // push data to array
          if(!ob.wasTimeAdded) {
            ob.times.unshift({
              result: ob.time,
              scramble: this.scramble,
              dnf: false,
              penalty: false,
              comment: '',
              date: new Date()
            });
            ob.wasTimeAdded = true;

            // generate new scramble
            this.generateScramble(this.selectedCube);
          }
        }

        // get first date of spacebar down and current date (to check for how long it was pressed)
        if(ob.timerJustStopped) {
          ob.keydownCurrentDate = Date.now();

          if(ob.firstTimeKeydown) {
            ob.keydownFirstDate = Date.now();
            ob.firstTimeKeydown = false;
          }

          // update colors
          ob.ready = (ob.keydownCurrentDate - ob.keydownFirstDate < 550) ? 
            '#ff3617' : '#17ff23';
        }
      }
    });

    document.addEventListener('keyup', e => {
      
      if(e.code == 'Space') {
        const ob = this.timer;

        if(ob.timerJustStopped) {
          ob.firstTimeKeydown = true;

          if(ob.keydownCurrentDate - ob.keydownFirstDate < 550) {
            ob.ready = 'white';
          } else {
            // start counting if spacebar was pressed for at least 550ms
            ob.ready = 'white';
            ob.isTimerRunning = true;
            ob.timerJustStopped = false;
            ob.wasTimeAdded = false;
            this.count();
          }
          
        } else {
          ob.timerJustStopped = true;
        }

      }
    });

  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');
@import url('./assets/styles/variables.scss');
@import url('./assets/styles/reset.scss');




#app { 
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template: 3em 2fr 6fr 1.5fr 3.5fr 7em / 250px 2fr 1fr 290px;
  grid-template-areas: "logo selectPanel selectPanel menuBar"
                       "stats scramble scramble scramble"
                       "stats displayTime cube cube"
                       "stats graph cube cube"
                       "stats graph extra extra"
                       "compete graph extra extra";
}

.logo {
  grid-area: logo;
}

.select-panel {
  grid-area: selectPanel;
}

.menu-bar {
  grid-area: menuBar;
}

.stats {
  grid-area: stats;
}

.scramble {
  grid-area: scramble;
}

.display {
  grid-area: displayTime;
}

.cube {
  grid-area: cube;
}

.graph {
  grid-area: graph;
}

.extra {
  grid-area: extra;
}

.compete {
  grid-area: compete;
}

</style>
