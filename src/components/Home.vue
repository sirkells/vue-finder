
<template>
  <v-container
    grid-list-md
    fluid
    container
  >
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
        :searchTerm="searchTerm"
        :searchTrigger="seachTrigger"
        :removeChip="removeChip"
      >
      </side-filter>
      <!-- Contents -->
      <project-cards
        :resultApi="resultApi"
        :myToggleFunction="myToggleFunction"
        :addToCockpit='addToCockpit'
        :shareProject="shareProject"
        :toggleShareForm="toggleShareForm"
      >
      </project-cards>
      <!-- Share dialog form -->
      <share-project-form
        v-if="shareDialog"
        :shareFormStatus="shareFormStatus"
        :message_body="message_body"
        :subject="subject"
      ></share-project-form>
    </section>
  </v-container>
</template>

<script>
// eslint-disable-next-line import/extensions
import axios from 'axios/dist/axios.min.js';
// eslint-disable-next-line import/extensions
import scrollMonitor from 'scrollmonitor/scrollMonitor.js';
import Filter from './SideFilter';
import Project from './ProjectCard';
import ShareProjectForm from './ShareProjectForm';

export default {
  name: 'Home',
  // props passed from APP.vue refreshHome to refreshHompage
  // searchTerm to get search term and searchCalled to trigger the watcher when search is entered
  props: ['refreshHome', 'searchCalled', 'draw'],
  components: {
    'side-filter': Filter,
    'project-cards': Project,
    'share-project-form': ShareProjectForm,
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
      shareFormStatus: false,
      errored: false,
      loading: true,
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
      filterObj: [],
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
    shareDialog() {
      return this.$store.state.shareDialog;
    },
    searchTerm() {
      return this.$store.state.searchTerm;
    },
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
      if (this.searchTerm) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.resultsFromStore.sort(this.byProperty('score'));
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.$store.state.results;
    },
    assignUrl() {
      if (this.searchTerm) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        const url = `http://127.0.0.1:5000/api/?search_term=${this.searchTerm}`;
        return url;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      const url = 'http://127.0.0.1:5000/api/?';
      return url;
    },
    // eslint-disable-next-line vue/return-in-computed-property
  },
  methods: {
    toggleShareForm() {
      this.$store.commit('toggleShareDialog', true);
    },
    // creates url filters to fetch data
    getFilterQuery(path, key) {
      const section = path + key;
      const filter = { query: path.slice(1, -1), value: key };
      this.filterObj.push(filter);
      this.fetchData(section, this.filterObj);
      const filterDict = { title: key, filter: section, closed: true };
      this.selectedFilter.push(filterDict);
      this.url = this.url + section;
    },
    // // remove selected filter chips
    removeChip(chip) {
      // create the regex
      const re = new RegExp(chip, 'gi');
      // use regex to create new url string without the deleted filter
      const newUrl = this.url.replace(re, '');
      // console.log(`old:${this.url}`);
      // console.log(`new:${newUrl}`);
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
      this.fetchData('');
      this.section = '';
      this.selectedFilter = [];
      this.currrentUrl = [];
      this.$store.commit('resetCalled');
      this.filterObj = [];
    },
    addToCockpit(index) {
      const payload = this.resultApi[index];
      payload.date_added = Date.now();
      // eslint-disable-next-line no-console
      console.log(payload);
      const path = 'http://localhost:5000/api/cockpit';
      axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.token}`;
      axios.post(path, payload)
        .then((response) => {
          if (response.data.status === 600) {
            // eslint-disable-next-line no-alert
            alert('Duplicate record found, Project not added');
          } else {
            // eslint-disable-next-line no-alert
            alert('Project added succesful');
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
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
    fetchData(section, filterObj) {
      const urlPath = `${this.url + section}`;
      this.$store.commit('getParams', filterObj);
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
      if (this.searchTerm) {
        this.url = this.assignUrl;
        this.fetchData('');
      } else {
        this.reset();
      }
    },
  },

  mounted() {
    const vueInstance = this;
    const elem = document.getElementById('product-list-bottom');
    const watcher = scrollMonitor.create(elem);
    watcher.enterViewport(() => {
      vueInstance.appendItems();
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 3000px;
}
.main {
  margin-top: 60px; /* Add a top margin to avoid content overlay */
}
</style>
