<template>
  <div id="addNotice" class="container col-5">
    <form @submit.prevent="onUpload">
      <h1>Add Notice</h1>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Notice" v-model="notice" required />
      </div>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="From" v-model="from" required />
      </div>
      <div class="custom-file">
        <input
          required
          type="file"
          class="custom-file-input"
          id="customFile"
          @change="fileChange"
          accept="image/jpeg, image/png, application/pdf"
        />
        <label class="custom-file-label" for="customFile">{{fileName}}</label>
      </div>
      <button class="btn btn-primary mt-2" type="submit">Upload</button>
    </form>
  </div>
</template>
<script>
import * as firebase from "firebase/app";
import "firebase/storage";

export default {
  methods: {
    fileChange(event) {
      this.fileData = event.target.files[0];
      this.type = this.fileData.type == "application/pdf" ? "pdf" : "image";
      this.fileName = this.fileData.name;
    },
    async onUpload() {
      try {
        //Upload file
        await firebase
          .storage()
          .ref("posts/" + this.fileData.name)
          .put(this.fileData);

        //Get media URL
        await firebase
          .storage()
          .ref("posts/" + this.fileData.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.mediaUrl = url;
          });

        //Create entry in collection
        var doc = await firebase
          .firestore()
          .collection("timeline")
          .doc("all")
          .collection("timelinePost")
          .add({
            from: this.from,
            mediaUrl: this.mediaUrl,
            notice: this.notice,
            type: this.type,
            timestamp: new Date(),
            fileName: this.fileName,
          });

        //Update collection
        await firebase
          .firestore()
          .collection("timeline")
          .doc("all")
          .collection("timelinePost")
          .doc(doc.id)
          .update({
            postId: doc.id.toString(),
          });

        alert("Upload Successful");
        this.$router.replace("/");
        
      } catch {
        alert("Failed to Upload");
      }
    },
  },
  data() {
    return {
      fileData: null,
      mediaUrl: "",
      notice: "",
      from: "",
      type: "",
      fileName: "Upload File",
    };
  },
};
</script>

<style>
</style>
