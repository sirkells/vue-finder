
<template>
  <v-text-field
    :append="() => {}"
    placeholder="Search Projects..."
    single-line
    append-icon="search"
    color="white"
    hide-details
    clearable
    v-model="search_term"
    @keyup.prevent="searchQuery"
    @click:clear="refresh()"
  >
  </v-text-field>
</template>
<script>

export default {
  props: ['toggleSearchCall', 'refresh'],
  data: () => ({
    search_term: null,
  }),
  computed: {
    resetCalled() {
      return this.$store.getters.reset;
    },
  },
  methods: {
    searchQuery() {
      this.toggleSearchCall();
      this.$store.dispatch('getSearchTerm', this.search_term);
    },
  },
  watch: {
    // clears search term when reset
    resetCalled() {
      this.search_term = '';
    },
  },
};

</script>

