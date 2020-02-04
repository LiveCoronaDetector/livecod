const markers = require("./data/mapMarkers.json");
let data = markers.countries;

let 확진자수 = 0;
let 사망자수 = 0;
for (var variable in data) {
  if (data[variable]["Name"] == "한국") {
    document.getElementById("한국확진자").innerHTML =
      data[variable]["확진자수"];
  }
  확진자수 += data[variable]["확진자수"];
  사망자수 += data[variable]["사망자수"];
}
document.getElementById("발생국가수").innerHTML = data.length;
document.getElementById("확진자수").innerHTML = Number(
  확진자수
).toLocaleString();
document.getElementById("사망자수").innerHTML = Number(
  사망자수
).toLocaleString();
