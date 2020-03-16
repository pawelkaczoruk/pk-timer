const state = {
  selectedCube: 'c3',
  timerColor: 'white',
  time: 0
};

const getters = {
  getSelectedCube: state => state.selectedCube,
  getTimerColor: state => state.timerColor,
  getTimeValue: state => state.time
};

const actions = {
  setSelectedCube({commit}, cube) {
    commit('SET_SELECTED_CUBE', cube);
  },

  setTimerColor({commit}, color) {
    commit('SET_TIMER_COLOR', color);
  },

  setTimeValue({commit}, time) {
    commit('SET_TIME_VALUE', time);
  }
};

const mutations = {
  SET_SELECTED_CUBE: (state, cube) => state.selectedCube = cube,
  SET_TIMER_COLOR: (state, color) => state.timerColor = color,
  SET_TIME_VALUE: (state, time) => state.time = time
};

export default {
  state,
  getters,
  actions,
  mutations
}