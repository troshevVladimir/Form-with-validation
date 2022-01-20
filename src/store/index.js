import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    citys: [],
  },
  mutations: {
    addCitys(state, addCitys) {
      state.citys = [...state.citys, ...addCitys];
    },
  },
  actions: {
    fetchCitys(context) {
      return fetch('http://localhost:3000/api/get')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          context.commit('addCitys', data);
        });
    },
  },

  getters: {
    sortCitys(state) {
      const arr = state.citys;
      const filteredArr = arr.sort((prev, next) => {
        return parseInt(prev.population, 10) - parseInt(next.population, 10);
      });

      const mostPopulation = filteredArr.pop();

      const border = filteredArr.findIndex((el) => {
        return el.population >= 40000;
      });

      const arrayMore = filteredArr.slice(border, filteredArr.length - 1);

      const returnArr = arrayMore.sort((prev, next) => {
        if (prev.city > next.city) return 1;
        if (prev.city < next.city) return -1;
        return 0;
      });
      returnArr.unshift(mostPopulation);
      return returnArr;
    },
  },
  modules: {},
});
