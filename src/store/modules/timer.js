const state = {
  selectedCube: 'c3',
  ready: 'white',
  time: 0
};

const getters = {
  getSelectedCube: state => state.selectedCube
};

const actions = {
  setSelectedCube({commit}, cube) {
    commit('SET_SELECTED_CUBE', cube);
  }
};

const mutations = {
  SET_SELECTED_CUBE: (state, cube) => state.selectedCube = cube
};

export default {
  state,
  getters,
  actions,
  mutations
}