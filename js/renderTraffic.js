const renderTrafficCard = () => {
  let listString = "";
  jejuTrafficData.forEach((data) => {
    listString += `<li><a href='${data.url}'>${data.title}</a></li>`;
  });
  listString +=
    "<li>개인정보 보호를 위하여 2주가 지난 경로는 삭제하고 있습니다.</li>";
  document.getElementById("patientsList").innerHTML = listString;
};

renderTrafficCard();
