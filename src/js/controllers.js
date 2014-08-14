var staytment = angular.module('staytment', ['leaflet-directive', 'config']);

staytment.controller('Navigation', function ($scope) {
  $scope.items = [
    {title: 'Live', active: true},
    {title: 'Foobar'}
  ];
});

staytment.controller('Map', ['$scope', '$http', '$location', 'DOMAIN_API', function ($scope, $http, $location, DOMAIN_API) {
  function fetchPosts(event) {
    var lat = $scope.center.lat;
    var long = $scope.center.lng;
    $http.get(DOMAIN_API + '/posts').success(function (data) {
      var markers = {};
      var features = data.features;
      for (var i = 0; i < features.length; i++) {
        markers[features[i]._id] = {
          lat: features[i].geometry.coordinates[1],
          lng: features[i].geometry.coordinates[0],
          message: features[i].properties.message,
          focus: true,
          draggable: false,
          autoPan: false
        };
      }
      angular.extend($scope, {
        markers: markers
      });
    });
  }

  angular.extend($scope, {
    center: {
      lat: 51.3,
      lng: 9.5,
      zoom: 12
    },
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

  $scope.$on('leafletDirectiveMap.zoomend', fetchPosts);
  $scope.$on('leafletDirectiveMap.moveend', fetchPosts);
}]);
