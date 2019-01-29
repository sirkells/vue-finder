<template>
    <v-container grid-list-md  fluid container>
      <section v-if="noCockpitData">
        <p>{{ noCockpitDataMsg }}</p>
      </section>
      <section v-else>
        <!-- contents -->
        <v-layout row wrap>
          <v-flex
            xs12
            v-for="(posts, index) in results"
            :key="index" >
            <v-card>
              <v-card-title primary>
                <div>
                  <div class=""><b>{{ posts.title }}</b></div>
                  {{posts.description}}
                </div>
              </v-card-title>
              <v-card-actions>
                  <div class="text-xs-center">
                    <v-chip v-if="posts.region.bundesland">{{ posts.region.bundesland}}</v-chip>
                    <v-chip v-if="posts.bereich.group">{{ posts.bereich.group}}</v-chip>
                    <v-chip v-if="posts.bereich.group_type">{{ posts.bereich.group_type}}</v-chip>
                    <v-chip v-if="posts.bereich.group_type_stack">
                      {{ posts.bereich.group_type_stack}}
                    </v-chip>
                    <v-chip v-if="posts.bereich.skill">{{ posts.bereich.skill}}</v-chip>
                    <v-chip v-if="posts._id.$oid">{{ posts._id.$oid }}</v-chip>
                    <v-chip v-if="posts._id.$oid">{{ index }}</v-chip>
                  </div>
                <!-- <v-btn flat color="black">{{ posts.region.bundesland}}</v-btn>
                <v-btn flat color="purple">{{ posts.bereich.group}}</v-btn>
                <v-btn flat color="orange">{{ posts.bereich.group_type}}</v-btn>
                <v-btn flat color="green">{{ posts.bereich.group_type_stack}}</v-btn>-->
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </section>
    </v-container>
</template>

<script>
import Home from '@/components/Home';
// eslint-disable-next-line import/extensions
import axios from 'axios/dist/axios.min.js';

export default {
  name: 'Cockpit',
  components: {
    'home-cmp': Home,
  },
  data() {
    return {
      baseUrl: 'http://127.0.0.1:5000/api/cockpit',
      results: [],
      total_results: [],
      noCockpitData: false,
      noCockpitDataMsg: 'No item found in your cockpit',
    };
  },
  beforeCreate() {
    // eslint-disable-next-line no-console
    console.log('beforeCreate!');
  },
  created() {
    if (this.loggedIn) {
      this.fetchData(this.baseUrl);
      // eslint-disable-next-line no-console
      console.log(this.results);
    } else {
      this.$router.push('/logout');
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  methods: {
    fetchData(section) {
      axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.token}`;
      axios.get(section)
        .then((resp) => {
          // total results gets all the data from the api
          const cockpit = resp.data.project_lists;
          if (cockpit.length === 0) {
            this.noCockpitData = true;
          } else {
            this.noCockpitData = false;
            // results takes only 10 data and returns 10 everytime scrllbar ends
            this.results = cockpit;
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          this.noCockpitData = true;
        });
    },
  },
};
</script>
