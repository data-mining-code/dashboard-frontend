<template>
  <div id="app">
    <ul id="navbar">
      <li>
        <router-link to="/">
          Overview
        </router-link>
      </li>
      <li>
        <router-link to="/tabone">
          Tab 1
        </router-link>
      </li>
      <li>
        <router-link to="/tabtwo">
          Tab 2
        </router-link>
      </li>
    </ul>
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
  color: #444444;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 10px 60px 1fr;
}
html, body {
  margin: 0;
  width: 100%;
  height: 100%;
}
ul#navbar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  grid-row-start: 2;

}
li {
  float: left;
  height: 100%;
}
li a {
  font-size: 1.4vw;
  display: block;
  color: white;
  text-align: left;
  padding: 14px 16px;
  text-decoration: none;
  background-color: #002d72;
  border-radius: 0px 30px 0 0;
  border: 2px solid black
}
li a:hover {
  background-color: #111;
}
.main{
  grid-row-start: 3;
  background-color: #676767;
}
</style>
