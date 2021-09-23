const moduleUser = {
  state: {
    user: null
    //user: JSON.parse(localStorage.getItem("user"))
  },
  getters: {
    getUser: state => state.user
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      //localStorage.setItem("user", JSON.stringify(user));
    }
  },
  actions: {
    retrieveUser({ commit }, user) {
      commit("SET_USER", user);
    }
  }
};

export default moduleUser;
