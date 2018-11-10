<template>
        
    <v-app id="inspire">
        <v-navigation-drawer
          :clipped="$vuetify.breakpoint.lgAndUp"
          v-model="drawer"
          fixed
          app

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
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

            <span class=""><router-link to="/"><v-icon>home</v-icon></router-link></span>
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
          <v-content >
            <v-container grid-list-md  fluid container>
              <v-layout row wrap>
                
              </v-layout>
              
            </v-container>
          </v-content>
    </v-app>
</template>


<script>
    export default {
      name: 'Login',
      data() {
        return {
          msg: 'Welcome to the Login Page',
        };
      },
    };
</script>