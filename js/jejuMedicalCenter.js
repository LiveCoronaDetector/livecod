//2월28일 크로스브라우징 문제 해결

// 국민안심병원
var 제주_국민안심병원 = [
  {
    이름: "제주대학교병원",
    lat: "33.4670605",
    lng: "126.5370226",
    주소: "제주 제주시 아란13길 15",
    전화번호: "064-717-1075",
    구분: "국민안심병원",
  },
  {
    이름: "제주한라병원",
    lat: "33.4899863",
    lng: "126.4829032",
    주소: "제주 제주시 도령로 65",
    전화번호: "064-740-5975",
    구분: "국민안심병원",
  },
  {
    이름: "중앙병원",
    lat: "33.4922645",
    lng: "126.4685369",
    주소: "제주 제주시 월랑로 91",
    전화번호: "064-786-7000",
    구분: "국민안심병원",
  },
];
// 제주지역선별진료소
var 제주지역선별진료소 = [
  {
    이름: "한마음병원",
    lat: "33.4962918",
    lng: "126.5374979",
    주소: "제주 제주시 연신로 52",
    전화번호: "064-750-9000",
    구분: "선별진료소",
  },
  {
    이름: "서귀포의료원",
    lat: "33.254995",
    lng: "126.5625628",
    주소: "제주 서귀포시 장수로 47",
    전화번호: "064-730-3000",
    구분: "선별진료소",
  },
  {
    이름: "한국병원",
    lat: "33.5002078",
    lng: "126.5148722",
    주소: "제주 제주시 서광로 193",
    전화번호: "064-750-0000",
    구분: "선별진료소",
  },
  {
    이름: "서귀포열린병원",
    lat: "33.2544248",
    lng: "126.5632242",
    주소: "제주 서귀포시 일주동로 8638",
    전화번호: "064-762-8001",
    구분: "선별진료소",
  },
];

// 제주지역보건소
var 제주지역보건소 = [
  {
    이름: "서귀포시 보건소",
    lat: "33.25347667",
    lng: "126.5553602",
    주소: "서귀포시 중앙로 101번길 52(서홍동)",
    전화번호: "064-760-6000",
    구분: "보건소",
  },
  {
    이름: "서귀포시 동부 보건소",
    lat: "33.27565472",
    lng: "126.7033908",
    주소: "서귀포시 남원읍 태위로527",
    전화번호: "064-760-6100",
    구분: "보건소",
  },
  {
    이름: "서귀포시 서부 보건소",
    lat: "33.2187035",
    lng: "126.253250",
    주소: "서귀포시 대정읍 최남단해안로 15길 12",
    전화번호: "064-760-6200",
    구분: "보건소",
  },
  {
    이름: "제주시 보건소",
    lat: "33.49159776",
    lng: "126.520239",
    주소: "제주시 연삼로 264",
    전화번호: "064-728-4010",
    구분: "보건소",
  },
  {
    이름: "제주시 동부 보건소",
    lat: "33.55434823",
    lng: "126.751323",
    주소: "제주시 구좌읍 김녕로 14길 6",
    전화번호: "064-728-1515",
    구분: "보건소",
  },
  {
    이름: "제주시 서부 보건소",
    lat: "33.41208308",
    lng: "126.2695288",
    주소: "제주시 한림읍 강구로 5",
    전화번호: "064-728-1513",
    구분: "보건소",
  },
];

var position = new naver.maps.LatLng(33.382763, 126.522372);
var map = new naver.maps.Map("map", {
  center: position,
  zoom: 10,
  zoomControl: true, //줌 컨트롤의 표시 여부
  zoomControlOptions: {
    //줌 컨트롤의 옵션
    position: naver.maps.Position.TOP_RIGHT,
  },
  scrollWheel: false,
});

var markers = [];
var infowindows = [];
var markers_보건소 = [];
var infowindows_보건소 = [];
var markers_제주_국민안심병원 = [];
var infowindows_제주_국민안심병원 = [];

