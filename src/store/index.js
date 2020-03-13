import Vuex from 'vuex'
import Vue from 'vue'
import times from './modules/times'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    times
  }
});

export default store;