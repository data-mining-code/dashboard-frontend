<template>
  <div id="app">
    <h1 id="mainH">Salesforce Dashboard</h1>
    <ul id="navbar">
      <router-link tag="li" to="/" exact-active-class="is-active">
        <a>Overview</a>
      </router-link>
      <router-link tag="li" to="/tabone" exact-active-class="is-active">
        <a>Tab 1</a>
      </router-link>
      <router-link tag="li" to="/tabtwo" exact-active-class="is-active">
        <a>Tab 2</a>
      </router-link>
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
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: 50px 1fr;
  background-color: #d9d9d9ff;
}
#mainH {
  position: absolute;
  top: 2px;
  left: 0;
  right: 0;
  color: black;
  font-size: 42px;
  padding: 0;
  margin: 0 auto;
}
html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  color: #cccccc;
}
ul#navbar {
  list-style-type: none;
  z-index: 1;
  margin: 0;
  padding: 0;
  overflow: hidden;
  grid-row-start: 1;
}
li {
  z-index: 1;
  float: left;
  height: 100%;
  margin: .2vw;
  background-color: #999999ff;
}
li a {
  font-size: 1.4vw;
  display: block;
  color: #cccccc;
  padding: 5px 16px;
  text-decoration: none;
}
.is-active {
  background-color: #666666ff;
}
.main{
  grid-row-start: 2;
  background-color: white;
}
</style>
