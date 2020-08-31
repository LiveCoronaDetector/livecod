var mapOptions = {
  center: new naver.maps.LatLng(35.8255645, 127.0965806),
  zoom: 7,
  zoomControl: true, //줌 컨트롤의 표시 여부
  zoomControlOptions: {
    //줌 컨트롤의 옵션
    position: naver.maps.Position.TOP_RIGHT,
  },
};

var koreamap = new naver.maps.Map("koreaMap", mapOptions);

var 지역이름 = [
  "서울",
  "인천",
  "경기",
  "세종",
  "대전",
  "충남",
  "전북",
  "광주",
  "전남",
  "강원",
  "충북",
  "경북",
  "대구",
  "경남",
  "울산",
  "부산",
  "제주",
];
var 지역좌표 = [
  [37.566418, 126.97795], //서울시청
  [37.456445, 126.705873], //인천시청
  [37.275221, 127.009382], //경기도청
  [36.480838, 127.289181], //세종시청
  [36.350664, 127.384819], //대전시청
  [36.658826, 126.672849], //충남도청
  [35.820599, 127.108759], //전북도청
  [35.160068, 126.851426], //광주광역시청
  [34.816351, 126.462924], //전남도청
  [37.8853, 127.729835], //강원(강원도청)
  [36.635947, 127.491345], //충북도청
  [36.574108, 128.509303], //경북도청
  [35.871468, 128.601757], //대구시청
  [35.238398, 128.692371], //경남도청
  [35.539772, 129.311486], //울산시청
  [35.180152, 129.07498], //부산시청
  [33.3617007, 126.511657], //제주
];

var 지역별현황판 = [
  "http://www.seoul.go.kr/coronaV/coronaStatus.do", //서울시청
  "https://www.incheon.go.kr/health/HE020409", //인천시청
  "https://www.gg.go.kr/bbs/boardView.do?bsIdx=464&bIdx=2296956&menuId=1535", //경기도청
  "https://www.sejong.go.kr/bbs/R3340/list.do?cmsNoStr=17479", //세종시청
  "https://www.daejeon.go.kr/corona19/index.do?tab=2&subTab=1", //대전시청
  "http://www.chungnam.go.kr/coronaStatus.do", //충남도청
  "http://www.jeonbuk.go.kr/board/list.jeonbuk?boardId=BBS_0000107&menuCd=DOM_000000105010005000", //전북도청
  "https://www.gwangju.go.kr/coronamap.jsp", //광주광역시청
  "https://www.jeonnam.go.kr/coronaMainPage.do", //전남도청
  "http://www.provin.gangwon.kr/gw/portal/sub05_01", //강원(강원도청)
  "http://www.chungbuk.go.kr/www/covid-19/index.html", //충북도청
  "http://www.gb.go.kr/Main/open_contents/section/wel/page.do?mnu_uid=5760&LARGE_CODE=360&MEDIUM_CODE=10&SMALL_CODE=50&SMALL_CODE2=60mnu_order=2", //경북도청
  "http://www.daegu.go.kr/", //대구시청
  "http://www.gyeongnam.go.kr/corona.html", //경남도청
  "http://www.ulsan.go.kr/corona.jsp", //울산시청
  "http://www.busan.go.kr/corona19/index", //부산시청
  "https://gis.jeju.go.kr/crn/index.do", //제주
];

var 지역별마커 = [];
var 지역별정보윈도우 = [];
for (let i in 지역이름) {
  // console.log(i);
  // console.log(지역좌표[i][0], 지역좌표[i][1]);
  // console.log(지역이름[i], 지역별확진자[i]);
  let 크롤러_지역별확진자 = 0;
  let 크롤러_지역별격리해제 = 0;
  let 크롤러_지역별사망자 = 0;
  let 크롤러_십만명당발생율 = 0;
  let 크롤러_지역별확진자비율 = 0;

  for (let c = 0; c < koreaRegionalData.length; c++) {
    if (지역이름[i] == koreaRegionalData[c]["지역이름"]) {
      크롤러_지역별확진자 = koreaRegionalData[c]["확진자수"];
      크롤러_지역별사망자 = koreaRegionalData[c]["사망자수"];
      크롤러_지역별격리해제 = koreaRegionalData[c]["격리해제수"];
      크롤러_십만명당발생율 = koreaRegionalData[c]["십만명당발생율"];
      크롤러_지역별확진자비율 = koreaRegionalData[c]["지역별확진자비율"];
    }
  }
  // console.log('크롤러')
  // console.log(지역이름[i], 크롤러_지역별확진자, 크롤러_지역별사망자);

  var point = new naver.maps.LatLng(지역좌표[i][0], 지역좌표[i][1]);
  var contentString = [
    '<div class="iw_inner">',
    '<p style="font-size: small; margin:10px;">지역이름 : ',
    지역이름[i],
    "<br>",
    "확진자수 : ",
    크롤러_지역별확진자,
    "<br>",
    "완치자수 : ",
    크롤러_지역별격리해제,
    "<br>",
    "사망자수 : ",
    크롤러_지역별사망자,
    "<br>",
    "인구 10만 명당 발생율 : ",
    크롤러_십만명당발생율,
    "명 <br>",
    "지역별 확진자 비율 : ",
    크롤러_지역별확진자비율,
    "% <br>",
    지역이름[i],
    '현황, 확진자 동선 : <a href="',
    지역별현황판[i],
    '" target="_blank">',
    지역이름[i],
    "바로가기<br>",
    "</p>",
    "</div>",
  ].join("");
  var marker = new naver.maps.Marker({
    map: koreamap,
    position: point,
  });
  var circle = new naver.maps.Circle({
    map: koreamap,
    center: point,
    radius: 크롤러_지역별확진자 * 15,
    strokeWeight: 3,
    fillColor: "#ff0000",
    fillOpacity: 0.7,
  });
  var infowindow = new naver.maps.InfoWindow({
    content: contentString,
    // maxWidth: 140,
    // backgroundColor: "#ffffff",
    // borderColor: "#000",
    // borderWidth: 1,
    // anchorSize: new naver.maps.Size(50, 30),
    // anchorSkew: true,
    // anchorColor: "#ffffff",
    // pixelOffset: new naver.maps.Point(10, -10)
  });
  지역별마커.push(marker);
  지역별정보윈도우.push(infowindow);
} //국가별 감염자 마커

