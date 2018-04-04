<template>
  <div class="main">
    <div class="sales">
      <div id="wrapper">
        <h1>Sales</h1>
        <canvas id="salesBar"></canvas>
      </div>
    </div>
    <div class="nps">
      <p class="head">
        <b><ins>NPS</ins></b>
      </p>
      <div style="position: relative; width:50%; float: left; margin: 15% 5% 0 0">
        <canvas id="gaugeChart"></canvas>
      </div>
      <div style="position: relative; width:40%; float: right; margin: 15% 5% 0 0">
        <canvas id="horizontalNps"></canvas>
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
      <p class="head">
        <b><ins>Issues Resolved</ins></b>
      </p>  
      <div style="position: relative; width:50%;">
        <canvas id="horizontalBar"></canvas>
      </div>
      <p class="head">
        <b><ins>Common Questions</ins></b>
      </p>
      <table id="ComQue">
        <tr v-for="(value, key, index) in data.question" :key="index" v-if="index < 3">
          <td># {{ index + 1 }}</td>
          <td>{{ value.string }}</td>
          <td>x{{ value.times }}</td>
        </tr>
      </table> 
    </div>
    <div class="topLocations">
      <p class="head">
        <b><ins>TopLocations</ins></b>
      </p>
      <table id="topLoc">
        <tr id="first"><th>Rank</th><th>Location</th><th>Mentioned</th></tr>
        <tr v-for="(value, key, index) in data.shops" :key="index">
          <td># {{ index + 1 }}</td>
          <td id="name">{{ key }}</td>
          <td>{{ value.times }}</td>
        </tr>
      </table>
    </div>

    <div class="topProducts">
      <p class="head">
        <b><ins>Topproducts</ins></b>
      </p>
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
      gauge.animationSpeed = 75; // set animation speed (32 is default value)
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
  border: 7px solid #002d72;
  border-radius: 15px;
  background-color: grey;
}
.head {
  font-size: 30px;
  margin: 0;
  padding: 7px 11px;
  text-align: left;
}
table {
  border-collapse: collapse;
  margin: 20px auto 0 auto;
  width: 590px;
}
table#ComQue{
  font-size: 25px;
}
table#topPro, table#topLoc {
  font-size: 37px;
}
td {
  border-top: 3px solid black;
  padding: 0 10px;
}
table#ComQue td {
  padding: 5px;
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
