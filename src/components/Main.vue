<template>
  <div class="main">
    <div class="sales">
      <div id="wrapperSales">
        <h1>Sales</h1>
        <canvas id="salesBar"></canvas>
      </div>
    </div>
    <div class="nps">
      <h1 class="head">
        <b>NPS</b>
      </h1>
      <div id="wrapperGauge" style="width:45%;height:85%; float: left; display:flex;justify-content:center;">
        <canvas id="gaugeChart" style="width:100%;height:65%;margin-top:2.5vw;margin-left:1vw;"></canvas>
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
      <div id="wrapper" style="width:100%; height:50%;">
        <h1 class="head" style="display:flex;justify-content:center;">
          Issues Resolved
        </h1>
        <div style="width:50%;display:flex;margin:auto;">
          <canvas id="horizontalBar"></canvas>
        </div>
      </div>
      <div id="wrapper" style="width:100%;height:50%;float:right;">
        <h1 class="head" style="display:flex;justify-content:center;">
          <b>Common Questions</b>
        </h1>
        <table id="ComQue">
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
      data: {'product': {'Lettuce': {'times': 8, 'percent': 0.47058823529411764}, 'Eggs': {'times': 2, 'percent': 0.11764705882352941}, 'Apple': {'times': 2, 'percent': 0.11764705882352941}, 'Steak pork': {'times': 1, 'percent': 0.058823529411764705}, 'Tomato': {'times': 3, 'percent': 0.17647058823529413}}, 'shops': {'Friedrichshain': {'times': 105, 'percent': 1.0}, 'Mitte': {'times': 49, 'percent': 1.0}, 'Lichtenberg': {'times': 20, 'percent': 1.0}, 'Neukölln': {'times': 10, 'percent': 1.0}, 'Kreuzberg': {'times': 4, 'percent': 1.0}}, 'user_type': {'neu': {'times': 16, 'percent': 0.8}, 'neg': {'times': 1, 'percent': 0.05}, 'pos': {'times': 3, 'percent': 0.15}}, 'question': {'stock do Lettuce stock  ': {'string': 'Do you have Lettuce in stock?', 'times': 7, 'percent': 0.20588235294117646}, 'address where  shop  friedrichshain': {'string': 'Where is your shop in Friedrichshain?', 'times': 1, 'percent': 0.029411764705882353}, 'description do Eggs  bio ': {'string': 'Do you have Bio Eggs?', 'times': 1, 'percent': 0.029411764705882353}, 'stock do Eggs stock  ': {'string': 'Do you have Eggs in stock?', 'times': 1, 'percent': 0.029411764705882353}}}, // "hours when  hours  ": {"string": "When are your opening hours?", "times": 3, "percent": 0.08823529411764706}, "discount  Apple discount  ": {"string": "Is apples on discount?", "times": 1, "percent": 0.029411764705882353}, "not_found": {"string": "Do you have Apples in sale?", "times": 8, "percent": 0.23529411764705882}, "stock do Apple stock  ": {"string": "Do you have Apples in stock?", "times": 1, "percent": 0.029411764705882353}, "address where  store  friedrichshain": {"string": "Where is your store in Friedrichshain?", "times": 3, "percent": 0.08823529411764706}, "all_locations do  stores  ": {"string": "Where do you have stores?", "times": 1, "percent": 0.029411764705882353}, "description do   vegan ": {"string": "do you have vegan salad?", "times": 1, "percent": 0.029411764705882353}, "description do Apple  bio ": {"string": "Do you have Bio Apples?", "times": 1, "percent": 0.029411764705882353}, "description do Steak pork  halal ": {"string": "Do you have halal steak?", "times": 1, "percent": 0.029411764705882353}, "stock do Tomato stock  ": {"string": "Do you have Tomatoes in stock?", "times": 3, "percent": 0.08823529411764706}, "stock do Shampoo stock  ": {"string": "Do you have shampoo in stock?", "times": 1, "percent": 0.029411764705882353}}},
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
      this.chartInstances['userTypePie'].update()
      console.log('Taking a 10s break...')
      await this.sleep(10000)
      console.log('Five second later')
      this.reqhandler()  // Recursion. It calls itself after it is finished with the previous request  
    }
  },
  mounted () {
    this.createChart('salesBar', this.salesBarChart, [100, 130, 70, 67, 45, 43, 45, 90])
    this.createChart('userBarChart', this.userBarChart, [50, 70, 30])
    this.createChart('horizontalNps', this.horizontalNps, [70, -10, 40, 50])
    this.createChart('horizontalBar', this.horizontalBar, [70, 40, 50])
    this.createGaugeChart('gaugeChart', this.gaugeChart, [0])
    this.req()
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
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
}
.sales, .nps, .issuesResolved, .userTypeBar, .userTypePie, .commonQuestions, .topLocations, .topProducts{
  border: .3vw solid white;
  border-radius: .7vw;
  background-color: grey;
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
  color:#ffffff;
  font-size:2vw;
  font-weight: 700;
  margin: 0;
  padding: .5vw;
}

p {
  color:#ffffff;
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
  color: #ffffff;
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
