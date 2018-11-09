<template>
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
            <v-btn flat>{{ posts.region.bundesland}}</v-btn>
            <v-btn flat color="purple">{{ posts.bereich.group}}</v-btn>
            <v-spacer></v-spacer>
            <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>bookmark</v-icon>
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
          <v-card-title
            class="grey lighten-4 py-4 title"
          >
            To
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                </v-layout>
              </v-flex>
              
              <v-flex xs12>
                <v-text-field
                  prepend-icon="mail"
                  placeholder="Email"
                ></v-text-field>
              </v-flex>
              
              <v-flex xs12>
                <v-text-field
                  prepend-icon="notes"
                  placeholder="Notes"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
            <v-btn flat @click="dialog = false">Send</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>

    
  </v-container>
  
</template>

<script>
import axios from "axios/dist/axios.min.js";
import Filter from "./SideFilter";
import scrollMonitor from "scrollmonitor/scrollMonitor.js"
export default {
    components: {
    'filters-fill': Filter
  },
    data () {
      return {
        dialog: false,
        show: false,
        results: [],
        total_results: [],
        panel: [],
        items: 5,
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
      appendItems () {
              if (this.results.length < this.total_results.length) {
                  var next_data = this.total_results.slice(this.results.length, this.results.length + 10);
                  this.results = this.results.concat(next_data);
              }
          },
      },
    mounted() {
    axios
      .get("http://127.0.0.1:5000/home")
      .then(response => {
        this.total_results = response.data.project_lists
        this.results = response.data.project_lists.slice(0, 10)
        });
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

