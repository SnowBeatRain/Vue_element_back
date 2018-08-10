import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    tagList:[]
  },
  mutations:{
    newTagList(state,msg){
      state.tagList = msg
    }
  }
})
