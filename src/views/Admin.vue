<template>
  <div class="row mx-auto justify-content-center">
    <add-notice />
    <add-note />
  </div>
</template>

<script>
import AddNotice from "../components/AddNotice"
// import AddNote from "../components/AddNote";
export default {
  data() {
    return {};
  },
  computed: {},
  components: {
    "add-notice": AddNotice,
    // "add-note": AddNote,
  },
};
</script>

<style>
</style>