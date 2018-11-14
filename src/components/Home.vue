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

        <filters-cmp :category="name" ></filters-cmp>

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
            <v-btn 
            icon 
            large
            @click="fetchData('home')">
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
        <router-link to="/tree">
          <v-btn icon>
            <v-icon>mdi-beer</v-icon>
          </v-btn>
        </router-link>
        <router-link to="/newtree">
          <v-btn icon>
            <v-icon>mdi-home</v-icon>
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
      <v-container grid-list-md  fluid container>
        <cock-cmp :category="cockpit"></cock-cmp>
        <v-layout row wrap>
        <section v-if="errored">
          <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
          </section>

          <section v-else>
            <div v-if="loading">Loading...</div>

            <v-flex 
              v-else
              xs12 
              v-for="(posts, index) in results" 
              :key="index" >
              <v-card>
                <v-card-title primary>
                  <div>
                    <div class=""><a :href="posts.url" target="_blank"><b>{{ posts.title }}</b></a></div>
                    {{posts.description}}
                  </div>
                </v-card-title>
                <v-card-actions>

                    <div class="text-xs-center">
                      <v-chip :class="{warning: lActive}" @click="fetchData('location/' + posts.region.bundesland), toggle('lActive')" v-if="posts.region.bundesland">{{ posts.region.bundesland}}</v-chip>
                      <v-chip :class="{warning: gActive}" @click="fetchData(posts.bereich.group), toggle('gActive')" v-if="posts.bereich.group">{{ posts.bereich.group}}</v-chip>
                      <v-chip :class="{warning: gtActive}" @click="fetchData(posts.bereich.group + '/' + posts.bereich.group_type), toggle('gtActive')" v-if="posts.bereich.group_type">{{ posts.bereich.group_type}}</v-chip>
                      <v-chip :class="{warning: gtsActive}" @click="fetchData(posts.bereich.group + '/' + posts.bereich.group_type + '/' + posts.bereich.group_type_stack), toggle('gtsActive')" v-if="posts.bereich.group_type_stack">{{ posts.bereich.group_type_stack}}</v-chip>
                      <v-chip :class="{warning: skActive}" @click="fetchData( 'skill/' + posts.bereich.skill), toggle('skActive')" v-if="posts.bereich.skill">{{ posts.bereich.skill}}</v-chip>
                    </div>
                     <!--  <v-chip v-if="posts._id.$oid">{{ posts._id.$oid }}</v-chip>
                      <v-chip v-if="posts._id.$oid">{{ index }}</v-chip>


                  <v-btn flat color="black">{{ posts.region.bundesland}}</v-btn>
                  <v-btn flat color="purple">{{ posts.bereich.group}}</v-btn>
                  <v-btn flat color="orange">{{ posts.bereich.group_type}}</v-btn>
                  <v-btn flat color="green">{{ posts.bereich.group_type_stack}}</v-btn>-->
                  <v-spacer></v-spacer>
                  <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn 
                          icon 
                          class=" " 
                          @click="myFilter(index)"
                          >
                            <v-icon>favorite</v-icon> 
                          </v-btn>
                          <v-btn icon >
                            <v-icon @click="addToCockpit(index)">bookmark</v-icon>
                          </v-btn>
                          <v-btn 
                          icon
                          @click="dialog = !dialog"

                          >
                            <v-icon>share</v-icon>
                          </v-btn>
                  </v-card-actions>
                </v-card-actions>
              </v-card>
            </v-flex>
        </section>
        </v-layout>
        <v-dialog v-model="dialog" width="800px">
          <v-card>
            <v-toolbar
              card
              color="blue"
              dark
            >

              <v-btn flat  @click="dialog = false">
                <v-icon>arrow_back</v-icon>
              </v-btn>

              <v-spacer></v-spacer>
              <v-btn flat  @click="dialog = false">
                <v-icon>send</v-icon>
              </v-btn>

            </v-toolbar>
            <v-form>
              <v-autocomplete
                v-model="selected"
                :items="['Kelechi Igbokwe', 'Paul Zimmer', 'Marco Hoher']"
                chips
                label="To"
                full-width
                hide-details
                hide-no-data
                hide-selected
                multiple
                single-line
              ></v-autocomplete>
              <v-divider></v-divider>
              <v-text-field
                v-model="subject"
                label="Subject"
                value="subject"
                single-line
                full-width
                hide-details
              ></v-text-field>
              <v-divider></v-divider>
              <v-textarea
                v-model="title"
                label="Message"
                counter
                maxlength="120"
                full-width
                single-line
              ></v-textarea>
            </v-form>
          </v-card>
        </v-dialog>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios/dist/axios.min.js";
