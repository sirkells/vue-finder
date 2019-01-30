<template>
  <div>
    <v-list dense>
      <v-flex
        xs12
        sm6
        md12
      >
        <v-card>
          <v-toolbar
            color="blue darken-3"
            dark
          >
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
              Showing {{ getResultsCount }} results from {{ getTotalResultsCount }} records
            </v-chip>
            <v-btn
              flat
              @click="sorty()"
            >
              <v-icon
                small
                left
              >list</v-icon>
              <span class="caption text-lowercase">Sort By Date</span>
            </v-btn>
            <!-- Filters -->
            <v-list-group
              v-for="(item, index) in getAllFilterData"
              :key="index"
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                v-for="(subItem, index) in item.items"
                :key="index"
              >
                <v-list-tile-content>
                  <v-chip @click="check(item.title, subItem.key)">
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
    <!-- <v-chip
      v-for="select in selectedFilter"
      :key="select.title"
      close
      @input="removeChip(select)"
    >
      {{ select }}
    </v-chip> -->
  </div>

</template>

<script>
export default {
  name: 'SideFilter',
  props: ['check', 'reset', 'sorty'],
  data() {
    return {

    };
  },
  computed: {
    getAllFilterData() {
      return this.$store.getters.allAggs;
    },
    getResultsCount() {
      return this.$store.getters.resultsCount;
    },
    getTotalResultsCount() {
      return this.$store.getters.totalResultsCount;
    },
  },
};
</script>
