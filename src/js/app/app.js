/**
 * Declaration of the main skeleton app
 */
var app = angular.module('bidonvullen', ['ngRoute'])

/**
 * Configuration: state your routes and other configuration items here
 */
.config(function($routeProvider, $locationProvider) {
  
  $routeProvider
    .when('/add', {
      controller: 'AddController',
      templateUrl: '/js/app/modules/add/add.html'
    })
    .otherwise({
      controller: 'MainController',
      templateUrl: '/js/app/modules/main/main.html'
    });

  $locationProvider.html5Mode('true');
});
