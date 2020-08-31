let simulClick = true;

const worldLastIndex = worldCumulativeData.length - 1;
const koreaLastIndex = koreaTotalCumulativeData.length - 1;
const koreaRegionLastIndex = koreaRegionalData.length - 1;

const updateTime = koreaRegionalData[koreaRegionLastIndex]["업데이트날짜"];

const 확진자수 = worldCumulativeData[worldLastIndex][1];
const 사망자수 = worldCumulativeData[worldLastIndex][2];
const 완치자수 = worldCumulativeData[worldLastIndex][3];

// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#858796";

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + "").replace(",", "").replace(" ", "");
  let n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      let k = Math.pow(10, prec);
      return `${Math.round(n * k) / k}`;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

// 한국 증가추이
const koreaTotalCumulativeData_날짜_Array = [];
const koreaTotalCumulativeData_확진자_Array = [];
const koreaTotalCumulativeData_전일차_Array = [];
const koreaTotalCumulativeData_사망자_Array = [];
const koreaTotalCumulativeData_완치자_Array = [];
const koreaTotalCumulativeData_비율_Array = [];

for (let i = 0; i <= koreaLastIndex; i++) {
  const dateData = koreaTotalCumulativeData[i];
  koreaTotalCumulativeData_날짜_Array.push(dateData[0]);
  koreaTotalCumulativeData_확진자_Array.push(dateData[1]);
  koreaTotalCumulativeData_전일차_Array.push(dateData[2]);
  koreaTotalCumulativeData_사망자_Array.push(dateData[3]);
  koreaTotalCumulativeData_완치자_Array.push(dateData[4]);
  koreaTotalCumulativeData_비율_Array.push(
    (koreaTotalCumulativeData_전일차_Array[i] /
      koreaTotalCumulativeData_확진자_Array[i]) *
      100
  );
}

function top15canvas() {
  const targetElement = document.getElementById("collapseTop15");
  targetElement.innerHTML =
    '<div style="height:35rem;"><canvas id="top15graph"></canvas></div>';
  targetElement.classList.remove("show");
}

NodeList.prototype.indexOf = Array.prototype.indexOf;
