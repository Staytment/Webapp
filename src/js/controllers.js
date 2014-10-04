var staytment = angular.module('staytment', ['config', 'services', 'ngSanitize']);

staytment.controller('Navigation', function ($scope, Posts) {
  $scope.items = [
    {title: 'Live', active: true},
    {title: 'Foobar'}
  ];

  $scope.message = "";

  $scope.postMessage = function () {
    Posts.newPost($scope.message);
  }
});

staytment.controller('Map', ['$scope', '$http', '$location', '$sanitize', 'DOMAIN_API', function ($scope, $http, $location, $sanitize, DOMAIN_API) {

  var map = L.map('map').setView([51.3, 9.5], 10);
  L.tileLayer('http://{s}.tiles.mapbox.com/v3/swegener.jckkpg0b/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
  }).addTo(map);

  $scope.map = map;
  $scope.markers = {};

  function fetchPosts(event) {

    var bounds = $scope.map.getBounds();
    var LatLng;
    LatLng = bounds.getNorthWest();
    var lat1 = LatLng.lat;
    var long1 = LatLng.lng;
    LatLng = bounds.getSouthEast();
    var lat2 = LatLng.lat;
    var long2 = LatLng.lng;

    $http.get(DOMAIN_API + '/posts/by-rectangle?long1=' + long1 + '&lat1=' + lat1 + '&long2=' + long2 + '&lat2=' + lat2).success(function (data) {
      var item;
      var items = {};
      var features = data.features;
      for (var i = 0; i < features.length; i++) {
        var message = '<p class="message" >' + $sanitize(features[i].properties.message) + '</p><div class="author">' + $sanitize(features[i].properties.user.name) + '</div>';
        items[features[i]._id] = {
          lat: features[i].geometry.coordinates[1],
          lng: features[i].geometry.coordinates[0],
          message: message
        };
      }

      var key;
      for (key in $scope.markers) {
        if (!(key in items)) {
          $scope.map.removeLayer($scope.markers[key]);
          delete $scope.markers[key];
        }
      }
      for (key in items) {
        item = items[key];
        if (!(key in $scope.markers)) {
          var marker = L.marker([item.lat, item.lng]).addTo($scope.map);
          var popup = L.popup({
            autoPan: false,
            riseOnHover: true
          }).setContent(item.message);
          marker.bindPopup(popup).openPopup();
          map.addLayer(marker);
          $scope.markers[key] = marker;
        }
      }
    });
  }

  navigator.geolocation.getCurrentPosition(function (position) {
//    $scope.$apply(function(){
//      $scope.center = {
//        lat: position.coords.latitude,
//        lng: position.coords.longitude,
//        zoom: 12
//      }
//    })
  });

  map.on('moveend', fetchPosts);
  map.on('zoomend', fetchPosts);

  $scope.$on('centerUrlHash', function (event, centerHash) {
    $location.search({ c: centerHash });
  });
}]);
