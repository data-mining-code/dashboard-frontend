export const salesBarChart = {
  type: 'bar',
  data: {
    datasets: [{
      data: [100, 130, 95, 65],
      backgroundColor: [
        'rgba(250, 181, 71, .8)',
        'rgba(250, 181, 71, .8)',
        'rgba(250, 181, 71, .8)',
        'rgba(250, 181, 71, .8)'
      ]
      }, {
        data: [100, 100, 100, 100, 100, 100],

            // Changes this dataset to become a line
        type: 'line',
        borderColor: 'rgba(250, 25, 25, 0.8)',
        borderWidth: 2,
        pointRadius: 0
    }],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Gesundbrunnen',
      'Spandau',
      'Potsdam',
      'Friedrichshain'
    ]
  },
  options: {
    responsive: true,
    legend: {
      display: false
    },
    title: {
      display: true,
      fontColor: 'red'
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: '#cccccc'
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }],
      yAxes: [{
        ticks: {
          suggestedMin: 0,
          fontColor: '#cccccc'
        },
        gridLines: {
          drawBorder: false
        }
      }]
    }
  }
}

export default salesBarChart
