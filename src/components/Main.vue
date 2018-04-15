<template>
  <div class="main">
    <div class="sales">
      <div id="wrapperSales">
        <h1>Plan Sales vs. Actual Sales by location</h1>
        <canvas id="salesBar"></canvas>
      </div>
    </div>
    <div class="nps">
      <h1 class="head">
        <b>Avg. NPS vs. Actual NPS by location</b>
      </h1>
      <div id="wrapperGauge" style="width:45%; height:85%; float: left; display:flex;justify-content:center; position: relative;">
        <canvas id="gaugeChart" style="width:100%;height:65%;margin-top:2.5vw;margin-left:1vw;"></canvas>
        <p style="position: absolute; top: 253px; left: 133px; font-size: 40px;">25</p>
      </div>
      <div id="wrapperGauge" style="width:45%;height:85%; float: right;">
        <canvas id="horizontalNps" style="width:100%;height:65%;margin-top:3vw;padding-right:4%;"></canvas>
      </div>
    </div>
    <div class="userTypePie">
      <h1>Usertypes</h1>
      <div id="wrapperPie" style="width:50%; height:85%; float:left;">
        <canvas id="userTypePie" style="width:75%; height:50%; margin-left: .8vw; margin-top: 1.6vw;"></canvas>
        <p style="margin-left: .7vw; margin-top: vw;">Current Month</p>
      </div>
      <div class="wrapperBar" style="width:45%; height: 80%;float:right;margin-right:3%;">
        <canvas id="userBarChart" style="width:70%; height:50%; margin-left: .7vw; margin-top: 2.5vw; margin-right: .7vw;"></canvas>
      </div>
    </div>
    <div class="issuesResolved">
      <div id="wrapper" style="width:100%; height:48%;">
        <h1 class="head" style="display:flex;justify-content:center; padding-bottom: 0;">
          Issues Resolved
        </h1>
        <div style="width:50%;display:flex;margin:auto;">
          <canvas id="horizontalBar"></canvas>
        </div>
      </div>
      <div id="wrapper" style="width:100%;height:48%;float:right;">
        <h1 class="head" style="display:flex; justify-content:center; padding:0;">
          <b>Common Questions</b>
        </h1>
        <table id="ComQue" style="margin: 0;">
          <tr id="first"><th>Rank</th><th>Location</th><th>Mentioned</th></tr>
          <tr v-for="(value, key, index) in data.question" :key="index" v-if="index < 3">
            <td># {{ index + 1 }}</td>
            <td>{{ value.string }}</td>
            <td>x{{ value.times }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="topLocations" style="display:flex; justify-content:center;">
      <div id="wrapper" style="width:90%; height:75%;">
        <h1 class="head" style="display:flex; justify-content:center;">
          <b>TopLocations</b>
        </h1>
        <table id="topLoc">
          <tr id="first"><th>Rank</th><th>Location</th><th>Mentioned</th></tr>
          <tr v-for="(value, key, index) in data.shops" :key="index">
            <td># {{ index + 1 }}</td>
            <td id="name">{{ key }}</td>
            <td>{{ value.times }}</td>
          </tr>
        </table>
      </div>
    </div>
      <div class="topProducts" style="display:flex; justify-content:center;">
        <div id="wrapper" style="width:90%;height:75%;">
            <h1 class="head" style="display:flex; justify-content:center;">
              <b>Topproducts</b>
            </h1>
          <table id="topPro">
            <th>Rank</th><th>Products</th><th>Mentioned</th>
            <tr v-for="(value, key, index) in data.product" :key="index">
              <td># {{ index + 1 }}</td>
              <td id="name">{{ key }}</td>
              <td>{{ value.times }}</td>
            </tr>
          </table>
        </div>
    </div>
  </div>
</template>

<script>
import HTTP from '../http-rest.js'
import Chart from 'chart.js'
import { Gauge } from '../gauge.js'
import gaugeChart from '../gaugeChart.js'
import pieChart from '../piechart.js'
import salesBarChart from '../salesBarChart.js'
import userBarChart from '../userBarChart.js'
import horizontalBar from '../horizontalBar.js'
import horizontalNps from '../horizontalNps.js'

export default {
  name: 'Main',
  data () {
    return {
      data: {"product": {"Lettuce": {"times": 8, "percent": 0.47058823529411764}, "Tomato": {"times": 3, "percent": 0.17647058823529413}, "Eggs": {"times": 2, "percent": 0.11764705882352941}, "Apple": {"times": 2, "percent": 0.11764705882352941}, "Steak pork": {"times": 1, "percent": 0.058823529411764705}}, "shops": {"Friedrichshain": {"times": 4, "percent": 0.36363636363636365}, "Mitte": {"times": 2, "percent": 0.18181818181818182}, "Tempelhof": {"times": 2, "percent": 0.18181818181818182}, "Potsdam": {"times": 2, "percent": 0.18181818181818182}, "Gesundbrunnen": {"times": 1, "percent": 0.09090909090909091}}, "user_type": {"neu": {"times": 18, "percent": 0.6666666666666666}, "neg": {"times": 1, "percent": 0.037037037037037035}, "pos": {"times": 8, "percent": 0.2962962962962963}}, "question": {"not_found": {"string": "Do you have Apples in sale?", "times": 13, "percent": 0.3170731707317073}, "stock do Lettuce stock  ": {"string": "Do you have Lettuce in stock?", "times": 7, "percent": 0.17073170731707318}, "hours when  hours  ": {"string": "When are your opening hours?", "times": 3, "percent": 0.07317073170731707}}, "stats": {"chatbot": 120, "mail": 50, "phone": 150}},
      chartInstances: {},
      pieChart: pieChart,
      horizontalBar: horizontalBar,
      horizontalNps: horizontalNps,
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
      chartData['data']['datasets'][0]['data'] = backendData
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
        scaleFontColor: "#ff0000"
      })
      this.chartInstances[chartId] = myChart
    },
    createGaugeChart (chartId, chartData, backendData) {
      var target = document.getElementById(chartId); // your canvas element
      var gauge = new Gauge(target).setOptions(chartData); // create sexy gauge!
      gauge.maxValue = 100; // set max gauge value
      gauge.setMinValue(-100);  // Prefer setter over gauge.minValue = 0
      gauge.animationSpeed = 45; // set animation speed (32 is default value)
      gauge.set(backendData); // set actual value
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    reqhandler: async function() {
      this.req()
      console.log(this.data.user_type.pos.times, this.data.user_type.neu.times, this.data.user_type.neg.times)
      this.pieChart.data.datasets[0].data = [this.data.user_type.pos.times, this.data.user_type.neu.times, this.data.user_type.neg.times]
      this.horizontalBar.data.datasets[0].data = [this.data.stats.phone, this.data.stats.mail, this.data.stats.chatbot]
      this.chartInstances['userTypePie'].update()
      this.chartInstances['horizontalBar'].update()
      console.log('Taking a 10s break...')
      await this.sleep(10000)
      console.log('Five second later')
      this.reqhandler()  // Recursion. It calls itself after it is finished with the previous request  
    }
  },
  mounted () {
    this.createChart('salesBar', this.salesBarChart, [100, 130, 70, 67, 45, 43, 45, 90])
    this.createChart('userBarChart', this.userBarChart, [240, 490, 350])
    this.createChart('horizontalNps', this.horizontalNps, [70, -10, 40, 50])
    this.createGaugeChart('gaugeChart', this.gaugeChart, [25])
    this.req()
    this.createChart('horizontalBar', this.horizontalBar, [this.data.stats.phone, this.data.stats.mail, this.data.stats.chatbot])
    this.createChart('userTypePie', this.pieChart, [this.data.user_type.pos.times, this.data.user_type.neu.times, this.data.user_type.neg.times])  
    this.reqhandler()   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 0.8fr 1.2fr 1fr 1fr;
  color: #cccccc;
}
.sales, .nps, .issuesResolved, .userTypeBar, .userTypePie, .commonQuestions, .topLocations, .topProducts{
  border: .2vw solid #d9d9d9ff;
  background-color: #666666ff;
}

.head {
  font-size: 2vw;
  margin: 0;
  padding: .7vw 1.1vw;
  text-align: left;
}
table {
  border-collapse: collapse;
  margin: 1vw auto 0 auto;
  width: 100%;
}
table#ComQue{
  font-size: 1vw;
}
table#topPro, table#topLoc {
  font-size: 1.5vw;
}
td {
  border-top: .3vw solid #727272;
  padding: 0 0;
}
table#ComQue td {
  padding: .5vw;
}
h1 {
  font-size:1.7vw;
  font-weight: 700;
  margin: 0;
  padding: .5vw;
  padding-bottom: 0;
}

p {
  font-size: 1.5vw;
  font-weight: 700;
  margin: 0;
  padding: .5vw;
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
.topLocations{
  grid-area: 1 / 3 / 4 / 4;
}
.topProducts{
  grid-area: 4 / 3 / 7 / 4;
}
table, th, td {
  color: #d9d9d9;
  padding: .5vw;
}

#wrapperSales, #salesBar {
  width: 100%;
  height: 80%;
}

.head {
  display: flex;
  justify-content: center;
}

</style>
