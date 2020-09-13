<template>
  <div id="addNote" class="container col-5">
    <form @submit.prevent="onUpload">
      <h1>Add Note</h1>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="deptSelect">Department</label>
        </div>
        <select class="custom-select" v-model="sDept" id="deptSelect">
          <option v-for="(dept,index) in departments" :key="index">{{ dept }}</option>
        </select>
      </div>
      <div v-if="eYear" class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="yrSelect">Year</label>
        </div>
        <select class="custom-select" v-model="sYear" id="yrSelect" @change="getSubjects">
          <option v-for="(yr,index) in years" :key="index">{{ yr }}</option>
        </select>
      </div>
      <div v-if="eSubj" class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="subjSelect">Subject</label>
        </div>
        <select class="custom-select" v-model="sSubj" id="subjSelect">
          <option v-for="(s,index) in subjects" :key="index">{{ s }}</option>
        </select>
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
          accept="application/pdf"
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
  async created() {
    // Get departments
    var d = await firebase.firestore().collection("departments").get();
    this.departments = d.docs.map((doc) => {
      return doc.id;
    });
  },
  computed: {
    eYear() {
      return this.sDept != "";
    },
    eSubj() {
      return this.sYear != null;
    },
  },
  methods: {
    async getSubjects() {
      var s = await firebase
        .firestore()
        .collection("subjects")
        .doc(this.sDept)
        .collection(this.sYear)
        .get();
      this.subjects = s.docs.map((doc) => {
        return doc.id;
      });
    },
    fileChange(event) {
      this.fileData = event.target.files[0];
      this.fileName = this.fileData.name;
    },
    async onUpload() {
      try {
        const storagePath =
          this.sDept + "/" + this.sYear + "/" + this.fileData.name;
        //Upload PDF
        await firebase.storage().ref(storagePath).put(this.fileData);

        //Get Media URL
        await firebase
          .storage()
          .ref(storagePath)
          .getDownloadURL()
          .then((url) => {
            this.downloadUrl = url;
          });

        //Create entry in collection
        await firebase
          .firestore()
          .collection("notes")
          .doc(this.sDept)
          .collection("Notes")
          .doc(this.sYear)
          .collection(this.sSubj)
          .add({
            from: this.from,
            downloadUrl: this.downloadUrl,
            dept: this.sDept,
            subject: this.sSubj,
            timestamp: new Date(),
            fileName: this.fileName,
            year: this.sYear,
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
      departments: [],
      subjects: [],
      years: ["First", "Second", "Third", "Fourth"],
      sDept: "",
      sYear: null,
      sSubj: "",
      fileName: "Choose File",
      from: "",
      fileData: null,
      downloadUrl: "",
    };
  },
};
</script>

<style>
</style>
