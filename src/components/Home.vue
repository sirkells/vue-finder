<template>
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
                      <!--encodeURIComponent used to encode c# due to error caused by # -->
                      <v-chip :class="{warning: skActive}" @click="fetchData( 'skill/' +  encodeURIComponent(posts.bereich.skill)), toggle('skActive')" v-if="posts.bereich.skill">{{ posts.bereich.skill}}</v-chip>
                    </div>
                     
                       <!--<v-chip v-if="posts.skill_summary">{{ posts.skill_summary}}</v-chip>
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
                          :class="results[index].color" 
                          @click="myFilter(index)"
                          >
                            <v-icon >favorite</v-icon> 
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
</template>

<script>
import axios from "axios/dist/axios.min.js";
//import Filter from "./SideFilter";
import scrollMonitor from "scrollmonitor/scrollMonitor.js"
import Filter from "@/components/SideFilter";
import Cockpit from "@/components/Cockpit";


export default {
    name: 'Home',
    props: ['refreshHome'],
    components: {
    'filters-cmp': Filter,
    'cock-cmp': Cockpit
  },
    data () {
      return {
        tab: null,
        name: 'Filter',
        items: ['web', 'shopping', 'videos', 'images', 'news'],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        dialog: false,
        color: null,
        search_term: '',
        drawer: null,
        dark: false,
        show: false,
        isActive: false,
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
        country: [{name: 'Germany'}, {name: 'England'}],
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
      this.gtActive = false
      this.gtsActive = false
      this.gActive = false
      this.skActive = false
      
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
            console.log(this.results[index])
            
            

          // some code to filter users
        },
        addToCockpit: function(index) {
          this.cockpit.push(this.results[index])
          
          console.log(this.cockpit.length)
          alert('Project has been added')

        },
      reset() {
        this.gtActive = false
        this.gtsActive = false
        this.gActive = false
        this.skActive = false
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
            console.log(section)
            
            
          })
          .catch((err) => {
            console.log(err)
            this.errored = true
          })
          .finally(() => this.loading = false)
        },
      },
    watch: {
      refreshHome: function() {
        console.log(this.refreshHome)
        this.fetchData('home')
        this.reset()

      },
      selected_inf: function() {
        console.log(this.selected_inf)
        this.getPosts(this.selected_inf)
      },
      selected_ds: function() {
        console.log(this.selected_ds)
        this.getPosts(this.selected_ds)
      }
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

