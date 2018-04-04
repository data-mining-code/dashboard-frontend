export const horizontalBar = {
    type: 'horizontalBar',
    data: {
      datasets: [{
        data: [10, 20, 30],
        backgroundColor: [
          'rgba(250, 181, 71, .8)',
          'rgba(250, 181, 71, .8)',
          'rgba(250, 181, 71, .8)'
        ]
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        '📱',
        '✉️',
        '🤖'
      ]
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
          xAxes: [{
              ticks: {
                suggestedMin: 0,
                fontColor: '#ffffff',
                fontSize: 15
              },
              gridLines: {
                  display: false
              }
          }],
          yAxes: [{
              ticks: {
                fontColor: '#ffffff',
                fontSize: 15
              },
              gridLines: {
                  display: false
              }
          }]
      }
    }
  }
  export default horizontalBar
