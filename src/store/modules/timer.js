const state = {
  selectedCube: 'cube3x3',
  timerColor: 'white',
  time: 0,
  scramble: [],
  modal: '',
  timeIndex: undefined
};

const getters = {
  getSelectedCube: state => state.selectedCube,
  getTimerColor: state => state.timerColor,
  getTimeValue: state => state.time,
  getScramble: state => state.scramble,
  getModal: state => state.modal,
  getTimeIndex: state => state.timeIndex,
};

const actions = {
  setSelectedCube({dispatch, commit}, cube) {
    commit('SET_SELECTED_CUBE', cube);
    dispatch('copyCube');
  },

  setTimerColor({commit}, color) {
    commit('SET_TIMER_COLOR', color);
  },

  setTimeValue({commit}, time) {
    commit('SET_TIME_VALUE', time);
  },

  setScramble({commit}, scramble) {
    commit('SET_SCRAMBLE', scramble);
  },

  setModal({commit}, modal) {
    commit('SET_MODAL', modal);
  },

  setTimeIndex({commit}, index) {
    commit('SET_TIME_INDEX', index);
  }
};

const mutations = {
  SET_SELECTED_CUBE: (state, cube) => state.selectedCube = cube,
  SET_TIMER_COLOR: (state, color) => state.timerColor = color,
  SET_TIME_VALUE: (state, time) => state.time = time,
  SET_SCRAMBLE: (state, scramble) => state.scramble = scramble,
  SET_MODAL: (state, modal) => state.modal = modal,
  SET_TIME_INDEX: (state, index) => state.timeIndex = index
};

export default {
  state,
  getters,
  actions,
  mutations
}