<template>
  <div id="nav">
    <router-link to="/">Home</router-link>|
    <router-link to="/admin">Admin</router-link>|
    <router-link v-if="!loggedIn" to="/login">Login</router-link>
    <a v-else @click.prevent="logOut">Logout</a>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  created() {
    firebase.auth().onAuthStateChanged((user) => (this.loggedIn = !!user));
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    async logOut() {
      try {
        await firebase.auth().signOut();
        this.$router.replace("/");
      } catch (error) {
        alert("Error occured");
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>