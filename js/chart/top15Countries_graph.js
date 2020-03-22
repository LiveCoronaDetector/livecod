// TOP15 countury graph

// test code 시작

// window.addEventListener('click', function(e){
//   // console.log(e)
//   // console.log(e.target.offsetParent);
//   // console.log(e.target.offsetParent.innerHTML);
// });

//NodeList는 HTML 객체
//원래 indexOf 함수가 NodeList에서 작동이 안되는데 작동이 되도록 하는 코드
// NodeList.prototype.indexOf = Array.prototype.indexOf;
//
// for (var i=0;i < topText.length;i++) {
//   topText[i].addEventListener("click", function(e){
//     // console.log(marker[topText.indexOf(e.currentTarget)]);
//     // console.log(marker[topText.indexOf(e.currentTarget)].Name_en)
//   })
// }

// test코드 종료


NodeList.prototype.indexOf = Array.prototype.indexOf;

for (var i=0;i < topText.length;i++) {
  topText[i].addEventListener("click", function(e){
    for (var i = 0; i < hopkinsData.length; i++) {
      if (hopkinsData[i]["name"] ==
      marker[topText.indexOf(e.currentTarget)].Name_en && (
      hopkinsData[i]["province/state"] == "total" ||
      hopkinsData[i]["province/state"] == "")){
        var hopkins_date_Array = hopkinsData[0]['date'];
        var hopkins_confirmed_Array = hopkinsData[i]['confirmed'];
        var hopkins_deaths_Array = hopkinsData[i]['deaths'];
        var hopkins_recovered_Array = hopkinsData[i]['recovered'];
      }
    }

    var ctxTOP15 = document.getElementById("top15graph");
    var myLineChart = new Chart(ctxTOP15, {
      type: 'line',
      data: {
        labels: hopkins_date_Array,
        datasets: [{
          label: "확진자수 ",
          lineTension: 0.3,
          backgroundColor: "rgba(78, 115, 223, .05)",
          borderColor: "rgba(78, 115, 223, 1)",
          borderWidth:1,
          pointRadius: 3,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 0,
          data: hopkins_confirmed_Array,
        },{
          label: "사망자수 ",
          lineTension: 0.3,
          backgroundColor: "rgba(28, 200, 138, .05)",
          borderColor: "rgba(28, 200, 138, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(28, 200, 138, 1)",
          pointBorderColor: "rgba(28, 200, 138, 1)",
          borderWidth:1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(28, 200, 138, 1)",
          pointHoverBorderColor: "rgba(28, 200, 138, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 0,
          data: hopkins_deaths_Array,
        },{
          label: "완치자수 ",
          lineTension: 0.3,
          backgroundColor: "rgba(54, 185, 204, .05)",
          borderColor: "rgba(54, 185, 204, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(54, 185, 204, 1)",
          pointBorderColor: "rgba(54, 185, 204, 1)",
          borderWidth:1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(54, 185, 204, 1)",
          pointHoverBorderColor: "rgba(54, 185, 204, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 0,
          data: hopkins_recovered_Array,
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return '' + number_format(value);
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          callbacks: {
            label: function(tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + '' + number_format(tooltipItem.yLabel);
            }
          }
        }
      }
    });

  })
}