// console.log('제주지역선별진료소 마킹');
//선별진료소 마킹
for (let i = 0; i < 제주지역선별진료소.length; i++) {
  var lat = 제주지역선별진료소[i].lat;
  var lng = 제주지역선별진료소[i].lng;
  var name = 제주지역선별진료소[i]["이름"];
  var address = 제주지역선별진료소[i]["주소"];
  var phone = 제주지역선별진료소[i]["전화번호"];
  var 구분 = 제주지역선별진료소[i]["구분"];

  var markerOptions = {
    position: {
      lat: lat,
      lng: lng,
    },
    map: map,
  };

  var marker = new naver.maps.Marker(markerOptions);
  var infowindow = new naver.maps.InfoWindow({
    content:
      "<div style='font-size: small; margin:10px; padding:3px;'>이름 : " +
      name +
      "<br>구분 : " +
      구분 +
      "<br>주소 : " +
      address +
      "<br>전화번호 : <a href='tel:" +
      phone +
      "'>" +
      phone +
      "</a></div>",
  });

  markers.push(marker);
  infowindows.push(infowindow);
}
// for (let jejuMedicalCenter of 제주지역선별진료소) {
//   var lat = jejuMedicalCenter.lat;
//   var lng = jejuMedicalCenter.lng;
//   var name = jejuMedicalCenter["이름"];
//   var address = jejuMedicalCenter["주소"];
//   var phone = jejuMedicalCenter["전화번호"];
//   var 구분 = jejuMedicalCenter["구분"];
//
//   var markerOptions = {
//     position: {
//       lat: lat,
//       lng: lng
//     },
//     map: map
//   };
//
//   var marker = new naver.maps.Marker(markerOptions);
//   var infowindow = new naver.maps.InfoWindow({
//     content:
//       "<div style='font-size: small; margin:10px; padding:3px;'>이름 : " +
//       name +
//       "<br>구분 : " +
//       구분 +
//       "<br>주소 : " +
//       address +
//       "<br>전화번호 : <a href='tel:" +
//       phone +
//       "'>" +
//       phone +
//       "</a></div>"
//   });
//
//   markers.push(marker);
//   infowindows.push(infowindow);
// };
// for (let i = 0; i < 제주지역선별진료소.length; i++) {
//   console.log(infowindows[i]);
//   naver.maps.Event.addListener(markers[i], "click", function (e) {
//     if (infowindows[i].getMap()) {
//       infowindows[i].close();
//     } else {
//       infowindows[i].open(map, markers[i]);
//     }
//   });
// }
naver.maps.Event.addListener(markers[0], "click", function (e) {
  if (infowindows[0].getMap()) {
    infowindows[0].close();
  } else {
    infowindows[0].open(map, markers[0]);
  }
});

naver.maps.Event.addListener(markers[1], "click", function (e) {
  if (infowindows[1].getMap()) {
    infowindows[1].close();
  } else {
    infowindows[1].open(map, markers[1]);
  }
});

naver.maps.Event.addListener(markers[2], "click", function (e) {
  if (infowindows[2].getMap()) {
    infowindows[2].close();
  } else {
    infowindows[2].open(map, markers[2]);
  }
});

naver.maps.Event.addListener(markers[3], "click", function (e) {
  if (infowindows[3].getMap()) {
    infowindows[3].close();
  } else {
    infowindows[3].open(map, markers[3]);
  }
});

// console.log('보건소 마킹');
//보건소 마킹

for (let i = 0; i < 제주지역보건소.length; i++) {
  var lat = 제주지역보건소[i].lat;
  var lng = 제주지역보건소[i].lng;
  var name = 제주지역보건소[i]["이름"];
  var address = 제주지역보건소[i]["주소"];
  var phone = 제주지역보건소[i]["전화번호"];
  var 구분 = 제주지역보건소[i]["구분"];

  var markerOptions = {
    position: {
      lat: lat,
      lng: lng,
    },
    map: map,
    icon: {
      content:
        '<img src="../img/pin_default.png" alt="" ' +
        'style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; ' +
        '-webkit-user-select: none; position: absolute; width: 22px; height: 35px; left: 0px; top: 0px;">',
      size: new naver.maps.Size(22, 35),
      anchor: new naver.maps.Point(11, 35),
    },
  };

  var marker = new naver.maps.Marker(markerOptions);
  var infowindow = new naver.maps.InfoWindow({
    content:
      "<div style='font-size: small; margin:10px; padding:3px;'>이름 : " +
      name +
      "<br>구분 : " +
      구분 +
      "<br>주소 : " +
      address +
      "<br>전화번호 : <a href='tel:" +
      phone +
      "'>" +
      phone +
      "</a></div>",
  });

  markers_보건소.push(marker);
  infowindows_보건소.push(infowindow);
}

