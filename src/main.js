// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import vuetify from '@/plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

function handleError (error, fullError) {
  // router.push({ name: 'MessagePage', params: error })
  if (!Vue.config.productionTip) {
    console.log(error, fullError)
  }
}

Vue.config.errorHandler = function (err, vm, info) {
  handleError({
    title: err.title || err.toString(),
    message: err.message || info
  }, err)
}
window.onerror = function (message, source, line, column, error) {
  handleError({
    title: 'Unexpected Error',
    message: message
  }, error)
}
Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

const getDefaultState = () => {
  return {}
}

// initial state
const state = getDefaultState()

const store = new Vuex.Store({
  state,
  mutations: {},
  actions: {},
  getters: {},
  plugins: [ vuexLocalStorage.plugin ]
})


Vue.mixin({
  methods: {
    handleError: function (errorInfo, error) {
      let message = errorInfo.message || 'Unknown error, please try again'
      if (this.isServerError(error)) {
        message += '\n' + error.response.statusText
      }
      this.$store.commit('setNotification', { message, type: 'error', show: true })
      handleError(errorInfo, error)
    },
    showMessage: function (message) {
      this.$store.commit('setNotification', { message, type: 'info', show: true })
    },
    isServerError: function (error) {
      return error.response !== undefined
    }
  }
})
/* eslint-disable no-new */
new Vue({
  store,
  vuetify,
  el: '#app',
  router,
  components: { App },
  template: `<App/>`
})
