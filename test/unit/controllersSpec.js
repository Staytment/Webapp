'use strict';

describe('Navigation', function(){

  beforeEach(module('staytment'));

  it('should create a navigation with 2 items', inject(function($controller) {
    var scope = {},
      ctrl = $controller('Navigation', {$scope:scope});

    expect(scope.items.length).toBe(2);
  }));

});