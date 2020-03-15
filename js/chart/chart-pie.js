"use strict";

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796'; // Pie Chart Example

var 모든확진자수 = marker.reduce(function (a, b) {
  // console.log(a, b.확진자수)
  return a + (b.확진자수 || 0);
}, 0);
var top확진자 = document.getElementsByClassName("top확진자");
var top완치자 = document.getElementsByClassName("top완치자");
var top사망자 = document.getElementsByClassName("top사망자");
var topText = document.querySelectorAll("#Top5>h4");
var top확진자 = document.querySelectorAll("#Top5>div>.bg-warning");
var top완치자 = document.querySelectorAll("#Top5>div>.bg-success");
var top사망자 = document.querySelectorAll("#Top5>div>.bg-danger");

marker.sort(function (a, b) {
  return a.확진자수 < b.확진자수 ? 1 : -1;
});

for (var i = 0; i < 15; i++) {
  var percentage = marker[i].확진자수 / 모든확진자수 * 100;
  var TOP5_치명율 = (marker[i].사망자수 / marker[i].확진자수 * 100).toFixed(2);
  var TOP5_완치율 = (marker[i].완치자수 / marker[i].확진자수 * 100).toFixed(2);
  topText[i].innerHTML = String(i + 1) + '. ' +
    marker[i].Name +
    ' : ' +
    Number(marker[i].확진자수).toLocaleString() +
    "<span class='float-right'>" +
    Math.round(percentage * 100) / 100 + "%" +
    "(치명률 : " + TOP5_치명율 +
    "%, 완치율 : " + TOP5_완치율 + "%)" +
    "</span>";
  top확진자[i].style.width = percentage / 100 * (100 - TOP5_완치율 - TOP5_치명율) + "%";
  top완치자[i].style.width = percentage / 100 * TOP5_완치율 + "%";
  top사망자[i].style.width = percentage / 100 * TOP5_치명율 + "%";
  top확진자[i].title = marker[i].확진자수.toLocaleString() + "명";
  top완치자[i].title = marker[i].완치자수.toLocaleString() + "명";
  top사망자[i].title = marker[i].사망자수.toLocaleString() + "명";
}