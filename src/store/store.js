/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import Vue from 'vue';

import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router/index';

Vue.use(Vuex);

const state = {
  allFilterData: [],
  resultsCount: null,
  totalResultsCount: null,
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('user'),
  reset: false,
  loading: true,
  totalResults: [],
  results: [],
  navDraw: false,
  params: null,
  searchTerm: '',
  shareDialog: false,
};

const getters = {
  loggedIn(state) {
    return state.token !== null;
  },
  allFilterData(state) {
    return state.allFilterData;
  },
  resultsCount(state) {
    return state.resultsCount;
  },
  totalResultsCount(state) {
    return state.totalResultsCount;
  },
  reset(state) {
    return state.reset;
  },

  // evenOrOdd: state => (state.count % 2 === 0 ? 'even' : 'odd'),
};
const mutations = {
  // resetAll(state) {
  //   state.results = [];
  //   state.totalResults = [];
  //   state.username = null;
  // },
  toggleShareDialog(state, status) {
    state.shareDialog = status;
  },
  updateSearchTerm(state, searchTerm) {
    state.searchTerm = searchTerm;
  },
  getParams(state, data) {
    state.params = data;
  },
  getToken(state, accessToken) {
    state.token = accessToken;
  },
  destroyToken(state) {
    state.token = null;
    state.results = [];
    state.totalResults = [];
    state.username = null;
    state.resultsCount = null;
    state.totalResultsCount = null;
  },
  getUserName(state, user) {
    state.username = user;
  },
  updateFilterData(state, data) {
    state.allFilterData = data;
  },
  updateResultsCount(state, amount) {
    state.resultsCount = amount;
  },
  updateTotalResultsCount(state, amount) {
    state.totalResultsCount = amount;
  },
  resetCalled(state) {
    state.reset = !state.reset;
  },
  loadingStatus(state) {
    state.loading = false;
  },
  updateTotalResults(state, data) {
    state.totalResults = data;
  },
  updateResults(state, data) {
    state.results = data;
    // state.results.sort();
  },
  addToResults(state) {
    const nextData = state.totalResults.slice(
      state.results.length,
      state.results.length + 20,
    );
    state.results = state.results.concat(nextData);
  },
  navDrawStatus(state) {
    state.navDraw = !state.navDraw;
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
  appendItems(context) {
    if (context.state.results.length < context.state.totalResults.length) {
      context.commit('addToResults');
    }
  },
  // eslint-disable-next-line consistent-return
  destroyToken(context) {
    axios.defaults.headers.common.Authorization = `Bearer ${
      context.state.token
    }`;
    const path = 'http://localhost:5000/api/logout';
    if (context.getters.loggedIn) {
      return new Promise((resolve, reject) => {
        axios
          .post(path)
          .then((resp) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
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
            reject(error);
          });
      });
    }
  },
  getToken(context, credentials) {
    const path = 'http://localhost:5000/api/login';
    const payload = {
      username: credentials.username,
      password: credentials.password,
    };
    // state.username = credentials.username;
    return new Promise((resolve, reject) => {
      axios
        .post(path, payload)
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
          reject(error);
        });
    });
  },
  fetchData(context, urlPath) {
    axios.defaults.headers.common.Authorization = `Bearer ${
      context.state.token
    }`;
    axios
      .get(urlPath)
      .then((resp) => {
        // total results gets all the data from the api
        context.commit('updateTotalResults', resp.data.project_lists);
        // this.total_results = resp.data.project_lists;
        // results takes only 10 data and returns 10 everytime scrllbar ends
        const data = resp.data.project_lists.slice(0, 20);
        context.commit('updateResults', data);
        // update store data
        context.commit('updateFilterData', resp.data.AllAggs);
        context.commit('updateResultsCount', context.state.results.length);
        context.commit('updateTotalResultsCount', resp.data.amount);
        // eslint-disable-next-line no-console
        // console.log(this.results);
        // eslint-disable-next-line no-console
        console.log(resp);
        // eslint-disable-next-line no-console
        console.log(urlPath);
      })
      // eslint-disable-next-line func-names
      .catch((err) => {
        // eslint-disable-next-line no-console
        if (err.response.status === 401) {
          // eslint-disable-next-line no-alert
          alert('Expired token. Reauthentication required');
          localStorage.removeItem('token');
          context.commit('destroyToken');
          router.push('/logout');
        }
        // eslint-disable-next-line no-console
        console.log(err);
        this.errored = false;
      })
      // eslint-disable-next-line no-return-assign
      .finally(() => context.commit('loadingStatus'));
  },
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
