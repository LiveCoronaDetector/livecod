let 한국확진자수 = 0;

for (let index in marker) {
  if (marker[index]["Name"] == "한국") {
    한국확진자수 = marker[index]["확진자수"];
  } else if (marker[index]["Name"] == "제주") {
    document.getElementById("제주확진자").innerHTML = marker[index]["확진자수"];
    document.getElementById("제주사망자").innerHTML = marker[index]["사망자수"];
    document.getElementById("제주완치").innerHTML = marker[index]["완치자수"];
  }
}

// 전세계 완치자 및 확진자 수 (marker2에서 불러옴)
const worldLastIndex = worldCumulativeData.length - 1;
const koreaLastIndex = koreaTotalCumulativeData.length - 1;

const 확진자수 = worldCumulativeData[worldLastIndex][1];
const 사망자수 = worldCumulativeData[worldLastIndex][2];
const 완치자수 = worldCumulativeData[worldLastIndex][3];
const 한국전일대비 = koreaTotalCumulativeData[koreaLastIndex][2];
const 세계전일대비 = 확진자수 - worldCumulativeData[worldLastIndex - 1][1];

// 전 세계 완치자 ui 반영
document.getElementById("확진자수").innerHTML = Number(
  확진자수
).toLocaleString();
document.getElementById("한국확진자").innerHTML = Number(
  한국확진자수
).toLocaleString();
document.getElementById("한국확진자전일비").innerHTML =
  " (전일대비) +" + Number(한국전일대비).toLocaleString();
document.getElementById("세계확진자전일비").innerHTML =
  " (전일대비) +" + Number(세계전일대비).toLocaleString();

// 지역별확진자 업데이트 시간
document.getElementById(
  "지역별확진자_업데이트_시간_태그"
).innerHTML = 지역별확진자_업데이트_시간;

const 한국_치명률 = (
  (koreaTotalCumulativeData[koreaLastIndex][3] /
    koreaTotalCumulativeData[koreaLastIndex][1]) *
  100
).toFixed(2);

const 세계_치명률 = ((사망자수 / 확진자수) * 100).toFixed(2);

document.getElementById("치명률").innerHTML = 한국_치명률;
document.getElementById("한국_치명률").innerHTML = 한국_치명률;
document.getElementById("세계치명률").innerHTML = 세계_치명률;
document.getElementById("세계_치명률").innerHTML = 세계_치명률;
document.getElementById("치명률_날짜").innerHTML =
  koreaTotalCumulativeData[koreaLastIndex][0];
document.getElementById("통계치_날짜").innerHTML =
  koreaTotalCumulativeData[koreaLastIndex][0];

// 국내, 세계 상세현황 그래프 관련 스크립트
var korea = marker.find(function (i) {
  return i.Name == "한국";
});
var 한국격리자수 = korea.확진자수 - korea.사망자수 - korea.완치자수;

var 모든확진자수 = 확진자수;
var 모든사망자수 = 사망자수;
var 모든완치자수 = 완치자수;
var 모든격리자수 = 확진자수 - 사망자수 - 완치자수;

var koreanText = document.getElementsByClassName("koreanText");
var worldText = document.getElementsByClassName("worldText");
var koreanChart = document.getElementsByClassName("koreanChart");
var worldChart = document.getElementsByClassName("worldChart");
koreanText[0].innerText = korea.확진자수.toLocaleString();
koreanText[1].innerText = 한국격리자수.toLocaleString();
koreanText[2].innerText = korea.완치자수.toLocaleString();
koreanText[3].innerText = korea.사망자수.toLocaleString();
koreanChart[0].style.width =
  ((korea.확진자수 - korea.사망자수 - korea.완치자수) / korea.확진자수) * 100 +
  "%";
koreanChart[1].style.width = (korea.완치자수 / korea.확진자수) * 100 + "%";
koreanChart[2].style.width = (korea.사망자수 / korea.확진자수) * 100 + "%";
koreanChart[0].title = "격리자 " + 한국격리자수.toLocaleString() + "명";
koreanChart[1].title = "완치자 " + korea.완치자수.toLocaleString() + "명";
koreanChart[2].title = "사망자 " + korea.사망자수.toLocaleString() + "명";

worldText[0].innerText = 모든확진자수.toLocaleString();
worldText[1].innerText = 모든격리자수.toLocaleString();
worldText[2].innerText = 모든완치자수.toLocaleString();
worldText[3].innerText = 모든사망자수.toLocaleString();
worldChart[0].style.width =
  ((모든확진자수 - 모든사망자수 - 모든완치자수) / 모든확진자수) * 100 + "%";
worldChart[1].style.width = (모든완치자수 / 모든확진자수) * 100 + "%";
worldChart[2].style.width = (모든사망자수 / 모든확진자수) * 100 + "%";
worldChart[0].title = "격리자 " + 모든격리자수.toLocaleString() + "명";
worldChart[1].title = "완치자 " + 모든완치자수.toLocaleString() + "명";
worldChart[2].title = "사망자 " + 모든사망자수.toLocaleString() + "명";
