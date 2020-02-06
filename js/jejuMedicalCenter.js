var position = new naver.maps.LatLng(33.382763, 126.522372);
var map = new naver.maps.Map('map', {
    center: position,
    zoom: 10
});
var markers = []
var infowindows = []

for (jejuMedicalCenter of 제주지역선별진료소) {
    var lat = jejuMedicalCenter.lat;
    var lng = jejuMedicalCenter.lng;
    var name = jejuMedicalCenter["이름"];
    var address = jejuMedicalCenter["주소"];
    var phone = jejuMedicalCenter["전화번호"];

    var markerOptions = {
        position: {
            lat: lat,
            lng: lng
        },
        map: map
    };

    var marker = new naver.maps.Marker(markerOptions);
    var infowindow = new naver.maps.InfoWindow({
        content: `
      <div style="padding:3px;">
        이름 : ${name}<br>
        주소 : ${address}<br>
        전화번호 : ${phone}
      </div>
    `
    });

    markers.push(marker);
    infowindows.push(infowindow);
}
// for (var i = 0; i < 제주지역선별진료소.length; i++) {
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

naver.maps.Event.addListener(markers[4], "click", function (e) {
    if (infowindows[4].getMap()) {
        infowindows[4].close();
    } else {
        infowindows[4].open(map, markers[4]);
    }
});

naver.maps.Event.addListener(markers[5], "click", function (e) {
    if (infowindows[5].getMap()) {
        infowindows[5].close();
    } else {
        infowindows[5].open(map, markers[5]);
    }
});

naver.maps.Event.addListener(markers[6], "click", function (e) {
    if (infowindows[6].getMap()) {
        infowindows[6].close();
    } else {
        infowindows[6].open(map, markers[6]);
    }
});