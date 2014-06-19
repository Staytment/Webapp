var staytment = angular.module('staytment', []);

staytment.controller('Navigation', function($scope) {
  $scope.items = [
    {title: 'Live', active: true},
    {title: 'Foobar'}
  ];
});
