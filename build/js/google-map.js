function initMap(){var e={lat:59.936251,lng:30.321168},n={zoom:16,center:{lat:59.936583,lng:30.321128}},o=new google.maps.Map(document.getElementById("google-map"),n),t={url:"img/icon-map-marker.svg"},g=new google.maps.Marker({position:e,map:o,icon:t});google.maps.event.addDomListener(window,"resize",function(){var e=o.getCenter();google.maps.event.trigger(o,"resize"),o.setCenter(e)}),g.setMap(o)}