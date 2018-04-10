export const horizontalNps = {
    type: 'horizontalBar',
    data: {
      datasets: [{
        data: [10, 20, 30, 40],
        backgroundColor: [
          'rgba(250, 181, 71, .8)',
          'rgba(250, 181, 71, .8)',
          'rgba(250, 181, 71, .8)',
          'rgba(250, 181, 71, .8)'
        ]
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Gb.',
        'M.',
        'P.',
        'T.'
      ]
    },
    options: {
      labels: {
        // This more specific font property overrides the global property
      },
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
          xAxes: [{
              ticks: {
                suggestedMin: -100,
                fontColor: '#cccccc',
                fontSize: 15
              },
              gridLines: {
                display: true,
                drawBorder: false
              }
          }],
          yAxes: [{
              ticks: {
                fontColor: '#cccccc',
                fontSize: 15
              },
              gridLines: {
                display: false,
                drawBorder: false
              }
          }]
      }
    }
  }
  export default horizontalNps
