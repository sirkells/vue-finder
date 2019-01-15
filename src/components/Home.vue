/* eslint-disable no-console */
/* eslint-disable no-console */
/* eslint-disable max-len */
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
        <v-btn small flat color="grey" @click="sortBy()">
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

                      color="primary"

                      light
                      @click="reset"
                    >
                      Reset
                    </v-btn>

                    <v-spacer></v-spacer>

                  </v-toolbar>


                  <v-list>


                    <v-chip v-for="select in selectedFilter" :key="select.title" close @click="">{{ select }}</v-chip>
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
                        @click=""

                      >
                        <v-list-tile-content >
                          <v-chip  @click="check(item.title, subItem.key)">{{ subItem.key }} ({{ subItem.count }})</v-chip>
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
                            <v-chip :class="{success: lActive}" @click="lActive = !lActive,lData='bundesland='+posts.region.bundesland, getLocation('bundesland='+posts.region.bundesland)" v-if="posts.region.bundesland">{{ posts.region.bundesland}}</v-chip>
                            <v-chip :class="{warning: gActive}"  @click="gActive = !gActive, gData='group=' + posts.bereich.group, getGroup('group=' + posts.bereich.group)" v-if="posts.bereich.group">{{ posts.bereich.group}}</v-chip>
                            <v-chip :class="{error: gtActive}" @click="gtActive = !gtActive, gtData='groupType=' + posts.bereich.group_type, getGrouptype('groupType=' + posts.bereich.group_type)" v-if="posts.bereich.group_type">{{ posts.bereich.group_type}}</v-chip>
                            <v-chip :class="{info: gtsActive}" @click="gtsActive = !gtsActive, gtsData= 'groupStack=' + posts.bereich.group_type_stack, getGroupstack('groupStack=' + posts.bereich.group_type_stack)" v-if="posts.bereich.group_type_stack">{{ posts.bereich.group_type_stack}}</v-chip>
                            <v-chip :class="{info: pActive}" @click="pActive = !pActive, pData= 'platform=' + posts.bereich.platform, getPlatform('platform=' + posts.bereich.platform)" v-if="posts.bereich.platform">{{ posts.bereich.platform}}</v-chip>
                            <v-chip :class="{info: pnActive}" @click="pnActive = !pnActive, pnData='platform_name=' + posts.bereich.platform_name, getPlatform_name('platform_name=' + posts.bereich.platform_name)" v-if="posts.bereich.platform_name">{{ posts.bereich.platform_name}}</v-chip>
                            <!--encodeURIComponent used to encode c# due to error caused by # -->
                            <v-chip :class="{purple: skActive}" @click="skActive = !skActive, skData ='skill=' +  encodeURIComponent(posts.bereich.skill),  getSk('skill=' +  encodeURIComponent(posts.bereich.skill))" v-if="posts.bereich.skill">{{ posts.bereich.skill}}</v-chip>
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
                                    @click="dialog = !dialog, shareProject(index)"

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
import Cockpit from '@/components/Cockpit';


