<template>
  <v-container
    grid-list-md
    fluid
    container
  >
    <section v-if="noCockpitData">
      <p>{{ noCockpitDataMsg }}</p>
    </section>
    <section v-else-if="!loggedIn">
      <p>You are currently not logged in</p>
    </section>
    <section v-else>
      <!-- contents -->
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          v-for="(posts, index) in resultApi"
          :key="index"
        >
          <v-card>
            <v-card-title primary>
              <div>
                <div><a
                    :href="posts.url"
                    target="_blank"
                  >
                    <b>{{ posts.title }}</b>
                  </a></div>
                {{posts.description.slice(0, 400)}}
              </div>
            </v-card-title>
            <v-card-actions @dblclick="removeCockpitData(posts.id)">
              <div class="text-xs-center">
                <v-chip v-if="posts.region.bundesland">{{ posts.region.bundesland}}</v-chip>
                <v-chip v-if="posts.bereich.group">{{ posts.bereich.group}}</v-chip>
                <v-chip v-if="posts.bereich.group_type">{{ posts.bereich.group_type}}</v-chip>
                <v-chip v-if="posts.bereich.group_type_stack">
                  {{ posts.bereich.group_type_stack}}
                </v-chip>
                <!-- Mobile App Platform -->
                <v-chip v-if="posts.bereich.platform">{{ posts.bereich.platform}}</v-chip>
                <!-- Mobile App Platform Name -->
                <v-chip v-if="posts.bereich.platform_name">{{ posts.bereich.platform_name}}
                </v-chip>
              </div>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn
                  class="error"
                  @click="removeCockpitData(posts.id)"
                >
                  Remove
                </v-btn>
              </v-card-actions>
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
    resultApi() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.results.sort(this.byProperty('date_added'));
    },
  },
  methods: {
    byProperty(prop) {
      // eslint-disable-next-line func-names
      return function (a, b) {
        if (typeof a[prop] === 'number') {
          return (b[prop] - a[prop]);
        }
        // eslint-disable-next-line no-nested-ternary
        return ((a[prop] < b[prop]) ? -1 : ((a[prop] > b[prop]) ? 1 : 0));
      };
    },
    // fetch stored project from api
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
    // delete project from cockpit
    removeCockpitData(projectId) {
      axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.token}`;
      const path = `${this.baseUrl}/${projectId}`;
      // eslint-disable-next-line no-alert
      if (confirm('Are you sure you want to delete this project from your cockpit?')) {
        // Delete Project!
        axios.delete(path)
          .then(() => {
            this.fetchData(this.baseUrl);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      } else {
        // Do nothing!
      }
    },
  },
};
</script>
