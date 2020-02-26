var mapOptions = {
    center: new naver.maps.LatLng(35.8255645, 127.0965806),
    zoom: 7,
    zoomControl: true, //줌 컨트롤의 표시 여부
    zoomControlOptions: { //줌 컨트롤의 옵션
              position: naver.maps.Position.TOP_RIGHT
    }
};

var koreamap = new naver.maps.Map('koreaMap', mapOptions);

var 지역이름 = ['서울', '인천', '경기', '세종', '대전', '충남', '전북', '광주', '전남', '강원', '충북', '경북', '대구', '경남', '울산', '부산', '제주'];
var 지역좌표 = [
  [37.566418, 126.977950],//서울시청
  [37.456445, 126.705873],//인천시청
  [37.275221, 127.009382],//경기도청
  [36.480838, 127.289181],//세종시청
  [36.350664, 127.384819],//대전시청
  [36.326828, 127.420840],//충남도청
  [35.820599, 127.108759], //전북도청
  [37.429553, 127.255131],//광주시청
  [34.816351, 126.462924],//전남도청
  [37.885300, 127.729835],//강원(강원도청)
  [36.635947, 127.491345],//충북도청
  [36.574108, 128.509303],//경북도청
  [35.871468, 128.601757],//대구시청
  [35.238398, 128.692371],//경남도청
  [35.539772, 129.311486],//울산시청
  [35.180152, 129.074980],//부산시청
  [33.3617007, 126.511657],//제주
];
var 지역별확진자 = [
  44, //서울
  3, //인천
  43, //경기
  1, //세종
  3, //대전
  2, //충남
  3, //전북
  9, //광주
  2, //전남
  6, //강원
  5, //충북
  267, //경북
  677, //대구
  25, //경남
  3, //울산
  51, //부산
  2, //제주
];
var 지역별마커 = [];
var 지역별정보윈도우 = [];
for(let i in 지역이름) {
    console.log(i);
    console.log(지역좌표[i][0], 지역좌표[i][1]);
    console.log(지역이름[i], 지역별확진자[i]);

    var point = new naver.maps.LatLng(지역좌표[i][0], 지역좌표[i][1]);
    var contentString = [
        '<div class="iw_inner">',
        '<p style="font-size: small; margin:10px;">지역이름 : ',지역이름[i],'<br>',
        '확진자수 : ',지역별확진자[i],'<br>',
        '</p>',
        '</div>'
    ].join('');
    var marker = new naver.maps.Marker({
        map: koreamap,
        position: point
    });
    var circle = new naver.maps.Circle({
        map: koreamap,
        center: point,
        radius: 지역별확진자[i]*100,
        strokeWeight: 3,
        fillColor: "#ff0000",
        fillOpacity: 0.7
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
}//국가별 감염자 마커

console.log(지역별마커);
console.log(지역별정보윈도우);

naver.maps.Event.addListener(지역별마커[0], "click", function(e) {
  if (지역별정보윈도우[0].getMap()) {
    지역별정보윈도우[0].close();
  } else {
    지역별정보윈도우[0].open(koreamap, 지역별마커[0]);
  }
});

naver.maps.Event.addListener(지역별마커[1], "click", function(e) {
  if (지역별정보윈도우[1].getMap()) {
    지역별정보윈도우[1].close();
  } else {
    지역별정보윈도우[1].open(koreamap, 지역별마커[1]);
  }
});

naver.maps.Event.addListener(지역별마커[2], "click", function(e) {
  if (지역별정보윈도우[2].getMap()) {
    지역별정보윈도우[2].close();
  } else {
    지역별정보윈도우[2].open(koreamap, 지역별마커[2]);
  }
});

naver.maps.Event.addListener(지역별마커[3], "click", function(e) {
  if (지역별정보윈도우[3].getMap()) {
    지역별정보윈도우[3].close();
  } else {
    지역별정보윈도우[3].open(koreamap, 지역별마커[3]);
  }
});

naver.maps.Event.addListener(지역별마커[4], "click", function(e) {
  if (지역별정보윈도우[4].getMap()) {
    지역별정보윈도우[4].close();
  } else {
    지역별정보윈도우[4].open(koreamap, 지역별마커[4]);
  }
});

naver.maps.Event.addListener(지역별마커[5], "click", function(e) {
  if (지역별정보윈도우[5].getMap()) {
    지역별정보윈도우[5].close();
  } else {
    지역별정보윈도우[5].open(koreamap, 지역별마커[5]);
  }
});

naver.maps.Event.addListener(지역별마커[6], "click", function(e) {
  if (지역별정보윈도우[6].getMap()) {
    지역별정보윈도우[6].close();
  } else {
    지역별정보윈도우[6].open(koreamap, 지역별마커[6]);
  }
});

naver.maps.Event.addListener(지역별마커[7], "click", function(e) {
  if (지역별정보윈도우[7].getMap()) {
    지역별정보윈도우[7].close();
  } else {
    지역별정보윈도우[7].open(koreamap, 지역별마커[7]);
  }
});

naver.maps.Event.addListener(지역별마커[8], "click", function(e) {
  if (지역별정보윈도우[8].getMap()) {
    지역별정보윈도우[8].close();
  } else {
    지역별정보윈도우[8].open(koreamap, 지역별마커[8]);
  }
});

naver.maps.Event.addListener(지역별마커[9], "click", function(e) {
  if (지역별정보윈도우[9].getMap()) {
    지역별정보윈도우[9].close();
  } else {
    지역별정보윈도우[9].open(koreamap, 지역별마커[9]);
  }
});

naver.maps.Event.addListener(지역별마커[10], "click", function(e) {
  if (지역별정보윈도우[10].getMap()) {
    지역별정보윈도우[10].close();
  } else {
    지역별정보윈도우[10].open(koreamap, 지역별마커[10]);
  }
});

naver.maps.Event.addListener(지역별마커[11], "click", function(e) {
  if (지역별정보윈도우[11].getMap()) {
    지역별정보윈도우[11].close();
  } else {
    지역별정보윈도우[11].open(koreamap, 지역별마커[11]);
  }
});

naver.maps.Event.addListener(지역별마커[12], "click", function(e) {
  if (지역별정보윈도우[12].getMap()) {
    지역별정보윈도우[12].close();
  } else {
    지역별정보윈도우[12].open(koreamap, 지역별마커[12]);
  }
});

naver.maps.Event.addListener(지역별마커[13], "click", function(e) {
  if (지역별정보윈도우[13].getMap()) {
    지역별정보윈도우[13].close();
  } else {
    지역별정보윈도우[13].open(koreamap, 지역별마커[13]);
  }
});

naver.maps.Event.addListener(지역별마커[14], "click", function(e) {
  if (지역별정보윈도우[14].getMap()) {
    지역별정보윈도우[14].close();
  } else {
    지역별정보윈도우[14].open(koreamap, 지역별마커[14]);
  }
});

naver.maps.Event.addListener(지역별마커[15], "click", function(e) {
  if (지역별정보윈도우[15].getMap()) {
    지역별정보윈도우[15].close();
  } else {
    지역별정보윈도우[15].open(koreamap, 지역별마커[15]);
  }
});

naver.maps.Event.addListener(지역별마커[16], "click", function(e) {
  if (지역별정보윈도우[16].getMap()) {
    지역별정보윈도우[16].close();
  } else {
    지역별정보윈도우[16].open(koreamap, 지역별마커[16]);
  }
});
