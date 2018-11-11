<template>
  <div>
    <v-container grid-list-md  fluid container>
      <v-layout row wrap>
        <v-flex xs12 v-for="(posts,i) in results" :key="i" >
          <v-card>
            <v-card-title primary>
              <div>
                <div class=""><a :href="posts.url" target="_blank"><b>{{ posts.title }}</b></a></div>
                {{posts.description}}
              </div>
            </v-card-title>
            <v-card-actions>
              
                <div class="text-xs-center">
                  <v-chip v-if="posts.region.bundesland">{{ posts.region.bundesland}}</v-chip>
                  <v-chip v-if="posts.bereich.group">{{ posts.bereich.group}}</v-chip>
                  <v-chip v-if="posts.bereich.group_type">{{ posts.bereich.group_type}}</v-chip>
                  <v-chip v-if="posts.bereich.group_type_stack">{{ posts.bereich.group_type_stack}}</v-chip>
                </div>
              
              <!-- <v-btn flat color="black">{{ posts.region.bundesland}}</v-btn>
              <v-btn flat color="purple">{{ posts.bereich.group}}</v-btn>
              <v-btn flat color="orange">{{ posts.bereich.group_type}}</v-btn>
              <v-btn flat color="green">{{ posts.bereich.group_type_stack}}</v-btn>-->
              <v-spacer></v-spacer>
              <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn icon>
                        <v-icon>favorite</v-icon>
                      </v-btn>
                      <v-btn icon >
                        <v-icon @click="saved">bookmark</v-icon>
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
  </div>

  


  
</template>

<script>
import axios from "axios/dist/axios.min.js";
//import Filter from "./SideFilter";
import scrollMonitor from "scrollmonitor/scrollMonitor.js"
import Filter from "@/components/SideFilter";
export default {
    components: {
    'filters-cmp': Filter,
  },
    data () {
      return {
        dialog: false,
        drawer: null,
        dialog: false,
        show: false,
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
      this.fetchData()
    },
    methods: {
      // Create an array the length of our items
      // with all values as true
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
      appendItems () {
              if (this.results.length < this.total_results.length) {
                  var next_data = this.total_results.slice(this.results.length, this.results.length + 10);
                  this.results = this.results.concat(next_data);
              }
          },
      fetchData() {
          axios.get('http://127.0.0.1:5000/'+this.section)
          .then((resp) => {
            this.total_results = resp.data.project_lists
            this.results = resp.data.project_lists.slice(0, 10)
            console.log(resp)
          })
          .catch((err) => {
            console.log(err)
          })
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

