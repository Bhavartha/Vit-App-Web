<template>
  <div id="addNotice" class="col col-md-5 col-sm-10 mb-5">
    <form @submit.prevent="onUpload" class="m-3">
      <h3 class="display-10 font-weight-reguler text-center">Add Notice</h3><br>
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

      <center>
        <button class="btn mt-4 custom" type="submit">Upload</button>
      </center>

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
        if (this.fileData) {
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
        }
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

h3{
  color:#393185;
}
.custom{
  width: 40%;
}
.custom:hover{
  color: white;
}
</style>
