
<template>
  <v-container grid-list-md fluid container>
    <section v-if="errored">
      <p>{{ erroredMessage }}</p>
    </section>
    <section v-else-if="loadingStatus">Loading.......</section>
    <section v-else>
      <!-- Navigation Drawer -->
      <!-- Side Filter component -->
        <side-filter
          :get="getFilterQuery"
          :reset="reset"
          :selectedFilter="selectedFilter"
          :searchTerm="search_term"
          :searchTrigger="seachTrigger"
          :removeChip="removeChip"
        >
        </side-filter>
      <!-- Contents -->
      <v-layout row wrap>
        <v-flex
          v-for="(posts, index) in resultApi"
          :key="index"
          xs12
        >
          <v-card>
            <v-card-title primary>
              <div>
                <div>
                  <a :href="posts.url" target="_blank">
                    <b>{{ posts.title }}</b>
                  </a>
                </div>
                {{posts.description}}
              </div>
            </v-card-title>
            <v-card-actions>
            <div class="text-xs-center">
              <!-- <v-chip v-if="posts.date_post">{{ posts.date_post}}</v-chip>
              <v-chip v-if="posts.score">{{ posts.score}}</v-chip>
              <v-chip v-if="posts.filter_date_post.$date">
                {{ posts.filter_date_post.$date}}</v-chip> -->

              <!-- location -->
              <v-chip :class="{success: lActive}"
              @click="lActive = !lActive,
              lData='bundesland='+posts.region.bundesland,
              getLocation('bundesland='+posts.region.bundesland)"
              v-if="posts.region.bundesland"
              >
                {{ posts.region.bundesland}}
              </v-chip>
              <!-- group -->
              <v-chip :class="{warning: gActive}"
              @click="gActive = !gActive,
                gData='group=' + posts.bereich.group,
                getGroup('group=' + posts.bereich.group)"
                v-if="posts.bereich.group"
              >
              {{ posts.bereich.group}}
              </v-chip>
              <!-- Group Type -->
              <v-chip :class="{error: gtActive}"
                @click="gtActive = !gtActive,
                gtData='groupType=' + posts.bereich.group_type,
                getGrouptype('groupType=' + posts.bereich.group_type)"
                v-if="posts.bereich.group_type"
              >
                {{ posts.bereich.group_type}}
              </v-chip>
              <!-- Group Stack -->
              <v-chip :class="{info: gtsActive}"
                @click="gtsActive = !gtsActive,
                gtsData= 'groupStack=' + posts.bereich.group_type_stack,
                getGroupstack('groupStack=' + posts.bereich.group_type_stack)"
                v-if="posts.bereich.group_type_stack"
              >
                {{ posts.bereich.group_type_stack}}
              </v-chip>
              <!-- Mobile App Platform -->
              <v-chip :class="{info: pActive}"
                @click="pActive = !pActive,
                pData= 'platform=' + posts.bereich.platform,
                getPlatform('platform=' + posts.bereich.platform)"
                v-if="posts.bereich.platform"
              >
                {{ posts.bereich.platform}}
              </v-chip>
              <!-- Mobile App Platform Name -->
              <v-chip :class="{info: pnActive}"
                @click="pnActive = !pnActive,
                pnData='platform_name=' + posts.bereich.platform_name,
                getPlatform_name('platform_name=' + posts.bereich.platform_name)"
                v-if="posts.bereich.platform_name"
              >
                {{ posts.bereich.platform_name}}
              </v-chip>
              <!-- Skill by Group Stack -->
              <!--encodeURIComponent used to encode c# due to error caused by # -->
              <v-chip :class="{purple: skActive}"
                @click="skActive = !skActive,
                skData ='skill=' +  encodeURIComponent(posts.bereich.skill),
                getSk('skill=' +  encodeURIComponent(posts.bereich.skill))"
                v-if="posts.bereich.skill"
              >
                {{ posts.bereich.skill}}
              </v-chip>
            </div>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- Favourite button -->
              <v-btn
              icon
              >
                <v-icon @click="myToggleFunction($event)" >favorite</v-icon>
              </v-btn>
              <!-- Bookmark button -->
              <v-btn icon >
                <v-icon @click="addToCockpit(index)">bookmark</v-icon>
              </v-btn>
              <!-- Share button -->
              <v-btn
              icon
              @click="dialog = !dialog, shareProject(index)"
              >
                <v-icon>share</v-icon>
              </v-btn>
            </v-card-actions>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    <!-- Share dialog form -->
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
              counter
              maxlength="120"
              full-width
              single-line
              type="text"

            ></v-text-field>
            <v-divider></v-divider>
            <v-textarea
              v-model="message_body"
              label="Message"
              counter
              maxlength="120"
              full-width
              single-line
              type="text"
            ></v-textarea>
          </v-form>
        </v-card>
    </v-dialog>
    </section>
  </v-container>
</template>

<script>
// eslint-disable-next-line import/extensions
import axios from 'axios/dist/axios.min.js';
// eslint-disable-next-line import/extensions
import scrollMonitor from 'scrollmonitor/scrollMonitor.js';
import Filter from './SideFilter';

