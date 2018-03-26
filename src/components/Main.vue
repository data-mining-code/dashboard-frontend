<template>
  <div class="main">
      <h1>
        Dashboard
      </h1>
      <button  @click="() => {req()}">
        Request Data
      </button>
      <div v-for="(value, key) in data" :key="key">
        {{ key }}: {{ value }}
      </div>
  </div>
</template>

<script>
import HTTP from '../http-rest.js'
import Chart from 'chart.js'
export default {
  name: 'Main',
  data () {
    return {
      data: {}
    }
  },
  methods: {
    req () {
      HTTP.get()
        .then(response => {
          // JSON responses are automatically parsed.
          this.data = JSON.parse(response.data.data)
          console.log('Received Data:')
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
