/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import Vue from 'vue';

import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);


const state = {
  count: 0,
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('user'),
};

const getters = {
  loggedIn(state) {
    return state.token !== null;
  },
  // evenOrOdd: state => (state.count % 2 === 0 ? 'even' : 'odd'),
};
const mutations = {
  getToken(state, accessToken) {
    state.token = accessToken;
  },
  destroyToken(state) {
    state.token = null;
  },
  getUserName(state, user) {
    state.username = user;
  },
  // increment(state) {
  //   state.count++;
  // },
  // decrement(state) {
  //   state.count--;
  // },
  // add(state, result) {
  //   state.list.push(result);
  // },
};
const actions = {
  // eslint-disable-next-line consistent-return
  destroyToken(context) {
    axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;
    const path = 'http://localhost:5000/api/logout';
    if (context.getters.loggedIn) {
      return new Promise((resolve, reject) => {
        axios.post(path)
          .then((resp) => {
            localStorage.removeItem('token');
            context.commit('destroyToken');
            // eslint-disable-next-line no-alert
            // eslint-disable-next-line no-console
            resolve(resp);
            // eslint-disable-next-line no-console
            console.log(resp);
            // eslint-disable-next-line no-alert
          })
          .catch((error) => {
            localStorage.removeItem('token');
            context.commit('destroyToken');
            // eslint-disable-next-line
            reject(error)
          });
      });
    }
  },
  getToken(context, credentials) {
    const path = 'http://localhost:5000/api/login';
    const payload = { username: credentials.username, password: credentials.password };
    // state.username = credentials.username;
    return new Promise((resolve, reject) => {
      axios.post(path, payload)
        .then((resp) => {
          const accessToken = resp.data.token;
          localStorage.setItem('token', accessToken);
          localStorage.setItem('user', credentials.username);
          context.commit('getToken', accessToken);
          context.commit('getUserName', credentials.username);
          // eslint-disable-next-line no-alert
          // eslint-disable-next-line no-console
          resolve(resp);
          // eslint-disable-next-line no-console
          console.log(resp);
        // eslint-disable-next-line no-alert
        })
        .catch((error) => {
        // eslint-disable-next-line
          reject(error)
        });
    });
  },

};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
