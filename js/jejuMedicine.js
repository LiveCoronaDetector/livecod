// 마스크판매_우체국
var 마스크판매_우체국 = [
    {
        "이름": "김녕우체국",
        "lat": "33.554281",
        "lng": "126.747173",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "애월우체국",
        "lat": "33.465285",
        "lng": "126.320545",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "세화우체국",
        "lat": "33.523359",
        "lng": "126.854294",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "협재우체국",
        "lat": "33.397637",
        "lng": "126.245536",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "신창우체국",
        "lat": "33.349508",
        "lng": "126.182591",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "고산우체국",
        "lat": "33.303669",
        "lng": "126.179180",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "위미우체국",
        "lat": "33.275152",
        "lng": "126.662302",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "우도우체국",
        "lat": "33.505176",
        "lng": "126.954086",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "고성우체국",
        "lat": "33.447358",
        "lng": "126.912258",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "모슬포우체국",
        "lat": "33.222833",
        "lng": "126.255679",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "조천우체국",
        "lat": "33.537927",
        "lng": "126.639104",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "안성우체국",
        "lat": "33.250147",
        "lng": "126.279540",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "추자우체국",
        "lat": "33.963955",
        "lng": "126.297037",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "하귀우체국",
        "lat": "33.481222",
        "lng": "126.405011",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "안덕우체국",
        "lat": "33.246326",
        "lng": "126.334695",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "함덕우체국",
        "lat": "33.543186",
        "lng": "126.661420",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "표선우체국",
        "lat": "33.325826",
        "lng": "126.832435",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "한림우체국",
        "lat": "33.412009",
        "lng": "126.264826",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "남원우체국",
        "lat": "33.277699",
        "lng": "126.714242",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
    {
        "이름": "성산포우체국",
        "lat": "33.463440",
        "lng": "126.933829",
        "주소": " ",
        "전화번호": " ",
        "구분": "마스크판매_우체국"
    },
];

console.log('마스크판매_우체국', 마스크판매_우체국.length);

var mapOptions = {
    center: new naver.maps.LatLng(33.3616837,126.5204118),
    zoom: 7,
    zoomControl: true, //줌 컨트롤의 표시 여부
    zoomControlOptions: { //줌 컨트롤의 옵션
              position: naver.maps.Position.TOP_RIGHT
    }
};

var jejuMedicineMap = new naver.maps.Map('jejuMedicineMap', mapOptions);

var jejuMedicineMap_position = new naver.maps.LatLng(33.3616837,126.5204118);
var mapOptions = {
    center: jejuMedicineMap_position,
    zoom: 10,
    zoomControl: true, //줌 컨트롤의 표시 여부
    zoomControlOptions: { //줌 컨트롤의 옵션
              position: naver.maps.Position.TOP_RIGHT
    }
};

let 마스크판매_우체국_array = [];
let 마스크판매_우체국_정보윈도우_array = [];

for(let i in 마스크판매_우체국) {
    // console.log(마스크판매_우체국[i]['이름'], 마스크판매_우체국[i]['lat'], 마스크판매_우체국[i]['lng']);
    var point = new naver.maps.LatLng(마스크판매_우체국[i]['lat'], 마스크판매_우체국[i]['lng']);
    var contentString = [
        '<div class="iw_inner">',
        '<p style="font-size: small; margin:10px;">이름 : ',마스크판매_우체국[i]['이름'],'<br>',
        '전화번호 : ',마스크판매_우체국[i]['전화번호'],'<br>',
        '</p>',
        '</div>'
    ].join('');
    var marker = new naver.maps.Marker({
        map: jejuMedicineMap,
        position: point
    });
    var infowindow = new naver.maps.InfoWindow({
        content: contentString,
    });
    마스크판매_우체국_array.push(marker);
    마스크판매_우체국_정보윈도우_array.push(infowindow);
}

naver.maps.Event.addListener(마스크판매_우체국_array[0], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[0].getMap()) {
    마스크판매_우체국_정보윈도우_array[0].close();
  } else {
    마스크판매_우체국_정보윈도우_array[0].open(jejuMedicineMap, 마스크판매_우체국_array[0]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[1], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[1].getMap()) {
    마스크판매_우체국_정보윈도우_array[1].close();
  } else {
    마스크판매_우체국_정보윈도우_array[1].open(jejuMedicineMap, 마스크판매_우체국_array[1]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[2], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[2].getMap()) {
    마스크판매_우체국_정보윈도우_array[2].close();
  } else {
    마스크판매_우체국_정보윈도우_array[2].open(jejuMedicineMap, 마스크판매_우체국_array[2]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[3], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[3].getMap()) {
    마스크판매_우체국_정보윈도우_array[3].close();
  } else {
    마스크판매_우체국_정보윈도우_array[3].open(jejuMedicineMap, 마스크판매_우체국_array[3]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[4], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[4].getMap()) {
    마스크판매_우체국_정보윈도우_array[4].close();
  } else {
    마스크판매_우체국_정보윈도우_array[4].open(jejuMedicineMap, 마스크판매_우체국_array[4]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[5], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[5].getMap()) {
    마스크판매_우체국_정보윈도우_array[5].close();
  } else {
    마스크판매_우체국_정보윈도우_array[5].open(jejuMedicineMap, 마스크판매_우체국_array[5]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[6], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[6].getMap()) {
    마스크판매_우체국_정보윈도우_array[6].close();
  } else {
    마스크판매_우체국_정보윈도우_array[6].open(jejuMedicineMap, 마스크판매_우체국_array[6]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[7], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[7].getMap()) {
    마스크판매_우체국_정보윈도우_array[7].close();
  } else {
    마스크판매_우체국_정보윈도우_array[7].open(jejuMedicineMap, 마스크판매_우체국_array[7]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[8], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[8].getMap()) {
    마스크판매_우체국_정보윈도우_array[8].close();
  } else {
    마스크판매_우체국_정보윈도우_array[8].open(jejuMedicineMap, 마스크판매_우체국_array[8]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[10], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[10].getMap()) {
    마스크판매_우체국_정보윈도우_array[10].close();
  } else {
    마스크판매_우체국_정보윈도우_array[10].open(jejuMedicineMap, 마스크판매_우체국_array[10]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[12], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[12].getMap()) {
    마스크판매_우체국_정보윈도우_array[12].close();
  } else {
    마스크판매_우체국_정보윈도우_array[12].open(jejuMedicineMap, 마스크판매_우체국_array[12]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[13], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[13].getMap()) {
    마스크판매_우체국_정보윈도우_array[13].close();
  } else {
    마스크판매_우체국_정보윈도우_array[13].open(jejuMedicineMap, 마스크판매_우체국_array[13]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[14], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[14].getMap()) {
    마스크판매_우체국_정보윈도우_array[14].close();
  } else {
    마스크판매_우체국_정보윈도우_array[14].open(jejuMedicineMap, 마스크판매_우체국_array[14]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[15], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[15].getMap()) {
    마스크판매_우체국_정보윈도우_array[15].close();
  } else {
    마스크판매_우체국_정보윈도우_array[15].open(jejuMedicineMap, 마스크판매_우체국_array[15]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[16], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[16].getMap()) {
    마스크판매_우체국_정보윈도우_array[16].close();
  } else {
    마스크판매_우체국_정보윈도우_array[16].open(jejuMedicineMap, 마스크판매_우체국_array[16]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[17], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[17].getMap()) {
    마스크판매_우체국_정보윈도우_array[17].close();
  } else {
    마스크판매_우체국_정보윈도우_array[17].open(jejuMedicineMap, 마스크판매_우체국_array[17]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[18], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[18].getMap()) {
    마스크판매_우체국_정보윈도우_array[18].close();
  } else {
    마스크판매_우체국_정보윈도우_array[18].open(jejuMedicineMap, 마스크판매_우체국_array[18]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[19], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[19].getMap()) {
    마스크판매_우체국_정보윈도우_array[19].close();
  } else {
    마스크판매_우체국_정보윈도우_array[19].open(jejuMedicineMap, 마스크판매_우체국_array[19]);
  }
});

naver.maps.Event.addListener(마스크판매_우체국_array[20], "click", function(e) {
  if (마스크판매_우체국_정보윈도우_array[20].getMap()) {
    마스크판매_우체국_정보윈도우_array[20].close();
  } else {
    마스크판매_우체국_정보윈도우_array[20].open(jejuMedicineMap, 마스크판매_우체국_array[20]);
  }
});