// console.log(지역별마커);
// console.log(지역별정보윈도우);

naver.maps.Event.addListener(지역별마커[0], "click", function (e) {
  if (지역별정보윈도우[0].getMap()) {
    지역별정보윈도우[0].close();
  } else {
    지역별정보윈도우[0].open(koreamap, 지역별마커[0]);
  }
});

naver.maps.Event.addListener(지역별마커[1], "click", function (e) {
  if (지역별정보윈도우[1].getMap()) {
    지역별정보윈도우[1].close();
  } else {
    지역별정보윈도우[1].open(koreamap, 지역별마커[1]);
  }
});

naver.maps.Event.addListener(지역별마커[2], "click", function (e) {
  if (지역별정보윈도우[2].getMap()) {
    지역별정보윈도우[2].close();
  } else {
    지역별정보윈도우[2].open(koreamap, 지역별마커[2]);
  }
});

naver.maps.Event.addListener(지역별마커[3], "click", function (e) {
  if (지역별정보윈도우[3].getMap()) {
    지역별정보윈도우[3].close();
  } else {
    지역별정보윈도우[3].open(koreamap, 지역별마커[3]);
  }
});

naver.maps.Event.addListener(지역별마커[4], "click", function (e) {
  if (지역별정보윈도우[4].getMap()) {
    지역별정보윈도우[4].close();
  } else {
    지역별정보윈도우[4].open(koreamap, 지역별마커[4]);
  }
});

naver.maps.Event.addListener(지역별마커[5], "click", function (e) {
  if (지역별정보윈도우[5].getMap()) {
    지역별정보윈도우[5].close();
  } else {
    지역별정보윈도우[5].open(koreamap, 지역별마커[5]);
  }
});

naver.maps.Event.addListener(지역별마커[6], "click", function (e) {
  if (지역별정보윈도우[6].getMap()) {
    지역별정보윈도우[6].close();
  } else {
    지역별정보윈도우[6].open(koreamap, 지역별마커[6]);
  }
});

naver.maps.Event.addListener(지역별마커[7], "click", function (e) {
  if (지역별정보윈도우[7].getMap()) {
    지역별정보윈도우[7].close();
  } else {
    지역별정보윈도우[7].open(koreamap, 지역별마커[7]);
  }
});

naver.maps.Event.addListener(지역별마커[8], "click", function (e) {
  if (지역별정보윈도우[8].getMap()) {
    지역별정보윈도우[8].close();
  } else {
    지역별정보윈도우[8].open(koreamap, 지역별마커[8]);
  }
});

naver.maps.Event.addListener(지역별마커[9], "click", function (e) {
  if (지역별정보윈도우[9].getMap()) {
    지역별정보윈도우[9].close();
  } else {
    지역별정보윈도우[9].open(koreamap, 지역별마커[9]);
  }
});

naver.maps.Event.addListener(지역별마커[10], "click", function (e) {
  if (지역별정보윈도우[10].getMap()) {
    지역별정보윈도우[10].close();
  } else {
    지역별정보윈도우[10].open(koreamap, 지역별마커[10]);
  }
});

naver.maps.Event.addListener(지역별마커[11], "click", function (e) {
  if (지역별정보윈도우[11].getMap()) {
    지역별정보윈도우[11].close();
  } else {
    지역별정보윈도우[11].open(koreamap, 지역별마커[11]);
  }
});

naver.maps.Event.addListener(지역별마커[12], "click", function (e) {
  if (지역별정보윈도우[12].getMap()) {
    지역별정보윈도우[12].close();
  } else {
    지역별정보윈도우[12].open(koreamap, 지역별마커[12]);
  }
});

naver.maps.Event.addListener(지역별마커[13], "click", function (e) {
  if (지역별정보윈도우[13].getMap()) {
    지역별정보윈도우[13].close();
  } else {
    지역별정보윈도우[13].open(koreamap, 지역별마커[13]);
  }
});

naver.maps.Event.addListener(지역별마커[14], "click", function (e) {
  if (지역별정보윈도우[14].getMap()) {
    지역별정보윈도우[14].close();
  } else {
    지역별정보윈도우[14].open(koreamap, 지역별마커[14]);
  }
});

naver.maps.Event.addListener(지역별마커[15], "click", function (e) {
  if (지역별정보윈도우[15].getMap()) {
    지역별정보윈도우[15].close();
  } else {
    지역별정보윈도우[15].open(koreamap, 지역별마커[15]);
  }
});

naver.maps.Event.addListener(지역별마커[16], "click", function (e) {
  if (지역별정보윈도우[16].getMap()) {
    지역별정보윈도우[16].close();
  } else {
    지역별정보윈도우[16].open(koreamap, 지역별마커[16]);
  }
});
