
<template>
  <v-container grid-list-md fluid container>
    <section v-if="errored">
      <p>{{ erroredMessage }}</p>
    </section>
    <section v-else-if="loading">Loading.......</section>
    <section v-else>
      <!-- Navigation Drawer -->
      <v-navigation-drawer
        width="300"
        fixed
        :clipped="$vuetify.breakpoint.mdAndUp"
        app
        light
        v-model="draw"
        v-show="$route.path==='/login' || $route.path==='/logout' ? false : true"
      >
        <v-list dense>
          <v-flex xs12 sm6 md12>
            <v-card >
              <v-toolbar color="blue darken-3" dark>
                <v-toolbar-title>Filter</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-btn

                  color="primary"

                  light
                  @click="reset"
                >
                  Reset
                </v-btn>
              </v-toolbar>

              <v-list>
                 <!-- Results Count -->
                <v-chip>
                  Showing {{ resultsCount }} results from {{ totalResultsCount }} records
                </v-chip>
                <v-btn flat @click="sorty()">
                  <v-icon small left>list</v-icon>
                  <span class="caption text-lowercase">Sort By Date</span>
                </v-btn>
                <!-- Filters -->
                <v-list-group
                  v-for="(item, index) in allAggs"
                  :key="index"
                >
                  <v-list-tile slot="activator">
                    <v-list-tile-content >
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile
                    v-for="(subItem, index) in item.items"
                    :key="index"
                  >
                    <v-list-tile-content >
                      <v-chip
                        @click="check(item.title, subItem.key)"
                      >
                        {{ subItem.key }} ({{ subItem.count }})
                      </v-chip>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon></v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list-group>
              </v-list>
            </v-card>
          </v-flex>
        </v-list>
        <!-- Selected Filters array Chips -->
        <v-chip
        v-for="select in selectedFilter"
        :key="select.title"
        close
        @input="removeChip(select)">
          {{ select }}
        </v-chip>
      </v-navigation-drawer>
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
              <v-chip v-if="posts.date_post">{{ posts.date_post}}</v-chip>
              <v-chip v-if="posts.score">{{ posts.score}}</v-chip>
              <v-chip v-if="posts.filter_date_post.$date">{{ posts.filter_date_post.$date}}</v-chip>
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
// import Filter from "./SideFilter";
// eslint-disable-next-line import/extensions
import scrollMonitor from 'scrollmonitor/scrollMonitor.js';

