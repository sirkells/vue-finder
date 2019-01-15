import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Cockpit from '@/components/Cockpit';
import store from '@/store/store';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter(to, from, next) {
        if (!store.state.isAuth) {
          next('/login');
        } else {
          next();
        }
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/cockpit',
      name: 'Cockpit',
      component: Cockpit,
      beforeEnter(to, from, next) {
        if (!store.state.isAuth) {
          next('/login');
        } else {
          next();
        }
      },
    },
  ],
});
