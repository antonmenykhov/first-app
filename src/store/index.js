import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Добро пожаловать!',
    color: 'blue-grey',
    jwt: '',
    menuDisabled: true,
    currentMenu: 1
  },
  mutations: {
    changeTitle(state, newTitle){
      state.title = newTitle
    },
    changeColor(state, color){
      state.color = color
    },
    changeJwt(state, jwt){
      state.jwt = jwt
    },
    changeMenuDisabled(state, menuDisabled){
      state.menuDisabled = menuDisabled
    },
    changeCurrentMenu(state, currentMenu){
      state.currentMenu = currentMenu
    }
  },
  actions: {
  },
  modules: {
  }
})
