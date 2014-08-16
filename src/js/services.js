var services = angular.module('services', ['config']);

services.service('Posts', ['$http', 'DOMAIN_API', 'TEST_API_KEY',
  function($http, DOMAIN_API, TEST_API_KEY){
    var self = this;

    self.newPost = function(message, callback) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var data = {
          message: message,
          coordinates: [
            position.coords.longitude,
            position.coords.latitude
          ]
        }
        var promise = $http.post(DOMAIN_API+'/posts/?api_key='+TEST_API_KEY, data);
        if(callback) promise.success(callback);
      });
    }
  }]
);
