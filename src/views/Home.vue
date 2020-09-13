<template>
  <div id="timeline" class="container justify-content-center">
    <input type="text" v-model="search" placeholder="search Posts" class="form-control mb-4"/>
    <div v-for="(post,index) in filteredPosts" :key="index">
      <div class="card mb-4">
        <div class="card-body">
          <h4 class="card-title">Notice by {{post.from}}</h4>
          <div class="text-center">
            <img v-if="post.type=='image'" :src="post.mediaUrl" class="card-img img-fluid" />
          </div>
          <p class="card-text mt-3">{{post.notice}}</p>
          <a
            v-if="post.type=='pdf'"
            class="form-control bg-light"
            :href="post.mediaUrl"
            target="_blank"
          >Click to view PDF</a>
        </div>
      </div>
    </div>
  </div>
  <!-- timeline end -->
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/firestore";

export default {
  data() {
    return {
      posts: [],
      search:"",
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter((post) => {
        return (
          post.from.toLowerCase().match(this.search.toLowerCase()) ||
          post.notice.toLowerCase().match(this.search.toLowerCase())
        );
      });
    },
  },
  created() {
    firebase
      .firestore()
      .collection("timeline")
      .doc("all")
      .collection("timelinePost")
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        this.posts = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
      })
      .catch((e) => console.log(e));
  },
};
</script>

<style scoped>
#timeline {
  margin: 0 auto;
  max-width: 600px;
  position: relative;
  margin-top: 1rem;
  padding-bottom: 1rem;
}
</style>