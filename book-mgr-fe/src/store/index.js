import { createStore } from 'vuex';
import { character, user, classify } from '@/network';
import { result } from '@/helpers/utils';
import { getCharacterInfoById } from '@/helpers/character';

export default createStore({
  state: {
    characterInfo: [],
    userInfo: {},
    userCharacter: {},
    classifyInfo: []
  },
  mutations: {
    setCharacterInfo(state, characterInfo) {
      state.characterInfo = characterInfo;
    },
    setUserInfo(state, user) {
      state.userInfo = user;
    },
    setUserCharacter(state, userCharacter) {
      state.userCharacter = userCharacter;
    },
    setClassifyInfo(state, classify) {
      state.classifyInfo = classify;
    }
  },
  actions: {
    async getCharacterInfo(store) {
      const res = await character.list();
      result(res)
        .success(({data}) => {
          store.commit('setCharacterInfo', data);
        });
    },

    async getUserInfo(store) {
      const res = await user.info();

      result(res)
        .success(({ data }) => {
          store.commit('setUserInfo', data);
          store.commit('setUserCharacter', getCharacterInfoById(data.character));
        });
    },

    async getClassifyInfo(store) {
      const res = await classify.list();

      result(res)
        .success(({ data }) => {
          store.commit('setClassifyInfo', data);
        });
    }
  },
  modules: {
  }
})
