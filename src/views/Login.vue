<template>
  <div class="container col-md-4">
    <div v-if="error" class="alert alert-danger">Couldnt not Log In. Please check credentials</div>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Email address</label>
        <input v-model="email" type="email" class="form-control" placeholder="Enter email" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" placeholder="Password" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  components: {},
  methods: {
    async onSubmit() {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        this.$router.replace("/admin");
      } catch (e) {
        this.error = true;
        console.log(e);
      }
    },
  },
  computed: {},
  data() {
    return {
      email: "",
      password: "",
      error: false,
    };
  },
};
</script>

<style>
</style>
