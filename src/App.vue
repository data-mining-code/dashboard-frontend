<template>
  <div id="app">
    <h1 id="mainH">DASHBOARD</h1>
    <ul id="navbar">
      <li>
        <router-link to="/" exact-active-class="is-active">
          Overview
        </router-link>
      </li>
      <li>
        <router-link to="/tabone" exact-active-class="is-active">
          Tab 1
        </router-link>
      </li>
      <li>
        <router-link to="/tabtwo" exact-active-class="is-active">
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
  color: white;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 50px 1fr;
}
#mainH {
  position: absolute;
  z-index: -1;
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
}
ul#navbar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  grid-row-start: 1;

}
li {
  float: left;
  height: 100%;
  margin: .2vw;
  background-color: #999999ff;
}
li a {
  font-size: 1.4vw;
  display: block;
  color: white;
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
