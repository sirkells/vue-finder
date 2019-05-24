<template>
  <v-app id="inspire">
    <div v-show="$route.path==='/login' || $route.path==='/logout' ? false : true">
      <!-- Nav bar -->
      <v-toolbar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="blue darken-3"
        dark
        app
        fixed
      >
        <v-toolbar-side-icon
          v-show="$route.path==='/cockpit'? false : true"
          @click.stop="toggleDraw()"
        ></v-toolbar-side-icon>
        <v-toolbar-title
          style="width: 300px"
          class="ml-0 pl-3"
        >
          <span>
            <router-link to="/">
              <v-btn
                icon
                large
                @click="refresh()"
              >
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
        <!-- search bar -->
        <search-bar
          :toggleSearchCall="toggleSearchCall"
          :refresh="refresh"
        ></search-bar>
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
        <v-btn
          icon
          large
        >
          <v-avatar size="32px">
            <img
              src='@/assets/david.jpg'
              alt="Vuetify"
            >
          </v-avatar>
        </v-btn>

      </v-toolbar>
    </div>
    <v-content>
      <router-view
        :refreshHome="refreshme"
        :search_term="search_term"
        :searchCalled="searchCalled"
      >
      </router-view>
    </v-content>
  </v-app>
</template>
<script>
import SearchBar from './components/SearchBar';

export default {
  components: {
    'search-bar': SearchBar,
  },
  data: () => ({
    // drawer: true,
    items: [
      { icon: 'bookmark', text: 'Cockpit' },
      { icon: 'favoriter', text: 'Favorites' },
      { icon: 'mdi-logout', text: 'Logout' },
    ],
    section: '',
    name: 'Filter',
    refreshme: false,
    search_term: null,
    searchCalled: false,
  }),
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  methods: {
    refresh() {
      this.refreshme = !this.refreshme;
    },
    toggleSearchCall() {
      this.searchCalled = !this.searchCalled;
    },

    toggleDraw() {
      this.$store.commit('navDrawStatus');
    },
  },
};

</script>
