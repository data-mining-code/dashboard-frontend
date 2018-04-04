export const userBarChart = {
  type: 'horizontalBar',
  data: {
    labels: ["Dez", "Jan", "Feb"],

    datasets: [{
        data: [30, 50, 45],
        backgroundColor: 'rgba(250,75,40,.8)'
    },{
        data: [110, 140, 160],
        backgroundColor: 'rgba(250, 181, 71, .8)'
    },{
        data: [80, 100, 90],
        backgroundColor: 'rgba(75,250,75,.8)'
    }]
  },

  options: {
    tooltips: {
      enabled: false
    },
    hover :{
      animationDuration:0
    },
    scales: {
      xAxes: [{
          ticks: {
            suggestedMax: 300,
            beginAtZero:true,
            fontColor: '#ffffff'
          },
          scaleLabel:{
              display:false
          },
          gridLines: {
            drawBorder: true
          },
          stacked: true
      }],
      yAxes: [{
          gridLines: {
              display:false,
              drawBorder: false
          },
          stacked: true,
          ticks: {
            fontColor: "#ffffff"
          }
      }]
    },
    legend:{
      display:false
    }
  }

  // type: 'horizontalBar',
  // data: {
  //   datasets: [{
  //     data: [10, 20, 30],
  //     backgroundColor: [
  //       'rgba(0,255,0,.5)',
  //       'rgba(250, 181, 71, .8)',
  //       'rgba(250,75,40,.8)'

  //     ]
  //   }],
  //   // These labels appear in the legend and in the tooltips when hovering different arcs
  //   labels: [
  //     'Dec',
  //     'Jan',
  //     'Feb'
  //   ]
  // },
  // options: {
  //   responsive: true,
  //   legend: {
  //     position: top,
  //     display: false
  //   },
  //   layout: {
  //     padding: 0
  //   },
  //   scales: {
  //     xAxes: [{
  //       stacked: true,
  //       ticks: {
  //         fontColor: '#ffffff'
  //       },
  //       gridLines: {
  //         display: false
  //       }
  //     }],
  //     yAxes: [{
  //       stacked: true,
  //       ticks: {
  //         fontColor: '#ffffff'
  //       }
  //     }]
  //   }
  // }

}
export default userBarChart