export default {
  name: 'Home',
  // props passed from APP.vue refreshHome to refreshHompage
  // searchTerm to get search term and searchCalled to trigger the watcher when search is entered
  props: ['refreshHome', 'search_term', 'searchCalled', 'filter'],
  components: {
    'cock-cmp': Cockpit,
  },
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
      drawer: null,
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
      selectedRegion: [],
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
      allRegion: [],
      allSkill: [],
      cc: [],
    };
  },
  created() {
    this.reset();
  },

  methods: {
    login(payload) {
      const path = 'http://localhost:5000/login';
      axios.post(path, payload)
        .then(() => {
          // eslint-disable-next-line no-alert
          alert('login succesful');
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getBooks();
        });
    },
    // checks which filter group was clicked
    check(a, b) {
      if (a === 'Category') {
        this.url = 'http://127.0.0.1:5000/api/?';
        const link = `group=${b}`;
        this.gData = link;
        this.getGroup(link);
        this.gActive = !this.gActive;
      } else if (a === 'Sub-Category') {
        this.url = 'http://127.0.0.1:5000/api/?';
        const link = `groupType=${b}`;
        this.gtData = link;
        this.getGrouptype(link);
        this.gtActive = !this.gtActive;
      } else if (a === 'Stack') {
        this.url = 'http://127.0.0.1:5000/api/?';
        const link = `groupStack=${b}`;
        this.gtsData = link;
        this.getGroupstack(link);
        this.gtsActive = !this.gtsActive;
      } else if (a === 'Skills') {
        this.url = 'http://127.0.0.1:5000/api/?';
        const link = `skill_summary=${b}`;
        this.sksmData = link;
        this.getSkSm(link);
        this.sksmActive = true;
      } else if (a === 'Bundesland') {
        const link = `bundesland=${b}`;
        this.lData = link;
        this.getLocation(link);
        this.lActive = !this.lActive;
      }
    },
    // location filter
    getLocation(a) {
      if (!this.gActive && !this.gtActive && !this.gtsActive && !this.skActive && !this.sksmActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(a);
      } else if (this.gActive && !this.gtActive && !this.gtsActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}`);
      } else if (this.gtActive && !this.gActive && !this.gtsActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gtData}`);
      } else if (this.gtsActive && !this.gActive && !this.gtActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gtsData}`);
      } else if (this.skActive && !this.gActive && !this.gtActive && !this.gtsActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.skData}`);
      } else if (this.gActive && this.gtActive && !this.gtsActive && !this.skActive && !this.sksmActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}&${this.gtData}`);
      } else if (this.gActive && this.gtActive && this.gtsActive && !this.skActive && !this.sksmActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}&${this.gtData}&${this.gtsData}`);
      } else if (this.sksmActive && !this.gActive && !this.gtActive && !this.gtsActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.sksmData}`);
      } else if (this.sksmActive && this.gActive && !this.gtActive && !this.gtsActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.sksmData}&${this.gData}`);
      } else if (this.sksmActive && this.gActive && this.gtActive && !this.gtsActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.sksmData}&${this.gData}&${this.gtData}`);
      } else if (this.sksmActive && this.gActive && this.gtActive && this.gtsActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.sksmData}&${this.gData}&${this.gtData}&${this.gtsData}`);
      }
    },
    // group filter
    getGroup(a) {
      if (!this.lActive && !this.gtActive && !this.gtsActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(a);
      } else if (this.lActive && !this.gtActive && !this.gtsActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.lData}`);
      } else if (this.gtActive && !this.lActive && !this.gtsActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gtData}`);
      } else if (this.gtsActive && !this.lActive && !this.gtActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gtsData}`);
      } else if (this.skActive && !this.lActive && !this.gtActive && !this.gtsActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.skData}`);
      }
    },
    // group type filter
    getGrouptype(a) {
      if (!this.gActive && !this.lActive && !this.gtsActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(a);
      } else if (this.lActive && this.gActive && !this.gtsActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.lData}&${this.gData}`);
      } else if (this.gActive && !this.lActive && !this.gtsActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}`);
      } else if (this.gtsActive && !this.lActive && !this.gActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gtsData}`);
      } else if (this.skActive && !this.lActive && !this.gActive && !this.gtsActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.skData}`);
      }
    },
    // group stack filter
    getGroupstack(a) {
      if (!this.gActive && !this.lActive && !this.gtActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(a);
      } else if (this.lActive && !this.gActive && !this.gtActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.lData}`);
      } else if (this.gActive && !this.lActive && !this.gtActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}`);
      } else if (this.gtActive && !this.lActive && !this.gActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gtData}`);
      } else if (this.skActive && !this.lActive && !this.gActive && !this.gtActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.skData}`);
      } else if (this.gActive && this.gtActive && !this.lActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}&${this.gtData}`);
      } else if (this.gActive && this.gtActive && this.lActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}&${this.gtData}&${this.lData}`);
      }
    },
    // platform filter
    getPlatform(a) {
      if (!this.gActive && !this.lActive && !this.gtsActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(a);
      } else if (this.lActive && !this.gActive && !this.gtActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.lData}`);
      } else if (this.gActive && !this.lActive && !this.gtActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}`);
      } else if (this.gtActive && !this.lActive && !this.gActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gtData}`);
      } else if (this.gtsActive && !this.lActive && !this.gActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gtsData}`);
      } else if (this.skActive && !this.lActive && !this.gActive && !this.gtActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.skData}`);
      }
    },
    // platform_name filter
    getPlatform_name(a) {
      if (!this.gActive && !this.lActive && !this.gtsActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(a);
      } else if (this.lActive && !this.gActive && !this.gtActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.lData}`);
      } else if (this.gActive && !this.lActive && !this.gtActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}`);
      } else if (this.gtActive && !this.lActive && !this.gActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gtData}`);
      } else if (this.gtsActive && !this.lActive && !this.gActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gtsData}`);
      } else if (this.skActive && !this.lActive && !this.gActive && !this.gtActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.skData}`);
      }
    },
    // bereich.skill fillter
    getSk(a) {
      if (!this.gActive && !this.lActive && !this.gtsActive && !this.gtActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(a);
      } else if (this.lActive && !this.gActive && !this.gtActive && !this.gtsActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.lData}`);
      } else if (this.gActive && !this.lActive && !this.gtActive && !this.gtsActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}`);
      } else if (this.gtActive && !this.lActive && !this.gActive && !this.gtsActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gtData}`);
      } else if (this.gtsActive && !this.lActive && !this.gActive && !this.gtsActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gtsData}`);
      } else if (this.gtsActive && !this.lActive && !this.gActive && !this.gtActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.skData}`);
      }
    },
    // for skill_summary filter
    getSkSm(a) {
      if (!this.gActive && !this.lActive && !this.gtsActive && !this.gtActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(a);
      // eslint-disable-next-line max-len
      } else if (this.lActive && !this.gActive && !this.gtActive && !this.gtsActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.lData}`);
      // eslint-disable-next-line max-len
      } else if (this.gActive && !this.lActive && !this.gtActive && !this.gtsActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}`);
      // eslint-disable-next-line max-len
      } else if (this.gActive && this.lActive && !this.gtActive && !this.gtsActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}&${this.lData}`);
      } else if (this.gActive && this.gtActive && !this.lActive && !this.gtsActive && !this.skActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}&${this.gtData}`);
      } else if (this.gActive && this.gtActive && this.gtsActive && !this.skActive && !this.lActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}&${this.gtData}&${this.gtsData}`);
      } else if (this.gActive && this.gtActive && !this.gtsActive && this.lActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}&${this.gtData}&${this.lData}`);
      } else if (this.gActive && this.gtActive && this.gtsActive && this.lActive) {
        this.url = 'http://127.0.0.1:5000/api/?';
        this.fetchData(`${a}&${this.gData}&${this.gtData}&${this.gtsData}&${this.lData}`);
      }
    },
    sortBy() {
      this.results.sort((a, b) => parseFloat(a.date_post) - parseFloat(b.date_post));
      // eslint-disable-next-line no-plusplus
    },
    // toggles color of tags clicked
    // to toggle the style class in any element
    // this toggles the error--text class when button is clicked
    myToggleFunction(event) {
      // error--text is a stlyin class for v-icon
      event.target.classList.toggle('error--text');
      // let button = event.target;
      // console.log(button.classList)
    },
    reset() {
      this.url = 'http://127.0.0.1:5000/api/?';
      this.fetchData('');
      this.sksmActive = false;
      this.pActive = false;
      this.pnActive = false;
      this.gtActive = false;
      this.gtsActive = false;
      this.gActive = false;
      this.skActive = false;
      this.lActive = false;
      this.link = '';
      this.section = '';
      this.selectedFilter = [];
    },
    // Create an array the length of our items
    // with all values as true
    all() {
      // eslint-disable-next-line no-unused-vars
      this.panel = [...Array(this.items).keys()].map(_ => true);
    },
    // Reset the panel
    none() {
      this.panel = [];
    },
    // allert when project has been bookmarked
    saved() {
      // eslint-disable-next-line no-alert
      alert('Project has been bookmarked');
    },
    addToCockpit(index) {
      const payload = this.results[index];
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
    bundesland_val(land) {
      this.link = `bundesland=${land}`;
      // eslint-disable-next-line no-console
      console.log(this.link);
    },
    appendItems() {
      if (this.results.length < this.total_results.length) {
        const nextData = this.total_results.slice(this.results.length, this.results.length + 10);
        this.results = this.results.concat(nextData);
      }
    },
    // fetchs data from API
    fetchData(section) {
      const a = this.url + section;
      axios.get(a)
        .then((resp) => {
          // total results gets all the data from the api
          this.total_results = resp.data.project_lists;
          // results takes only 10 data and returns 10 everytime scrllbar ends
          this.results = resp.data.project_lists.slice(0, 10);
          this.selectedRegion = resp.data.aggRegion;
          this.allAggs = resp.data.AllAggs;
          this.allRegion = resp.data.Allregion;
          this.allSkill = resp.data.Allskill;
          // eslint-disable-next-line no-console
          console.log(this.aggs);
          // eslint-disable-next-line no-console
          console.log(resp);
          // eslint-disable-next-line no-console
          console.log(a);
        })
        .catch((err) => {
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
      // eslint-disable-next-line no-console
      console.log(this.refreshHome);
    },

    // watches the searchterm is been trigered by the keyboard event
    searchCalled() {
      // checks if theres any letter is enterd in search bar.
      if (this.search_term.length <= 1) {
        // if none, it changes the url to home
        this.url = 'http://127.0.0.1:5000/api/?';
        // and it returns all projects
        this.fetchData('');
      // eslint-disable-next-line brace-style
      }
      // if theres a searchterm
      else {
        // eslint-disable-next-line no-console
        console.log(this.search_term);
        // changes url to query url
        this.url = 'http://127.0.0.1:5000/api/search/?';
        // fetches data based on search term.
        // search as you type feature enabled
        // due to keyboardup.prevent event in the App.vue search textfield event
        const term = `search_term=${this.search_term}`;
        // eslint-disable-next-line no-console
        console.log(term);
        this.fetchData(term);
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
