export const pieChart = {
  type: 'pie',
  data: {
    datasets: [{
      data: [10, 20, 30],
      backgroundColor: [
        'rgba(0,255,0,.5)', // Blue
        'rgba(0,0,255,.5)',
        'rgba(255,0,0,.5)'
      ]
    }],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Positive',
      'Neutral',
      'Negative'
    ]
  },
  options: {
    layout: {
      padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
      }
    },
    responsive: true,
    legend: {
      display: false,
    }
  }
}
export default pieChart
