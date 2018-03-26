<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 60px 1fr;
}
html, body {
  margin: 0;
  width: 100%;
  height: 100%;
}
.main{
  grid-row-start: 2;
  background-color: #99abc7;
}
</style>
