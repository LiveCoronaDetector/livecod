var top15Chart = null;

var countryNameMapper = {
  "Korea, Republic of": "Korea, South",
  "United States": "US",
};

NodeList.prototype.indexOf = Array.prototype.indexOf;

for (let i = 0; i < topText.length; i++) {
  topText[i].addEventListener("click", function (e) {
    countryNameClicked(e);
  });
}

function countryNameClicked(e) {
  // chartData 객체는 .date (label), .confirmed,
  // .deaths, .recovered를 사용하여 그래프를 그립니다.
  var chartData = {};

  // console.log(topText.indexOf(e.currentTarget));
  // console.log(marker);//지도마커가 찍힘 ->  top15Countries에서 hopkins_graph_marker로 깊은복사

  var countryName =
    countryNameMapper[
      hopkins_graph_marker[topText.indexOf(e.currentTarget)].Name_en
    ];
  if (!countryName) {
    countryName =
      hopkins_graph_marker[topText.indexOf(e.currentTarget)].Name_en;
  }

  for (let j = 0; j < hopkinsData.length; j++) {
    if (
      hopkinsData[j]["name"] == countryName &&
      (hopkinsData[j]["province/state"] == "total" ||
        hopkinsData[j]["province/state"] == "")
    ) {
      chartData.date = hopkinsData[0]["date"];
      chartData.confirmed = hopkinsData[j]["confirmed"];
      chartData.deaths = hopkinsData[j]["deaths"];
      chartData.recovered = hopkinsData[j]["recovered"];

      // 한국 증가추이 (존스홉킨스 데이터가 아니라 질본 데이터입니다.)
      if (hopkinsData[j]["name"] == "Korea, South") {
        var hopkinsData_korea_date_t = [];
        var hopkinsData_korea_confirmed_t = [];
        var hopkinsData_korea_deaths_t = [];
        var hopkinsData_korea_recovered_t = [];

        for (let k = 0; k < koreaTotalCumulativeData.length; k++) {
          hopkinsData_korea_date_t.push(koreaTotalCumulativeData[k][0]);
          hopkinsData_korea_confirmed_t.push(koreaTotalCumulativeData[k][1]);
          hopkinsData_korea_deaths_t.push(koreaTotalCumulativeData[k][3]);
          hopkinsData_korea_recovered_t.push(koreaTotalCumulativeData[k][4]);
        }
        chartData.date = hopkinsData_korea_date_t;
        chartData.confirmed = hopkinsData_korea_confirmed_t;
        chartData.deaths = hopkinsData_korea_deaths_t;
        chartData.recovered = hopkinsData_korea_recovered_t;
      }
    }
  }

  if (top15Chart !== null) {
    top15Chart.destroy();
  }

  top15Chart = createTop15Chart(chartData);
}

function createTop15Chart(chartData) {
  var ctxTOP15 = document.getElementById("top15graph");

  var top15ChartObj = new Chart(ctxTOP15, {
    type: "line",
    data: {
      labels: chartData.date,
      datasets: [
        {
          label: "확진자수 ",
          lineTension: 0.3,
          backgroundColor: "rgba(78, 115, 223, .05)",
          borderColor: "rgba(78, 115, 223, 1)",
          borderWidth: 1,
          pointRadius: 3,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 0,
          data: chartData.confirmed,
        },
        {
          label: "사망자수 ",
          lineTension: 0.3,
          backgroundColor: "rgba(28, 200, 138, .05)",
          borderColor: "rgba(28, 200, 138, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(28, 200, 138, 1)",
          pointBorderColor: "rgba(28, 200, 138, 1)",
          borderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(28, 200, 138, 1)",
          pointHoverBorderColor: "rgba(28, 200, 138, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 0,
          data: chartData.deaths,
        },
        {
          label: "완치자수 ",
          lineTension: 0.3,
          backgroundColor: "rgba(54, 185, 204, .05)",
          borderColor: "rgba(54, 185, 204, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(54, 185, 204, 1)",
          pointBorderColor: "rgba(54, 185, 204, 1)",
          borderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(54, 185, 204, 1)",
          pointHoverBorderColor: "rgba(54, 185, 204, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 0,
          data: chartData.recovered,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0,
        },
      },
      scales: {
        xAxes: [
          {
            time: {
              unit: "date",
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              maxTicksLimit: 7,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return "" + number_format(value);
              },
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2],
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: "#6e707e",
        titleFontSize: 14,
        borderColor: "#dddfeb",
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: "index",
        caretPadding: 10,
        callbacks: {
          label: function (tooltipItem, chart) {
            var datasetLabel =
              chart.datasets[tooltipItem.datasetIndex].label || "";
            return datasetLabel + "" + number_format(tooltipItem.yLabel);
          },
        },
      },
    },
  });

  return top15ChartObj;
}

function top15canvas() {
  // if(document.getElementById('collapseTop15')){
  //   // document.getElementById('top15graph').id = '';
  //   //
  //   document.getElementById('collapseTop15').classList.add('show');
  //   document.getElementById('collapseTop15').innerHTML = '<div style="height:35rem;"><canvas id="top15graph"></canvas></div>';
  // } else {
  //   // document.getElementById('collapseTop15').classList.add('show');
  //   document.getElementById('collapseTop15').innerHTML = '<div style="height:35rem;"><canvas id="top15graph"></canvas></div>';
  // }
  document.getElementById("collapseTop15").innerHTML =
    '<div style="height:35rem;"><canvas id="top15graph"></canvas></div>';
  // document.getElementById('collapseTop15').classList.add('show');
  document.getElementById("collapseTop15").classList.remove("show");
}
