<template>
  <!-- <div class="container col-md-4">
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
  </div> -->

<div class="row">
          <div class="container col-md-4">
              <div class="login-panel bg-white text-left">

                <div v-if="error" class="alert alert-danger">Couldnt not Log In. Please check credentials</div>

                  <h1 class="display-5 font-weight-reguler text-center">Sign In</h1>
                  <br><br>

                  <form @submit.prevent="onSubmit">
                      <div class="form-group">
                          <label for="email">Email</label>
                          <input v-model="email" type="email" id="email" class="form-control" placeholder="eg: abc.xyz@vit.edu.in" required>
                      </div>

                      <div class="form-group">
                          <label for="password">Password</label>
                          <input v-model="password" type="password" id="password" class="form-control" placeholder="password" required>
                      </div>

                      <h6 class="display-10 text-center">Forgot Password?</h6>
                      <br> 
                    <div class="form-group">
                          <button type="submit" id="submit" class="btn btn-md btn-block">Submit</button>
                      </div>
                  </form>
              </div>
          </div>
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
button{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
}
.login-panel{
        padding: 20px 20px;
    }
    .btn{
        background-color:#393185;
        color: white;
    }
    h1{
        color:#393185;
    }
</style>
