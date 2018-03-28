<template>
  <div class="main">
    <div class="sales">
      <div id="wrapper">
        <h1>Sales</h1>
        <canvas id="salesBar"></canvas>
      </div>
    </div>
    <div class="nps">
      <h1>NPS</h1>
      <div id="wrapperGauge" style="width: 50%; height: 80%;">
        <canvas id="gaugeChart" style="width: 90%; height: 70%; margin-top: 30px;"></canvas>
      </div>
    </div>
    <div class="userTypePie">
      <h1>Usertypes</h1>
      <div id="wrapperPie" style="width:50%; height:85%; float:left;">
        <canvas id="userTypePie" style="width:75%; height:50%; margin-left: 10px; margin-top: 20px;"></canvas>
        <p style="margin-left: 10px; margin-top: 5px;">Current Month</p>
      </div>
      <div class="wrapperBar" style="width:50%; height: 85%;float:right;">
        <canvas id="userBarChart" style="width:70%; height:50%; margin-left: 10px; margin-top: 30px; margin-right: 10px;"></canvas>
      </div>
    </div>
    <div class="issuesResolved">
      <h1>Issues solved</h1>
    </div>

    <!-- <div class="commonQuestions">
      <p>
        CommonQuestions
      </p>
    </div>

    <div class="userTypeBar">
      <p>
        Usertype Bar Chart
      </p>
    </div> -->

    <div class="topLocations">
      <div id="wrapper">
        <h1>Top Locations</h1>
        <table style="margin:auto;">
          <tr>
            <th>#Number</th>
            <th>Location</th>
            <th>Sentiment</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Friedrichshain</td>
            <td>Positive</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="topProducts">
      <h1>Top Products</h1>
    </div>
  </div>
</template>

<script>
import HTTP from '../http-rest.js'
import Chart from 'chart.js'
import { Gauge } from '../gauge.js'
import pieChart from '../piechart.js'
import salesBarChart from '../salesBarChart.js'
import userBarChart from '../userBarChart.js'
import gaugeChart from '../gaugeChart.js'
export default {
  name: 'Main',
  data () {
    return {
      data: {},
      pieChart: pieChart,
      salesBarChart: salesBarChart,
      userBarChart: userBarChart,
      gaugeChart: gaugeChart
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
    },
    createGaugeChart (chartId, chartData, backendData) {
      var target = document.getElementById(chartId); // your canvas element
      var gauge = new Gauge(target).setOptions(chartData); // create sexy gauge!
      gauge.maxValue = 100; // set max gauge value
      gauge.setMinValue(-100);  // Prefer setter over gauge.minValue = 0
      gauge.animationSpeed = 75; // set animation speed (32 is default value)
      gauge.set(backendData); // set actual value
    }
  },
  mounted () {
    this.createChart('userTypePie', this.pieChart, [50, 100, 20])
    this.createChart('salesBar', this.salesBarChart, [100, 130, 70, 67, 45, 43, 45, 90])
    this.createChart('userBarChart', this.userBarChart, [50, 70, 30])
    this.createGaugeChart('gaugeChart', this.gaugeChart, [0])
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

h1 {
  color:#ffffff;
  font-size:21px;
  font-weight: 700;
  margin: 0;
  padding: 10px;
}

p {
  color:#ffffff;
  font-size:17px;
  font-weight: 700;
  margin: 0;
  padding: 10px;
}
.sales{
  grid-area: 1 / 1 / 4 / 2;
}
.nps{
  grid-area: 4 / 1 / 7 / 2;
}
.userTypePie{
  grid-area: 1 / 2 / 4 / 3;
}
.issuesResolved{
  grid-area: 4 / 2 / 7 / 2;
}
/* .commonQuestions{
  grid-area: 3 / 2 / 5 / 3;
}
.userTypeBar{
  grid-area: 5 / 2 / 7 / 3;
} */
.topLocations{
  grid-area: 1 / 3 / 4 / 4;
}
.topProducts{
  grid-area: 4 / 3 / 7 / 4;
}

table, th, td {
  color: #ffffff;
  padding: 7px;

}

</style>
