var staytment = angular.module('staytment', ['leaflet-directive']);

staytment.controller('Navigation', function($scope) {
  $scope.items = [
    {title: 'Live', active: true},
    {title: 'Foobar'}
  ];
});
