function initMap() {
  var myLatLng = {
    lat: 59.936251,
    lng: 30.321168
  };
  var center = {
    lat: 59.936583,
    lng: 30.321128
  };
  var centermap = {
    zoom: 16,
    center: center
  };
  var map = new google.maps.Map(document.getElementById("google-map"), centermap);
  var dot = {
    url: "img/icon-map-marker.svg"
  };
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: dot
  });
  google.maps.event.addDomListener(window, "resize", function () {
    var e = map.getCenter();
    google.maps.event.trigger(map, "resize"),
      map.setCenter(e)
  });
  marker.setMap(map)
}
