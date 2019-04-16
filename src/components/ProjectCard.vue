<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      v-for="(posts, index) in resultApi"
      :key="index"
      xs12
    >
      <v-card>
        <v-card-title primary>
          <div>
            <div>
              <a
                :href="posts.url"
                target="_blank"
              >
                <b>{{ posts.title }}</b>
              </a>
            </div>
            {{posts.description.slice(0, 400)}}
          </div>
        </v-card-title>
        <v-card-actions>
          <div class="text-xs-center">
            <!-- <v-chip v-if="posts.date_post">{{ posts.date_post}}</v-chip>
              <v-chip v-if="posts.score">{{ posts.score}}</v-chip>
              <v-chip v-if="posts.filter_date_post.$date">
                {{ posts.filter_date_post.$date}}</v-chip> -->

            <!-- location -->
            <v-chip v-if="posts.region.bundesland">
              {{ posts.region.bundesland}}
            </v-chip>
            <!-- group -->
            <v-chip v-if="posts.bereich.group">
              {{ posts.bereich.group}}
            </v-chip>
            <!-- Group Type -->
            <v-chip v-if="posts.bereich.group_type">
              {{ posts.bereich.group_type}}
            </v-chip>
            <!-- Group Stack -->
            <v-chip v-if="posts.bereich.group_type_stack">
              {{ posts.bereich.group_type_stack}}
            </v-chip>
            <!-- Mobile App Platform -->
            <v-chip v-if="posts.bereich.platform">
              {{ posts.bereich.platform}}
            </v-chip>
            <!-- Mobile App Platform Name -->
            <v-chip v-if="posts.bereich.platform_name">
              {{ posts.bereich.platform_name}}
            </v-chip>
            <!-- Skill by Group Stack -->
            <!--encodeURIComponent used to encode c# due to error caused by # -->
            <v-chip v-if="posts.bereich.skill">
              {{ posts.bereich.skill}}
            </v-chip>
          </div>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- Favourite button -->
            <v-btn icon>
              <v-icon @click="myToggleFunction($event)">favorite</v-icon>
            </v-btn>
            <!-- Bookmark button -->
            <v-btn icon>
              <v-icon @click="addToCockpit(index)">bookmark</v-icon>
            </v-btn>
            <!-- Share button -->
            <v-btn
              icon
              @click="toggleShareForm(), shareProject(index)"
            >
              <v-icon>share</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: ['resultApi', 'myToggleFunction', 'addToCockpit', 'shareProject', 'toggleShareForm'],
  data: () => ({

  }),
  methods: {
  },
};
</script>
