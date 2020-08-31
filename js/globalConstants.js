let simulClick = true;

const worldLastIndex = worldCumulativeData.length - 1;
const koreaLastIndex = koreaTotalCumulativeData.length - 1;
const koreaRegionLastIndex = koreaRegionalData.length - 1;

const updateTime = koreaRegionalData[koreaRegionLastIndex]["업데이트날짜"];

const 확진자수 = worldCumulativeData[worldLastIndex][1];
const 사망자수 = worldCumulativeData[worldLastIndex][2];
const 완치자수 = worldCumulativeData[worldLastIndex][3];

moment.locale("ko");
const endDate = moment(
  koreaTotalCumulativeData[koreaLastIndex][0] + "/2020",
  "MM DD YYYY"
);
const startDate = moment().subtract(29, "days");

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

// General data preparation
// 전세계추이
const worldCumulativeData_date_Array = [];
const worldCumulativeData_confirmed_Array = [];
const worldCumulativeData_deaths_Array = [];
const worldCumulativeData_recovered_Array = [];

for (let i = 0; i <= worldLastIndex; i++) {
  const dateData = worldCumulativeData[i];
  worldCumulativeData_date_Array.push(dateData[0]);
  worldCumulativeData_confirmed_Array.push(dateData[1]);
  worldCumulativeData_deaths_Array.push(dateData[2]);
  worldCumulativeData_recovered_Array.push(dateData[3]);
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

const 확진자추이그래프_세계확진자 = [];
const 확진자추이그래프_세계확진자편차 = [];
const 확진자추이그래프_세계비율 = [];
const febFirstIndex = worldCumulativeData.map((data, index) => {
  if (data[0] == "2/1") return index;
});

for (let i = febFirstIndex; i <= worldLastIndex; i++) {
  확진자추이그래프_세계확진자.push(
    parseInt(worldCumulativeData_confirmed_Array[i], 10)
  );
  const worldDailyDiff =
    worldCumulativeData_confirmed_Array[i] -
    worldCumulativeData_confirmed_Array[i - 1];
  if (worldDailyDiff < 0) {
    확진자추이그래프_세계확진자편차.push(0);
  } else {
    확진자추이그래프_세계확진자편차.push(parseInt(worldDailyDiff, 10));
  }
  확진자추이그래프_세계비율.push(
    (확진자추이그래프_세계확진자편차[i - febFirstIndex] /
      확진자추이그래프_세계확진자[i - febFirstIndex]) *
      100
  );
}

const ageDeathsPer_구분 = [];
const ageDeathsPer_확진자 = [];
const ageDeathsPer_사망자 = [];
const ageDeathsPer_치명율 = [];

for (let i = 0; i < ageDeathsPer.length; i++) {
  const dateData = ageDeathsPer[i];
  ageDeathsPer_구분.push(dateData["구분"]);
  ageDeathsPer_확진자.push(parseFloat(dateData["확진자(%)"].replace(",", "")));
  ageDeathsPer_사망자.push(parseFloat(dateData["사망자(%)"].replace(",", "")));
  ageDeathsPer_치명율.push(parseFloat(dateData["치명율"].replace(",", "")));
}