export default {
  name: 'Home',
  // props passed from APP.vue refreshHome to refreshHompage
  // searchTerm to get search term and searchCalled to trigger the watcher when search is entered
  props: ['refreshHome', 'search_term', 'searchCalled', 'draw'],
  data() {
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
      dark: false,
      show: false,
      isActive: false,
      lActive: false,
      lData: '',
      gActive: false,
      gData: '',
      gtActive: false,
      gtData: '',
      gtsActive: false,
      gtsData: '',
      skActive: false,
      skData: '',
      pActive: false,
      pData: '',
      pnActive: false,
      pnData: '',
      sksmActive: false,
      sksmData: '',
      errored: false,
      loading: true,
      cockpit: [],
      results: [],
      total_results: [],
      panel: [],
      selectedFilter: [],
      groupSelected: '',
      locSelected: '',
      selected: ['Trevor Handsen'],
      items: ['Kelechi Igbokwe', 'Paul Zimmer', 'Marco Hoher'],
      title: '',
      subject: '',
      message_body: '',
      section: '',
      link: '',
      group: false,
      country: [{ name: 'Germany' }, { name: 'England' }],
      cc: [],
      seachTrigger: false,
      totalAmount: '',
      drawerItems: [
        { icon: 'bookmark', text: 'Cockpit' },
        { icon: 'favoriter', text: 'Favorites' },
        { icon: 'mdi-logout', text: 'Logout' },
      ],
      drawer: false,
      erroredMessage: "We're sorry, we're not able to retrieve this information at the moment, please try back later",
      currrentUrl: [],
      // gClicked: false,
      // gtClicked: false,
      // gtsClicked: false,
      // skClicked: false,
      // sksmClicked: false,

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
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    resultApi() {
      if (this.seachTrigger) {
        // eslint-disable-next-line no-console
        console.log('yes');
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.results.sort(this.byProperty('score'));
      }
      // eslint-disable-next-line no-console
      console.log('no');
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.results;
    },
    assignUrl() {
      if (this.seachTrigger) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        const url = `http://127.0.0.1:5000/api/?search_term=${this.search_term}&`;
        return url;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      const url = 'http://127.0.0.1:5000/api/?';
      return url;
    },
    resultsCount() {
      return this.results.length;
    },
    totalResultsCount() {
      return this.totalAmount;
    },
  },
  methods: {
    groupChosen(a) {
      if (a === 'Development' || 'Infrastructure' || 'Data Science') {
        return true;
      }
      return false;
    },
    groupTChosen(a) {
      if (a === 'Web' || 'Mobile' || 'ERP ') {
        return true;
      }
      return false;
    },
    groupSChosen(a) {
      if (a === 'Frontend' || 'Backend' || 'Fullstack') {
        return true;
      }
      return false;
    },
    removeChip(selected) {
      this.selectedFilter = this.selectedFilter.filter(item => item !== selected);
      if (this.selectedFilter.length > 0) {
        // eslint-disable-next-line no-console
        console.log(this.currrentUrl);
        // const index = this.currrentUrl.length - 1;
        // eslint-disable-next-line no-mixed-operators
        if (selected === 'Development' || 'Infrastructure' || 'Data Science' && this.currrentUrl.find(value => /group=/.test(value))) {
          this.gActive = false;
          // eslint-disable-next-line no-console
          console.log('group');
          let currentIndex;
          currentIndex = this.currrentUrl.length - 1;
          this.currrentUrl.splice(currentIndex, 1);
          // eslint-disable-next-line no-console
          console.log(this.currrentUrl);
          currentIndex = this.currrentUrl.length - 1;
          // eslint-disable-next-line no-console
          console.log(this.currrentUrl[currentIndex]);
          this.fetchData(this.currrentUrl[currentIndex]);
        // eslint-disable-next-line no-mixed-operators
        } else if (selected === 'Web' || 'Mobile' || 'ERP' && this.currrentUrl.find(value => /groupType=/.test(value))) {
          this.gtActive = false;
          // eslint-disable-next-line no-console
          console.log('groupType');
          let currentIndex;
          currentIndex = this.currrentUrl.length - 1;
          this.currrentUrl.splice(currentIndex, 1);
          currentIndex = this.currrentUrl.length - 1;
          // eslint-disable-next-line no-console
          console.log(this.currrentUrl[currentIndex]);
          this.fetchData(this.currrentUrl[currentIndex]);
          this.gtActive = false;
        }
      } else {
        this.currrentUrl = [];
        // eslint-disable-next-line no-console
        console.log(this.currrentUrl);
        this.reset();
      }
    },
    sortBy(a) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.results.sort(this.byProperty(a));
    },
    destroy() {
      this.$store.state.token = null;
    },
    // checks which filter group was clicked
    check(a, b) {
      this.url = this.assignUrl;
      if (a === 'Category') {
        const link = `group=${b}`;
        this.gData = link;
        this.getGroup(link);
        this.gActive = !this.gActive;
        this.selectedFilter.push(b);
      } else if (a === 'Sub-Category') {
        const link = `groupType=${b}`;
        this.gtData = link;
        this.getGrouptype(link);
        this.gtActive = !this.gtActive;
        this.selectedFilter.push(b);
      } else if (a === 'Stack') {
        const link = `groupStack=${b}`;
        this.gtsData = link;
        this.getGroupstack(link);
        this.gtsActive = !this.gtsActive;
        this.selectedFilter.push(b);
      } else if (a === 'Skills') {
        const link = `skill_summary=${b}`;
        this.sksmData = link;
        this.getSkSm(link);
        this.sksmActive = true;
        this.selectedFilter.push(b);
      } else if (a === 'Bundesland') {
        const link = `bundesland=${b}`;
        this.lData = link;
        this.getLocation(link);
        this.lActive = !this.lActive;
        this.selectedFilter.push(b);
      }
    },
    // location filter
    getLocation(a) {
      this.url = this.assignUrl;
      if (!this.gActive && !this.gtActive && !this.gtsActive
          && !this.skActive && !this.sksmActive) {
        this.fetchData(a);
      } else if (this.gActive && !this.gtActive && !this.gtsActive && !this.skActive) {
        this.fetchData(`${a}&${this.gData}`);
      } else if (this.gtActive && !this.gActive && !this.gtsActive && !this.skActive) {
        this.fetchData(`${a}&${this.gtData}`);
      } else if (this.gtsActive && !this.gActive && !this.gtActive && !this.skActive) {
        this.fetchData(`${a}&${this.gtsData}`);
      } else if (this.skActive && !this.gActive && !this.gtActive && !this.gtsActive) {
        this.fetchData(`${a}&${this.skData}`);
      } else if (this.gActive && this.gtActive && !this.gtsActive
                  && !this.skActive && !this.sksmActive) {
        this.fetchData(`${a}&${this.gData}&${this.gtData}`);
      } else if (this.gActive && this.gtActive && this.gtsActive
                  && !this.skActive && !this.sksmActive) {
        this.fetchData(`${a}&${this.gData}&${this.gtData}&${this.gtsData}`);
      } else if (this.sksmActive && !this.gActive && !this.gtActive && !this.gtsActive) {
        this.fetchData(`${a}&${this.sksmData}`);
      } else if (this.sksmActive && this.gActive && !this.gtActive && !this.gtsActive) {
        this.fetchData(`${a}&${this.sksmData}&${this.gData}`);
      } else if (this.sksmActive && this.gActive && this.gtActive && !this.gtsActive) {
        this.fetchData(`${a}&${this.sksmData}&${this.gData}&${this.gtData}`);
      } else if (this.sksmActive && this.gActive && this.gtActive && this.gtsActive) {
        this.fetchData(`${a}&${this.sksmData}&${this.gData}&${this.gtData}&${this.gtsData}`);
      }
    },
    // group filter
    getGroup(a) {
      this.url = this.assignUrl;
      if (!this.lActive && !this.gtActive && !this.gtsActive && !this.skActive) {
        this.fetchData(a);
      } else if (this.lActive && !this.gtActive && !this.gtsActive && !this.skActive) {
        this.fetchData(`${a}&${this.lData}`);
      } else if (this.gtsActive && !this.lActive && !this.gtActive && !this.skActive) {
        this.fetchData(`${a}&${this.gtsData}`);
      } else if (this.skActive && !this.lActive && !this.gtActive && !this.gtsActive) {
        this.fetchData(`${a}&${this.skData}`);
      }
    },
    // group type filter
    getGrouptype(a) {
      this.url = this.assignUrl;
      if (!this.gActive && !this.lActive && !this.gtsActive && !this.skActive && !this.sksmActive) {
        this.fetchData(a);
      } else if (this.gActive && !this.lActive && !this.gtsActive
                  && !this.skActive && !this.sksmActive) {
        this.fetchData(`${a}&${this.gData}`);
      } else if (this.gtsActive && !this.lActive && !this.gActive
                  && !this.skActive && !this.sksmActive) {
        this.fetchData(`${a}&${this.gtsData}`);
      } else if (this.lActive && !this.gtsActive && !this.gActive
                  && !this.skActive && !this.sksmActive) {
        this.fetchData(`${a}&${this.lData}`);
      } else if (this.sksmActive && !this.lActive && !this.gtsActive
                  && !this.skActive && !this.gActive) {
        this.fetchData(`${a}&${this.sksmData}`);
      } else if (this.lActive && this.gActive && !this.gtsActive
                  && !this.skActive && !this.sksmActive) {
        this.fetchData(`${a}&${this.lData}&${this.gData}`);
      } else if (this.lActive && this.gtsActive && !this.gActive
                  && !this.skActive && !this.sksmActive) {
        this.fetchData(`${a}&${this.lData}&${this.gtsData}`);
      } else if (this.lActive && this.sksmActive && !this.gtsActive
                  && !this.skActive && !this.gActive) {
        this.fetchData(`${a}&${this.lData}&${this.sksmData}`);
      } else if (this.gActive && this.lActive && this.gtsActive && !this.skActive) {
        this.fetchData(`${a}&${this.gData}&${this.lData}&${this.gtsData}`);
      } else if (this.gtsActive && this.lActive && this.gActive
                  && this.sksmActive && !this.skActive) {
        this.fetchData(`${a}&${this.gtsData}&${this.lData}&${this.sksmData}&${this.gData}`);
      } else if (this.skActive && !this.lActive && !this.gActive && !this.gtsActive) {
        this.fetchData(`${a}&${this.skData}`);
      }
    },
    // group stack filter
    getGroupstack(a) {
      this.url = this.assignUrl;
      if (!this.gActive && !this.lActive && !this.gtActive && !this.skActive && !this.sksmActive) {
        this.fetchData(a);
      } else if (this.gActive && !this.lActive && !this.gtActive
                  && !this.skActive && !this.sksmActive) {
        this.fetchData(`${a}&${this.gData}`);
      } else if (this.gtActive && !this.lActive && !this.gActive
                  && !this.skActive && !this.sksmActive) {
        this.fetchData(`${a}&${this.gtData}`);
      } else if (this.lActive && !this.gtActive && !this.gActive
                  && !this.skActive && !this.sksmActive) {
        this.fetchData(`${a}&${this.lData}`);
      } else if (this.sksmActive && !this.lActive && !this.gtActive
                  && !this.skActive && !this.gActive) {
        this.fetchData(`${a}&${this.sksmData}`);
      } else if (this.lActive && this.gActive && !this.gtActive
                  && !this.skActive && !this.sksmActive) {
        this.fetchData(`${a}&${this.lData}&${this.gData}`);
      } else if (this.lActive && this.gtActive && !this.gActive
                  && !this.skActive && !this.sksmActive) {
        this.fetchData(`${a}&${this.lData}&${this.gtData}`);
      } else if (this.lActive && this.sksmActive && !this.gtActive
                  && !this.skActive && !this.gActive) {
        this.fetchData(`${a}&${this.lData}&${this.sksmData}`);
      } else if (this.gActive && this.lActive && this.gtActive
                  && !this.skActive) {
        this.fetchData(`${a}&${this.gData}&${this.lData}&${this.gtData}`);
      } else if (this.gtActive && this.lActive && this.gActive
                  && this.sksmActive && !this.skActive) {
        this.fetchData(`${a}&${this.gtData}&${this.lData}&${this.sksmData}&${this.gData}`);
      } else if (this.skActive && !this.lActive && !this.gActive && !this.gtActive) {
        this.fetchData(`${a}&${this.skData}`);
      }
    },
    // platform filter
    getPlatform(a) {
      this.url = this.assignUrl;
      if (!this.gActive && !this.lActive && !this.gtsActive && !this.skActive) {
        this.fetchData(a);
      } else if (this.lActive && !this.gActive && !this.gtActive && !this.skActive) {
        this.fetchData(`${a}&${this.lData}`);
      } else if (this.gActive && !this.lActive && !this.gtActive && !this.skActive) {
        this.fetchData(`${a}&${this.gData}`);
      } else if (this.gtActive && !this.lActive && !this.gActive && !this.skActive) {
        this.fetchData(`${a}&${this.gtData}`);
      } else if (this.gtsActive && !this.lActive && !this.gActive && !this.skActive) {
        this.fetchData(`${a}&${this.gtsData}`);
      } else if (this.skActive && !this.lActive && !this.gActive && !this.gtActive) {
        this.fetchData(`${a}&${this.skData}`);
      }
    },
    // platform_name filter
    getPlatform_name(a) {
      this.url = this.assignUrl;
      if (!this.gActive && !this.lActive && !this.gtsActive && !this.skActive) {
        this.fetchData(a);
      } else if (this.lActive && !this.gActive && !this.gtActive && !this.skActive) {
        this.fetchData(`${a}&${this.lData}`);
      } else if (this.gActive && !this.lActive && !this.gtActive && !this.skActive) {
        this.fetchData(`${a}&${this.gData}`);
      } else if (this.gtActive && !this.lActive && !this.gActive && !this.skActive) {
        this.fetchData(`${a}&${this.gtData}`);
      } else if (this.gtsActive && !this.lActive && !this.gActive && !this.skActive) {
        this.fetchData(`${a}&${this.gtsData}`);
      } else if (this.skActive && !this.lActive && !this.gActive && !this.gtActive) {
        this.fetchData(`${a}&${this.skData}`);
      }
    },
    // bereich.skill fillter
    getSk(a) {
      this.url = this.assignUrl;
      if (!this.gActive && !this.lActive && !this.gtsActive && !this.gtActive) {
        this.fetchData(a);
      } else if (this.lActive && !this.gActive && !this.gtActive && !this.gtsActive) {
        this.fetchData(`${a}&${this.lData}`);
      } else if (this.gActive && !this.lActive && !this.gtActive && !this.gtsActive) {
        this.fetchData(`${a}&${this.gData}`);
      } else if (this.gtActive && !this.lActive && !this.gActive && !this.gtsActive) {
        this.fetchData(`${a}&${this.gtData}`);
      } else if (this.gtsActive && !this.lActive && !this.gActive && !this.gtsActive) {
        this.fetchData(`${a}&${this.gtsData}`);
      } else if (this.gtsActive && !this.lActive && !this.gActive && !this.gtActive) {
        this.fetchData(`${a}&${this.skData}`);
      }
    },
    // for skill_summary filter
    getSkSm(a) {
      this.url = this.assignUrl;
      if (!this.gActive && !this.lActive && !this.gtsActive && !this.gtActive && !this.skActive) {
        this.fetchData(a);
      // eslint-disable-next-line max-len
      } else if (this.lActive && !this.gActive && !this.gtActive && !this.gtsActive && !this.skActive) {
        this.fetchData(`${a}&${this.lData}`);
      // eslint-disable-next-line max-len
      } else if (this.gActive && !this.lActive && !this.gtActive && !this.gtsActive && !this.skActive) {
        this.fetchData(`${a}&${this.gData}`);
      // eslint-disable-next-line max-len
      } else if (this.gActive && this.lActive && !this.gtActive && !this.gtsActive && !this.skActive) {
        this.fetchData(`${a}&${this.gData}&${this.lData}`);
      } else if (this.gActive && this.gtActive && !this.lActive
                  && !this.gtsActive && !this.skActive) {
        this.fetchData(`${a}&${this.gData}&${this.gtData}`);
      } else if (this.gActive && this.gtActive && this.gtsActive
                  && !this.skActive && !this.lActive) {
        this.fetchData(`${a}&${this.gData}&${this.gtData}&${this.gtsData}`);
      } else if (this.gActive && this.gtActive && !this.gtsActive && this.lActive) {
        this.fetchData(`${a}&${this.gData}&${this.gtData}&${this.lData}`);
      } else if (this.gActive && this.gtActive && this.gtsActive && this.lActive) {
        this.fetchData(`${a}&${this.gData}&${this.gtData}&${this.gtsData}&${this.lData}`);
      }
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
    sorty() {
      this.resultApi.sort((a, b) =>
        Number(a.filter_date_post.$date) - Number(b.filter_date_post.$date));
      // ((a, b) => (a.filter_date_post.$date) - (b.filter_date_post.$date));
      // eslint-disable-next-line no-plusplus
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
      this.link = '';
      this.section = '';
      this.selectedFilter = [];
      this.seachTrigger = false;
      this.currrentUrl = [];
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
      const payload = this.results[index];
      payload.date_added = Date.now();
      // eslint-disable-next-line no-console
      console.log(payload);
      const path = 'http://localhost:5000/api/cockpit';
      axios.post(path, payload)
        .then(() => {
          // eslint-disable-next-line no-alert
          alert('added succesful');
          // eslint-disable-next-line no-console
          console.log(payload);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
      this.cockpit.push(this.results[index]);
      // eslint-disable-next-line no-console
      console.log(this.cockpit.length);
    },
    shareProject(index) {
      this.message_body = `${this.results[index].title}
      ${this.results[index].url}`;
      this.subject = this.results[index].title;
    },
    appendItems() {
      if (this.results.length < this.total_results.length) {
        const nextData = this.total_results.slice(this.results.length, this.results.length + 10);
        this.results = this.results.concat(nextData);
      }
    },
    // fetchs data from API
    fetchData(section) {
      axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.token}`;
      const a = `${this.url + section}`;
      this.currrentUrl.push(section);
      axios.get(a)
        .then((resp) => {
          // total results gets all the data from the api
          this.total_results = resp.data.project_lists;
          // results takes only 10 data and returns 10 everytime scrllbar ends
          this.results = resp.data.project_lists.slice(0, 10);
          this.allAggs = resp.data.AllAggs;
          this.totalAmount = resp.data.amount;
          // eslint-disable-next-line no-console
          console.log(this.results);
          // eslint-disable-next-line no-console
          console.log(resp);
          // eslint-disable-next-line no-console
          console.log(a);
        })
        // eslint-disable-next-line func-names
        .catch((err) => {
          // eslint-disable-next-line no-console
          if (err.response.status === 401) {
            // eslint-disable-next-line no-alert
            alert('Expired token. Reauthentication required');
            this.$router.push('/logout');
          }
          // eslint-disable-next-line no-console
          console.log(err);
          this.errored = false;
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => this.loading = false);
    },
  },
  watch: {
    // refreshes the homepage
    refreshHome() {
      this.reset();
    },
    // draw() {
    //   this.drawer = !this.drawer;
    // },
    // watches the searchterm is been trigered by the keyboard event
    searchCalled() {
      if (this.search_term.length <= 1) {
        this.seachTrigger = false;
        // eslint-disable-next-line no-unused-expressions
        this.url = this.assignUrl;
        this.reset();
      // eslint-disable-next-line brace-style
      }
      else {
        // fetches data based on search term.
        // search as you type feature enabled due to keyboardup.prevent
        this.seachTrigger = true;
        // eslint-disable-next-line no-unused-expressions

        // eslint-disable-next-line no-console
        console.log(this.search_term);
        this.url = this.assignUrl;
        const term = `search_term=${this.search_term}`;
        // eslint-disable-next-line no-console
        console.log(term);
        this.fetchData('');
      }
    },
  },

  mounted() {
    const vueInstance = this;
    const elem = document.getElementById('product-list-bottom');
    const watcher = scrollMonitor.create(elem);
    watcher.enterViewport(() => {
      // eslint-disable-next-line no-console
      // console.log('hello');
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
