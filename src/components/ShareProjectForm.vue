<template>
  <v-dialog
    v-model="shareDialog"
    width="800px"
  >
    <v-card>
      <v-toolbar
        card
        color="blue"
        dark
      >
        <v-btn
          flat
          @click="hideDialog()"
        >
          <v-icon>arrow_back</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn
          flat
          @click="hideDialog()"
        >
          <v-icon>send</v-icon>
        </v-btn>

      </v-toolbar>
      <v-form>
        <v-autocomplete
          v-model="selected"
          :items="items"
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
</template>

<script>
export default {
  props: ['toggleShareForm', 'message_body', 'subject'],
  data: () => ({
    selected: ['Trevor Handsen'],
    items: ['Kelechi Igbokwe', 'Paul Zimmer', 'Marco Hoher'],
    title: '',
  }),
  computed: {
    shareDialog() {
      return this.$store.state.shareDialog;
    },
  },
  methods: {
    hideDialog() {
      this.$store.commit('toggleShareDialog', false);
    },
  },
};
</script>
