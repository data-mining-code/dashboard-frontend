export const pieChart = {
  type: 'doughnut',
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
      'Positiv',
      'Neutral',
      'Negativ'
    ]
  },
  options: {
    responsive: true
  }
}
export default pieChart
