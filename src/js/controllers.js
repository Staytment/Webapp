var staytment = angular.module('staytment', ['leaflet-directive']);

staytment.controller('Navigation', function($scope) {
  $scope.items = [
    {title: 'Live', active: true},
    {title: 'Foobar'}
  ];
});

staytment.controller('Map', ['$scope', '$location', function($scope, $location) {
  angular.extend($scope, {
    center: {
      lat: 51.3,
      lng: 9.5,
      zoom: 12
    },
    markers: {
      myMarker: {
        lat: 51.325,
        lng: 9.469,
        message: 'DAFUQ!',
        focus: false,
        draggable: false
      },
      my2Marker: {
        lat: 51.275,
        lng: 9.439,
        message: 'YOLO!',
        focus: false,
        draggable: false
      }
    }
  });
  $scope.$on('centerUrlHash', function(event, centerHash) {
    $location.search({ c: centerHash });
  });
}]);
