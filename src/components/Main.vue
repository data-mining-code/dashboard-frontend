<template>
  <div class="main">
    <div class="sales">
      <p>
        Sales
      </p>
    </div>
    <div class="nps">
      <p>
        NPS
      </p>
    </div>
    <div class="issuesResolved">
      <p>
        Issuesresolved
      </p>
    </div>
    <div class="userTypePie" style="position: relative; height:40vh; width:40vw">
      <p>
        Usertype pie chart
      </p>
      <canvas id="userTypePie"></canvas>
    </div>
    <div class="commonQuestions">
      <p>
        CommonQuestions
      </p>
    </div>
    <div class="userTypeBar">
      <p>
        Usertype Bar Chart
      </p>
    </div>
    <div class="topLocations">
      <p>
        TopLocations
      </p>
    </div>
    <div class="topProducts">
      <p>
        Topproducts
      </p>
    </div>
  </div>
</template>

<script>
import HTTP from '../http-rest.js'
import Chart from 'chart.js'
import pieChart from '../piechart.js'
export default {
  name: 'Main',
  data () {
    return {
      data: {},
      pieChart: pieChart
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
    },
    createChart (chartId, chartData, backendData) {
      const ctx = document.getElementById(chartId)
      chartData['data']['datasets'][0]['data']= backendData
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
    }
  },
  mounted () {
    this.createChart('userTypePie', this.pieChart, [50, 100, 20])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
}
.sales, .nps, .issuesResolved, .userTypeBar, .userTypePie, .commonQuestions, .topLocations, .topProducts{
  border-width: 10px;
  border: solid white;
}

.sales{
  grid-area: 1 / 1 / 3 / 2;
}
.nps{
  grid-area: 3 / 1 / 5 / 2;
}
.issuesResolved{
  grid-area: 5 / 1 / 7 / 2;
}
.userTypePie{
  grid-area: 1 / 2 / 3 / 3;
}
.commonQuestions{
  grid-area: 3 / 2 / 5 / 3;
}
.userTypeBar{
  grid-area: 5 / 2 / 7 / 3;
}
.topLocations{
  grid-area: 1 / 3 / 4 / 4;
}
.topProducts{
  grid-area: 4 / 3 / 7 / 4;
}

</style>