naver.maps.Event.addListener(markers_보건소[0], "click", function (e) {
  if (infowindows_보건소[0].getMap()) {
    infowindows_보건소[0].close();
  } else {
    infowindows_보건소[0].open(map, markers_보건소[0]);
  }
});

naver.maps.Event.addListener(markers_보건소[1], "click", function (e) {
  if (infowindows_보건소[1].getMap()) {
    infowindows_보건소[1].close();
  } else {
    infowindows_보건소[1].open(map, markers_보건소[1]);
  }
});

naver.maps.Event.addListener(markers_보건소[2], "click", function (e) {
  if (infowindows_보건소[2].getMap()) {
    infowindows_보건소[2].close();
  } else {
    infowindows_보건소[2].open(map, markers_보건소[2]);
  }
});

naver.maps.Event.addListener(markers_보건소[3], "click", function (e) {
  if (infowindows_보건소[3].getMap()) {
    infowindows_보건소[3].close();
  } else {
    infowindows_보건소[3].open(map, markers_보건소[3]);
  }
});

naver.maps.Event.addListener(markers_보건소[4], "click", function (e) {
  if (infowindows_보건소[4].getMap()) {
    infowindows_보건소[4].close();
  } else {
    infowindows_보건소[4].open(map, markers_보건소[4]);
  }
});

naver.maps.Event.addListener(markers_보건소[5], "click", function (e) {
  if (infowindows_보건소[5].getMap()) {
    infowindows_보건소[5].close();
  } else {
    infowindows_보건소[5].open(map, markers_보건소[5]);
  }
});

// console.log('국민안심병원 마킹');
//국민안심병원 마킹

for (let i = 0; i < 제주_국민안심병원.length; i++) {
  var lat = 제주_국민안심병원[i].lat;
  var lng = 제주_국민안심병원[i].lng;
  var name = 제주_국민안심병원[i]["이름"];
  var address = 제주_국민안심병원[i]["주소"];
  var phone = 제주_국민안심병원[i]["전화번호"];
  var 구분 = 제주_국민안심병원[i]["구분"];

  var markerOptions = {
    position: {
      lat: lat,
      lng: lng,
    },
    map: map,
    icon: {
      content:
        '<img src="../img/pin_green.png" alt="" ' +
        'style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; ' +
        '-webkit-user-select: none; position: absolute; width: 22px; height: 35px; left: 0px; top: 0px;">',
      size: new naver.maps.Size(22, 35),
      anchor: new naver.maps.Point(11, 35),
    },
  };

  var marker = new naver.maps.Marker(markerOptions);
  var infowindow = new naver.maps.InfoWindow({
    content:
      "<div style='font-size: small; margin:10px; padding:3px;'>이름 : " +
      name +
      "<br>구분 : " +
      구분 +
      "<br>주소 : " +
      address +
      "<br>전화번호 : <a href='tel:" +
      phone +
      "'>" +
      phone +
      "</a></div>",
  });

  markers_제주_국민안심병원.push(marker);
  infowindows_제주_국민안심병원.push(infowindow);
}

// console.log('markers_제주_국민안심병원');
// console.log(markers_제주_국민안심병원);
// console.log(infowindows_제주_국민안심병원);

naver.maps.Event.addListener(markers_제주_국민안심병원[0], "click", function (
  e
) {
  if (infowindows_제주_국민안심병원[0].getMap()) {
    infowindows_제주_국민안심병원[0].close();
  } else {
    infowindows_제주_국민안심병원[0].open(map, markers_제주_국민안심병원[0]);
  }
});

naver.maps.Event.addListener(markers_제주_국민안심병원[1], "click", function (
  e
) {
  if (infowindows_제주_국민안심병원[1].getMap()) {
    infowindows_제주_국민안심병원[1].close();
  } else {
    infowindows_제주_국민안심병원[1].open(map, markers_제주_국민안심병원[1]);
  }
});

naver.maps.Event.addListener(markers_제주_국민안심병원[2], "click", function (
  e
) {
  if (infowindows_제주_국민안심병원[2].getMap()) {
    infowindows_제주_국민안심병원[2].close();
  } else {
    infowindows_제주_국민안심병원[2].open(map, markers_제주_국민안심병원[2]);
  }
});
