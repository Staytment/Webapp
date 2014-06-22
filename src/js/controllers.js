var staytment = angular.module('staytment', ['leaflet-directive', 'config']);

staytment.controller('Navigation', function ($scope) {
  $scope.items = [
    {title: 'Live', active: true},
    {title: 'Foobar'}
  ];
});

staytment.controller('Map', ['$scope', '$http', '$location', 'DOMAIN_API', function ($scope, $http, $location, DOMAIN_API) {
  var markers = {
    myMarker: {
      lat: 51.325,
      lng: 9.469,
      message: 'DAFUQ!',
      focus: true,
      draggable: false,
      autoPan: false
    },
    my2Marker: {
      lat: 51.275,
      lng: 9.439,
      message: 'YOLO!',
      focus: true,
      draggable: false,
      autoPan: false
    }
  };
  angular.extend($scope, {
    center: {
      lat: 51.3,
      lng: 9.5,
      zoom: 12
    },
    markers: markers
  });
  setInterval(function () {
    $http.get(DOMAIN_API + '/posts').success(function (data) {
      var markers = {};
      for (var i = 0; i < data.length; i++) {
        markers[data[i]._id] = {
          lat: data[i].lat,
          lng: data[i].long,
          message: data[i].message,
          focus: true,
          draggable: false,
          autoPan: false
        };
      }
      angular.extend($scope, {
        markers: markers
      });
    });
  }, 3000);
  $scope.$on('centerUrlHash', function (event, centerHash) {
    $location.search({ c: centerHash });
  });
}]);
