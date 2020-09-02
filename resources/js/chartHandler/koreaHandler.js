$.ajax({
    url: '/data/cumulative_korea.json',
    method: 'get',
    success: (data) => {
        let arrayDate = [];
        let arrayConfirmed = [];
        let arrayDelta = [];
        let arrayDeath = [];
        let arrayRecovered = [];
        let arrayProportion = [];

        for (let i = 0; i < data.length; i++) {
            arrayDate.push(data[i].date);
            arrayConfirmed.push(data[i].confirmed);
            arrayDelta.push(data[i].confirmed_delta);
            arrayDeath.push(data[i].deaths);
            arrayRecovered.push(data[i].recovered);
            arrayProportion.push(arrayDelta[i] / arrayConfirmed[i] * 100);
        }

        const CHART_KOR_LINER = document.getElementById("CHART_KOR_LINER");
        new Chart(CHART_KOR_LINER, {
            type: 'line',
            data: {
                labels: arrayDate,
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
                    data: arrayConfirmed,
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
                    data: arrayDelta,
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
                    data: arrayDeath,
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
                    data: arrayRecovered,
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

        const CHART_KOR_LOG = document.getElementById("CHART_KOR_LOG");
        new Chart(CHART_KOR_LOG, {
            type: "line",
            data: {
                labels: arrayDate,
                datasets: [
                    {
                        label: "한국 누적 확진자",
                        borderColor: ["rgba(255, 99, 132, 1)"],
                        data: arrayConfirmed
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
    }
});

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