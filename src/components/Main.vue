<template>
  <div class="main">
      <h1>
          Dashboard
      </h1>
      <button  @click="() => {req()}">
          Request Data
      </button>
      <p>
          {{ data }}
      </p>
  </div>
</template>

<script>
import HTTP from '../http-rest.js'
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
