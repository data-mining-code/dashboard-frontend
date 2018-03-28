export var gaugeChart = {
  angle: -0.3, // The span of the gauge arc
  lineWidth: 0.21, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.58, // // Relative to gauge radius
    strokeWidth: 0.046, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  colorStart: '#6FADCF',   // Colors
  colorStop: '#8FC0DA',    // just experiment with them
  strokeColor: '#E0E0E0',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  // renderTicks is Optional
  renderTicks: {
    divisions: 4,
    divWidth: 1.8,
    divLength: 0.27,
    divColor: '#333333',
    subDivisions: 3,
    subLength: 0.5,
    subWidth: 0.6,
    subColor: '#666666'
  },
  staticZones: [
    {strokeStyle: 'rgba(250,75,40,.8)', min: -100, max: -25}, // Red from 100 to 130
    {strokeStyle: 'rgba(250, 181, 71, .8)', min: -25, max: 25}, // Yellow
    {strokeStyle: 'rgba(75,250,75,.8)', min: 25, max: 100} // Red
 ]

};

export default gaugeChart
