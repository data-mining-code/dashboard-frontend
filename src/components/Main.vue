<template>
  <div class="main">
    <div class="sales">
      <p class="head">
        <b><ins>Sales</ins></b>
      </p>
    </div>
    <div class="nps">
      <p class="head">
        <b><ins>NPS</ins></b>
      </p>
      <div style="position: relative; width:50%; float: left; margin: 15% 5% 0 0">
        <canvas id="foo"></canvas>
      </div>
      <div style="position: relative; width:40%; float: right; margin: 15% 5% 0 0">
        <canvas id="horizontalNps"></canvas>
      </div>
    </div>
    <div class="userTypePie">
      <p class="head">
        <b><ins>Usertype pie chart</ins></b>
      </p>
      <div style="position: relative; width:50%; float:left">
        <canvas id="userTypePie"></canvas>
      </div>
      <div style="position: relative; width: 50%; float: right">

      </div>
    </div>
    <div class="commonQuestions">
      <p class="head">
        <b><ins>Issues Resolved</ins></b>
      </p>  
      <div style="position: relative; width:50%;">
        <canvas id="issuesResolved"></canvas>
      </div>
      <p class="head">
        <b><ins>Common Questions</ins></b>
      </p>
      <table id="ComQue">
        <tr v-for="(value, key, index) in data.question" :key="index" v-if="index < 3">
          <td># {{ index + 1 }}</td>
          <td>{{ value.string }}</td>
          <td>{{ value.times }}</td>
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
import pieChart from '../piechart.js'
import horizontalBar from '../horizontalBar.js'
import horizontalNps from '../horizontalNps.js'
import { Gauge } from '../gaugeJs.js'
export default {
  name: 'Main',
  data () {
    return {
      data: {'product': {'Lettuce': {'times': 8, 'percent': 0.47058823529411764}, 'Eggs': {'times': 2, 'percent': 0.11764705882352941}, 'Apple': {'times': 2, 'percent': 0.11764705882352941}, 'Steak pork': {'times': 1, 'percent': 0.058823529411764705}, 'Tomato': {'times': 3, 'percent': 0.17647058823529413}}, 'shops': {'Friedrichshain': {'times': 105, 'percent': 1.0}, 'Mitte': {'times': 49, 'percent': 1.0}, 'Lichtenberg': {'times': 20, 'percent': 1.0}, 'Neukölln': {'times': 10, 'percent': 1.0}, 'Kreuzberg': {'times': 4, 'percent': 1.0}}, 'user_type': {'neu': {'times': 16, 'percent': 0.8}, 'neg': {'times': 1, 'percent': 0.05}, 'pos': {'times': 3, 'percent': 0.15}}, 'question': {'stock do Lettuce stock  ': {'string': 'Do you have Lettuce in stock?', 'times': 7, 'percent': 0.20588235294117646}, 'address where  shop  friedrichshain': {'string': 'Where is your shop in Friedrichshain?', 'times': 1, 'percent': 0.029411764705882353}, 'description do Eggs  bio ': {'string': 'Do you have Bio Eggs?', 'times': 1, 'percent': 0.029411764705882353}, 'stock do Eggs stock  ': {'string': 'Do you have Eggs in stock?', 'times': 1, 'percent': 0.029411764705882353}}}, // "hours when  hours  ": {"string": "When are your opening hours?", "times": 3, "percent": 0.08823529411764706}, "discount  Apple discount  ": {"string": "Is apples on discount?", "times": 1, "percent": 0.029411764705882353}, "not_found": {"string": "Do you have Apples in sale?", "times": 8, "percent": 0.23529411764705882}, "stock do Apple stock  ": {"string": "Do you have Apples in stock?", "times": 1, "percent": 0.029411764705882353}, "address where  store  friedrichshain": {"string": "Where is your store in Friedrichshain?", "times": 3, "percent": 0.08823529411764706}, "all_locations do  stores  ": {"string": "Where do you have stores?", "times": 1, "percent": 0.029411764705882353}, "description do   vegan ": {"string": "do you have vegan salad?", "times": 1, "percent": 0.029411764705882353}, "description do Apple  bio ": {"string": "Do you have Bio Apples?", "times": 1, "percent": 0.029411764705882353}, "description do Steak pork  halal ": {"string": "Do you have halal steak?", "times": 1, "percent": 0.029411764705882353}, "stock do Tomato stock  ": {"string": "Do you have Tomatoes in stock?", "times": 3, "percent": 0.08823529411764706}, "stock do Shampoo stock  ": {"string": "Do you have shampoo in stock?", "times": 1, "percent": 0.029411764705882353}}},
      pieChart: pieChart,
      horizontalBar: horizontalBar,
      horizontalNps: horizontalNps
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
    },
    initGauge (gaugeId) {
      let opts = {
        angle: -0.26, // The span of the gauge arc
        lineWidth: 0.2, // The line thickness
        radiusScale: 1, // Relative radius
        pointer: {
          length: 0.6, // // Relative to gauge radius
          strokeWidth: 0.035, // The thickness
          color: '#000000' // Fill color
        },
        limitMax: true,     // If false, max value increases automatically if value > maxValue
        limitMin: true,     // If true, the min value of the gauge will be fixed
        colorStart: '#6FADCF',   // Colors
        colorStop: '#8FC0DA',    // just experiment with them
        strokeColor: '#E0E0E0',
        generateGradient: true,
        highDpiSupport: true,     // High resolution support
        renderTicks: {
          divisions: 5,
          divWidth: 1.1,
          divLength: 0.7,
          divColor: '#0F2533',
          subDivisions: 3,
          subLength: 0.5,
          subWidth: 0.6,
          subColor: '#666666'
        },
        staticLabels: {
          font: "20px sans-serif",  // Specifies font
          labels: [-100, -25, 0, 25, 100],  // Print labels at these values
          color: "#000000",  // Optional: Label text color
          fractionDigits: 0  // Optional: Numerical precision. 0=round off.
        },
        staticZones: [
          {strokeStyle: "#F03E3E", min: -100, max: -25}, // Red from 100 to 130
          {strokeStyle: "#FFDD00", min: -25, max: 25}, // Yellow
          {strokeStyle: "#30B32D", min: 25, max: 100}, // Green
        ],
      }
      let gauge = new Gauge(document.getElementById(gaugeId))
      gauge.maxValue = 100 // set max gauge value
      gauge.setMinValue(-100)  // Prefer setter over gauge.minValue = 0
      gauge.animationSpeed = 62 // set animation speed (32 is default value)
      gauge.set(25) // set actual value
      gauge.setOptions(opts) // create sexy gauge!
    }
  },
  mounted () {
    this.createChart('userTypePie', this.pieChart, [this.data.user_type.pos.times, this.data.user_type.neu.times, this.data.user_type.neg.times])
    this.createChart('issuesResolved', this.horizontalBar, [300,189,570])
    this.createChart('horizontalNps', this.horizontalNps, [60,-20,40,50])
    this.initGauge('foo')
    this.data = this.req()
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
  background-color: white;
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
.sales{
  grid-area: 1 / 1 / 4 / 2;
}
.nps{
  grid-area: 4 / 1 / 7 / 2;
}
.userTypePie{
  grid-area: 1 / 2 / 4 / 3;
}
.commonQuestions{
  grid-area: 4 / 2 / 7 / 3;
}
.topLocations{
  grid-area: 1 / 3 / 4 / 4;
}
.topProducts{
  grid-area: 4 / 3 / 7 / 4;
}
</style>
