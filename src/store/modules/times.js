const state = {
  c2: {},
  c3: {
    bests: {
      single: 1222,
      ao5: 1452,
      ao12: undefined,
      mo100: undefined
    },
    list: []
  }
};

const getters = {
  c3data: state => state.c3
};

const actions = {
  addTime({commit}, data) {
    const ob = {
      result: data.result,
      scramble: data.scramble,
      dnf: data.dnf,
      penalty: data.penalty,
      comment: data.comment,
      date: data.date
    }
    switch(data.cube) {
      case 'c3': commit('add_c3', ob); break;
    }
  }
};

const mutations = {
  add_c3: (state, data) => {
    state.c3.list.unshift(data)
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}