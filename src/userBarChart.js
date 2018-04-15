export const userBarChart = {
  type: 'horizontalBar',
  data: {
    labels: ["Dez", "Jan", "Feb"],

    datasets: [{
        data: [240, 490, 350],
        backgroundColor: 'rgba(250,75,40,.8)'
    },{
        data: [600, 340, 580],
        backgroundColor: 'rgba(75,250,75,.8)'
    },{
        data: [570, 580, 480],
        backgroundColor: 'rgba(250, 181, 71, .8)'
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
            suggestedMax: 1300,
            beginAtZero:true,
            fontColor: '#666666ff'
          },
          scaleLabel:{
              display:false
          },
          gridLines: {
            drawBorder: false,
            display: false 
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
            fontColor: "#cccccc"
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
