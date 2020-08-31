const worldCumulativeData_date_Array = [];
const worldCumulativeData_confirmed_Array = [];
const worldCumulativeData_deaths_Array = [];
const worldCumulativeData_recovered_Array = [];

for (let i = 0; i <= worldLastIndex; i++) {
  const dateData = worldCumulativeData[i];
  worldCumulativeData_date_Array.push(dateData[0]);
  worldCumulativeData_confirmed_Array.push(dateData[1]);
  worldCumulativeData_deaths_Array.push(dateData[2]);
  worldCumulativeData_recovered_Array.push(dateData[3]);
}

new Chart(document.getElementById("myAreaChart"), {
  type: "line",
  data: {
    labels: worldCumulativeData_date_Array,
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
        data: worldCumulativeData_confirmed_Array,
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
        data: worldCumulativeData_deaths_Array,
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
        data: worldCumulativeData_recovered_Array,
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

// Area Chart Example2
new Chart(document.getElementById("myAreaChart_two"), {
  type: "line",
  data: {
    labels: ["19년11월", "19년12월", "20년1월", "20년2월"],
    datasets: [
      {
        label: "입도 현황(명) ",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(111, 111, 111, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(100, 115, 223, 1)",
        pointBorderColor: "rgba(111, 111, 111, 1)",
        borderWidth: 1,
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: [100266, 98541, 89678, 4286],
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

// 입도객현황
new Chart(document.getElementById("myAreaChart_three"), {
  type: "line",
  data: {
    labels: 입도객현황.날짜,
    datasets: [
      {
        label: "내국인 ",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        borderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 0,
        data: 입도객현황.내국인,
      },
      {
        label: "외국인 ",
        lineTension: 0.3,
        backgroundColor: "rgba(28, 200, 138, 0.05)",
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
        data: 입도객현황.외국인,
      },
      {
        label: "중국인 ",
        lineTension: 0.3,
        backgroundColor: "rgba(246, 194, 62, 0.05)",
        borderColor: "rgba(246, 194, 62, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(246, 194, 62, 1)",
        pointBorderColor: "rgba(246, 194, 62, 1)",
        borderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(246, 194, 62, 1)",
        pointHoverBorderColor: "rgba(246, 194, 62, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 0,
        data: 입도객현황.중국인,
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

// 한국 누적 확진자 그래프
new Chart(document.getElementById("myAreaChart_four"), {
  type: "line",
  data: {
    labels: koreaTotalCumulativeData_날짜_Array,
    datasets: [
      {
        label: "한국 확진자 ",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderWidth: 1,
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 0,
        pointBorderWidth: 0,
        data: koreaTotalCumulativeData_확진자_Array,
      },
      {
        label: "전일대비 증가 ",
        lineTension: 0.3,
        backgroundColor: "rgba(28, 200, 138, 0.05)",
        borderWidth: 1,
        borderColor: "rgba(28, 200, 138, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(28, 200, 138, 1)",
        pointBorderColor: "rgba(28, 200, 138, 1)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(28, 200, 138, 1)",
        pointHoverBorderColor: "rgba(28, 200, 138, 1)",
        pointHitRadius: 0,
        pointBorderWidth: 0,
        data: koreaTotalCumulativeData_전일차_Array,
      },
      {
        label: "사망자 ",
        lineTension: 0.3,
        backgroundColor: "rgba(54, 185, 204, 0.05)",
        borderWidth: 1,
        borderColor: "rgba(54, 185, 204, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(54, 185, 204, 1)",
        pointBorderColor: "rgba(54, 185, 204, 1)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(54, 185, 204, 1)",
        pointHoverBorderColor: "rgba(54, 185, 204, 1)",
        pointHitRadius: 0,
        pointBorderWidth: 0,
        data: koreaTotalCumulativeData_사망자_Array,
      },
      {
        label: "완치자 ",
        lineTension: 0.3,
        backgroundColor: "rgba(246, 194, 62, 0.05)",
        borderWidth: 1,
        borderColor: "rgba(246, 194, 62, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(246, 194, 62, 1)",
        pointBorderColor: "rgba(246, 194, 62, 1)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(246, 194, 62, 1)",
        pointHoverBorderColor: "rgba(246, 194, 62, 1)",
        pointHitRadius: 0,
        pointBorderWidth: 0,
        data: koreaTotalCumulativeData_완치자_Array,
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
        bottom: 30,
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

{
  const 확진자추이그래프_세계확진자 = [];
  const 확진자추이그래프_세계확진자편차 = [];
  const 확진자추이그래프_세계비율 = [];
  const febFirstIndex = worldCumulativeData.map((data, index) => {
    if (data[0] == "2/1") return index;
  });

  for (let i = febFirstIndex; i <= worldLastIndex; i++) {
    확진자추이그래프_세계확진자.push(
      parseInt(worldCumulativeData_confirmed_Array[i], 10)
    );
    console.log(worldCumulativeData_confirmed_Array[i]);
    const worldDailyDiff =
      worldCumulativeData_confirmed_Array[i] -
      worldCumulativeData_confirmed_Array[i - 1];
    if (worldDailyDiff < 0) {
      확진자추이그래프_세계확진자편차.push(0);
    } else {
      확진자추이그래프_세계확진자편차.push(parseInt(worldDailyDiff, 10));
    }
    확진자추이그래프_세계비율.push(
      (확진자추이그래프_세계확진자편차[i - febFirstIndex] /
        확진자추이그래프_세계확진자[i - febFirstIndex]) *
        100
    );
  }
  new Chart(document.getElementById("myAreaChart_five"), {
    type: "line",
    data: {
      labels: koreaTotalCumulativeData_날짜_Array,
      datasets: [
        {
          label: "한국 추이 ",
          lineTension: 0.3,
          backgroundColor: "rgba(78, 115, 223, 0.05)",
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
          data: koreaTotalCumulativeData_비율_Array,
        },
        {
          label: "세계 추이 ",
          lineTension: 0.3,
          backgroundColor: "rgba(28, 200, 138, 0.05)",
          borderColor: "rgba(28, 200, 138, 1)",
          borderWidth: 1,
          pointRadius: 3,
          pointBackgroundColor: "rgba(28, 200, 138, 1)",
          pointBorderColor: "rgba(28, 200, 138, 1)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(28, 200, 138, 1)",
          pointHoverBorderColor: "rgba(28, 200, 138, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 0,
          data: 확진자추이그래프_세계비율,
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
          bottom: 5,
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
            return datasetLabel + "" + number_format(tooltipItem.yLabel) + "%";
          },
        },
      },
    },
  });
}

new Chart(document.getElementById("myAreaChart_six"), {
  type: "line",
  data: {
    labels: koreaTotalCumulativeData_날짜_Array,
    datasets: [
      {
        label: "한국 누적 확진자",
        borderColor: ["rgba(255, 99, 132, 1)"],
        data: koreaTotalCumulativeData_확진자_Array,
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
        bottom: 5,
      },
    },
    scales: {
      yAxes: [
        {
          type: "logarithmic",
          ticks: {
            min: 10,
            max: 100000,
            callback: function (value, index, values) {
              if (value === 1000000) return "1M";
              if (value === 100000) return "100K";
              if (value === 10000) return "10K";
              if (value === 1000) return "1K";
              if (value === 100) return "100";
              if (value === 10) return "10";
              if (value === 0) return "0";
              return null;
            },
          },
        },
      ],
    },
  },
});

{
  let myLineChart = new Chart(document.getElementById("전일대비그래프"), {
    type: "line",
    data: {
      labels: koreaTotalCumulativeData_날짜_Array.slice(-10),
      datasets: [
        {
          label: "한국 추이 ",
          // lineTension: 0.3,
          backgroundColor: "rgba(78, 115, 223, 0.5)",
          borderColor: "rgba(78, 115, 223, 1)",
          borderWidth: 1,
          // pointRadius: 3,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          // pointBorderColor: "rgba(78, 115, 223, 1)",
          // pointHoverRadius: 5,
          // pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          // pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          // pointHitRadius: 10,
          // pointBorderWidth: 0,
          data: koreaTotalCumulativeData_전일차_Array.slice(-10),
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
          bottom: 5,
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
              // maxTicksLimit: 5,
              // padding: 10,
              min: 0,
              suggestedMax: 65,
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
            return datasetLabel + "" + number_format(tooltipItem.yLabel) + "명";
          },
        },
      },
    },
  });

  moment.locale("ko");
  const endDate = moment(
    koreaTotalCumulativeData[koreaLastIndex][0] + "/2020",
    "MM DD YYYY"
  );
  const startDate = moment().subtract(29, "days");

  const updateDates = (chart, startDate, endDate) => {
    const getIndex = (date) => {
      let diff = endDate.diff(date.startOf("day")) / (24 * 60 * 60 * 1000);
      return koreaLastIndex - diff;
    };

    let startIndex = getIndex(startDate);
    let endIndex = getIndex(endDate) + 1;

    chart.data.labels = koreaTotalCumulativeData_날짜_Array.slice(
      startIndex,
      endIndex
    );
    chart.data.datasets[0].data = koreaTotalCumulativeData_전일차_Array.slice(
      startIndex,
      endIndex
    );
    chart.update();
  };

  const cb = (start, end) => {
    $("#reportrange span").html(
      start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
    );
    updateDates(myLineChart, start, end);
  };

  $("#reportrange").daterangepicker(
    {
      startDate,
      endDate,
      minDate: moment("02/01/2020", "MM DD YYYY"),
      maxDate: endDate,
      ranges: {
        "지난 7일": [moment().subtract(6, "days"), endDate],
        "지난 한달": [moment().subtract(29, "days"), endDate],
      },
    },
    cb
  );

  cb(startDate, endDate);
}
