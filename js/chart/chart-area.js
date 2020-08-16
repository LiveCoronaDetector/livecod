// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// 전세계추이

var crawlWorldCumulativeData_date_Array = [];
var crawlWorldCumulativeData_confirmed_Array = [];
var crawlWorldCumulativeData_deaths_Array = [];
var crawlWorldCumulativeData_recovered_Array = [];

for (var i = 0; i < crawlWorldCumulativeData.length; i++) {
  crawlWorldCumulativeData_date_Array.push(crawlWorldCumulativeData[i][0]);
  crawlWorldCumulativeData_confirmed_Array.push(crawlWorldCumulativeData[i][1]);
  crawlWorldCumulativeData_deaths_Array.push(crawlWorldCumulativeData[i][2]);
  crawlWorldCumulativeData_recovered_Array.push(crawlWorldCumulativeData[i][3]);
}

var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: crawlWorldCumulativeData_date_Array,
    datasets: [{
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
      data: crawlWorldCumulativeData_confirmed_Array,
    }, {
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
      data: crawlWorldCumulativeData_deaths_Array,
    }, {
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
      data: crawlWorldCumulativeData_recovered_Array,
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
          callback: function (value, index, values) {
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
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + '' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});

// Area Chart Example2
var ctx_two = document.getElementById("myAreaChart_two");
var myLineChart = new Chart(ctx_two, {
  type: 'line',
  data: {
    labels: ["19년11월", "19년12월", "20년1월", "20년2월"],
    datasets: [{
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
          callback: function (value, index, values) {
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
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + '' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});

// 입도객현황
var ctx_three = document.getElementById("myAreaChart_three");
var myLineChart = new Chart(ctx_three, {
  type: 'line',
  data: {
    labels: 입도객현황.날짜,
    datasets: [{
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
    }, {
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
    }, {
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
          callback: function (value, index, values) {
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
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + '' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});


// 한국 증가추이
var koreaRegionalCumulativeData_날짜_Array = [];
var koreaRegionalCumulativeData_확진자_Array = [];
var koreaRegionalCumulativeData_전일차_Array = [];
var koreaRegionalCumulativeData_사망자_Array = [];
var koreaRegionalCumulativeData_완치자_Array = [];
var koreaRegionalCumulativeData_비율_Array = []

for (let i = 0; i < koreaRegionalCumulativeData.length; i++) {
  koreaRegionalCumulativeData_날짜_Array.push(koreaRegionalCumulativeData[i][0]);
  koreaRegionalCumulativeData_확진자_Array.push(koreaRegionalCumulativeData[i][1]);
  koreaRegionalCumulativeData_전일차_Array.push(koreaRegionalCumulativeData[i][2]);
  koreaRegionalCumulativeData_사망자_Array.push(koreaRegionalCumulativeData[i][3]);
  koreaRegionalCumulativeData_완치자_Array.push(koreaRegionalCumulativeData[i][4]);
  koreaRegionalCumulativeData_비율_Array.push(
    koreaRegionalCumulativeData_전일차_Array[i] / koreaRegionalCumulativeData_확진자_Array[i] * 100
  );
}


// console.log(koreaRegionalCumulativeData_날짜_Array);
// console.log(koreaRegionalCumulativeData_확진자_Array);
// console.log(koreaRegionalCumulativeData_전일차_Array);
// console.log(koreaRegionalCumulativeData_사망자_Array);


// 한국 누적 확진자 그래프
var ctx_four = document.getElementById("myAreaChart_four");
var myLineChart = new Chart(ctx_four, {
  type: 'line',
  data: {
    labels: koreaRegionalCumulativeData_날짜_Array,
    datasets: [{
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
      data: koreaRegionalCumulativeData_확진자_Array,
    }, {
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
      data: koreaRegionalCumulativeData_전일차_Array,
    }, {
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
      data: koreaRegionalCumulativeData_사망자_Array,
    }, {
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
      data: koreaRegionalCumulativeData_완치자_Array,
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 30
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
          callback: function (value, index, values) {
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
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + '' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});



var 확진자추이그래프_세계확진자 = [];
var 확진자추이그래프_세계확진자편차 = [];
var 확진자추이그래프_세계비율 = [];


// console.log("test", marker2.labels.indexOf("2/1"))

for (let i = crawlWorldCumulativeData_date_Array.indexOf("2/1"); i < crawlWorldCumulativeData_date_Array.length; i++) {
  확진자추이그래프_세계확진자.push(parseInt(crawlWorldCumulativeData_confirmed_Array[i], 10));
  if (crawlWorldCumulativeData_confirmed_Array[i] - crawlWorldCumulativeData_confirmed_Array[i - 1] < 0) {
    확진자추이그래프_세계확진자편차.push(0);
  } else {
    확진자추이그래프_세계확진자편차.push(parseInt(crawlWorldCumulativeData_confirmed_Array[i] - crawlWorldCumulativeData_confirmed_Array[i - 1], 10));
  }
}

for (let i = 0; i < 확진자추이그래프_세계확진자.length; i++) {
  확진자추이그래프_세계비율.push((확진자추이그래프_세계확진자편차[i] / 확진자추이그래프_세계확진자[i]) * 100);
}

var ctx_five = document.getElementById("myAreaChart_five");
var myLineChart = new Chart(ctx_five, {
  type: 'line',
  data: {
    labels: koreaRegionalCumulativeData_날짜_Array,
    datasets: [{
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
      data: koreaRegionalCumulativeData_비율_Array,
    }, {
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
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 5
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
          callback: function (value, index, values) {
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
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + '' + number_format(tooltipItem.yLabel) + '%';
        }
      }
    }
  }
});


var 한국누적_확진 = [];
var 한국누적_날짜 = [];

for (var i = 0; i < koreaRegionalCumulativeData.length; i++) {
  한국누적_날짜.push(koreaRegionalCumulativeData[i][0]);
  한국누적_확진.push(koreaRegionalCumulativeData[i][1]);
}

var ctx_six = document.getElementById("myAreaChart_six");
var myChart = new Chart(ctx_six, {
  type: "line",
  data: {
    labels: 한국누적_날짜,
    datasets: [
      {
        label: "한국 누적 확진자",
        borderColor: ["rgba(255, 99, 132, 1)"],
        data: 한국누적_확진
      }
    ]
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 5
      }
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
            }
          }
        }
      ]
    }
  }
});



var ctx_전일대비그래프 = document.getElementById("전일대비그래프");
var myLineChart = new Chart(ctx_전일대비그래프, {
  type: 'line',
  data: {
    labels: koreaRegionalCumulativeData_날짜_Array.slice(-10,),
    datasets: [{
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
      data: koreaRegionalCumulativeData_전일차_Array.slice(-10,),
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 5
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
          // maxTicksLimit: 5,
          // padding: 10,
          min: 0,
          suggestedMax: 65,
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
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
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + '' + number_format(tooltipItem.yLabel) + '명';
        }
      }
    }
  }
});


const totalLength = koreaRegionalCumulativeData_날짜_Array.length;
var lastDate = moment(koreaRegionalCumulativeData_날짜_Array[totalLength - 1] + "/2020", "MM DD YYYY");
var start = moment().subtract(29, 'days');
var end = lastDate;

function getIndex(date){
  let diff = lastDate.diff(date.startOf('day')) / (24 * 60 * 60 * 1000);
  return totalLength - diff - 1;
}


function updateDates(chart, startDate, endDate){
  let startIndex = getIndex(startDate);
  let endIndex = getIndex(endDate) + 1;
  chart.data.labels = koreaRegionalCumulativeData_날짜_Array.slice(startIndex, endIndex);
  chart.data.datasets[0].data = koreaRegionalCumulativeData_전일차_Array.slice(startIndex, endIndex);
  chart.update();
}


function cb(start, end) {
  $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  updateDates(myLineChart, start, end);
}

$('#reportrange').daterangepicker({
    startDate: start,
    endDate: end,
    minDate: moment("02/01/2020", "MM DD YYYY"),
    maxDate: lastDate,
    ranges: {
       '지난 7일': [moment().subtract(6, 'days'), lastDate],
       '지난 한달': [moment().subtract(29, 'days'), lastDate],
    }
}, cb);

cb(start, end);