//import Filter from "./SideFilter";
import scrollMonitor from "scrollmonitor/scrollMonitor.js"
import Filter from "@/components/SideFilter";
import Cockpit from "@/components/Cockpit";


export default {
    name: 'Home',
    //props: ['cockpit'],
    components: {
    'filters-cmp': Filter,
    'cock-cmp': Cockpit
  },
    data () {
      return {
        tab: null,
        items: ['web', 'shopping', 'videos', 'images', 'news'],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        dialog: false,
        search_term: '',
        drawer: null,
        dark: false,
        show: false,
        lActive: false,
        gActive: false,
        gtActive: false,
        gtsActive: false,
        skActive: false,
        errored: false,
        loading: true,
        cockpit: [],
        results: [],
        total_results: [],
        panel: [],
        items: 5,
        selected: ['Trevor Handsen'],
        items: ['Kelechi Igbokwe', 'Paul Zimmer', 'Marco Hoher'],
        title: '',
        subject: '',
        section: 'home',
        products:[
      {
        productTitle:"ABCN",
        image       : require('../assets/images/product1.jpeg'),
        productId:1,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",


      },
      
      ]
      }
    },
    created() {
      this.fetchData(this.section)
      
    },

    
    methods: {
      // Create an array the length of our items
      // with all values as true
      toggle(card) {
        if (card === 'skActive') {
          this.skActive = !this.skActive
          this.gtActive = false
          this.gtsActive = false
          this.gActive = false
        }
        else if (card === 'gActive') {
          this.gActive = !this.gActive
          this.skActive = false
          this.gtActive = false
          this.gtsActive = false
        }
        else if (card === 'gtActive') {
          this.gtActive = !this.gtActive
          this.skActive = false
          this.gtsActive = false
          this.gActive = false
        }
        else if (card === 'gtsActive') {
          this.gtsActive = !this.gtsActive
          this.skActive = false
          this.gtActive = false
          this.gActive = false
        }
        
      },
      myFilter: function(index){
            console.log(index)

            if(this.isActive){
              this.isActive = false;
            }
            else{
              this.isActive = true;
            }
          // some code to filter users
        },
        addToCockpit: function(index) {
          this.cockpit.push(this.results[index])
          
          console.log(this.cockpit.length)
          alert('Project has been added')

        },
      all () {
        this.panel = [...Array(this.items).keys()].map(_ => true)
      },
      // Reset the panel
      none () {
        this.panel = []
      },
      saved () {

        alert('Project has been bookmarked')
      },
      addToCockpit: function(index) {
          this.cockpit.push(this.results[index])
          console.log(this.cockpit.length)
          alert('Project has been added')

        },
      appendItems () {
              if (this.results.length < this.total_results.length) {
                  var next_data = this.total_results.slice(this.results.length, this.results.length + 10);
                  this.results = this.results.concat(next_data);
              }
          },
      fetchData(section) {
          axios.get('http://127.0.0.1:5000/'+section)
          .then((resp) => {
            this.total_results = resp.data.project_lists
            this.results = resp.data.project_lists.slice(0, 10)
            console.log(resp)
            
            
          })
          .catch((err) => {
            console.log(err)
            this.errored = true
          })
          .finally(() => this.loading = false)
        },
      },
      
    mounted() {
    // axios
    //   .get("http://127.0.0.1:5000/home")
    //   .then(response => {
    //     this.total_results = response.data.project_lists
    //     this.results = response.data.project_lists.slice(0, 10)
    //     });
    var vueInstance = this;
    var elem = document.getElementById('product-list-bottom');
    var watcher = scrollMonitor.create(elem);
    watcher.enterViewport(function() {
        console.log('hello')
        vueInstance.appendItems()
    })
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
      
         .container{
             max-width: 3000px;
         }
         .main {
      margin-top: 60px; /* Add a top margin to avoid content overlay */
     }
</style>

