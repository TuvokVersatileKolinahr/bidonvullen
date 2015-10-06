/**
 * Users factory
 */
app.factory('UserService', function($resource) {
  return $resource('/api/userPointsList', {user: '@user'});
});

/**
 * Users controller
 */
app.controller('UsersController', ['$scope', 'UserService', function($scope, UserService) {

  $scope.points = UserService.get({ userName: 'theo' });

  //$scope.oneUser = UserService.get({ userName: 'jos' });


}]);
