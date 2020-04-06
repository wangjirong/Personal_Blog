import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const funNames = {

  //用户，QQ登录
  setUser: "SET_USER",
  getUser: "GET_USER",

  //管理员ERIC
  setManager: "SET_MANAGER",
  getManager: "GET_MANAGER",

  //博客列表
  setBlogsList: "SET_BLOGS_LIST",
  getBlogsList: "GET_BLOGS_LIST",

  //授权
  setUserIsAuth:"SET_USER_IS_AUTH",
  getUserIsAuth:"GET_USER_IS_AUTH"
}
export default new Vuex.Store({
  state: {
    user: {},
    manager: {},
    blogsList: [],
    userIsAuth:false
  },
  //获取
  getters: {
    [funNames.getUser]: state => state.user,
    [funNames.getBlogsList]: state => state.blogsList,
    [funNames.getManager]: state => state.manager,
    [funNames.getUserIsAuth]:state=>state.userIsAuth
  },
  //更改
  mutations: {

    //提交用户
    [funNames.setUser]: (state, user) => {
      if (user) state.user = user;
      else state.user = null;
    },
    
    //提交用户授权
    [funNames.setUserIsAuth]:(state,userIsAuth)=>{
      if(userIsAuth)state.userIsAuth = userIsAuth;
      else state.userIsAuth = false;
    },

    //提交博客列表
    [funNames.setBlogsList]: (state, blogsList) => {
      if (blogsList) state.blogsList = blogsList;
      else state.blogsList = null;
    },

    //提交管理员
    [funNames.setManager]: (state, manager) => {
      if (manager) state.manager = manager;
      else state.manager = null;
    }

  },
  actions: {

    //异步分发用户
    setUser: ({
      commit
    }, user) => {
      commit(funNames.setUser, user)
    },
    //异步分发授权
    setUserIsAuth:({commit},userIsAuth)=>{
      commit(funNames.setUserIsAuth,userIsAuth);
    },
    //异步分发管理员
    setManager: ({
      commit
    }, manager) => {
      commit(funNames.setManager, manager);
    },

    //异步分发博客列表
    setBlogsList: ({
      commit
    }, blogsList) => {
      commit(funNames.setBlogsList, blogsList)
    },

    //情空所有状态
    clearCurrent: ({
      commit
    }) => {
      commit(funNames.setUser, null);
      commit(funNames.setBlogsList, null)
      commit(funNames.setManager,null)
      commit(funNames.setUserIsAuth,null)
    }
  },
})