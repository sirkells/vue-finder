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
        <v-spacer></v-spacer>
        
        <liq-tree :facetData="categoryData"></liq-tree>
        <liq-tree2 :facetData="locationData"></liq-tree2>


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

        <router-link to="/cockpit">
          <v-btn icon>
            <v-icon>bookmark</v-icon>
          </v-btn>
        </router-link>
        <router-link to="/tree">
          <v-btn icon>
            <v-icon>favoriter</v-icon>
          </v-btn>
        </router-link>
        <router-link to="/search">
          <v-btn icon>
            <v-icon>search</v-icon>
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
    <!--props passed to Home.vue refreshHome to refreshHompage, searchTerm to get search term and searchCalled to trigger the watcher when search is entered -->
    <v-content>
      <router-view :refreshHome="refreshme" :search_term="search_term"  :searchCalled="searchCalled"></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import Filter from "@/components/SideFilter";
  import Home from "@/components/Home";
  import Cockpit from "@/components/Cockpit";
  import Search from "@/components/Search";
  import Tree from "@/components/Tree";
  import Liquor from "@/components/Liquor";
  import Liquor2 from "@/components/Liquor2";
  
  export default {
    
    components: {
      'filters-cmp': Filter,
      'home-cmp': Home,
      'cock-cmp': Cockpit,
      'search-cmp': Search,
      'tree-cmp': Tree,
      'liq-tree': Liquor,
      'liq-tree2': Liquor2
    },
    
    data: () => ({
      drawer: false,
      section: '',
      name: 'Filter',
      refreshme: false,
      search_term: '',
      searchCalled: false,
      categoryData: getCategoryData(),
      locationData: getLocationData()
    }),
    methods: {
      refresh() {
        this.section = 'home'
      },
      fetchme() {
        this.refreshme = !this.refreshme
      },
      search() {
        console.log(this.search_term)
        this.searchCalled = !this.searchCalled
      },
      
    },
    props: {
      source: String
    }
  }
function getCategoryData() {
    return [
        {
          text: 'All Projects',

          // it makes node expanded
          state: { expanded: false },
          children: [
            { text: 'Development', children: [
              { text: 'Web', state: { expanded: false }, children: [
                { text: 'Frontend' , state: { checked: false }},
                { text: 'Backend', state: { checked: false }},
                { text: 'Fullstack', state: { checked: false }},
                { text: 'Others', state: { checked: false }}
              ]},
              { text: 'Mobile', children: [
                { text: 'Native', state: { checked: false } },
                { text: 'Cross-Platform', state: { checked: false } }
              ]}
            ]},
            { text: 'Infrastructure', children: [
                { text: 'ERP', state: { checked: false } },
                { text: 'Admin', state: { checked: false } },
                { text: 'Others', state: { checked: false }}
            ]},
            { text: 'Data Science', children: [
              { text: 'Business Intelligence', state: { checked: false } },
              { text: 'Big Data', state: { checked: false } },
              { text: 'Machine Learning', state: { checked: false } },
              { text: 'Others', state: { checked: false }}
            ]}
          ]
        },
        // {
        //   text: 'Filter By Location',
        //   state: { expanded: false},
        //   children: [
        //       { text: 'Bayern', state: { checked: false } },
        //       { text: 'Bremen', state: { checked: false } },
        //       { text: 'NRW', state: { checked: false } },
        //       { text: 'Hessen', state: { checked: false }}
            
        //   ]
        // }
        // {
        //   text: 'JS: The Wrong Way',

        //   // it makes node expanded
        //   state: { expanded: false },
        //   children: [
        //     { text: 'Getting Started', state: { checked: false } },
        //     { text: 'JavaScript Code Style', state: { selected: true } },
        //     { text: 'The Good Parts', children: [
        //       { text: 'OBJECT ORIENTED', state: { checked: false }  },
        //       { text: 'ANONYMOUS FUNCTIONS', state: { checked: false }  },
        //       { text: 'FUNCTIONS AS FIRST-CLASS OBJECTS', state: { checked: false }  },
        //       { text: 'LOOSE TYPING', state: { checked: false }  }
        //     ]},
        //     { text: 'Patterns', children: [
        //       { text: 'DESIGN PATTERNS', state: { expanded: true }, children: [
        //         { text: 'Creational Design Patterns', children: [
        //           { text: 'Factory' },
        //           { text: 'Prototype' },
        //           { text: 'Mixin' },
        //           { text: 'Singleton' }
        //         ]},
        //         { text: 'Structural Design Patterns'}
        //       ]},
        //       { text: 'MV* PATTERNS', cildren: [
        //         { text: 'MVC Pattern' },
        //         { text: 'MVP Pattern' },
        //         { text: 'MVVM Pattern' }
        //       ]}
        //     ]}
        //   ]
        // }
      ]
}
function getLocationData() {
    return [
        {
          text: 'All Location',
          state: { expanded: false},
          children: [
              { text: 'Bayern', state: { checked: false } },
              { text: 'Bremen', state: { checked: false } },
              { text: 'NRW', state: { checked: false } },
              { text: 'Hessen', state: { checked: false }}
            
          ]
        }
      ]
}
</script>
