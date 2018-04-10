export const pieChart = {
  type: 'pie',
  data: {
    datasets: [{
      data: [10, 20, 30],
      backgroundColor: [
        'rgba(75,250,75,.8)',
        'rgba(250, 181, 71, .8)',
        'rgba(250,75,40,.8)'
      ],
      borderColor: '#666666ff',
      borderWidth: 4,
      hoverBorderColor: '#666666ff'
    }],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Positive',
      'Neutral',
      'Negative'
    ]
  },
  options: {
    responsive: true,
    legend: {
      position: top,
      display: false
    },
    layout: {
      padding: 0
    }
  }

}
export default pieChart
