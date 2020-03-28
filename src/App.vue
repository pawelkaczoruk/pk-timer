<template>
  <div id="app">
    <Logo />
    <SelectPanel />
    <MenuBar />
    <Stats />
    <Scramble @refresh-scramble="generateScramble(getSelectedCube)" />
    <Display />
    <Cube />
    <Graph />
    <Extra />
    <Compete />
    <MobileMenu />
    <Modal v-if="getModal.length > 0"/>
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
import MobileMenu from './components/MobileMenu'
import Modal from './components/Modal'

import { getAvgMixin } from './mixins/getAvgMixin'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  mixins: [getAvgMixin],
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
    Compete,
    MobileMenu,
    Modal
  },
  data() {
    return {
      timer: {
        keydownFirstDate: undefined,
        keydownCurrentDate: undefined,
        firstTimeKeydown: true,
        isTimerRunning: false,
        timerJustStopped: true,
        timing: undefined,
        times: [],
        wasTimeAdded: false,
        touchTimeout: undefined
      }
    }
  },
  computed: mapGetters([
    'getSelectedCube',
    'getTimeValue',
    'getScramble',
    'getCubeCopy',
    'getModal'
  ]),
  methods: {
    ...mapActions([
      'addTime',
      'setTimerColor',
      'setTimeValue',
      'setScramble',
      'copyCube'
    ]),

    updateCube(cube) {
      this.getSelectedCube = cube;
      this.generateScramble(cube)
    },

    generateScramble(cube) {
      let scramble;

      switch(cube) {
        case 'cube2x2': 
        case 'cube3x3': scramble = this.generateScrambleNxN(cube); break;
      }

      this.setScramble(scramble);
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
        case 'cube2x2': length = Math.floor(9 + Math.random() * 3); break;
        case 'cube3x3': length = Math.floor(19 + Math.random() * 6); break;
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

    // start timer
    count() {
      const ob = this.timer,
            startTime = Date.now();
      let currentTime = Date.now(),
          timerVal = currentTime - startTime;
      
      ob.timing = setInterval(() => {
        currentTime = Date.now();
        timerVal = currentTime - startTime;
        this.setTimeValue(timerVal);
      }, 10);
    }
  },
  created() {
    this.generateScramble(this.getSelectedCube);
    this.copyCube();


    //          TIMER
    document.addEventListener('keydown', e => {
      if(e.code == 'Space') {
        const ob = this.timer;

        // stop timer
        if(ob.isTimerRunning) {
          clearInterval(ob.timing);

          if(!ob.wasTimeAdded) {
            const data = {
              cube: this.getSelectedCube,
              result: this.getTimeValue,
              scramble: this.getScramble,
              ao5: this.getCubeCopy.list.length < 4 ? undefined : Math.floor(this.getAvg([{result: this.getTimeValue}, ...this.getCubeCopy.list], 0, 5)),
              ao12: this.getCubeCopy.list.length < 11 ? undefined : Math.floor(this.getAvg([{result: this.getTimeValue}, ...this.getCubeCopy.list], 0, 12)),
              mo100: this.getCubeCopy.list.length < 99 ? undefined : Math.floor(this.getAvg([{result: this.getTimeValue}, ...this.getCubeCopy.list], 0, 100)),
              dnf: false,
              penalty: false,
              comment: '',
              date: new Date()
            }

            // add time in store
            this.addTime(data);

            ob.wasTimeAdded = true;

            // generate new scramble
            this.generateScramble(this.getSelectedCube);
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
          (ob.keydownCurrentDate - ob.keydownFirstDate < 550) ? this.setTimerColor('#ff3617') : this.setTimerColor('#17ff23');
        }
      }
    });

    document.addEventListener('keyup', e => {
      if(e.code == 'Space') {
        const ob = this.timer;

        if(ob.timerJustStopped) {
          ob.firstTimeKeydown = true;
          this.setTimerColor('white');

          if(ob.keydownCurrentDate - ob.keydownFirstDate >= 550) {
            // start counting if spacebar was pressed for at least 550ms
            this.setTimerColor('white');
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

    document.addEventListener('touchstart', () => {
      const ob = this.timer;

      // stop timer
      if(ob.isTimerRunning) {
        clearInterval(ob.timing);

        if(!ob.wasTimeAdded) {
          const data = {
            cube: this.getSelectedCube,
            result: this.getTimeValue,
            scramble: this.getScramble,
            ao5: this.getCubeCopy.list.length < 4 ? undefined : Math.floor(this.getAvg([{result: this.getTimeValue}, ...this.getCubeCopy.list], 0, 5)),
            ao12: this.getCubeCopy.list.length < 11 ? undefined : Math.floor(this.getAvg([{result: this.getTimeValue}, ...this.getCubeCopy.list], 0, 12)),
            mo100: this.getCubeCopy.list.length < 99 ? undefined : Math.floor(this.getAvg([{result: this.getTimeValue}, ...this.getCubeCopy.list], 0, 100)),
            dnf: false,
            penalty: false,
            comment: '',
            date: new Date()
          }

          // add time in store
          this.addTime(data);

          ob.wasTimeAdded = true;

          // generate new scramble
          this.generateScramble(this.getSelectedCube);
          
        }
      }

      if(ob.timerJustStopped) {
        ob.keydownCurrentDate = Date.now();

        this.touchTimeout = setTimeout(() => {
          this.setTimerColor('#17ff23');
          ob.keydownCurrentDate = Date.now();
        }, 550);

        this.setTimerColor('#ff3617');

        if(ob.firstTimeKeydown) {
          ob.keydownFirstDate = Date.now();
          ob.firstTimeKeydown = false;
        }

      }
    });

    document.addEventListener('touchend', () => {
      const ob = this.timer;
      
      clearTimeout(this.touchTimeout);

      if(ob.timerJustStopped) {
        ob.firstTimeKeydown = true;
        this.setTimerColor('white');

        if(ob.keydownCurrentDate - ob.keydownFirstDate >= 550) {
          this.setTimerColor('white');
          ob.isTimerRunning = true;
          ob.timerJustStopped = false;
          ob.wasTimeAdded = false;
          this.count();
        }
        
      } else {
        ob.timerJustStopped = true;
      }
    });
    


    //          STYLES

    // get viewport height, multiple it to get value for vh unit. Set the value in --vh custom property
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // same script when window is resized
    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

  },
  watch: {
    getSelectedCube: function (name) { this.generateScramble(name) }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');
@import url('./assets/styles/variables.scss');
@import url('./assets/styles/reset.scss');


#app { 
  height: 100vh; // fallback for browsers that do not support custom properties
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  max-width: 2400px;
  margin: 0 auto;
  display: grid;
  grid-template: 52px 100px 1fr 200px 52px / 52px 1fr;
  grid-template-areas: "logo menuBar"
                       "scramble scramble"
                       "displayTime displayTime"
                       "stats stats"
                       "mobileMenu mobileMenu";

  @media screen and (min-width: 370px) {
    grid-template: 62px 100px 1fr 200px 62px / 62px 1fr;
  }

  @media screen and (min-width: 1024px) and (min-height: 500px) and (orientation: landscape),
         screen and (min-width: 1024px) and (orientation: portrait) {
    grid-template: 3rem 2fr 6fr 1.5fr 3.5fr 7rem / 250px 2fr 1fr 290px;
    grid-template-areas: "logo selectPanel selectPanel menuBar"
                        "stats scramble scramble scramble"
                        "stats displayTime cube cube"
                        "stats graph cube cube"
                        "stats graph extra extra"
                        "compete graph extra extra";
  }

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

.mobile-menu {
  grid-area: mobileMenu;
}

</style>
