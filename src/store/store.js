import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 存储所需的数据
const state = {
  selectedFood: [],
  totaolCount: 0,
  favorite: false
}

// 存储操作state的数据的函数
const mutations = {
  getSelectFood: (state, value) => {
    // console.log(state)
    // console.log(value)
    state.selectedFood.push(value)
    localStorage.setItem('selected', value)
    // console.log(state.selectedFood)
  },
  getFavorite: (state, value) => {
    state.favorite = value
    localStorage.setItem('sellerFavorite', JSON.stringify(value))
  }
}

// 存储触发 mutations 里面的函数的行为
const actions = {
  getSelectFoodAction: ({commit}, value) => {
    commit('getSelectFood', value)
  },
  getFavoriteAction: ({commit}, value) => {
    console.log(value)
    commit('getFavorite', value)
  }
}

// 属性封装 获取state中的数据
const getters = {
  selectedFood: (state) => {
    return localStorage.getItem('selected')
  },
  getFavoriteStatus: (state) => {
    console.log(JSON.parse(localStorage.getItem('sellerFavorite')))
    return JSON.parse(localStorage.getItem('sellerFavorite'))
  }
}

// 注册使用
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