export default {
  name: 'Home',
  // props passed from APP.vue refreshHome to refreshHompage
  // searchTerm to get search term and searchCalled to trigger the watcher when search is entered
  props: ['refreshHome', 'search_term', 'searchCalled', 'draw'],
  components: {
    'side-filter': Filter,
  },
  data() {
    return {
      category: false,
      tab: null,
      url: 'http://127.0.0.1:5000/api/?',
      bundesland: '',
      name: 'Filter',
      color: null,
      myActive: false,
      dialog: null,
      dark: false,
      show: false,
      isActive: false,
      lActive: false,
      gActive: false,
      gtActive: false,
      gtsActive: false,
      skActive: false,
      pActive: false,
      pnActive: false,
      sksmActive: false,
      errored: false,
      loading: true,
      cockpit: [],
      results: [],
      total_results: [],
      selectedFilter: [],
      selected: ['Trevor Handsen'],
      items: ['Kelechi Igbokwe', 'Paul Zimmer', 'Marco Hoher'],
      title: '',
      subject: '',
      message_body: '',
      seachTrigger: false,
      erroredMessage: "We're sorry, we're not able to retrieve this information at the moment, please try back later",
      currrentUrl: [],

    };
  },
  created() {
    if (this.loggedIn) {
      this.reset();
    } else {
      this.$router.push('/logout');
    }
  },
  computed: {
    loadingStatus() {
      return this.$store.state.loading;
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    resultsFromStore() {
      return this.$store.state.results;
    },
    totalResultsFromStore() {
      return this.$store.state.results;
    },
    resultApi() {
      if (this.seachTrigger) {
        // eslint-disable-next-line no-console
        console.log('yes');
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.resultsFromStore.sort(this.byProperty('score'));
      }
      // eslint-disable-next-line no-console
      console.log('no');
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.$store.state.results;
    },
    assignUrl() {
      if (this.seachTrigger) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        const url = `http://127.0.0.1:5000/api/?search_term=${this.search_term}`;
        return url;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      const url = 'http://127.0.0.1:5000/api/?';
      return url;
    },
    // eslint-disable-next-line vue/return-in-computed-property
  },
  methods: {
    // creates url filters to fetch data
    getFilterQuery(a, b) {
      const section = a + b;
      this.fetchData(section);
      const filterDict = { title: b, filter: section, closed: true };
      this.selectedFilter.push(filterDict);
      this.url = this.url + section;
    },
    // remove selected filter chips
    removeChip(chip) {
      // create the regex
      const re = new RegExp(chip, 'gi');
      // use regex to create new url string without the deleted filter
      const newUrl = this.url.replace(re, '');
      console.log(`old:${this.url}`);
      console.log(`new:${newUrl}`);
      this.url = newUrl;
      this.fetchData('');
    },
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

    // to toggle the style class of fav button
    myToggleFunction(event) {
      // error--text is a stlyin class for v-icon
      event.target.classList.toggle('error--text');
    },
    reset() {
      this.url = 'http://127.0.0.1:5000/api/?';
      this.resetFilters();
      this.fetchData('');
      this.section = '';
      this.selectedFilter = [];
      this.seachTrigger = false;
      this.currrentUrl = [];
      this.$store.commit('resetCalled');
    },
    resetFilters() {
      this.sksmActive = false;
      this.pActive = false;
      this.pnActive = false;
      this.gtActive = false;
      this.gtsActive = false;
      this.gActive = false;
      this.skActive = false;
      this.lActive = false;
      this.skActive = false;
    },
    addToCockpit(index) {
      const payload = this.resultApi[index];
      payload.date_added = Date.now();
      // eslint-disable-next-line no-console
      console.log(payload);
      const path = 'http://localhost:5000/api/cockpit';
      axios.post(path, payload)
        .then((response) => {
          if (response.data.status === 600) {
            // eslint-disable-next-line no-alert
            alert('Duplicate record found, Project not added');
          } else {
            // eslint-disable-next-line no-alert
            alert('Project added succesful');
            // eslint-disable-next-line no-console
            console.log(payload);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
      this.cockpit.push(this.resultApi[index]);
      // eslint-disable-next-line no-console
      console.log(this.cockpit.length);
    },
    shareProject(index) {
      this.message_body = `${this.resultApi[index].title}
      ${this.resultApi[index].url}`;
      this.subject = this.resultApi[index].title;
    },
    appendItems() {
      this.$store.dispatch('appendItems');
    },
    // fetchs data from store API
    fetchData(section) {
      const urlPath = `${this.url + section}`;
      this.$store.dispatch('fetchData', urlPath);
      this.currrentUrl.push(section);
    },
  },
  watch: {
    // refreshes the homepage
    refreshHome() {
      this.reset();
    },
    // watches the searchterm is been trigered by the keyboard event
    searchCalled() {
      if (this.search_term === null) {
        this.seachTrigger = false;
        this.reset();
      } else {
        this.seachTrigger = true;
        // eslint-disable-next-line no-console
        console.log(this.search_term);
        this.url = this.assignUrl;
        const term = `search_term=${this.search_term}`;
        // eslint-disable-next-line no-console
        console.log(term);
        this.fetchData('');
        // this.sortBy('score');
      }
    },
  },

  mounted() {
    const vueInstance = this;
    const elem = document.getElementById('product-list-bottom');
    const watcher = scrollMonitor.create(elem);
    watcher.enterViewport(() => {
      // eslint-disable-next-line no-console
      console.log('hello');
      vueInstance.appendItems();
    });
  },

};
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
