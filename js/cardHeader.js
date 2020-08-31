let 한국확진자수 = 0;

const setElementsInnerHTML = () => {
  const 한국전일대비 = koreaTotalCumulativeData[koreaLastIndex][2];
  const 세계전일대비 = 확진자수 - worldCumulativeData[worldLastIndex - 1][1];
  const 세계_치명률 = ((사망자수 / 확진자수) * 100).toFixed(2);
  const 한국_치명률 = (
    (koreaTotalCumulativeData[koreaLastIndex][3] /
      koreaTotalCumulativeData[koreaLastIndex][1]) *
    100
  ).toFixed(2);
  const 날짜 = koreaTotalCumulativeData[koreaLastIndex][0];

  for (let index in marker) {
    if (marker[index]["Name"] == "한국") {
      한국확진자수 = marker[index]["확진자수"];
    } else if (marker[index]["Name"] == "제주") {
      document.getElementById("제주확진자").innerHTML =
        marker[index]["확진자수"];
      document.getElementById("제주사망자").innerHTML =
        marker[index]["사망자수"];
      document.getElementById("제주완치").innerHTML = marker[index]["완치자수"];
    }
  }
  document.getElementById("text-update-datetime").innerHTML = updateTime;
  document.getElementById(
    "지역별확진자_업데이트_시간_태그"
  ).innerHTML = updateTime;
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
  document.getElementById("치명률").innerHTML = 한국_치명률;
  document.getElementById("한국_치명률").innerHTML = 한국_치명률;
  document.getElementById("세계치명률").innerHTML = 세계_치명률;
  document.getElementById("세계_치명률").innerHTML = 세계_치명률;
  document.getElementById("치명률_날짜").innerHTML = 날짜;
  document.getElementById("통계치_날짜").innerHTML = 날짜;
};

// 국내, 세계 상세현황 그래프 관련 스크립트
const setChartElementsHTML = () => {
  const korea = marker.find((i) => i.Name == "한국");

  const 한국_격리자수 = korea.확진자수 - korea.사망자수 - korea.완치자수;
  const 세계_격리자수 = 확진자수 - 사망자수 - 완치자수;

  const koreanText = document.getElementsByClassName("koreanText");
  const worldText = document.getElementsByClassName("worldText");
  const koreanChart = document.getElementsByClassName("koreanChart");
  const worldChart = document.getElementsByClassName("worldChart");

  koreanText[0].innerText = korea.확진자수.toLocaleString();
  koreanText[1].innerText = 한국_격리자수.toLocaleString();
  koreanText[2].innerText = korea.완치자수.toLocaleString();
  koreanText[3].innerText = korea.사망자수.toLocaleString();
  koreanChart[0].style.width =
    ((korea.확진자수 - korea.사망자수 - korea.완치자수) / korea.확진자수) *
      100 +
    "%";
  koreanChart[1].style.width = (korea.완치자수 / korea.확진자수) * 100 + "%";
  koreanChart[2].style.width = (korea.사망자수 / korea.확진자수) * 100 + "%";
  koreanChart[0].title = "격리자 " + 한국_격리자수.toLocaleString() + "명";
  koreanChart[1].title = "완치자 " + korea.완치자수.toLocaleString() + "명";
  koreanChart[2].title = "사망자 " + korea.사망자수.toLocaleString() + "명";

  worldText[0].innerText = 확진자수.toLocaleString();
  worldText[1].innerText = 세계_격리자수.toLocaleString();
  worldText[2].innerText = 완치자수.toLocaleString();
  worldText[3].innerText = 사망자수.toLocaleString();
  worldChart[0].style.width = (세계_격리자수 / 확진자수) * 100 + "%";
  worldChart[1].style.width = (완치자수 / 확진자수) * 100 + "%";
  worldChart[2].style.width = (사망자수 / 확진자수) * 100 + "%";
  worldChart[0].title = "격리자 " + 세계_격리자수.toLocaleString() + "명";
  worldChart[1].title = "완치자 " + 완치자수.toLocaleString() + "명";
  worldChart[2].title = "사망자 " + 사망자수.toLocaleString() + "명";
};

setElementsInnerHTML();
setChartElementsHTML();
