export const pieChart = {
    type: 'horizontalBar',
    data: {
      datasets: [{
        data: [10, 20, 30],
        backgroundColor: [
          '#002d72', 
          '#002d72',
          '#002d72',
          '#002d72'
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
        fontColor: 'white',
        fontSize: 40
      },
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
          xAxes: [{
              ticks: {
                suggestedMin: -100,
                fontColor: 'black',
                fontSize: 15    
              },
              gridLines: {
                  display: false
              }
          }],
          yAxes: [{
              ticks: {
                fontColor: 'black',
                fontSize: 15
              },
              gridLines: {
                  display: false
              }
          }]
      }
    }
  }
  export default pieChart
    