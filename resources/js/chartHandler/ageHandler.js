$.ajax({
    url: '/data/current_korea_fatality.json',
    method: 'get',
    success: (data) => {
        let arrayGroup = [];
        let arrayConfirmed = [];
        let arrayDeath = [];
        let arrayFatality = [];

        for (var i = 0; i < data.length; i++) {
            arrayGroup.push(data[i]['구분']);
            arrayConfirmed.push(parseFloat(data[i]['확진자(%)'].replace(',','')));
            arrayDeath.push(parseFloat(data[i]['사망자(%)'].replace(',','')));
            arrayFatality.push(parseFloat(data[i]['치명율'].replace(',','')));
        }


        var CHART_AGE_CONFIRMED = document.getElementById('CHART_AGE_CONFIRMED');
        new Chart(CHART_AGE_CONFIRMED, {
            type: 'polarArea',
            data: {
                labels: arrayGroup,
                datasets: [{
                    label: '# of Votes',
                    data: arrayConfirmed,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
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
                    caretPadding: 10,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        var CHART_AGE_FATALITY = document.getElementById('CHART_AGE_FATALITY').getContext('2d');
        new Chart(CHART_AGE_FATALITY, {
            type: 'polarArea',
            data: {
                labels: arrayGroup,
                datasets: [{
                    label: '# of Votes',
                    data: arrayFatality,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
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
                    caretPadding: 10,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
});