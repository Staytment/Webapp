var staytment = angular.module('staytment', ['leaflet-directive', 'config', 'services', 'ngSanitize']);

staytment.controller('Navigation', function ($scope, Posts) {
  $scope.items = [
    {title: 'Live', active: true},
    {title: 'Foobar'}
  ];

  $scope.message = "";

  $scope.postMessage = function() {
    Posts.newPost($scope.message);
  }
});

staytment.controller('Map', ['$scope', '$http', '$location', '$sanitize', 'DOMAIN_API', function ($scope, $http, $location, $sanitize, DOMAIN_API) {
  function fetchPosts(event) {
    var lat = $scope.center.lat;
    var long = $scope.center.lng;
    $http.get(DOMAIN_API + '/posts?filter=point&long=' + long + '&lat=' + lat + '&distance=1000000').success(function (data) {
      var markers = {};
      var features = data.features;
      for (var i = 0; i < features.length; i++) {
        var message = '<p class="message" >' + $sanitize(features[i].properties.message) + '</p><div class="author">' + $sanitize(features[i].properties.user.name) + '</div>';
        markers[features[i]._id] = {
          lat: features[i].geometry.coordinates[1],
          lng: features[i].geometry.coordinates[0],
          message: message,
          focus: true,
          draggable: false,
          autoPan: false
        };
      }
      $scope.markers = markers;
    });
  }

  navigator.geolocation.getCurrentPosition(function(position) {
//    $scope.$apply(function(){
//      $scope.center = {
//        lat: position.coords.latitude,
//        lng: position.coords.longitude,
//        zoom: 12
//      }
//    })
  });

  angular.extend($scope, {
    center: {},
    events: {
      map: {
        enable: ['zoomend', 'moveend'],
        logic: 'emit'
      }
    },
    markers: {}
  });

  $scope.$on('centerUrlHash', function (event, centerHash) {
    $location.search({ c: centerHash });
  });

  $scope.$on('leafletDirectiveMap.zoomend', function(){
    console.log('zoomend');
    fetchPosts()
  });
  $scope.$on('leafletDirectiveMap.moveend', function(){
    console.log('moveend');
    fetchPosts()
  });
}]);
