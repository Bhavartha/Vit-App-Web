<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link>|
    <router-link to="/admin">Admin</router-link>|
    <router-link v-if="!loggedIn" to="/login">Login</router-link>
    <a v-else @click.prevent="logOut">Logout</a>
  </div> -->
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #393185;">
  <a class="navbar-brand">Vidyalankar Institute of Technology</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <a class="nav-link"><router-link to="/">Home</router-link><span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link"><router-link to="/notes">Notes</router-link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link"><router-link to="/admin">Admin</router-link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link"><router-link v-if="!loggedIn" to="/login">Login</router-link>
    <a v-else @click.prevent="logOut">Logout</a></a>
      </li>
    </ul>
  </div>
</nav>

  
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

<style lang="scss">
li{
  font-size: 17px;
  padding: 0 10px;
}
.navbar {
  color: #ffffff;
  margin-bottom: 50px;
  
  .navbar-brand:hover{
    color: #ffffff;
  }
  .navbar-brand,span{
  color: #ffffff;
  padding:  0 20px;
}
  a {
    color: #ffffff;
    text-decoration: none;

    &.router-link-exact-active {
      color: #eafd39;
    }
  }
  a:hover{
      color: #ffffff;
    }
}
</style>