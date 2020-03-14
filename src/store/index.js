import Vuex from 'vuex'
import Vue from 'vue'
import times from './modules/times'
import timer from './modules/timer'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    times,
    timer
  }
});

export default store;