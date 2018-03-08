<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import "../static/css/common.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.el-container {
  width: 100%;
  height: 100%;
}
.crumb {
  height: 36px;
  line-height: 36px !important;
}
</style>
