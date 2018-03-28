<template>
  <div id="app">
    <h1 class=navbartemp>
      <b>Dashboard</b>
    </h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('http://fonts.googleapis.com/css?family=Lato');

#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
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
  background-color: #676767;

}
</style>
