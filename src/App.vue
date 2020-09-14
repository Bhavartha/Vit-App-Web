<template>
  <div id="app">
    <nav-header/>
    <router-view/>
  </div>
</template>

<script>
import NavHeader from "./components/NavHeader"
export default {
  components:{
    'nav-header':NavHeader
  }
}
</script>

<style lang="scss">
html,body{
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
