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
        <span class="hidden-sm-and-down">Projectfinder</span>
      </v-toolbar-title>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details
        ></v-text-field>
      
    </v-toolbar>
      <v-content >
        <home-cmp></home-cmp>
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
      dialog: false,
      drawer: null,
      
    }),
    props: {
      source: String
    }
  }
</script>