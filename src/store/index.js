import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse'))||false
  },
  getters:{},
  mutations: {
    Set_Collapse(state){
      state.isCollapse=!state.isCollapse;
      sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
      console.log( state.isCollapse);
    }
  },
  actions: {},
  modules: {}
});
