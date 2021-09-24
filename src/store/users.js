const moduleUser = {
  state: {
    user: null,
    reload_group: false
  },
  getters: {
    getUser: state => state.user,
    reload: state => state.reload_group
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_RELOAD(state, reload_group) {
      state.reload_group = reload_group;
    }
  },
  actions: {
    retrieveUser({ commit }, user) {
      commit("SET_USER", user);
    },
    reload({ commit }, reload_group) {
      commit("SET_RELOAD", reload_group);
    }
  }
};

export default moduleUser;
