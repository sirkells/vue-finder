<template>
  <v-app id="inspire" >
    <div v-show="$route.path==='/login' || $route.path==='/logout' ? false : true">
      <v-navigation-drawer
        :clipped="$vuetify.breakpoint.lgAndUp"
        v-model="drawer"
        fixed
        app
        v-show="$route.path==='/login' || $route.path==='/logout' ? false : true"

      >

        <filters-cmp ></filters-cmp>

      </v-navigation-drawer>
      <v-toolbar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="blue darken-3"
        dark
        app
        fixed
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-icon @click.stop="drawer = !drawer">mdi-file-tree</v-icon>
          <span>
            <router-link to="/">
            <v-btn icon large>
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


        <v-text-field
            :append-icon-cb="() => {}"
            placeholder="Search..."
            single-line
            append-icon="search"
            color="white"
            hide-details
          >
        </v-text-field>
        <v-spacer></v-spacer>

        <router-link to="/cockpit">
          <v-btn icon>
            <v-icon>bookmark</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/login">
          <v-btn icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </router-link>

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
    
    <v-content>
      <router-view></router-view>
    </v-content>
      
  </v-app>
  
  
</template>

<script>
  import Filter from "@/components/SideFilter";
  import Home from "@/components/Home";
  export default {
    
    components: {
      'filters-cmp': Filter,
      'home-cmp': Home
    },
    data: () => ({
      drawer: false,
      
    }),
    props: {
      source: String
    }
  }
</script>