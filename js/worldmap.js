"use strict";

// 업데이트 일시 함수
function updateInfo(data) {
  var updateTarget = document.querySelector(".text-update");
  updateTarget.innerHTML = data.date + "일 " + data.time;
}

updateInfo(updateLog); // svg 클릭 이벤트 코드

window.onload = function () {
  var worldMapWrapper = document.querySelector(".world-map");
  var worldMap = document.querySelector("#objWorldmap");
  var svgDocument = worldMap.getSVGDocument();
  var infected = svgDocument.querySelectorAll(".click");
  var textBox = document.createElement("div");
  var markerData = this.marker;
  var countryData; // svg 국가명 매칭 함수

  function matchingCountry(identity) {
    switch (identity) {
      case 'CN':
        markerData.forEach(function (item) {
          if (item.Name === "중국") {
            countryData = item;
          }
        });
        break;

      case 'TW':
        markerData.forEach(function (item) {
          if (item.Name === "대만") {
            countryData = item;
          }
        });
        break;

      case 'TH':
        markerData.forEach(function (item) {
          if (item.Name === "태국") {
            countryData = item;
          }
        });
        break;

      case 'JP':
        markerData.forEach(function (item) {
          if (item.Name === "일본") {
            countryData = item;
          }
        });
        break;

      case 'VN':
        markerData.forEach(function (item) {
          if (item.Name === "베트남") {
            countryData = item;
          }
        });
        break;

      case 'NP':
        markerData.forEach(function (item) {
          if (item.Name === "네팔") {
            countryData = item;
          }
        });
        break;

      case 'MY':
        markerData.forEach(function (item) {
          if (item.Name === "말레이시아") {
            countryData = item;
          }
        });
        break;

      case 'KH':
        markerData.forEach(function (item) {
          if (item.Name === "캄보디아") {
            countryData = item;
          }
        });
        break;

      case 'LK':
        markerData.forEach(function (item) {
          if (item.Name === "스리랑카") {
            countryData = item;
          }
        });
        break;

      case 'AE':
        markerData.forEach(function (item) {
          if (item.Name === "아랍에미리트") {
            countryData = item;
          }
        });
        break;

      case 'IN':
        markerData.forEach(function (item) {
          if (item.Name === "인도") {
            countryData = item;
          }
        });
        break;

      case 'PH':
        markerData.forEach(function (item) {
          if (item.Name === "필리핀") {
            countryData = item;
          }
        });
        break;

      case 'US':
        markerData.forEach(function (item) {
          if (item.Name === "미국") {
            countryData = item;
          }
        });
        break;

      case 'CA':
        markerData.forEach(function (item) {
          if (item.Name === "캐나다") {
            countryData = item;
          }
        });
        break;

      case 'FR':
        markerData.forEach(function (item) {
          if (item.Name === "프랑스") {
            countryData = item;
          }
        });
        break;

      case 'DE':
        markerData.forEach(function (item) {
          if (item.Name === "독일") {
            countryData = item;
          }
        });
        break;

      case 'FI':
        markerData.forEach(function (item) {
          if (item.Name === "핀란드") {
            countryData = item;
          }
        });
        break;

      case 'IT':
        markerData.forEach(function (item) {
          if (item.Name === "이탈리아") {
            countryData = item;
          }
        });
        break;

      case 'GB':
        markerData.forEach(function (item) {
          if (item.Name === "영국") {
            countryData = item;
          }
        });
        break;

      case 'RU':
        markerData.forEach(function (item) {
          if (item.Name === "러시아") {
            countryData = item;
          }
        });
        break;

      case 'SE':
        markerData.forEach(function (item) {
          if (item.Name === "스웨덴") {
            countryData = item;
          }
        });
        break;

      case 'ES':
        markerData.forEach(function (item) {
          if (item.Name === "스페인") {
            countryData = item;
          }
        });
        break;

      case 'AU':
        markerData.forEach(function (item) {
          if (item.Name === "호주") {
            countryData = item;
          }
        });
        break;

      case 'KR':
        markerData.forEach(function (item) {
          if (item.Name === "한국") {
            countryData = item;
          }
        });
        break;
    }

    textBox.innerHTML = '<dl class="list-countryInfo"><div><dt>국명 :</dt><dd>' + countryData.Name + '(' + countryData.Name_en + ')</dd></div><div><dt>확진자 :</dt><dd>' + countryData.확진자수 + '</dd></div><div><dt>사망자 :</dt><dd>' + countryData.사망자수 + '</dd></div></dl>';
  }

  var _loop = function _loop(i) {
    infected[i].addEventListener("click", function (e) {
      var identity = infected[i].id;
      matchingCountry(identity);
      textBox.className = identity + " mapTextbox";
      textBox.style.left = e.pageX - 70 + "px";
      textBox.style.top = e.pageY + 60 + "px";
      worldMapWrapper.appendChild(textBox);
    });
  };

  for (var i = 0; i < infected.length; i++) {
    _loop(i);
  }
};
