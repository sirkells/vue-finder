<template>
  <v-container grid-list-md  fluid container>
    <v-layout row wrap>
      <v-flex xs12 v-for="(posts,i) in info" :key="i" >
        <v-card v-for="(post, index) in posts.project_lists" :key="index" >
          <v-card-title primary>
            <div>
              <div class=""><a :href="post.url" target="_blank"><b>{{ post.title }}</b></a></div>
              {{post.description.slice(0,350)}}
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat>{{ post.region.bundesland}}</v-btn>
            <v-btn flat color="purple">{{ post.bereich.group}}</v-btn>
            <v-spacer></v-spacer>
            <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>bookmark</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>share</v-icon>
                    </v-btn>
            </v-card-actions>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios/dist/axios.min.js";
import Filter from "./SideFilter";
export default {
    components: {
    'filters-fill': Filter
  },
    data () {
      return {
        show: false,
        info: [],
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
      }
    },
    mounted() {
    axios
      .get("http://127.0.0.1:5000/home")
      .then(response => (this.info = response));
  }
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

