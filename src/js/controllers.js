var staytment = angular.module('staytment', ['leaflet-directive']);

staytment.controller('Navigation', function ($scope) {
  $scope.items = [
    {title: 'Live', active: true},
    {title: 'Foobar'}
  ];
});

staytment.controller('Map', ['$scope', '$location', function ($scope, $location) {
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
    angular.extend($scope, {
      markers: {
        someMarker: {
          lat: 51.315,
          lng: 9.439,
          message: 'WTF',
          focus: true,
          draggable: false,
          autoPan: false
        }
      }
    });
  }, 3000);
  $scope.$on('centerUrlHash', function (event, centerHash) {
    $location.search({ c: centerHash });
  });
}]);
