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

var mapOptions = {
    center: new naver.maps.LatLng(35.8255645, 127.0965806),
    zoom: 7,
    zoomControl: true, //줌 컨트롤의 표시 여부
    zoomControlOptions: { //줌 컨트롤의 옵션
              position: naver.maps.Position.TOP_RIGHT
    }
};

var jejuMedicineMap = new naver.maps.Map('jejuMedicineMap', mapOptions);

var jejuMedicineMap_position = new naver.maps.LatLng(33.382763, 126.522372);
var mapOptions = {
    center: jejuMedicineMap_position,
    zoom: 7,
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
        '<p style="font-size: small; margin:10px;">지역이름 : ',마스크판매_우체국[i]['이름'],'<br>',
        '확진자수 : ',마스크판매_우체국[i]['전화번호'],'<br>',
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
