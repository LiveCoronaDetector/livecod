"use strict";

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796'; // Pie Chart Example

var 모든확진자수 = marker.reduce(function (a, b) {
  // console.log(a, b.확진자수)
  return a + (b.확진자수 || 0);
}, 0);
var topText = document.querySelectorAll("#Top5>h4");
var topNumber = document.querySelectorAll("#Top5>div>div");

marker.sort(function (a, b) {
  return a.확진자수 < b.확진자수 ? 1 : -1;
});

for (var i = 0; i < 5; i++) {
  var percentage = marker[i].확진자수 / 모든확진자수 * 100;
  topText[i].innerHTML = String(i+1) + '. ' +
  marker[i].Name +
  "<span class='float-right'>" +
  Math.round(percentage * 100) / 100 +
  "%</span>";
  topNumber[i].style.width = percentage + "%";
}
