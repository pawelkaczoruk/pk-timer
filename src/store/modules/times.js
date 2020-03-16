const state = {
  cubeCopy: {},
  cube2x2: {
    bests: {
      single: 1111,
      ao5: undefined,
      ao12: undefined,
      mo100: undefined
    },
    list: []
  },
  cube3x3: {
    bests: {
      single: undefined,
      ao5: undefined,
      ao12: undefined,
      mo100: undefined
    },
    list: []
  }
};

const getters = {
  getCubeCopy: state => state.cubeCopy,
  getCube2x2: state => state.cube2x2,
  getCube3x3: state => state.cube3x3
};

const actions = {
  addTime({dispatch, commit}, data) {
    const ob = {
      result: data.result,
      scramble: data.scramble,
      dnf: data.dnf,
      penalty: data.penalty,
      comment: data.comment,
      date: data.date
    }
    switch(data.cube) {
      case 'cube2x2': commit('ADD_CUBE_2X2_TIME', ob); break;
      case 'cube3x3': commit('ADD_CUBE_3X3_TIME', ob); break;
    }
    dispatch('copyCube');
  },

  copyCube({commit, getters}) {
    switch(getters.getSelectedCube) {
      case 'cube2x2': commit('COPY_CUBE', getters.getCube2x2); break;
      case 'cube3x3': commit('COPY_CUBE', getters.getCube3x3); break;
    }
  }
};

const mutations = {
  ADD_CUBE_2X2_TIME: (state, data) => state.cube2x2.list.unshift(data),
  ADD_CUBE_3X3_TIME: (state, data) => state.cube3x3.list.unshift(data),
  COPY_CUBE: (state, stats) => state.cubeCopy = JSON.parse(JSON.stringify(stats))
};

export default {
  state,
  getters,
  actions,
  mutations
}