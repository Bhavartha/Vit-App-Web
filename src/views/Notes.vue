<template>
  <div class="container col-md-5">
    <form @submit.prevent="onSubmit">
      <h4 class="display-5 font-weight-reguler text-center">View Notes</h4><br>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="deptSelect">Department</label>
        </div>

        <select class="custom-select" v-model="sDept" id="deptSelect" @change="sYear=null">
          <option v-for="(dept,index) in departments" :key="index">{{ dept }}</option>
        </select>
      </div>
      <!-- Checks is bool enableYear (eYear) is true -->
      <!-- if true shows the dropdown -->
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
        <center>
          <button class="btn mt-3 custom" type="submit">Get Notes</button>
        </center>

    </form>
    <hr class="m-5" />
    <div v-for="note in notes" :key="note" class="m-3">
      <h6 class="secondary">By {{note.from}}</h6>
      <a class="form-control bg-light" :href="note.downloadUrl" target="_blank">{{note.fileName}}</a>
    </div>
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
    // Return bool that decides to show Year dropdown or not
    eYear() {
      return this.sDept != "";
    },
    // Returns bool that decides to show Subjects dropdown or not
    eSubj() {
      return this.sYear != null;
    },
  },
  methods: {
    // Fetches subjects based on the Dept and Year selected and updates the value of Subject array
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

    async onSubmit() {
      try {
        //Create entry in collection
        await firebase
          .firestore()
          .collection("notes")
          .doc(this.sDept)
          .collection("Notes")
          .doc(this.sYear)
          .collection(this.sSubj)
          .orderBy("timestamp", "desc")
          .get()
          .then((querySnapshot) => {
            this.notes = querySnapshot.docs.map((doc) => {
              return doc.data();
            });
          });
      } catch {
        alert("Failed to Fetch Notes");
      }
    },
  },
  data() {
    return {
      departments: [],
      subjects: [],
      notes: [],
      years: ["First", "Second", "Third", "Fourth"],
      sDept: "",
      sYear: null,
      sSubj: "",
    };
  },
};
</script>

<style scoped>
button{
  width: 40%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
}
.container{
  margin-top: 80px;
}
button:hover{
  color: white;
}
.form-control{
    text-decoration: none;
}
h4{
  color:#393185;
}
</style>
