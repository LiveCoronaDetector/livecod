const renderTop15 = () => {
  const 모든확진자수 = marker.reduce((a, b) => a + (b.확진자수 || 0), 0);

  const topText = document.querySelectorAll("#Top5>h4"),
    topCases = document.querySelectorAll("#Top5>div>.bg-warning"), //TOP 확진자
    topFullRecover = document.querySelectorAll("#Top5>div>.bg-success"), //TOP 완치자
    topDeathToll = document.querySelectorAll("#Top5>div>.bg-danger"); //TOP 사망자

  marker.sort(function (a, b) {
    return a.확진자수 < b.확진자수 ? 1 : -1;
  });

  for (let i = 0; i < topText.length; i++) {
    topText[i].addEventListener("click", function (e) {
      countryNameClicked(e);
    });
  }

  for (let i = 0; i < 15; i++) {
    const cases_count = marker[i].확진자수,
      full_recovery_count = marker[i].완치자수,
      dead_toll_count = marker[i].사망자수;

    const percentage = (cases_count / 모든확진자수) * 100, //나라별 비율
      TOP5_fatality_rate = ((dead_toll_count / cases_count) * 100).toFixed(2), // 치명율
      TOP5_full_recovery_rate = (
        (full_recovery_count / cases_count) *
        100
      ).toFixed(2), // 완치율,
      quarantine_count = cases_count - full_recovery_count - dead_toll_count, // 격리중 (치료중) = 확진자 - 완치자 - 사망자
      rate_total = quarantine_count + dead_toll_count + full_recovery_count, //격리자수 + 사망자수 + 완치자수
      rate_cases = (cases_count / rate_total) * 100, //확진자수 비율,
      rate_quarantine = (quarantine_count / rate_total) * 100, //격리자수 비율
      rate_death_toll = (dead_toll_count / rate_total) * 100, //사망자수 비율
      rate_full_recovery = (full_recovery_count / rate_total) * 100; //완치자수 비율

    topText[i].innerHTML = `<div style="font-size:0.9rem">${i + 1}. ${
      marker[i].Name
    }(${marker[i].Name_en}) : ${Number(cases_count).toLocaleString()} (${
      Math.round(percentage * 100) / 100
    }%) </div><div class='rate'>치명률 : <span class='bold'>${TOP5_fatality_rate}</span>% / 완치율 : <span class='bold'>${TOP5_full_recovery_rate}</span></div>`;

    topCases[i].style.width = rate_quarantine + "%"; //격리자비율 - 그래프값
    topFullRecover[i].style.width = rate_full_recovery + "%"; //완치자비율 - 그래프값
    topDeathToll[i].style.width = rate_death_toll + "%"; //사망자비율 - 그래프값

    topCases[i].title = "격리자 " + quarantine_count.toLocaleString() + "명"; //TOP 격리자
    topFullRecover[i].title =
      "완치자 " + full_recovery_count.toLocaleString() + "명"; //TOP 완치자
    topDeathToll[i].title = "사망자 " + dead_toll_count.toLocaleString() + "명"; //TOP 사망자
  }
};

renderTop15();
