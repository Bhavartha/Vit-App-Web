<template>
  <div id="timeline" class="container-fluid col-8">
    <div class="row row-cols-2 imagetiles">
      <div v-for="(post,index) in posts" :key="index">
        <div class="col">
          <div class="card mb-4">
            <div class="card-body">
              <h4 class="card-title">Notice by {{post.from}}</h4>
              <img v-if="post.type=='image'" :src="post.mediaUrl" class="card-img img-fluid" />
              <img
                @click="openPDF(post.mediaUrl)"
                v-else-if="post.type=='pdf'"
                src="https://www.flaticon.com/svg/static/icons/svg/3143/3143460.svg"
                alt
              />
              <p class="card-text mt-3">{{post.notice | limit40}}</p>
            </div>
          </div>
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
    };
  },
  computed: {},
  filters: {
    limit40(val){
      return val.slice(0,40) + " ..."
    }
  },
  methods: {
    openPDF(link) {
      window.open(link);
    },
  },
  created() {
    firebase
      .firestore()
      .collection("timeline")
      .doc("all")
      .collection("timelinePost").orderBy('timestamp',"desc")
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
img {
  width: auto;
  height: 230px;
  margin: auto;
}
</style>