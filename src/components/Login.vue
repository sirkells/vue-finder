<template>
  <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md3>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  large
                  >
                    <v-avatar size="50px">
                      <img
                        src='@/assets/act1.svg'
                        alt="ACT"
                      >
                    </v-avatar>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="username"></v-text-field>
                  <v-text-field prepend-icon="lock" label="Password" id="password" type="password" v-model="password"></v-text-field>
                  <p class="error" :message="message">{{ message }}</p>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
// eslint-disable-next-line import/extensions
import axios from 'axios/dist/axios.min.js';
import store from '../store/store';

export default {
  name: 'Login',
  data: () => ({
    drawer: null,
    username: undefined,
    password: undefined,
    message: '',
    isAuth: false,

  }),
  props: {
    source: String,
  },
  methods: {
    login() {
      this.$store.dispatch('getToken', {
        username: this.username,
        password: this.password,
      })
        .then((resp) => {
          this.$router.push('/');
        });
    },
    submit() {
      const path = 'http://localhost:5000/api/login';
      const payload = { username: this.username, password: this.password };
      axios.post(path, payload)
        .then((resp) => {
          this.message = resp.data.message;
          // eslint-disable-next-line no-alert
          // eslint-disable-next-line no-console
          console.log(resp.data.message);
          // eslint-disable-next-line no-alert
          if (resp.data.auth) {
            this.isAuth = true;
            store.state.isAuth = true;
            this.$router.push('/');
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
  },
};
</script>

<style >
</style>

