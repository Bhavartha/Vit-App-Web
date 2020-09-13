import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import firebase from 'firebase/app'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyD6Jz23GQIEKHITSjaJtEOLsN8LSCVIkBo",
  authDomain: "vitapp-1-0.firebaseapp.com",
  databaseURL: "https://vitapp-1-0.firebaseio.com",
  projectId: "vitapp-1-0",
  storageBucket: "vitapp-1-0.appspot.com",
  messagingSenderId: "501633731855",
  appId: "1:501633731855:web:c39b1a00b3c2cb66b5427a",
  measurementId: "G-DLD224TRQL"
};

firebase.initializeApp(firebaseConfig)

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

