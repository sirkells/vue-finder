<template>
      <v-container fluid grid-list-md>
        
      <section v-if="errored">
          <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>
      <section v-else-if="loading">Loading.......</section>
      <section v-else>
        <v-layout row justify-start class="mb-3">
        <v-btn small flat color="grey" @click="sortBy('title')">
          <v-icon small left>folder</v-icon>
          <span class="caption text-lowercase">By project name</span>
        </v-btn>
        <v-btn small flat color="grey" @click="sortBy('region.bundesland')">
          <v-icon small left>person</v-icon>
          <span class="caption text-lowercase">By Person</span>
        </v-btn>
      </v-layout>
        <v-layout row wrap>
              <v-flex xs12 sm6 md3>
                <v-card>
                  <v-toolbar color="blue darken-3" dark>

                    <v-toolbar-title>Filter</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-btn
                      v-show="selectedFilter.length >=1"
                      color="primary"
                      
                      light
                      @click="reset"
                    >
                      Reset
                    </v-btn>
          
                    <v-spacer></v-spacer>
        
                  </v-toolbar>
                  
                  
                  <v-list>
                    
                    
                    <v-chip v-for="select in selectedFilter" :key="select.title" close>{{ select }}</v-chip>
                    <v-list-group
                      v-for="(item, index) in allAggs"
                     
                      :key="index"
                      
                    
                    >
                      <v-list-tile slot="activator">
                        <v-list-tile-content>
                          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
          
                      <v-list-tile
                        v-for="(subItem, index) in item.items"
                        :key="index"
                        @click="call(item.title,subItem.key) "
                        
                      >
                        <v-list-tile-content >
                          <v-checkbox 
                          v-model="selectedFilter" 
                          :label="subItem.key + '(' + subItem.count + ')'" 
                          :value="subItem.key"
                          
                          ></v-checkbox>
                          
                        </v-list-tile-content>
          
                        <v-list-tile-action>
                          <v-icon></v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list-group>
                  </v-list>
                </v-card>
              </v-flex>
              <v-flex  xs12 sm6 md9>
                <v-layout row wrap>
                  <v-flex >
                    <v-layout row wrap>
                      <v-flex
                        v-for="(posts, index) in results"
                        :key="index"
                        xs12
                      >
                        <v-card>
                          <v-card-title primary>
                            <div>
                              <div class=""><a :href="posts.url" target="_blank"><b>{{ posts.title }}</b></a></div>
                              {{posts.description}}
                            </div>
                          </v-card-title>
                          <v-card-actions>

                          <div class="text-xs-center">
                            <v-chip :class="{success: lActive}" @click="lActive = !lActive, get('bundesland='+posts.region.bundesland, posts.region.bundesland)" v-if="posts.region.bundesland">{{ posts.region.bundesland}}</v-chip>
                            <v-chip :class="{warning: gActive}"  @click="gActive = !gActive, get('group=' + posts.bereich.group, posts.region.bundesland)" v-if="posts.bereich.group">{{ posts.bereich.group}}</v-chip>
                            <v-chip :class="{error: gtActive}" @click="gtActive = !gtActive, get('groupType=' + posts.bereich.group_type, posts.region.bundesland)" v-if="posts.bereich.group_type">{{ posts.bereich.group_type}}</v-chip>
                            <v-chip :class="{info: gtsActive}" @click="gtsActive = !gtsActive,get('groupStack=' + posts.bereich.group_type_stack, posts.region.bundesland)" v-if="posts.bereich.group_type_stack">{{ posts.bereich.group_type_stack}}</v-chip>
                            <v-chip :class="{info: pActive}" @click="pActive = !pActive,get('platform=' + posts.bereich.platform, posts.region.bundesland)" v-if="posts.bereich.platform">{{ posts.bereich.platform}}</v-chip>
                            <v-chip :class="{info: pnActive}" @click="pnActive = !pnActive,get('platform_name=' + posts.bereich.platform_name, posts.region.bundesland)" v-if="posts.bereich.platform_name">{{ posts.bereich.platform_name}}</v-chip>
                            <!--encodeURIComponent used to encode c# due to error caused by # -->
                            <v-chip :class="{purple: skActive}" @click="skActive = !skActive, get('skill=' +  encodeURIComponent(posts.bereich.skill), posts.region.bundesland)" v-if="posts.bereich.skill">{{ posts.bereich.skill}}</v-chip>
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
                                    >
                                      <v-icon @click="myToggleFunction($event)" >favorite</v-icon> 
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
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
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
      </section>
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
    //props passed from APP.vue refreshHome to refreshHompage, searchTerm to get search term and searchCalled to trigger the watcher when search is entered
    props: ['refreshHome', 'search_term', 'searchCalled', 'filter', 'facet'],
    components: {
    'filters-cmp': Filter,
    'cock-cmp': Cockpit
  },
    data () {
      return {
        category: false,
        aggRegion: [],
        allAggs: [],
        tab: null,
        url: 'http://127.0.0.1:5000/api/?',
        bundesland: '',
        group_val: '',
        groupTypeval: '',
        groupStackval: '',
        skill_val: '',
        name: 'Filter',
        color: null,
        myActive: false,
        dialog: null,
        drawer: null,
        dark: false,
        show: false,
        isActive: false,
        //lActive=location, gActive=group, gtActive=group_type, gtsActive=group_type_stack, sActive=skill
        lActive: false,
        gActive: false,
        gtActive: false,
        gtsActive: false,
        skActive: false,
        pActive: false,
        pnActive: false,
        errored: false,
        loading: true,
        cockpit: [],
        results: [],
        total_results: [],
        panel: [],
        items: 5,
        selectedFilter:[],
        groupSelected: "",
        locSelected: "",
        selected: ['Trevor Handsen'],
        items: ['Kelechi Igbokwe', 'Paul Zimmer', 'Marco Hoher'],
        title: '',
        subject: '',
        section: '',
        link: '',
        group: false,
        country: [{name: 'Germany'}, {name: 'England'}],
      }
    },
    created() {
      this.reset()
    },
    
    methods: {
      call(a,b) {
        let count, proj, item
        proj = this.allAggs
        for(count in proj) {
          for (item in proj[count]['items']) {
            // console.log(proj[count]['items'][item]['key'])
          }
        }
        if (a === "Category" && !this.lActive) {
          a = "group="
          this.url = 'http://127.0.0.1:5000/api/?'
          let section = a+ b
          console.log(section)
          this.fetchData(section)
          this.gActive = true
          this.groupSelected = b
        }
        else if (a === "Bundesland" && !this.gActive || !this.gtActive || !this.gtsActive || !this.skActive) {
          a = 'bundesland='
          let section = a + b 
          console.log(section)
          this.fetchData(section)
          this.lActive = true
          this.locSelected = b
        }
        else if (a === "Bundesland" && this.gActive) {
          a = 'bundesland='
          let section = a + b + "group=" + this.groupSelected
          console.log(section)
          this.fetchData(section)
          this.lActive = true
          this.locSelected = b
        }
        else if (a === "Category" && this.lActive) {
          a = "group="
          let section = a  + b + '&bundesland=' + this.locSelected
          console.log(section)
          this.fetchData(section)
          this.gActive = true
          this.lActive = true
          
        }
        else if (a === "Sub-Category") {
          console.log(a + '=' + b)
        }
        else if (a === "Stack") {
          console.log(a + '=' + b)
        }
        else if (a === "Skills") {
          console.log(a + '=' + b)
        }
        
        
        
        
        // if (this.category) {
        //   alert(a + ':' + b)
        // }
        
      },
      sortBy(prop) {
        this.results.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
      },
     
     //toggles color of tags clicked
      get(param, loc) {
        if (this.gActive) {
          if (this.lActive) {
            this.group_val = param
            let a
            a = param +  '&' + 'bundesland=' + loc
            this.fetchData(a)
          }
          else {
            this.url = 'http://127.0.0.1:5000/api/?'
            this.fetchData(param)
          }
            
          }
        
        else if (this.gtActive ) {
          if (this.lActive) {
            this.groupTypeval = param
            let a
            a = param +  '&' + 'bundesland=' + loc
            this.fetchData(a)
          }
          else {
            this.url = 'http://127.0.0.1:5000/api/?'
            this.fetchData(param)
          }
          }
       
        else if (this.gtsActive ) {
          if (this.lActive) {
            this.groupStackval = param
            let a
            a = param +  '&' + 'bundesland=' + loc
            this.fetchData(a)
          }
          else {
            this.fetchData(param)
          }
          }
        
        else if (this.skActive ) {
          if (this.lActive) {
            this.skill_val = param
            let a
            a = param +  '&' + 'bundesland=' + loc
            this.fetchData(a)
          }
          else {
            this.fetchData(param)
          }
          }
        
        else if (this.lActive) {
            this.bundesland = loc
            let a
            a = 'bundesland=' + loc
            this.fetchData(a)
          }
        
        else if (!this.lActive) {
          
          this.fetchData('')
        }
      },
          
        
     
      //to toggle the style class in any element
      //this toggles the error--text class when button is clicked
      myToggleFunction: function(event){
        //error--text is a stlyin class for v-icon
          event.target.classList.toggle("error--text");
          //let button = event.target;
          //console.log(button.classList)
          
        },
      myFilter: function(index, e){
            console.log(this.results[index])
            this.myActive = !this.myActive
            
            
          // some code to filter users
        },
      addToCockpit: function(index) {
          this.cockpit.push(this.results[index])
          
          console.log(this.cockpit.length)
          alert('Project has been added')
        },
      reset() {
        this.url = 'http://127.0.0.1:5000/api/?'
        this.fetchData('')
        this.gtActive = false
        this.gtsActive = false
        this.gActive = false
        this.skActive = false
        this.lActive = false
        this.link = ''
        this.section = ''
        this.selectedFilter = []
        
      },
       // Create an array the length of our items
      // with all values as true
      all () {
        this.panel = [...Array(this.items).keys()].map(_ => true)
      },
      // Reset the panel
      none () {
        this.panel = []
      },
      //allert when project has been bookmarked
      saved () {
        alert('Project has been bookmarked')
      },
      addToCockpit: function(index) {
          this.cockpit.push(this.results[index])
          console.log(this.cockpit.length)
          alert('Project has been added')
        },
      bundesland_val (land) {
        this.link =   'bundesland=' + land
        console.log(this.link)
      },
      appendItems () {
              if (this.results.length < this.total_results.length) {
                  var next_data = this.total_results.slice(this.results.length, this.results.length + 10);
                  this.results = this.results.concat(next_data);
              }
          },
      filterFunc(s) {
        
        if (s === "Development" || "Infrastructure" || "Data Science") {
          this.url = 'http://127.0.0.1:5000/api/?group='
          this.fetchData(this.selectedFilter[0])
        }
        else if (this.selectedFilter.length === 0) {
          this.url = 'http://127.0.0.1:5000/api/'
          this.fetchData('')
        }
        
      },
      //fetchs data from API
      fetchData(section) {
        let a 
        a = this.url + section
        axios.get(a)
        .then((resp) => {
          //total results gets all the data from the api
          this.total_results = resp.data.project_lists
          //results takes only 10 data and returns 10 everytime scrllbar ends
          this.results = resp.data.project_lists.slice(0, 10)
          this.aggRegion = resp.data.aggRegion
          this.allAggs = resp.data.AllAggs
          console.log(this.aggs)
          console.log(resp)
          console.log(a)
          
          
        })
        .catch((err) => {
          console.log(err)
          this.errored = false
        })
        .finally(() => this.loading = false)
      },
    },
    watch: {
      //refreshes the homepage
      refreshHome: function() {
        this.reset()
        console.log(this.refreshHome)
      
      },
      selectedFilter: function() {
        if (this.selectedFilter.includes("Data Science") || this.selectedFilter.includes("Development") || this.selectedFilter.includes("Infrastructure") && this.selectedFilter.length >=1) {
          

        }
        else {
          console.log("no")
        }
        
      },
      //watches the searchterm is been trigered by the keyboard event
      searchCalled: function() {
        //checks if theres any letter is enterd in search bar. 
        if (this.search_term.length <=1) {
          //if none, it changes the url to home 
          this.url = 'http://127.0.0.1:5000/api/?'
          //and it returns all projects
          this.fetchData('')
        }
        // if theres a searchterm
        else {
          console.log(this.search_term)
          //changes url to query url
          this.url = 'http://127.0.0.1:5000/api/search/?'
          //fetches data based on search term. search as you type feature enabled due to keyboardup.prevent event in the App.vue search textfield event
          let term
          term = "search_term=" + this.search_term
          console.log(term)
          this.fetchData(term)
        }
      },
      facet: function() {
        console.log(this.facet)
      }
    },
      
    mounted() {
    
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
