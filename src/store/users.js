const moduleUser = {
  state: {
    user: null
  },
  getters: {
    getUser: state => state.user
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    retrieveUser({ commit }, user) {
      commit("SET_USER", user);
    }
  }
};

export default moduleUser;
