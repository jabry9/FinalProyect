var app = angular.module('detallesANApp', []);

app.controller('detallesANCtrl', function ($scope, $http) {
    setTimeout(initMap,10);
});


function initMap() {
  var posicion = new google.maps.LatLng(-34.397, 150.644);

  var mapCanvas = document.getElementById("map");
  var mapOptions = {
      center: posicion,
      zoom: 12,
      disableDefaultUI: true
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);

  var myCity = new google.maps.Circle({
      center: posicion,
      radius: 500,
      strokeColor: "#e50b0b",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#e50b0b",
      fillOpacity: 0.4
  });
  myCity.setMap(map);
  
}