const state = {
  cubeCopy: {},
  cube2x2: {
    bests: {
      single: 1000,
      ao5: 1000,
      ao12: 1900,
      mo100: undefined
    },
    list: [
      {result: 1392320},
      {result: 1000},
      {result: 1000},
      {result: 1000},
      {result: 1000},
      {result: 1000},
      {result: 1000},
      {result: 1000},
      {result: 1000},
      {result: 9000},
      {result: 9000},
      {result: 9000},
      {result: 9000},
      {result: 9000},
      {result: 9000},
      {result: 9000},
      {result: 9000},
      {result: 9000},
      {result: 9000},
      {result: 8000},
      {result: 8000},
      {result: 8000},
      {result: 8000},
      {result: 8000},
      {result: 8000},
      {result: 8000},
      {result: 8000},
      {result: 8000},
      {result: 8000},
      {result: 7000},
      {result: 7000},
      {result: 7000},
      {result: 7000},
      {result: 7000},
      {result: 7000},
      {result: 7000},
      {result: 7000},
      {result: 7000},
      {result: 7000},
      {result: 6000},
      {result: 6000},
      {result: 6000},
      {result: 6000},
      {result: 6000},
      {result: 6000},
      {result: 6000},
      {result: 6000},
      {result: 6000},
      {result: 6000},
      {result: 5000},
      {result: 5000},
      {result: 5000},
      {result: 5000},
      {result: 5000},
      {result: 5000},
      {result: 5000},
      {result: 5000},
      {result: 5000},
      {result: 5000},
      {result: 4000},
      {result: 4000},
      {result: 4000},
      {result: 4000},
      {result: 4000},
      {result: 4000},
      {result: 4000},
      {result: 4000},
      {result: 4000},
      {result: 4000},
      {result: 3000},
      {result: 3000},
      {result: 3000},
      {result: 3000},
      {result: 3000},
      {result: 3000},
      {result: 3000},
      {result: 3000},
      {result: 3000},
      {result: 3000},
      {result: 2000},
      {result: 2000},
      {result: 2000},
      {result: 2000},
      {result: 2000},
      {result: 2000},
      {result: 2000},
      {result: 2000},
      {result: 2000},
      {result: 2000},
      {result: 1000},
      {result: 1000},
      {result: 1000},
      {result: 1000},
      {result: 1000},
      {result: 1000},
      {result: 1000},
      {result: 1000},
      {result: 1000},
      {result: 1000},
    ]
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
  addTime({dispatch, commit, getters}, data) {
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

    commit('ADD_TIME_TO_CUBE_COPY', {
      ...ob,
      ao5: data.ao5,
      ao12: data.ao12,
      mo100: data.mo100
    });

    const bests = getters.getCubeCopy.bests;

    if(bests.single > data.result || !bests.single) {
      commit('SET_CUBE_COPY_BEST_SINGLE', data.result);
      dispatch('setBests', getters.getCubeCopy.bests);
    }
    if((bests.ao5 > data.ao5 || !bests.ao5) && data.ao5) {
      commit('SET_CUBE_COPY_BEST_AO5', data.ao5);
      dispatch('setBests', getters.getCubeCopy.bests);
    }
    if((bests.ao12 > data.ao12 || !bests.ao12) && data.ao12) {
      commit('SET_CUBE_COPY_BEST_AO12', data.ao12);
      dispatch('setBests', getters.getCubeCopy.bests);
    }
    if((bests.mo100 > data.mo100 || !bests.mo100) && data.mo100) {
      commit('SET_CUBE_COPY_BEST_MO100', data.mo100);
      dispatch('setBests', getters.getCubeCopy.bests);
    }
  },

  updateTime({dispatch,commit}, data) {
    commit('UPDATE_TIME', data);
    dispatch('copyCube');
  },

  copyCube({commit, getters}) {
    switch(getters.getSelectedCube) {
      case 'cube2x2': commit('COPY_CUBE', getters.getCube2x2); break;
      case 'cube3x3': commit('COPY_CUBE', getters.getCube3x3); break;
    }
  },

  addAvgToCubeCopy({commit}, ob) {
    commit('ADD_AVG5_TO_CUBE_COPY', {index: ob.index, value: ob.ao5});
    commit('ADD_AVG12_TO_CUBE_COPY', {index: ob.index, value: ob.ao12});
    commit('ADD_MO100_TO_CUBE_COPY', {index: ob.index, value: ob.mo100});
  },

  setBests({commit, getters}, bests) {
    switch(getters.getSelectedCube) {
      case 'cube2x2': commit('SET_2X2_BESTS', bests); break;
      case 'cube3x3': commit('SET_3X3_BESTS', bests); break;
    }
  }
};

const mutations = {
  COPY_CUBE: (state, stats) => state.cubeCopy = JSON.parse(JSON.stringify(stats)),
  ADD_TIME_TO_CUBE_COPY: (state, data) => state.cubeCopy.list.unshift(data),
  ADD_AVG5_TO_CUBE_COPY: (state, ob) => state.cubeCopy.list[ob.index].ao5 = ob.value,
  ADD_AVG12_TO_CUBE_COPY: (state, ob) => state.cubeCopy.list[ob.index].ao12 = ob.value,
  ADD_MO100_TO_CUBE_COPY: (state, ob) => state.cubeCopy.list[ob.index].mo100 = ob.value,

  SET_CUBE_COPY_BEST_SINGLE: (state, value) => state.cubeCopy.bests.single = value,
  SET_CUBE_COPY_BEST_AO5: (state, value) => state.cubeCopy.bests.ao5 = value,
  SET_CUBE_COPY_BEST_AO12: (state, value) => state.cubeCopy.bests.ao12 = value,
  SET_CUBE_COPY_BEST_MO100: (state, value) => state.cubeCopy.bests.mo100 = value,

  SET_2X2_BESTS: (state, bests) => state.cube2x2.bests = JSON.parse(JSON.stringify(bests)),
  SET_3X3_BESTS: (state, bests) => state.cube3x3.bests = JSON.parse(JSON.stringify(bests)),

  ADD_CUBE_2X2_TIME: (state, data) => state.cube2x2.list.unshift(data),
  ADD_CUBE_3X3_TIME: (state, data) => state.cube3x3.list.unshift(data),

  UPDATE_TIME: (state, data) => {
    state[data.cube].list[data.index].result = data.result;
    state[data.cube].list[data.index].comment = data.comment;
    state[data.cube].list[data.index].penalty = data.penalty;
    state[data.cube].list[data.index].dnf = data.dnf;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}