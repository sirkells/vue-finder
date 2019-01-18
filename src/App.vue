<template>
   <v-app id="inspire" >
    <div v-show="$route.path==='/login' || $route.path==='/logout' ? false : true">
      <v-navigation-drawer
        fixed
        :clipped="$vuetify.breakpoint.mdAndUp"
        app
        light
        v-model="drawer"
        v-show="$route.path==='/login' || $route.path==='/logout' ? false : true"
      >
        <v-list dense>
          <template v-for="item in items">
            <v-list-tile @click="" :key="item.text">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="blue darken-3"
        dark
        app
        fixed
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <span>
            <router-link to="/">
            <v-btn
            icon
            large
            @click="fetchme()">
              <v-avatar size="50px">
                <img
                  src='@/assets/act1.svg'
                  alt="Vuetify"
                >
              </v-avatar>
            </v-btn>
            </router-link>

          </span>

        </v-toolbar-title>

        <!--keyup.prevent is an event that allows ssearch as you type. it sends each text entered to the home componet to search-->
        <v-text-field
            :append-icon-cb="() => {}"
            placeholder="Search..."
            single-line
            append-icon="search"
            color="white"
            clearable
            hide-details
            v-model="search_term"
            @keyup.prevent="search"
          >

        </v-text-field>
        <v-spacer></v-spacer>
        <div>
          <router-link to="/cockpit">
          <v-btn icon>
            <v-icon>bookmark</v-icon>
          </v-btn>
        </router-link>
        </div>
        <div v-if="!loggedIn">
          <router-link to="/login">
            <v-btn icon>
              <v-icon>mdi-login</v-icon>
            </v-btn>
          </router-link>
        </div>
        <div v-if="loggedIn">
          <router-link to="/logout">
            <v-btn icon>
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </router-link>
        </div>
        <v-btn icon large>
          <v-avatar size="32px">
            <img
              src='@/assets/david.jpg'
              alt="Vuetify"
            >
          </v-avatar>
        </v-btn>

      </v-toolbar>
    </div>
    <!--props passed to Home refreshHome to refreshHompage, searchTerm to get search term and searchCalled to trigger the watcher when search is entered -->
    <v-content>
      <router-view :refreshHome="refreshme" :search_term="search_term"  :searchCalled="searchCalled"></router-view>
    </v-content>
  </v-app>
</template>
<script>

import Home from '@/components/Home';
import Cockpit from '@/components/Cockpit';


export default {

  components: {
    'home-cmp': Home,
    'cock-cmp': Cockpit,
  },

  data: () => ({
    drawer: false,
    items: [
      { icon: 'bookmark', text: 'Cockpit' },
      { icon: 'favoriter', text: 'Favorites' },
      { icon: 'mdi-logout', text: 'Logout' },
    ],
    section: '',
    name: 'Filter',
    refreshme: false,
    search_term: '',
    searchCalled: false,
    // categoryData: getCategoryData(),
    facet: '',
  }),
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  methods: {
    refresh() {
      this.section = 'home';
    },
    fetchme() {
      this.refreshme = !this.refreshme;
    },
    search() {
      // eslint-disable-next-line no-console
      console.log(this.search_term);
      this.searchCalled = !this.searchCalled;
    },
  },
  props: {
    source: String,
  },
};


</script>
// function getLocationData() {
//   return [
//     {
//       text: 'All Location',
//       state: { expanded: false },
//       children: [
//         { text: 'Bayern', state: { checked: false } },
//         { text: 'Bremen', state: { checked: false } },
//         { text: 'NRW', state: { checked: false } },
//         { text: 'Hessen', state: { checked: false } },

//       ],
//     },
//   ];
// }
// function getCategoryData() {
//   return [
//     {
//       text: 'All Projects',

//       // it makes node expanded
//       state: { expanded: false },
//       children: [
//         { text: 'Development',
//           children: [
//             { text: 'Web',
//               state: { expanded: false },
//               children: [
//                 { text: 'Frontend', state: { checked: false } },
//                 { text: 'Backend', state: { checked: false } },
//                 { text: 'Fullstack', state: { checked: false } },
//                 { text: 'Others', state: { checked: false } },
//               ] },
//             { text: 'Mobile',
//               children: [
//                 { text: 'Native', state: { checked: false } },
//                 { text: 'Cross-Platform', state: { checked: false } },
//               ] },
//           ] },
//         { text: 'Infrastructure',
//           children: [
//             { text: 'ERP', state: { checked: false } },
//             { text: 'Admin', state: { checked: false } },
//             { text: 'Others', state: { checked: false } },
//           ] },
//         { text: 'Data Science',
//           children: [
//             { text: 'Business Intelligence', state: { checked: false } },
//             { text: 'Big Data', state: { checked: false } },
//             { text: 'Machine Learning', state: { checked: false } },
//             { text: 'Others', state: { checked: false } },
//           ] },
//       ],
//     },
//   ];
// }
