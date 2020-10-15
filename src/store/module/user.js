
import { session } from '@/utils/util';
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  },
  actions: {
    SaveInfo({ commit }, { userInfo = {}, token = null }) {
      commit("SET_TOKEN", token);
      commit("SET_USERINFO", userInfo);
      session.set("userInfo", JSON.stringify(userInfo));
      session.set("token", token);
    },
    ClearInfo({ commit }) {
      console.log(1234);
      // 清空缓存
      commit("SET_TOKEN", null);
      commit("SET_USERINFO", {});
      session.remove("userInfo");
      session.remove("token");
    },
    GetInfo({ commit }) {
      console.log(session.get("token"), session.get("userInfo"));
      if (session.get("token") && session.get("userInfo")) {
        commit("SET_TOKEN", session.get("token"));
        commit("SET_USERINFO", JSON.parse(session.get("userInfo")));
      }
    }
  }
}