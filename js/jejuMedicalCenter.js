var position = new naver.maps.LatLng(33.382763, 126.522372);
var map = new naver.maps.Map("map", {
  center: position,
  zoom: 10
});
var markers = [];
var infowindows = [];

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
    content:
      "<div style='padding:3px;'>이름 : " +
      name +
      "<br>주소 : " +
      address +
      "<br>전화번호 : " +
      phone +
      "</div>"
  });

  markers.push(marker);
  infowindows.push(infowindow);
}

for (var info_index in infowindow) {
  console.log(infowindows[info_index]);
  naver.maps.Event.addListener(markers[info_index], "click", function(e) {
    if (infowindows[info_index].getMap()) {
      infowindows[info_index].close();
    } else {
      infowindows[info_index].open(map, markers[info_index]);
    }
  });
}
