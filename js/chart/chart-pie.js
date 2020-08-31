{
  const ageDeathsPer_구분 = [];
  const ageDeathsPer_확진자 = [];
  const ageDeathsPer_사망자 = [];
  const ageDeathsPer_치명율 = [];

  for (let i = 0; i < ageDeathsPer.length; i++) {
    const dateData = ageDeathsPer[i];
    ageDeathsPer_구분.push(dateData["구분"]);
    ageDeathsPer_확진자.push(
      parseFloat(dateData["확진자(%)"].replace(",", ""))
    );
    ageDeathsPer_사망자.push(
      parseFloat(dateData["사망자(%)"].replace(",", ""))
    );
    ageDeathsPer_치명율.push(parseFloat(dateData["치명율"].replace(",", "")));
  }

  new Chart(
    document.getElementById("koreaDeathsPerPieChart").getContext("2d"),
    {
      type: "polarArea",
      data: {
        labels: ageDeathsPer_구분,
        datasets: [
          {
            label: "# of Votes",
            data: ageDeathsPer_확진자,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: "#dddfeb",
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
          // callbacks: {
          //   label: function(tooltipItem, chart) {
          //     return '확진자 : ' + tooltipItem.yLabel + '명' ;
          //   }
          // }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    }
  );

  var ctxD_ = document
    .getElementById("koreaDeathsPerPieChart_two")
    .getContext("2d");
  var myChart = new Chart(ctxD_, {
    type: "polarArea",
    data: {
      labels: ageDeathsPer_구분,
      datasets: [
        {
          label: "# of Votes",
          data: ageDeathsPer_치명율,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: "#dddfeb",
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        // callbacks: {
        //   label: function(tooltipItem, chart) {
        //     console.log(tooltipItem);
        //     console.log(chart);
        //     return '치명율 : ' + tooltipItem.yLabel + '%' ;
        //   }
        // }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
