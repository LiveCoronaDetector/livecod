"use strict";

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796'; // Pie Chart Example

var ctx = document.getElementById("myPieChart");
var chartText = document.querySelectorAll("#chartText .mr-2");
marker.sort(function (a, b) {
  return a.확진자수 < b.확진자수 ? 1 : -1;
});
chartText[0].innerText = marker[0].Name;
chartText[1].innerText = marker[1].Name;
chartText[2].innerText = marker[2].Name;
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [marker[0].Name, marker[1].Name, marker[2].Name],
    datasets: [{
      data: [marker[0].확진자수, marker[1].확진자수, marker[2].확진자수],
      backgroundColor: ['#ff3333', '#ffc155', '#fcff55'],
      hoverBackgroundColor: ['#ff0000', '#ff0000', '#ff0000'],
      hoverBorderColor: "rgba(222, 0, 0, 1)"
    }]
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80
  }
});