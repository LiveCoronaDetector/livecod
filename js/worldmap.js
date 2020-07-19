"use strict";

window.onload = function () {
  var worldMapWrapper = document.querySelector(".world-map");
  var worldMap = document.querySelector("#objWorldmap");
  var svgDocument = worldMap.getSVGDocument();
  var land = svgDocument.querySelectorAll(".land");
  var textBox = document.createElement("div");
  var markerData = _marker;
  var countryData; // svg 국가명 매칭 함수
  var temp = 0;

  // 확진자 수에 따른 svg 클래스 삽입 함수
  function countryMarker(data, land){
    for(var i=0; i<data.length; i++){
      for(var j=0; j<land.length; j++){
        //marker.js의 국가 영어이름과 svg엘레먼트의 title속성값이 같다면 확진자가 존재하는 국가
        if(data[i].Name_en === land[j].getAttribute("title")){
          temp ++;
          // console.log(temp);

          // 완치자 수가 있으면 카운터는 확진자수 - 완치자수
          if(data[i].완치자수){
            var counter = data[i].확진자수 - data[i].완치자수;
          }else{
            var counter = data[i].확진자수;
          }
          land[j].setAttribute("class", land[j].getAttribute("class") + " infected");

          // 카운터 수에 따른 클래스 삽입
          // 시기에 따라 해당 값을 크게 할 필요가 있습니다.
          if(counter < 1){
            land[j].setAttribute("class", land[j].getAttribute("class") + " low");
          }else if(counter >= 1 && counter < 10000){
            land[j].setAttribute("class", land[j].getAttribute("class") + " middle");
          }else if(counter >= 10000 && counter < 50000){
            land[j].setAttribute("class", land[j].getAttribute("class") + " high");
          }else if(counter >= 50000 && counter < 100000){
            land[j].setAttribute("class", land[j].getAttribute("class") + " veryhigh");
          }else if(counter >= 100000){
            land[j].setAttribute("class", land[j].getAttribute("class") + " highest");
          }
        }
      }
    }
  }
  countryMarker(markerData, land);

  var infected = svgDocument.querySelectorAll(".infected");

  function matchingCountry(identity) {

    for(var i=0; i<markerData.length; i++){
      if(markerData[i].Name_en == identity){
        if(markerData[i].완치자수){
          textBox.innerHTML =
          '<dl class="list-countryInfo"><div><dt>국명 :</dt><dd>' +
          markerData[i].Name + '(' + markerData[i].Name_en +
          ')</dd></div><div><dt>확진자 :</dt><dd>'
          + comma(markerData[i].확진자수) +
          '</dd></div><div><dt>사망자 :</dt><dd>'
          + comma(markerData[i].사망자수) +
          '</dd></div><div><dt>완치자 :</dt><dd>'
          + comma(markerData[i].완치자수) +
          '</dd></div></dl>';
        }else{
          textBox.innerHTML =
          '<dl class="list-countryInfo"><div><dt>국명 :</dt><dd>' +
          markerData[i].Name + '(' + markerData[i].Name_en +
          ')</dd></div><div><dt>확진자 :</dt><dd>'
          + comma(markerData[i].확진자수) +
          '</dd></div><div><dt>사망자 :</dt><dd>'
          + comma(markerData[i].사망자수) +
          '</dd></div><div><dt>완치자 :</dt><dd> 0</dd></div></dl>';
        }
      }
    }
  }

  function comma(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  var _loop = function _loop(i) {
    infected[i].addEventListener("click", function (e) {
      var identity = infected[i].getAttribute("title");
      matchingCountry(identity);
      textBox.className = identity + " mapTextbox";
      textBox.style.left = e.pageX - 92 + "px";
      textBox.style.top = e.pageY + 53 + "px";
      worldMapWrapper.appendChild(textBox);
    });
  };

  for (var i = 0; i < infected.length; i++) {
    _loop(i);
  }
};
